import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { CircleCheck, Circle, Lock, Video, File, FileText, Image } from "lucide-react";
import { c as cn } from "./utils-BmtPBcb0.js";
import { usePage, Link } from "@inertiajs/react";
import "clsx";
import "tailwind-merge";
const LessonIcons = (props) => {
  const { type, lesson, dripContent, isCompleted, isCurrentLesson, isNext } = props;
  console.log(lesson.lesson_type);
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
    type === "active" ? /* @__PURE__ */ jsx(Fragment, { children: isCompleted ? /* @__PURE__ */ jsx(CircleCheck, { className: "h-4 w-4" }) : dripContent ? /* @__PURE__ */ jsx(Fragment, { children: !isCurrentLesson ? /* @__PURE__ */ jsx(Circle, { className: "h-4 w-4" }) : isNext ? /* @__PURE__ */ jsx(Circle, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Lock, { className: "h-4 w-4" }) }) : /* @__PURE__ */ jsx(Lock, { className: "h-4 w-4" }) }) : /* @__PURE__ */ jsx(Lock, { className: "h-4 w-4" }),
    /* @__PURE__ */ jsxs("div", { className: "bg-secondary flex h-6 w-6 items-center justify-center rounded-full", children: [
      ["video", "video_url", "embed"].includes(lesson.lesson_type) && /* @__PURE__ */ jsx(Video, { className: "h-4 w-4" }),
      ["document", "iframe"].includes(lesson.lesson_type) && /* @__PURE__ */ jsx(File, { className: "h-4 w-4" }),
      lesson.lesson_type === "text" && /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" }),
      lesson.lesson_type === "image" && /* @__PURE__ */ jsx(Image, { className: "h-4 w-4" })
    ] })
  ] });
};
const LessonWrapper = ({ lesson, children }) => /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-between rounded-sm border p-2 md:gap-3", children: [
  children,
  ["video", "video_url"].includes(lesson.lesson_type) && /* @__PURE__ */ jsx("span", { className: "absolute top-0.5 right-1 text-xs md:relative md:text-sm", children: lesson.duration })
] });
const Lesson = ({ lesson, completed }) => {
  const { props } = usePage();
  const { course, watching, watchHistory } = props;
  const dripContent = Boolean(course.drip_content);
  const isCurrentLesson = watching.id === lesson.id;
  const isNext = lesson.id === watchHistory.next_watching_id;
  const isCompleted = completed.some((item) => item.type === "lesson" && item.id == lesson.id);
  return !dripContent ? /* @__PURE__ */ jsx(LessonWrapper, { lesson, children: /* @__PURE__ */ jsxs(
    Link,
    {
      className: cn(
        "flex cursor-pointer items-center gap-3 py-1",
        isCompleted ? "text-blue-500" : isCurrentLesson ? "text-green-500" : "text-primary"
      ),
      href: route("course.player", {
        type: "lesson",
        watch_history: watchHistory.id,
        lesson_id: lesson.id
      }),
      children: [
        /* @__PURE__ */ jsx(LessonIcons, { type: "active", lesson, dripContent: true, isCompleted }),
        /* @__PURE__ */ jsx("p", { children: lesson.title })
      ]
    }
  ) }) : /* @__PURE__ */ jsx(Fragment, { children: isCompleted || isCurrentLesson || isNext ? /* @__PURE__ */ jsx(LessonWrapper, { lesson, children: /* @__PURE__ */ jsxs(
    Link,
    {
      className: cn(
        "flex cursor-pointer items-center gap-3 py-1",
        isCompleted ? "text-blue-500" : isCurrentLesson ? "text-green-500" : isNext ? "text-primary" : "text-gray-500"
      ),
      href: route("course.player", {
        type: "lesson",
        watch_history: watchHistory.id,
        lesson_id: lesson.id
      }),
      children: [
        /* @__PURE__ */ jsx(
          LessonIcons,
          {
            type: "active",
            lesson,
            dripContent: false,
            isCompleted,
            isCurrentLesson,
            isNext
          }
        ),
        /* @__PURE__ */ jsx("p", { children: lesson.title })
      ]
    }
  ) }) : /* @__PURE__ */ jsx(LessonWrapper, { lesson, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 py-1 text-gray-500", children: [
    /* @__PURE__ */ jsx(LessonIcons, { type: "inactive", lesson, dripContent: true, isCompleted }),
    /* @__PURE__ */ jsx("p", { children: lesson.title })
  ] }) }) });
};
export {
  Lesson as default
};
