import { Button } from '@/components/ui/button';
import { Link, router, usePage } from '@inertiajs/react';
import { CourseDetailsProps } from '../show';

// Separate component for the play button to reduce duplication
const EnabledPlayButton = ({ course, watchHistory }: { course: Course; watchHistory: WatchHistory }) => {
   return (
      <Button size="lg" className="w-full" asChild>
         <Link
            href={route('course.player', {
               type: watchHistory.current_watching_type,
               watch_history: watchHistory.id,
               lesson_id: watchHistory.current_watching_id,
            })}
         >
            Play Course
         </Link>
      </Button>
   );
};

// Disabled play button component
const DisabledPlayButton = ({ course, approvalStatus }: { course: Course; approvalStatus: CourseApprovalValidation }) => {
   const approve_able = approvalStatus.approve_able;

   return approve_able ? (
      <Button size="lg" className="w-full" onClick={() => router.post(route('player.init.watch-history'), { course_id: course.id })}>
         Play Course
      </Button>
   ) : (
      <Button disabled size="lg" className="w-full">
         Course Player
      </Button>
   );
};

// Enrollment/Buy button component
const EnrollmentButton = ({ auth, course }: { auth: Auth; course: Course }) => {
   const enrollmentHandler = (course: Course) => {
      if (course.pricing_type === 'free') {
         router.post(route('enrollments.store'), {
            user_id: auth.user?.id,
            course_id: course.id,
            enrollment_type: 'free',
         });
      } else {
         router.post(route('course-cart.store'), {
            course_id: course.id,
         });
      }
   };

   return (
      <Button size="lg" className="w-full" onClick={() => enrollmentHandler(course)}>
         {course.pricing_type === 'free' ? 'Enroll Now' : 'Buy Now'}
      </Button>
   );
};

const EnrollOrPlayerButton = () => {
   const { auth, course, enrollment, watchHistory, approvalStatus, wishlists } = usePage<CourseDetailsProps>().props;

   // Compute access conditions - improves readability
   const isEnrolled = !!enrollment;
   const hasWatchHistory = !!watchHistory;
   const isAdminOrInstructor = auth.user && ['admin', 'instructor'].includes(auth.user.role);
   const canPlay = hasWatchHistory && (isAdminOrInstructor || isEnrolled);

   const isWishlisted = wishlists.find((wishlist) => wishlist.course_id === course.id);

   const handleWishlist = () => {
      if (isWishlisted) {
         router.delete(route('course-wishlists.destroy', { id: isWishlisted.id }));
      } else {
         router.post(route('course-wishlists.store', { user_id: auth.user?.id, course_id: course.id }));
      }
   };

   // Render the appropriate button based on conditions
   if (canPlay) {
      return <EnabledPlayButton course={course} watchHistory={watchHistory} />;
   } else if (isAdminOrInstructor) {
      return <DisabledPlayButton course={course} approvalStatus={approvalStatus} />;
   } else {
      return (
         <>
            <div className="flex items-center gap-3 sm:gap-4">
               <Button
                  size="lg"
                  variant="outline"
                  className="w-full px-1 sm:px-3"
                  onClick={() => {
                     router.post(route('course-cart.store'), {
                        course_id: course.id,
                     });
                  }}
               >
                  Add to cart
               </Button>

               <Button className="w-full px-1 sm:px-3" variant="outline" size="lg" onClick={handleWishlist}>
                  {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
               </Button>
            </div>
            <EnrollmentButton auth={auth} course={course} />
         </>
      );
   }
};

export default EnrollOrPlayerButton;
