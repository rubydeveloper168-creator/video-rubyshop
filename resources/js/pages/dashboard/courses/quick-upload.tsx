import ChunkedUploaderInput from '@/components/chunked-uploader-input';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getFileMetadata } from '@/lib/file-metadata';
import DashboardLayout from '@/layouts/dashboard/layout';
import { SharedData } from '@/types/global';
import { router, useForm } from '@inertiajs/react';
import { ReactNode, useEffect, useState } from 'react';

interface QuickUploadProps extends SharedData {
    course: Course;
    prices: string[];
    lastLessonSort: number;
    lastSectionSort: number;
}

const QuickUpload = ({ course, lastLessonSort }: QuickUploadProps) => {
    const section = course.sections?.[0];

    const [isSubmit, setIsSubmit] = useState(false);
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [isFileUploaded, setIsFileUploaded] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        lesson_type: 'video',
        lesson_src: '',
        lesson_src_new: null as string | null,
        duration: '00:00:00',
        is_free: 0,
        sort: lastLessonSort + 1,
        course_id: course.id,
        course_section_id: section?.id ?? '',
        summary: '',
        embed_source: '',
        lesson_provider: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFileSelected && !isFileUploaded) {
            setIsSubmit(true);
            return;
        }
        submitLesson();
    };

    const submitLesson = () => {
        post(route('lesson.store'), {
            preserveScroll: true,
            onSuccess: () => router.visit(route('courses.quick-poster', { id: course.id })),
            onError: () => setIsSubmit(false),
        });
    };

    useEffect(() => {
        if (data.lesson_src_new && isFileUploaded) {
            submitLesson();
        }
    }, [data.lesson_src_new]);

    return (
        <Card className="container mx-auto max-w-2xl p-6">
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Upload First Video</h2>
                <div className="text-muted-foreground mt-2 space-y-0.5 text-sm">
                    <p>
                        Course: <span className="text-foreground font-medium">{course.title}</span>
                    </p>
                    {section && (
                        <p>
                            Section: <span className="text-foreground font-medium">{section.title}</span>
                        </p>
                    )}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <Label>Video File *</Label>
                    <ChunkedUploaderInput
                        isSubmit={isSubmit}
                        courseId={String(data.course_id ?? '')}
                        sectionId={String(data.course_section_id ?? '')}
                        filetype="video"
                        dropzone={true}
                        dropzoneHint="MP4, MOV, AVI · Max 2 GB"
                        delayUpload={true}
                        onFileSelected={(file) => {
                            setIsFileSelected(true);
                            getFileMetadata(file).then((metadata) => {
                                setData('title', metadata.name);
                                setData('duration', metadata.duration || '00:00:00');
                            });
                        }}
                        onFileUploaded={(fileData) => {
                            setIsFileUploaded(true);
                            setData('lesson_src_new', fileData.file_url);
                        }}
                        onError={() => setIsSubmit(false)}
                        onCancelUpload={() => setIsSubmit(false)}
                    />
                </div>

                <div>
                    <Label>Lesson Title *</Label>
                    <Input
                        name="title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        placeholder="Auto-filled from filename"
                    />
                    <InputError message={errors.title} />
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => router.visit(route('courses.quick-poster', { id: course.id }))}
                        >
                            Back to Poster
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => router.visit(route('courses.edit', { course: course.id }))}
                        >
                            Skip
                        </Button>
                    </div>

                    <LoadingButton loading={processing || isSubmit} disabled={!isFileSelected || processing || isSubmit}>
                        {isSubmit ? 'Uploading...' : 'Save & Finish'}
                    </LoadingButton>
                </div>
            </form>
        </Card>
    );
};

QuickUpload.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default QuickUpload;
