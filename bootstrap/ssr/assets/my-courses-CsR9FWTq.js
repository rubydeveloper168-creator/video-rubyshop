import { jsxs, jsx } from "react/jsx-runtime";
import { A as Avatar, a as AvatarImage, b as AvatarFallback } from "./avatar-Cr_jqfHL.js";
import { C as Card, a as CardHeader, b as CardContent, c as CardFooter } from "./card-CXRouz5c.js";
import { P as Progress } from "./progress-BuQTjce4.js";
import { c as cn } from "./utils-BmtPBcb0.js";
import { Link } from "@inertiajs/react";
import { B as ButtonGradientPrimary } from "./button-gradient-primary-Dgn8gIzu.js";
import "react";
import "@radix-ui/react-avatar";
import "@radix-ui/react-progress";
import "clsx";
import "tailwind-merge";
import "./button-jZyzwgdo.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
const CourseCard4 = ({ enrollment, className }) => {
  const { course, completion, watch_history } = enrollment;
  return /* @__PURE__ */ jsxs(Card, { className: cn("overflow-hidden", className), children: [
    /* @__PURE__ */ jsx(CardHeader, { className: "p-0", children: /* @__PURE__ */ jsx("div", { className: "p-2 pb-0", children: /* @__PURE__ */ jsx("div", { className: "relative h-[220px] w-full overflow-hidden rounded-lg", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: course.thumbnail || "/assets/images/blank-image.jpg",
        alt: course.title,
        className: "h-full w-full object-cover transition-transform duration-300 hover:scale-105",
        onError: (e) => {
          const target = e.target;
          target.src = "/assets/images/blank-image.jpg";
        }
      }
    ) }) }) }),
    /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-3 flex items-center gap-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs(Avatar, { className: "h-5 w-5", children: [
          /* @__PURE__ */ jsx(AvatarImage, { src: course.instructor.user.photo || "", alt: course.instructor.user.name, className: "object-cover" }),
          /* @__PURE__ */ jsx(AvatarFallback, { children: "IM" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs font-medium", children: course.instructor.user.name })
      ] }) }),
      /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold", children: course.title }),
      /* @__PURE__ */ jsxs("div", { className: "w-full space-y-1 pt-4 pb-2", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground flex items-center justify-between text-xs font-medium", children: [
          /* @__PURE__ */ jsx("span", { children: "Progress" }),
          /* @__PURE__ */ jsxs("span", { children: [
            (completion == null ? void 0 : completion.completion) ?? 0,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsx(Progress, { value: (completion == null ? void 0 : completion.completion) ?? 0, className: "h-1" })
      ] })
    ] }),
    watch_history && /* @__PURE__ */ jsx(CardFooter, { className: "p-4 pt-0", children: /* @__PURE__ */ jsx(ButtonGradientPrimary, { asChild: true, shadow: false, containerClass: "w-full", className: "to-primary-light hover:to-primary-light w-full", children: /* @__PURE__ */ jsx(
      Link,
      {
        href: route("course.player", {
          type: watch_history.current_watching_type,
          watch_history: watch_history.id,
          lesson_id: watch_history.current_watching_id
        }),
        children: "Continue"
      }
    ) }) })
  ] });
};
const MyCourses = ({ enrollments }) => {
  return enrollments.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3", children: enrollments.map((enrollment) => /* @__PURE__ */ jsx(CourseCard4, { enrollment, className: "border-none" }, enrollment.id)) }) : /* @__PURE__ */ jsx(Card, { className: "flex items-center justify-center p-6", children: /* @__PURE__ */ jsx("p", { children: "No courses found" }) });
};
export {
  MyCourses as default
};
