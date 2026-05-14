import { jsxs, jsx } from "react/jsx-runtime";
import { D as DataSortModal } from "./data-sort-modal-Cg4d_jDY.js";
import { D as DeleteModal } from "./delete-modal-CvTLW8xe.js";
import { A as Accordion, a as AccordionItem, b as AccordionTrigger, c as AccordionContent } from "./accordion-DVAMjldm.js";
import { B as Button } from "./button-jZyzwgdo.js";
import { C as Card } from "./card-CXRouz5c.js";
import { P as Popover, a as PopoverTrigger, b as PopoverContent } from "./popover-BV7JTqNd.js";
import { S as Separator } from "./separator-R7EO2G8T.js";
import { u as useScreen } from "./use-screen-B7SDA5zE.js";
import { usePage, router } from "@inertiajs/react";
import { Plus, ArrowDownUp, Pencil, Trash2, MoreVertical, ListOrdered } from "lucide-react";
import LessonForm from "./lesson-form-Dd8mUjm0.js";
import QuestionQuestions from "./question-questions-Oyj4_ecF.js";
import QuizForm from "./quiz-form-DQLpdqb8.js";
import SectionForm from "./section-form-FeCsHLYS.js";
import "nprogress";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "react";
import "./dialog-DD5SXV81.js";
import "@radix-ui/react-dialog";
import "./scroll-area-DPHRDnwL.js";
import "@radix-ui/react-scroll-area";
import "@radix-ui/react-accordion";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-popover";
import "@radix-ui/react-separator";
import "./chunked-uploader-input-MwXGR7K4.js";
import "./input-C6-Ta46A.js";
import "axios";
import "sonner";
import "./input-error-CEW4jhey.js";
import "./loading-button-C4Hk_jCd.js";
import "./Editor-iiR11EW9.js";
/* empty css               */
import "@radix-ui/react-tooltip";
import "react-icons/tb";
import "react-icons/ai";
import "@radix-ui/react-dropdown-menu";
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
import "./label-Dd_w2I6M.js";
import "@radix-ui/react-label";
import "./radio-group-sSS5HHUP.js";
import "@radix-ui/react-radio-group";
import "./select-BxPdBi6V.js";
import "@radix-ui/react-select";
import "./tabs-Bhd5qJJs.js";
import "@radix-ui/react-tabs";
import "./textarea-DctRxpgE.js";
import "./inertia-BtwbgBI3.js";
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
const Curriculum = () => {
  const { props } = usePage();
  const { screen } = useScreen();
  return /* @__PURE__ */ jsxs(Card, { className: "p-4 sm:p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
      /* @__PURE__ */ jsx(
        SectionForm,
        {
          title: "Add Section",
          handler: /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "bg-muted hover:!bg-muted-foreground/10", children: "Add Section" })
        }
      ),
      /* @__PURE__ */ jsx(
        DataSortModal,
        {
          title: "Sort Items",
          data: props.course.sections,
          handler: /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "bg-muted hover:!bg-muted-foreground/10", children: "Sort Section" }),
          onOrderChange: (newOrder) => {
            router.post(
              route("section.sort"),
              {
                sortedData: newOrder
              },
              { preserveScroll: true }
            );
          },
          renderContent: (item) => /* @__PURE__ */ jsx(Card, { className: "w-full px-4 py-3", children: /* @__PURE__ */ jsx("p", { children: item.title }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Separator, { className: "my-6" }),
    /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "space-y-4", children: props.course.sections.map((section, index) => /* @__PURE__ */ jsxs(AccordionItem, { value: section.id, className: "w-full overflow-hidden rounded-lg border", children: [
      /* @__PURE__ */ jsx(AccordionTrigger, { className: "[&[data-state=open]]:!bg-muted px-4 py-3 text-base hover:no-underline", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full items-center justify-between pr-4", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          index + 1,
          ". ",
          section.title
        ] }),
        screen > 1024 ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", onClick: (e) => e.stopPropagation(), children: [
          /* @__PURE__ */ jsx(
            QuizForm,
            {
              title: "Add Quiz",
              sectionId: section.id,
              handler: /* @__PURE__ */ jsxs(Button, { variant: "ghost", className: "bg-muted hover:!bg-muted-foreground/10 h-8", children: [
                /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { children: "Quiz" })
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            LessonForm,
            {
              title: "Add Lesson",
              sectionId: section.id,
              handler: /* @__PURE__ */ jsxs(Button, { variant: "ghost", className: "bg-muted hover:!bg-muted-foreground/10 h-8", children: [
                /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { children: "Lesson" })
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            DataSortModal,
            {
              title: "Sort Items",
              data: section.section_lessons,
              handler: /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "bg-muted hover:!bg-muted-foreground/10 h-8 w-8", children: /* @__PURE__ */ jsx(ArrowDownUp, { className: "h-4 w-4" }) }),
              onOrderChange: (newOrder) => {
                router.post(
                  route("lesson.sort"),
                  {
                    sortedData: newOrder
                  },
                  { preserveScroll: true }
                );
              },
              renderContent: (lesson) => /* @__PURE__ */ jsx(Card, { className: "w-full px-4 py-3", children: /* @__PURE__ */ jsx("p", { children: lesson.title }) })
            }
          ),
          /* @__PURE__ */ jsx(
            SectionForm,
            {
              title: "Update Section",
              section,
              handler: /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "bg-muted hover:!bg-muted-foreground/10 h-8 w-8", children: /* @__PURE__ */ jsx(Pencil, { className: "text-secondary-foreground h-3 w-3" }) })
            }
          ),
          /* @__PURE__ */ jsx(
            DeleteModal,
            {
              routePath: route("section.delete", {
                id: section.id
              }),
              actionComponent: /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "bg-muted hover:!bg-muted-foreground/10 h-8 w-8", children: /* @__PURE__ */ jsx(Trash2, { className: "text-destructive h-3 w-3" }) })
            }
          )
        ] }) : /* @__PURE__ */ jsxs(Popover, { children: [
          /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
            Button,
            {
              size: "icon",
              variant: "ghost",
              onClick: (e) => e.stopPropagation(),
              className: "bg-muted hover:!bg-muted-foreground/10 h-8 w-8",
              children: /* @__PURE__ */ jsx(MoreVertical, { className: "h-4 w-4" })
            }
          ) }),
          /* @__PURE__ */ jsxs(PopoverContent, { align: "end", className: "flex w-[140px] flex-col space-y-1 p-2", children: [
            /* @__PURE__ */ jsx(
              QuizForm,
              {
                title: "Add Quiz",
                sectionId: section.id,
                handler: /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "bg-muted hover:!bg-muted-foreground/10 h-8 w-full", children: "Add Quiz" })
              }
            ),
            /* @__PURE__ */ jsx(
              LessonForm,
              {
                title: "Add Lesson",
                sectionId: section.id,
                handler: /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "bg-muted hover:!bg-muted-foreground/10 h-8 w-full", children: "Add Lesson" })
              }
            ),
            /* @__PURE__ */ jsx(
              DataSortModal,
              {
                title: "Sort Items",
                data: section.section_lessons,
                handler: /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "bg-muted hover:!bg-muted-foreground/10 h-8 w-full", children: "Sort Lessons" }),
                onOrderChange: (newOrder) => {
                  router.post(
                    route("lesson.sort"),
                    {
                      sortedData: newOrder
                    },
                    { preserveScroll: true }
                  );
                },
                renderContent: (lesson) => /* @__PURE__ */ jsx(Card, { className: "w-full px-4 py-3", children: /* @__PURE__ */ jsx("p", { children: lesson.title }) })
              }
            ),
            /* @__PURE__ */ jsx(
              SectionForm,
              {
                title: "Update Section",
                section,
                handler: /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "bg-muted hover:!bg-muted-foreground/10 h-8 w-full", children: "Edit Section" })
              }
            ),
            /* @__PURE__ */ jsx(
              DeleteModal,
              {
                routePath: route("section.delete", {
                  id: section.id
                }),
                actionComponent: /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "bg-muted hover:!bg-muted-foreground/10 h-8 w-full", children: "Delete Section" })
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs(AccordionContent, { className: "space-y-2 p-4", children: [
        section.section_lessons.length > 0 ? section.section_lessons.map((lesson) => /* @__PURE__ */ jsxs("div", { className: "group border-border flex w-full items-center justify-between rounded-md border px-4 py-3", children: [
          /* @__PURE__ */ jsx("p", { children: lesson.title }),
          /* @__PURE__ */ jsxs("div", { className: "invisible flex items-center gap-2 group-hover:visible", children: [
            /* @__PURE__ */ jsx(
              DeleteModal,
              {
                routePath: route("lesson.delete", {
                  id: lesson.id
                }),
                actionComponent: /* @__PURE__ */ jsx(Button, { size: "icon", variant: "secondary", className: "text-destructive h-7 w-7", children: /* @__PURE__ */ jsx(Trash2, { className: "h-3 w-3" }) })
              }
            ),
            /* @__PURE__ */ jsx(
              LessonForm,
              {
                lesson,
                sectionId: section.id,
                title: "Update Lesson",
                handler: /* @__PURE__ */ jsx(Button, { size: "icon", variant: "secondary", className: "h-7 w-7", children: /* @__PURE__ */ jsx(Pencil, { className: "h-3 w-3" }) })
              }
            )
          ] })
        ] }, lesson.id)) : /* @__PURE__ */ jsx("div", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsx("p", { children: "There is no lesson added" }) }),
        section.section_quizzes.map((quiz) => /* @__PURE__ */ jsxs("div", { className: "group border-border flex w-full items-center justify-between rounded-md border px-4 py-3", children: [
          /* @__PURE__ */ jsx("p", { children: quiz.title }),
          /* @__PURE__ */ jsxs("div", { className: "invisible flex items-center gap-2 group-hover:visible", children: [
            /* @__PURE__ */ jsx(
              QuestionQuestions,
              {
                quiz,
                title: "Quiz Questions",
                handler: /* @__PURE__ */ jsx(Button, { size: "icon", variant: "secondary", className: "h-7 w-7", children: /* @__PURE__ */ jsx(ListOrdered, { className: "h-3 w-3" }) })
              }
            ),
            /* @__PURE__ */ jsx(
              DeleteModal,
              {
                routePath: route("quiz.delete", {
                  id: quiz.id
                }),
                actionComponent: /* @__PURE__ */ jsx(Button, { size: "icon", variant: "secondary", className: "text-destructive h-7 w-7", children: /* @__PURE__ */ jsx(Trash2, { className: "h-3 w-3" }) })
              }
            ),
            /* @__PURE__ */ jsx(
              QuizForm,
              {
                quiz,
                title: "Update Quiz",
                sectionId: section.id,
                handler: /* @__PURE__ */ jsx(Button, { size: "icon", variant: "secondary", className: "h-7 w-7", children: /* @__PURE__ */ jsx(Pencil, { className: "h-3 w-3" }) })
              }
            )
          ] })
        ] }, quiz.id))
      ] })
    ] }, section.id)) })
  ] });
};
export {
  Curriculum as default
};
