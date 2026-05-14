import { jsxs, jsx } from "react/jsx-runtime";
import { C as CourseCard5 } from "./course-card-5-DoRN8eum.js";
import { g as getPageSection } from "./page-D-1sFXYI.js";
import { usePage } from "@inertiajs/react";
import Section from "./section-DM2a0QGA.js";
import "./card-CXRouz5c.js";
import "react";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "lucide-react";
import "./separator-R7EO2G8T.js";
import "@radix-ui/react-separator";
import "./dialog-DD5SXV81.js";
import "@radix-ui/react-dialog";
import "./chunked-uploader-input-MwXGR7K4.js";
import "./button-jZyzwgdo.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./input-C6-Ta46A.js";
import "axios";
import "sonner";
import "./input-error-CEW4jhey.js";
import "./loading-button-C4Hk_jCd.js";
import "./label-Dd_w2I6M.js";
import "@radix-ui/react-label";
import "./textarea-DctRxpgE.js";
import "./inertia-BtwbgBI3.js";
import "./icon-picker-DQbRGSHn.js";
import "./debounce-ZFxqVthq.js";
import "./tooltip-DswKljFZ.js";
import "@radix-ui/react-tooltip";
import "lucide-react/dynamic";
import "./scroll-area-DPHRDnwL.js";
import "@radix-ui/react-scroll-area";
import "./table-header-DWitEfum.js";
import "@tanstack/react-table";
import "./table-page-size-Cwe1Bz4B.js";
import "./dropdown-menu-CECYoeyz.js";
import "@radix-ui/react-dropdown-menu";
import "./route-DlE7FdTW.js";
import "./avatar-Cr_jqfHL.js";
import "@radix-ui/react-avatar";
const TopCourses = () => {
  const { props } = usePage();
  const { page, topCourses, customize } = props;
  const topCoursesSection = getPageSection(page, "top_courses");
  return /* @__PURE__ */ jsxs(Section, { customize, pageSection: topCoursesSection, containerClass: "py-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto mb-10 max-w-lg text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-secondary-foreground mb-1 font-medium", children: topCoursesSection == null ? void 0 : topCoursesSection.title }),
      /* @__PURE__ */ jsx("h2", { className: "mb-2 text-3xl font-bold sm:text-4xl", children: topCoursesSection == null ? void 0 : topCoursesSection.sub_title }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: topCoursesSection == null ? void 0 : topCoursesSection.description })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "relative z-10 grid grid-cols-1 gap-7 md:grid-cols-2", children: topCourses.map((course) => /* @__PURE__ */ jsx(CourseCard5, { course, className: "py-0" }, course.id)) }),
      /* @__PURE__ */ jsx("div", { className: "after:pointer-events-none after:absolute after:bottom-1 after:left-0 after:h-[260px] after:w-[260px] after:rounded-full after:bg-[rgba(0,167,111,1)] after:blur-[290px] after:content-['']" }),
      /* @__PURE__ */ jsx("div", { className: "after:pointer-events-none after:absolute after:top-0 after:right-0 after:h-[200px] after:w-[200px] after:rounded-full after:bg-[rgba(97,95,255,1))] after:blur-[290px] after:content-['']" })
    ] })
  ] });
};
export {
  TopCourses as default
};
