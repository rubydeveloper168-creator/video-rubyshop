import { jsx, jsxs } from "react/jsx-runtime";
import { C as Combobox } from "./combobox-VTqRvK5M.js";
import { D as DateTimePicker } from "./datetime-picker-BBkkBJXZ.js";
import { I as InputError } from "./input-error-CEW4jhey.js";
import { L as LoadingButton } from "./loading-button-C4Hk_jCd.js";
import { T as TiptapEditor } from "./Editor-iiR11EW9.js";
import { A as Accordion, a as AccordionItem, c as AccordionContent } from "./accordion-DVAMjldm.js";
import { C as Card } from "./card-CXRouz5c.js";
import { C as Checkbox } from "./checkbox-CO4DegBm.js";
import { I as Input } from "./input-C6-Ta46A.js";
import { L as Label } from "./label-Dd_w2I6M.js";
import { R as RadioGroup, a as RadioGroupItem } from "./radio-group-sSS5HHUP.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BxPdBi6V.js";
import { T as Textarea } from "./textarea-DctRxpgE.js";
import { c as courseLanguages } from "./course-languages-oEC7DuVF.js";
import { D as DashboardLayout } from "./layout-DNClQoa9.js";
import { o as onHandleChange } from "./inertia-BtwbgBI3.js";
import { useForm } from "@inertiajs/react";
import { useMemo } from "react";
import "./button-jZyzwgdo.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "cmdk";
import "lucide-react";
import "./popover-BV7JTqNd.js";
import "@radix-ui/react-popover";
import "react-day-picker";
import "date-fns";
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
import "@radix-ui/react-accordion";
import "@radix-ui/react-checkbox";
import "@radix-ui/react-label";
import "@radix-ui/react-radio-group";
import "@radix-ui/react-select";
import "./sidebar-6wqj6oXO.js";
import "./separator-R7EO2G8T.js";
import "@radix-ui/react-separator";
import "./sheet-CuVwNO0O.js";
import "@radix-ui/react-dialog";
import "./tooltip-DswKljFZ.js";
import "./main-BqrosZ6t.js";
import "next-themes";
import "sonner";
import "./appearance-DLkkIZHp.js";
import "./dropdown-menu-CECYoeyz.js";
import "./notification-Dc7j1bw9.js";
import "./scroll-area-DPHRDnwL.js";
import "@radix-ui/react-scroll-area";
import "./app-logo-GKkeg_7r.js";
import "./route-DlE7FdTW.js";
import "./avatar-Cr_jqfHL.js";
import "@radix-ui/react-avatar";
const Index = (props) => {
  const user = props.auth.user;
  const { labels, prices, expiries, categories, instructors, system } = props;
  const { data, setData, post, errors, processing } = useForm({
    title: "",
    short_description: "",
    description: "",
    status: "draft",
    level: "",
    language: "",
    pricing_type: "paid",
    price: "",
    discount: false,
    discount_price: "",
    expiry_type: "lifetime",
    expiry_duration: /* @__PURE__ */ new Date(),
    drip_content: false,
    thumbnail: null,
    instructor_id: user.role === "admin" && system.sub_type === "collaborative" ? "" : user.instructor_id,
    course_category_id: "",
    course_category_child_id: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("courses.store"));
  };
  const transformedCategories = useMemo(() => {
    return categories.flatMap((category) => {
      var _a;
      const categoryItem = {
        label: category.title,
        value: category.title,
        id: category.id,
        child_id: ""
      };
      const childItems = ((_a = category.category_children) == null ? void 0 : _a.map((child) => ({
        label: `--${child.title}`,
        value: child.title,
        id: child.course_category_id,
        child_id: child.id
      }))) || [];
      return [categoryItem, ...childItems];
    });
  }, [categories]);
  const transformedInstructors = instructors.map((instructor) => ({
    label: instructor.user.name,
    value: instructor.id
  }));
  return /* @__PURE__ */ jsx(Card, { className: "container p-6", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Title *" }),
          /* @__PURE__ */ jsx(Input, { name: "title", value: data.title, onChange: (e) => onHandleChange(e, setData), placeholder: "Enter Course Title" }),
          /* @__PURE__ */ jsx(InputError, { message: errors.title })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Short Description" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              rows: 5,
              name: "short_description",
              value: data.short_description,
              onChange: (e) => onHandleChange(e, setData),
              placeholder: "Enter Short Description"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.short_description })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Description" }),
          /* @__PURE__ */ jsx(
            TiptapEditor,
            {
              ssr: true,
              output: "html",
              placeholder: {
                paragraph: "Type your content here...",
                imageCaption: "Type caption for image (optional)"
              },
              contentMinHeight: 256,
              contentMaxHeight: 640,
              initialContent: data.description,
              onContentChange: (value) => setData((prev) => ({
                ...prev,
                description: value
              }))
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Enable drip content *" }),
          /* @__PURE__ */ jsxs(
            RadioGroup,
            {
              defaultValue: data.drip_content ? "on" : "off",
              className: "flex items-center space-x-4 pt-2 pb-1",
              onValueChange: (value) => setData("drip_content", value == "on" ? true : false),
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(RadioGroupItem, { className: "cursor-pointer", id: "off", value: "off" }),
                  /* @__PURE__ */ jsx(Label, { htmlFor: "off", children: "Off" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(RadioGroupItem, { className: "cursor-pointer", id: "on", value: "on" }),
                  /* @__PURE__ */ jsx(Label, { htmlFor: "on", children: "On" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.drip_content })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Category *" }),
          /* @__PURE__ */ jsx(
            Combobox,
            {
              data: transformedCategories,
              placeholder: "Select a category",
              onSelect: (selected) => {
                setData("course_category_id", selected.id);
                setData("course_category_child_id", selected.child_id);
              }
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.course_category_id })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Course level *" }),
          /* @__PURE__ */ jsxs(Select, { onValueChange: (value) => setData("level", value), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select your course level" }) }),
            /* @__PURE__ */ jsx(SelectContent, { children: labels.map((label) => /* @__PURE__ */ jsx(SelectItem, { value: label, className: "capitalize", children: label }, label)) })
          ] }),
          /* @__PURE__ */ jsx(InputError, { message: errors.level })
        ] }),
        user.role === "admin" && system.sub_type === "collaborative" && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Course Instructor *" }),
          /* @__PURE__ */ jsx(
            Combobox,
            {
              data: transformedInstructors,
              placeholder: "Select the course instructor",
              onSelect: (selected) => setData("instructor_id", selected.value)
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.instructor_id })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Made in *" }),
          /* @__PURE__ */ jsx(
            Combobox,
            {
              data: courseLanguages,
              placeholder: "Select your course language",
              onSelect: (selected) => setData("language", selected.value)
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.language })
        ] }),
        /* @__PURE__ */ jsxs(Accordion, { collapsible: true, type: "single", value: data.pricing_type, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Pricing type *" }),
            /* @__PURE__ */ jsx(
              RadioGroup,
              {
                defaultValue: data.pricing_type,
                className: "flex items-center space-x-4 pt-2 pb-1",
                onValueChange: (value) => setData("pricing_type", value),
                children: prices.map((price) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(RadioGroupItem, { className: "cursor-pointer", id: price, value: price }),
                  /* @__PURE__ */ jsx(Label, { htmlFor: price, className: "capitalize", children: price })
                ] }, price))
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.pricing_type })
          ] }),
          /* @__PURE__ */ jsx(AccordionItem, { value: prices[1], className: "border-none", children: /* @__PURE__ */ jsxs(AccordionContent, { className: "space-y-4 p-0.5", children: [
            /* @__PURE__ */ jsxs("div", { className: "pt-3", children: [
              /* @__PURE__ */ jsx(Label, { children: "Price *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  type: "number",
                  name: "price",
                  value: data.price,
                  onChange: (e) => onHandleChange(e, setData),
                  placeholder: "Enter your course price ($0)"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.price })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx(
                  Checkbox,
                  {
                    id: "discount",
                    name: "discount",
                    checked: data.discount,
                    onCheckedChange: (checked) => {
                      setData("discount", checked);
                    }
                  }
                ),
                /* @__PURE__ */ jsx(Label, { htmlFor: "discount", children: "Check if this course has discount" })
              ] }),
              data.discount && /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "number",
                    name: "discount_price",
                    value: data.discount_price,
                    onChange: (e) => onHandleChange(e, setData),
                    placeholder: "Enter your discount price ($0)"
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.discount_price })
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs(Accordion, { collapsible: true, type: "single", value: data.expiry_type, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Expiry period type" }),
            /* @__PURE__ */ jsx(
              RadioGroup,
              {
                defaultValue: data.expiry_type,
                className: "flex items-center space-x-4 pt-2 pb-1",
                onValueChange: (value) => setData("expiry_type", value),
                children: expiries.map((expiry) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(RadioGroupItem, { className: "cursor-pointer", id: expiry, value: expiry }),
                  /* @__PURE__ */ jsx(Label, { htmlFor: expiry, className: "capitalize", children: expiry })
                ] }, expiry))
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.expiry_type })
          ] }),
          /* @__PURE__ */ jsx(AccordionItem, { value: expiries[1], className: "border-none", children: /* @__PURE__ */ jsx(AccordionContent, { className: "space-y-4 p-0.5", children: /* @__PURE__ */ jsxs("div", { className: "pt-3", children: [
            /* @__PURE__ */ jsx(Label, { children: "Expiry date" }),
            /* @__PURE__ */ jsx(DateTimePicker, { date: data.expiry_duration, setDate: (date) => setData("expiry_duration", date) }),
            /* @__PURE__ */ jsx(InputError, { message: errors.expiry_duration })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Thumbnail" }),
          /* @__PURE__ */ jsx(Input, { type: "file", name: "thumbnail", onChange: (e) => onHandleChange(e, setData) }),
          /* @__PURE__ */ jsx(InputError, { message: errors.thumbnail })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "col-span-2 mt-6 text-right", children: /* @__PURE__ */ jsx(LoadingButton, { loading: processing, children: "Create Course" }) })
  ] }) });
};
Index.layout = (page) => /* @__PURE__ */ jsx(DashboardLayout, { children: page });
export {
  Index as default
};
