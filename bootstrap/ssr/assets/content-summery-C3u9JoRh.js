import { jsxs, jsx } from "react/jsx-runtime";
import { S as StudentFeedback } from "./student-feedback-QK-Mknna.js";
import { T as TiptapRenderer } from "./client-renderer-CUBmzaOS.js";
import { S as Separator } from "./separator-R7EO2G8T.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-Bhd5qJJs.js";
import { usePage } from "@inertiajs/react";
import ReviewForm from "./review-DuVOKZyF.js";
import Forum from "./forum-DXPdP6lk.js";
import "./progress-BuQTjce4.js";
import "@radix-ui/react-progress";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "lucide-react";
/* empty css               */
import "react";
import "react-icons/lu";
import "hast-util-to-jsx-runtime";
import "shiki/bundle/full";
import "rehype-parse";
import "rehype-react";
import "unified";
import "unist-util-visit";
import "@radix-ui/react-separator";
import "@radix-ui/react-tabs";
import "./delete-modal-CvTLW8xe.js";
import "./button-jZyzwgdo.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./dialog-DD5SXV81.js";
import "@radix-ui/react-dialog";
import "./input-error-CEW4jhey.js";
import "./loading-button-C4Hk_jCd.js";
import "./table-footer-DKVIQyQk.js";
import "./dropdown-menu-CECYoeyz.js";
import "@radix-ui/react-dropdown-menu";
import "./route-DlE7FdTW.js";
import "./scroll-area-DPHRDnwL.js";
import "@radix-ui/react-scroll-area";
import "./avatar-Cr_jqfHL.js";
import "@radix-ui/react-avatar";
import "./label-Dd_w2I6M.js";
import "@radix-ui/react-label";
import "./textarea-DctRxpgE.js";
import "date-fns";
import "sonner";
import "./review-edit-DA4Afna8.js";
import "./Editor-iiR11EW9.js";
import "@radix-ui/react-tooltip";
import "react-icons/tb";
import "react-icons/ai";
import "@radix-ui/react-popover";
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
import "./input-C6-Ta46A.js";
import "./inertia-BtwbgBI3.js";
import "./forum-edit-DQ2RVNRG.js";
import "./forum-reply-BjjYooAP.js";
const ContentSummery = () => {
  const { props } = usePage();
  return /* @__PURE__ */ jsxs(Tabs, { defaultValue: "summery", className: "mx-auto w-full max-w-5xl rounded-md pt-1 pb-10", children: [
    /* @__PURE__ */ jsx(TabsList, { className: "bg-transparent px-0 py-6", children: tabs.map(({ label, value }) => /* @__PURE__ */ jsx(
      TabsTrigger,
      {
        value,
        className: "border-primary data-[state=active]:!bg-muted data-[state=active]:before:bg-primary relative flex items-center justify-start gap-3 rounded-none bg-transparent px-8 py-4 text-start !shadow-none before:absolute before:right-0 before:bottom-0 before:left-0 before:h-1 before:rounded-t-xl data-[state=active]:before:content-['.']",
        children: /* @__PURE__ */ jsx("span", { children: label })
      },
      value
    )) }),
    /* @__PURE__ */ jsx(Separator, { className: "mt-[1px]" }),
    /* @__PURE__ */ jsx(TabsContent, { value: "summery", className: "m-0 p-5", children: /* @__PURE__ */ jsx(TiptapRenderer, { children: props.watching.summary }) }),
    /* @__PURE__ */ jsx(TabsContent, { value: "forum", className: "m-0 p-5", children: /* @__PURE__ */ jsx(Forum, {}) }),
    /* @__PURE__ */ jsxs(TabsContent, { value: "review", className: "m-0 space-y-6 p-5", children: [
      /* @__PURE__ */ jsx(StudentFeedback, { totalReviews: props.totalReviews }),
      /* @__PURE__ */ jsx(ReviewForm, {})
    ] })
  ] });
};
const tabs = [
  {
    value: "summery",
    label: "Summery"
  },
  {
    value: "forum",
    label: "Forum"
  },
  {
    value: "review",
    label: "Review"
  }
];
export {
  ContentSummery as default
};
