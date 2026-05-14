import DefaultCard from '@/components/cards/course-card-1';
import { Card } from '@/components/ui/card';

const Wishlist = ({ wishlists }: { wishlists: CourseWishlist[] }) => {
   return wishlists.length > 0 ? (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
         {wishlists.map(({ id, course }) => (
            <DefaultCard key={id} course={course} wishlists={wishlists} />
         ))}
      </div>
   ) : (
      <Card className="flex items-center justify-center p-6">
         <p>No wishlist items found</p>
      </Card>
   );
};

export default Wishlist;
