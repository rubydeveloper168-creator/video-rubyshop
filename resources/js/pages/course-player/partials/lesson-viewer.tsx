import TiptapRenderer from '@/components/text-editor/tiptap-renderer/client-renderer';
import { Card } from '@/components/ui/card';
import VideoPlayer from '@/components/video-player';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';
import DocumentViewer from './document-viewer';
import EmbedViewer from './embed-viewer';
import LessonControl from './lesson-control';

interface LessonViewerProps {
   lesson: SectionLesson;
}

const LessonViewer = ({ lesson }: LessonViewerProps) => {
   const isVideoLesson = ['video_url', 'video'].includes(lesson.lesson_type);

   const hlsOnlyMode =
      typeof window !== 'undefined'
         ? (() => {
              const params = new URLSearchParams(window.location.search);
              const value = params.get('hlsOnly') || params.get('hls_only');
              return value ? ['1', 'true', 'yes', 'on'].includes(value.toLowerCase()) : false;
           })()
         : false;

   const videoSources = useMemo(() => {
      if (!isVideoLesson) {
         return [];
      }

      const ensureAbsoluteUrl = (url?: string | null) => {
         if (!url) return '';
         if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
         }

         if (typeof window === 'undefined') {
            return url.startsWith('/') ? url : `/${url}`;
         }

         const normalized = url.startsWith('/') ? url.slice(1) : url;
         return `${window.location.origin}/${normalized}`;
      };

      const sources: Array<{ src: string; type?: string; label?: string }> = [];

      if (lesson.processing_status === 'completed' && lesson.hls_playlist_path) {
         const hlsSrc = ensureAbsoluteUrl(lesson.hls_playlist_path);
         if (hlsSrc) {
            sources.push({
               src: hlsSrc,
               type: 'application/x-mpegURL',
               label: 'HLS (auto)',
            });
         }
      }

      if (!hlsOnlyMode && lesson.lesson_src) {
         sources.push({
            src: ensureAbsoluteUrl(lesson.lesson_src),
            type: 'video/mp4',
            label: 'Original MP4',
         });
      }

      if (typeof window !== 'undefined') {
         console.groupCollapsed(`[LessonViewer] Video sources for lesson ${lesson.id}`);
         console.log('Lesson info', {
            lessonId: lesson.id,
            lessonType: lesson.lesson_type,
            processingStatus: lesson.processing_status,
            hlsPlaylistPath: lesson.hls_playlist_path,
            originalVideoPath: lesson.original_video_path,
         });
         console.log('HLS only mode', hlsOnlyMode);
         sources.forEach((source, index) => {
            console.log(`Source #${index + 1}`, source);
         });
         console.groupEnd();
      }

      if (typeof window !== 'undefined' && sources.length === 0) {
         console.warn(`[LessonViewer] No playable sources found for lesson ${lesson.id}`);
      }

      return sources;
   }, [
      isVideoLesson,
      lesson.hls_playlist_path,
      lesson.id,
      lesson.lesson_src,
      lesson.lesson_type,
      lesson.original_video_path,
      lesson.processing_status,
      hlsOnlyMode,
   ]);

   return lesson ? (
      <Card className={cn('group lesson-container relative')}>
         <LessonControl className="opacity-0 transition-all duration-300 group-hover:opacity-100" />

         {isVideoLesson && (
            <VideoPlayer
               source={{
                  type: 'video' as const,
                  sources:
                     videoSources.length > 0
                        ? videoSources
                        : [
                             {
                                src: '',
                                type: 'video/mp4' as const,
                                label: 'Unavailable',
                             },
                          ],
              }}
              debugLabel={`lesson-${lesson.id}`}
              processingStatus={lesson.processing_status ?? 'unknown'}
              forceHlsOnly={hlsOnlyMode}
           />
         )}

         {lesson.lesson_type === 'document' && <DocumentViewer src={lesson.lesson_src || ''} />}

         {lesson.lesson_type === 'embed' && <EmbedViewer src={lesson.lesson_src || ''} />}

         {lesson.lesson_type === 'text' && (
            <div className="h-full w-full overflow-y-auto">
               <TiptapRenderer>{lesson.lesson_src || ''}</TiptapRenderer>
            </div>
         )}

         {lesson.lesson_type === 'image' && (
            <div className="flex h-full w-full items-center justify-center overflow-y-auto">
               <img className="h-full max-h-[calc(100vh-60px)] min-h-[80vh]" src={lesson.lesson_src} />
            </div>
         )}
      </Card>
   ) : (
      <Card className="min-h-[60vh] w-full overflow-hidden rounded-lg">
         <div className="flex h-full items-center justify-center">
            <p>No lesson found</p>
         </div>
      </Card>
   );
};

export default LessonViewer;
