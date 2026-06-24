import Combobox from '@/components/combobox';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/layouts/dashboard/layout';
import { onHandleChange } from '@/lib/inertia';
import { SharedData } from '@/types/global';
import { useForm } from '@inertiajs/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ReactNode, useEffect, useMemo, useState } from 'react';

interface Props extends SharedData {
    categories: CourseCategory[];
    instructors: Instructor[];
}

const QuickCreate = (props: Props) => {
    const user = props.auth.user;
    const { categories, instructors, system } = props;
    const needsInstructorSelection = user?.role === 'admin' && system.sub_type === 'collaborative';
    const defaultInstructor = instructors[0];

    const { data, setData, post, errors, processing } = useForm({
        title: '',
        short_description: '',
        description: '',
        course_category_id: categories.length > 0 ? categories[0].id.toString() : '',
        course_category_child_id: '',
        instructor_id: needsInstructorSelection ? String(defaultInstructor?.id ?? '') : (user?.instructor_id ?? ''),
    });

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            short_description: prev.title,
            description: prev.title,
        }));
    }, [data.title]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const submitUrl = route('courses.quick-store');
        const debugPayload = {
            data,
            user: {
                id: user?.id,
                role: user?.role,
                instructor_id: user?.instructor_id,
            },
            system: {
                sub_type: system.sub_type,
            },
            categories_count: categories.length,
            instructors_count: instructors.length,
            timestamp: new Date().toISOString(),
        };

        console.groupCollapsed('[QuickCreate] Create course clicked');
        console.debug('[QuickCreate] Submit URL:', submitUrl);
        console.debug('[QuickCreate] Payload/state:', debugPayload);
        console.debug('[QuickCreate] Current form errors before submit:', errors);
        console.groupEnd();

        if (needsInstructorSelection && !data.instructor_id) {
            console.error('[QuickCreate] Cannot submit: no valid instructor_id is selected.', {
                instructor_id: data.instructor_id,
                instructors,
                hint: 'Create/approve an instructor first, or select one under Show details.',
            });
            return;
        }

        post(submitUrl, {
            onBefore: () => {
                console.debug('[QuickCreate] Inertia request starting', { submitUrl, data });
            },
            onStart: () => {
                console.debug('[QuickCreate] Inertia request sent');
            },
            onError: (formErrors) => {
                console.error('[QuickCreate] Inertia validation/server errors', formErrors);
            },
            onSuccess: (page) => {
                console.debug('[QuickCreate] Course created successfully', {
                    component: page.component,
                    url: page.url,
                    props: page.props,
                });
            },
            onFinish: () => {
                console.debug('[QuickCreate] Inertia request finished');
            },
        });
    };

    const transformedCategories = useMemo(() => {
        return categories.flatMap((category) => {
            const categoryItem = {
                label: category.title,
                value: category.title,
                id: category.id,
                child_id: '',
            };
            const childItems =
                category.category_children?.map((child) => ({
                    label: `--${child.title}`,
                    value: child.title,
                    id: child.course_category_id,
                    child_id: child.id,
                })) || [];
            return [categoryItem, ...childItems];
        });
    }, [categories]);

    const [showExtra, setShowExtra] = useState(false);

    const transformedInstructors = instructors.map((instructor) => ({
        label: instructor.user.name,
        value: String(instructor.id),
    }));

    return (
        <Card className="container mx-auto max-w-2xl p-6">
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Quick Create Course</h2>
                <p className="text-muted-foreground mt-1 text-sm">Fill in the title and category — the rest is set automatically.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <Label>Title *</Label>
                    <Input
                        autoFocus
                        name="title"
                        value={data.title}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder="Enter course title"
                    />
                    <InputError message={errors.title} />
                </div>

                <button
                    type="button"
                    onClick={() => setShowExtra((v) => !v)}
                    className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-sm transition-colors"
                >
                    {showExtra ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    {showExtra ? 'Hide details' : 'Show details'}
                </button>

                {showExtra && (
                    <div className="space-y-5">
                        <div>
                            <Label>
                                Short Description{' '}
                                <span className="text-muted-foreground text-xs">(auto-filled from title)</span>
                            </Label>
                            <Textarea
                                rows={2}
                                name="short_description"
                                value={data.short_description}
                                onChange={(e) => onHandleChange(e, setData)}
                                placeholder="Short description"
                            />
                            <InputError message={errors.short_description} />
                        </div>

                        <div>
                            <Label>
                                Description{' '}
                                <span className="text-muted-foreground text-xs">(auto-filled from title)</span>
                            </Label>
                            <Textarea
                                rows={3}
                                name="description"
                                value={data.description}
                                onChange={(e) => onHandleChange(e, setData)}
                                placeholder="Course description"
                            />
                            <InputError message={errors.description} />
                        </div>

                        <div>
                            <Label>Category *</Label>
                            <Combobox
                                data={transformedCategories}
                                placeholder="Select a category"
                                defaultValue={transformedCategories.length > 0 ? transformedCategories[0].value : undefined}
                                onSelect={(selected) => {
                                    setData('course_category_id', selected.id as string);
                                    setData('course_category_child_id', selected.child_id as string);
                                }}
                            />
                            <InputError message={errors.course_category_id} />
                        </div>

                        {needsInstructorSelection && (
                            <div>
                                <Label>Course Instructor *</Label>
                                <Combobox
                                    data={transformedInstructors}
                                    placeholder="Select the course instructor"
                                    defaultValue={defaultInstructor ? String(defaultInstructor.id) : undefined}
                                    onSelect={(selected) => setData('instructor_id', selected.value)}
                                />
                                <InputError message={errors.instructor_id} />
                            </div>
                        )}
                    </div>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-1">
                    <span className="text-muted-foreground text-sm">Defaults:</span>
                    <Badge variant="secondary">Free</Badge>
                    <Badge variant="secondary">Beginner</Badge>
                    <Badge variant="secondary">Approved</Badge>
                    <Badge variant="secondary">Lifetime</Badge>
                </div>

                <div className="pt-2 text-right">
                    <LoadingButton loading={processing}>Create & Upload Video</LoadingButton>
                </div>
            </form>
        </Card>
    );
};

QuickCreate.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default QuickCreate;
