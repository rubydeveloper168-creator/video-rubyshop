import { jsx } from "react/jsx-runtime";
import Categories from "./categories-DDsBVKh9.js";
import Courses from "./courses-DHkdS4VK.js";
import Instructors from "./instructors-CnrFCWqK.js";
import "./table-header-DWitEfum.js";
import "react";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "@tanstack/react-table";
import "@inertiajs/react";
import "./categories-table-columns-B8mcts5v.js";
import "./button-jZyzwgdo.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "lucide-react";
import "./table-filter-BfBC8k9t.js";
import "./table-page-size-Cwe1Bz4B.js";
import "./dropdown-menu-CECYoeyz.js";
import "@radix-ui/react-dropdown-menu";
import "./route-DlE7FdTW.js";
import "./debounce-ZFxqVthq.js";
import "./table-footer-CbqUzH_n.js";
import "./scroll-area-DPHRDnwL.js";
import "@radix-ui/react-scroll-area";
import "./courses-table-columns-Ddn0Q5n-.js";
import "./instructors-table-columns-fMFyOuiv.js";
import "./avatar-Cr_jqfHL.js";
import "@radix-ui/react-avatar";
const Contents = ({ contents, section_slug, selectedIds = [], onSelectChange }) => {
  const renderField = () => {
    switch (section_slug) {
      case "hero":
      case "top_course":
      case "top_courses":
      case "new_courses":
        return /* @__PURE__ */ jsx(Courses, { courses: contents, selectedIds, onCourseSelect: onSelectChange });
      case "top_categories":
      case "category_courses":
        return /* @__PURE__ */ jsx(Categories, { categories: contents, selectedIds, onCourseSelect: onSelectChange });
      case "top_instructors":
        return /* @__PURE__ */ jsx(Instructors, { instructors: contents, selectedIds, onCourseSelect: onSelectChange });
      case "blogs":
        return /* @__PURE__ */ jsx("h1", { children: "Blogs" });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: renderField() });
};
export {
  Contents as default
};
