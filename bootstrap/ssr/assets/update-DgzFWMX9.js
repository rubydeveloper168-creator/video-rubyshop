import { jsxs, jsx } from "react/jsx-runtime";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-Bhd5qJJs.js";
import { D as DashboardLayout } from "./layout-DNClQoa9.js";
import { router } from "@inertiajs/react";
import { FilePenLine, TvMinimalPlay, Settings, CircleDollarSign, BookText, FolderInput, FlaskConical } from "lucide-react";
import { nanoid } from "nanoid";
import Basic from "./basic-DP1dahtb.js";
import CourseUpdateHeader from "./course-update-header-D7qgg-if.js";
import Curriculum from "./curriculum-Db399_6M.js";
import Info from "./info-D6gSQeNw.js";
import LiveClass from "./live-class-CNOws6Rw.js";
import Media from "./media-Mdb2uPqg.js";
import Pricing from "./pricing-Baa0OIWJ.js";
import SEO from "./seo-CY3FzLEi.js";
import "react";
import "@radix-ui/react-tabs";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "./sidebar-6wqj6oXO.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./button-jZyzwgdo.js";
import "./separator-R7EO2G8T.js";
import "@radix-ui/react-separator";
import "./sheet-CuVwNO0O.js";
import "@radix-ui/react-dialog";
import "./tooltip-DswKljFZ.js";
import "@radix-ui/react-tooltip";
import "./main-BqrosZ6t.js";
import "next-themes";
import "sonner";
import "./appearance-DLkkIZHp.js";
import "./dropdown-menu-CECYoeyz.js";
import "@radix-ui/react-dropdown-menu";
import "./notification-Dc7j1bw9.js";
import "./popover-BV7JTqNd.js";
import "@radix-ui/react-popover";
import "date-fns";
import "./scroll-area-DPHRDnwL.js";
import "@radix-ui/react-scroll-area";
import "./app-logo-GKkeg_7r.js";
import "./accordion-DVAMjldm.js";
import "@radix-ui/react-accordion";
import "./route-DlE7FdTW.js";
import "./avatar-Cr_jqfHL.js";
import "@radix-ui/react-avatar";
import "./combobox-VTqRvK5M.js";
import "cmdk";
import "./input-error-CEW4jhey.js";
import "./loading-button-C4Hk_jCd.js";
import "./Editor-iiR11EW9.js";
/* empty css               */
import "react-icons/tb";
import "react-icons/ai";
import "@tiptap/react";
import "prettier/plugins/html";
import "prettier/standalone";
import "@codemirror/lang-html";
import "@codemirror/state";
import "@codemirror/view";
import "codemirror";
import "./theme-BnORSbS2.js";
import "@codemirror/language";
import "@lezer/highlight";
import "react-dom";
import "react-colorful";
import "@tiptap/extension-bubble-menu";
import "@tiptap/pm/state";
import "@tiptap/starter-kit";
import "@tiptap/extension-character-count";
import "@tiptap/extension-underline";
import "@tiptap/extension-placeholder";
import "@tiptap/extension-text-align";
import "@tiptap/extension-text-style";
import "@tiptap/extension-subscript";
import "@tiptap/extension-superscript";
import "@tiptap/extension-bullet-list";
import "@tiptap/extension-ordered-list";
import "@tiptap/extension-list-keymap";
import "@tiptap/extension-color";
import "@tiptap/extension-highlight";
import "@tiptap/extension-code-block-lowlight";
import "@tiptap/core";
import "@tiptap/pm/view";
import "highlight.js/lib/core";
import "lowlight";
import "highlight.js/lib/languages/plaintext";
import "@tiptap/pm/model";
import "@tiptap/extension-image";
import "@tiptap/extension-link";
import "@tiptap/extension-table";
import "@tiptap/extension-table-cell";
import "@tiptap/extension-table-header";
import "@tiptap/extension-table-row";
import "./card-CXRouz5c.js";
import "./input-C6-Ta46A.js";
import "./label-Dd_w2I6M.js";
import "@radix-ui/react-label";
import "./radio-group-sSS5HHUP.js";
import "@radix-ui/react-radio-group";
import "./select-BxPdBi6V.js";
import "@radix-ui/react-select";
import "./textarea-DctRxpgE.js";
import "./course-languages-oEC7DuVF.js";
import "./inertia-BtwbgBI3.js";
import "./dialog-DD5SXV81.js";
import "./data-sort-modal-Cg4d_jDY.js";
import "nprogress";
import "./delete-modal-CvTLW8xe.js";
import "./use-screen-B7SDA5zE.js";
import "./lesson-form-Dd8mUjm0.js";
import "./chunked-uploader-input-MwXGR7K4.js";
import "axios";
import "./question-questions-Oyj4_ecF.js";
import "./client-renderer-CUBmzaOS.js";
import "react-icons/lu";
import "hast-util-to-jsx-runtime";
import "shiki/bundle/full";
import "rehype-parse";
import "rehype-react";
import "unified";
import "unist-util-visit";
import "./question-form-ClHezF_6.js";
import "./tag-input-BplrELmW.js";
import "@yaireo/tagify";
import "./quiz-form-DQLpdqb8.js";
import "./section-form-FeCsHLYS.js";
import "./faq-form-CT8jLy5J.js";
import "./outcome-form-CH10_hKT.js";
import "./requirement-form-DBTOPI_1.js";
import "./live-class-form-CNPGVnFR.js";
import "./datetime-picker-BBkkBJXZ.js";
import "react-day-picker";
import "./live-class-status-BIKu7H7z.js";
import "./video-player-BtrF0lff.js";
import "plyr-react";
/* empty css                */
import "./checkbox-CO4DegBm.js";
import "@radix-ui/react-checkbox";
const Update = (props) => {
  const { tab, course } = props;
  return /* @__PURE__ */ jsxs("section", { className: "space-y-8", children: [
    /* @__PURE__ */ jsx(CourseUpdateHeader, {}),
    /* @__PURE__ */ jsxs(Tabs, { value: tab ?? tabs[0].slug, className: "grid grid-rows-1 gap-5 md:grid-cols-4", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(TabsList, { className: "horizontal-tabs-list space-y-1", children: tabs.map(({ id, name, slug, Icon }) => /* @__PURE__ */ jsxs(
        TabsTrigger,
        {
          value: slug,
          className: "horizontal-tabs-trigger",
          onClick: () => router.get(
            route("courses.edit", {
              course: course.id,
              tab: slug
            })
          ),
          children: [
            /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { children: name })
          ]
        },
        id
      )) }) }),
      /* @__PURE__ */ jsx("div", { className: "md:col-span-3", children: tabs.map(({ id, slug, Component }) => /* @__PURE__ */ jsx(TabsContent, { value: slug, className: "m-0", children: /* @__PURE__ */ jsx(Component, {}) }, id)) })
    ] })
  ] });
};
const tabs = [
  {
    id: nanoid(),
    name: "Curriculum",
    slug: "curriculum",
    Icon: FilePenLine,
    Component: Curriculum
  },
  {
    id: nanoid(),
    name: "Live Class",
    slug: "live-class",
    Icon: TvMinimalPlay,
    Component: LiveClass
  },
  {
    id: nanoid(),
    name: "Basic",
    slug: "basic",
    Icon: Settings,
    Component: Basic
  },
  {
    id: nanoid(),
    name: "Pricing",
    slug: "pricing",
    Icon: CircleDollarSign,
    Component: Pricing
  },
  {
    id: nanoid(),
    name: "Info",
    slug: "info",
    Icon: BookText,
    Component: Info
  },
  {
    id: nanoid(),
    name: "Media",
    slug: "media",
    Icon: FolderInput,
    Component: Media
  },
  {
    id: nanoid(),
    name: "SEO",
    slug: "seo",
    Icon: FlaskConical,
    Component: SEO
  }
];
Update.layout = (page) => /* @__PURE__ */ jsx(DashboardLayout, { children: page });
export {
  Update as default
};
