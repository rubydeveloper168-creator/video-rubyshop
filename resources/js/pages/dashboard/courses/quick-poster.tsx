import { Button } from '@/components/ui/button';
import DashboardLayout from '@/layouts/dashboard/layout';
import { useI18n } from '@/lib/i18n';
import { SharedData } from '@/types/global';
import { router } from '@inertiajs/react';
import { CheckCircle, Edit, Upload } from 'lucide-react';
import { ReactNode } from 'react';
import CourseQrPoster from './partials/course-qr-poster';

interface QuickPosterProps extends SharedData {
    course: Course;
    watchHistory: WatchHistory | null;
}

const QuickPoster = ({ course }: QuickPosterProps) => {
    const { text } = useI18n();

    return (
        <div className="container mx-auto max-w-2xl space-y-6">
            <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-4 dark:border-green-900 dark:bg-green-950/30">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                <div>
                    <p className="font-semibold text-green-800 dark:text-green-300">{text('Video uploaded successfully')}</p>
                    <p className="text-sm text-green-700 dark:text-green-400">
                        <span className="font-medium">{course.title}</span> {text('- export the QR poster below to share your course.')}
                    </p>
                </div>
            </div>

            <CourseQrPoster />

            <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                <Button variant="outline" onClick={() => router.visit(route('courses.edit', { course: course.id }))}>
                    <Edit className="mr-2 h-4 w-4" />
                    {text('Edit Course')}
                </Button>
                <Button onClick={() => router.visit(route('courses.quick-upload', { id: course.id }))}>
                    <Upload className="mr-2 h-4 w-4" />
                    {text('Upload First Video')}
                </Button>
            </div>
        </div>
    );
};

QuickPoster.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default QuickPoster;
