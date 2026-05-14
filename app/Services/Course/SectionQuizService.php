<?php

namespace App\Services\Course;

use App\Models\Course\QuestionAnswer;
use App\Models\Course\QuizQuestion;
use App\Models\Course\QuizSubmission;
use App\Models\Course\SectionLesson;
use App\Models\Course\SectionQuiz;
use App\Models\Course\WatchHistory;

class SectionQuizService extends CourseSectionService
{
   public function createQuiz(array $data, string $userId): SectionQuiz
   {
      $hours = $data['hours'] ?? 0;
      $minutes = $data['minutes'] ?? 0;
      $seconds = $data['seconds'] ?? 0;

      $quiz = SectionQuiz::create([
         ...$data,
         'duration' => $hours . ':' . $minutes . ':' . $seconds,
      ]);

      $this->initWatchHistory($data['course_id'], 'quiz', $userId);

      return $quiz;
   }

   public function updateQuiz(array $data, string $id): SectionQuiz
   {
      $hours = $data['hours'] ?? 0;
      $minutes = $data['minutes'] ?? 0;
      $seconds = $data['seconds'] ?? 0;

      return SectionQuiz::findOrFail($id)->update([
         ...$data,
         'duration' => $hours . ':' . $minutes . ':' . $seconds,
      ]);
   }

   public function deleteQuiz(string $id): bool
   {
      $quiz = SectionQuiz::findOrFail($id);
      
      $quiz_id = $quiz->id;
      $course_id = $quiz->course_id;
      $course_section_id = $quiz->course_section_id;
      
      $quiz->delete();
      
      // Check if there are any remaining content items in the course
      $lessons = SectionLesson::where('course_id', $course_id)->get();
      $quizzes = SectionQuiz::where('course_id', $course_id)->get();
      
      if ($lessons->count() <= 0 && $quizzes->count() <= 0) {
         WatchHistory::where('course_id', $course_id)->delete();
         return true;
      }
      
      // Get all watch histories for this course
      $histories = WatchHistory::where('course_id', $course_id)->get();
      
      foreach ($histories as $history) {
         if ($history) {
            $updateNeeded = false;
            
            // 1. Remove from completed_watching if exists
            $completedWatching = json_decode($history->completed_watching, true) ?? [];
            $originalCount = count($completedWatching);
            $completedWatching = array_filter($completedWatching, function ($item) use ($quiz_id) {
               return !($item['id'] == $quiz_id && $item['type'] === 'quiz');
            });
            
            if (count($completedWatching) !== $originalCount) {
               $history->completed_watching = !empty($completedWatching) ? json_encode(array_values($completedWatching)) : null;
               $updateNeeded = true;
            }
            
            // 2. Update current_watching_id if it matches the deleted quiz
            if ($history->current_watching_id == $quiz_id && $history->current_watching_type === 'quiz') {
               // Try to find the first available lesson
               $nextLesson = SectionLesson::where('course_id', $course_id)
                  ->orderBy('sort', 'asc')
                  ->first();
               
               if (!$nextLesson) {
                  // If no lessons, try to find another quiz
                  $nextQuiz = SectionQuiz::where('course_id', $course_id)
                     ->where('id', '!=', $quiz_id)
                     ->orderBy('id', 'asc')
                     ->first();
                  
                  if ($nextQuiz) {
                     $history->current_watching_id = $nextQuiz->id;
                     $history->current_watching_type = 'quiz';
                     $history->current_section_id = $nextQuiz->course_section_id;
                  } else {
                     $history->current_watching_id = null;
                     $history->current_watching_type = null;
                     $history->current_section_id = null;
                  }
               } else {
                  $history->current_watching_id = $nextLesson->id;
                  $history->current_watching_type = 'lesson';
                  $history->current_section_id = $nextLesson->course_section_id;
               }
               $updateNeeded = true;
            }
            
            // 3. Update next_watching_id if it matches the deleted quiz
            if ($history->next_watching_id == $quiz_id && $history->next_watching_type === 'quiz') {
               // Try to find the first available lesson
               $nextLesson = SectionLesson::where('course_id', $course_id)
                  ->orderBy('sort', 'asc')
                  ->first();
               
               if (!$nextLesson) {
                  // If no lessons, try to find another quiz
                  $nextQuiz = SectionQuiz::where('course_id', $course_id)
                     ->where('id', '!=', $quiz_id)
                     ->orderBy('id', 'asc')
                     ->first();
                  
                  if ($nextQuiz) {
                     $history->next_watching_id = $nextQuiz->id;
                     $history->next_watching_type = 'quiz';
                  } else {
                     $history->next_watching_id = null;
                     $history->next_watching_type = null;
                  }
               } else {
                  $history->next_watching_id = $nextLesson->id;
                  $history->next_watching_type = 'lesson';
               }
               $updateNeeded = true;
            }
            
            // 4. Update prev_watching_id if it matches the deleted quiz
            if ($history->prev_watching_id == $quiz_id && $history->prev_watching_type === 'quiz') {
               // Try to find the first available lesson
               $prevLesson = SectionLesson::where('course_id', $course_id)
                  ->orderBy('sort', 'desc')
                  ->first();
               
               if (!$prevLesson) {
                  // If no lessons, try to find another quiz
                  $prevQuiz = SectionQuiz::where('course_id', $course_id)
                     ->where('id', '!=', $quiz_id)
                     ->orderBy('id', 'desc')
                     ->first();
                  
                  if ($prevQuiz) {
                     $history->prev_watching_id = $prevQuiz->id;
                     $history->prev_watching_type = 'quiz';
                  } else {
                     $history->prev_watching_id = null;
                     $history->prev_watching_type = null;
                  }
               } else {
                  $history->prev_watching_id = $prevLesson->id;
                  $history->prev_watching_type = 'lesson';
               }
               $updateNeeded = true;
            }
            
            if ($updateNeeded) {
               $history->save();
            }
         }
      }
      
      return true;
   }

   public function quizSubmission(array $data): QuizSubmission|bool
   {
      $quiz = SectionQuiz::findOrFail($data['section_quiz_id']);

      $submission = QuizSubmission::where('user_id', $data['user_id'])
         ->where('section_quiz_id', $quiz->id)
         ->first();

      // Get or create quiz submission
      if ($submission) {
         if ($submission->attempts >= $quiz->retake) {
            return false;
         } else {
            $submission->increment('attempts');
         }
      } else {
         $submission = QuizSubmission::create([
            'section_quiz_id' => $quiz->id,
            'user_id' => $data['user_id'],
            'attempts' => 1,
            'correct_answers' => 0,
            'incorrect_answers' => 0,
            'total_marks' => 0,
            'is_passed' => false,
         ]);
      }

      $totalQuestions = count($data['answers']);
      $correctAnswers = 0;

      foreach ($data['answers'] as $answer) {
         $question = QuizQuestion::findOrFail($answer['question_id']);

         // Compare submitted answer with correct answer
         $isCorrect = $this->checkAnswer($question, $answer['answer']);

         // Create question answer
         QuestionAnswer::create([
            'answers' => json_encode($answer['answer']), // Store answers as JSON
            'is_correct' => $isCorrect,
            'user_id' => $data['user_id'],
            'quiz_question_id' => $question->id,
         ]);

         if ($isCorrect) {
            $correctAnswers++;
         }
      }

      // Calculate and update score
      $score = ($correctAnswers / $totalQuestions) * $quiz->total_mark;

      // Update submission with final results
      $submission->update([
         'correct_answers' => $correctAnswers,
         'incorrect_answers' => $totalQuestions - $correctAnswers,
         'total_marks' => $score,
         'is_passed' => $score >= $quiz->pass_mark // Assuming 50% is passing score
      ]);

      return $submission;
   }

   /**
    * Check if the submitted answer matches the correct answer
    */
   private function checkAnswer(QuizQuestion $question, $submittedAnswer): bool
   {
      $correctAnswer = json_decode($question->answer, true);
      $submittedAnswer = is_array($submittedAnswer) ? $submittedAnswer : [$submittedAnswer];

      // Sort both arrays to ensure order doesn't matter
      sort($correctAnswer);
      sort($submittedAnswer);

      return $correctAnswer == $submittedAnswer;
   }
}
