import { jsx, jsxs } from "react/jsx-runtime";
import { C as Combobox } from "./combobox-VTqRvK5M.js";
import { I as InputError } from "./input-error-CEW4jhey.js";
import { L as LoadingButton } from "./loading-button-C4Hk_jCd.js";
import { C as Card } from "./card-CXRouz5c.js";
import { I as Input } from "./input-C6-Ta46A.js";
import { L as Label } from "./label-Dd_w2I6M.js";
import { T as Textarea } from "./textarea-DctRxpgE.js";
import { f as currencies } from "./utils-BmtPBcb0.js";
import { o as onHandleChange } from "./inertia-BtwbgBI3.js";
import { usePage, useForm } from "@inertiajs/react";
import "./button-jZyzwgdo.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "cmdk";
import "lucide-react";
import "./popover-BV7JTqNd.js";
import "@radix-ui/react-popover";
import "@radix-ui/react-label";
import "clsx";
import "tailwind-merge";
const Website = () => {
  const { props } = usePage();
  const mediaFields = {
    new_logo_dark: null,
    new_logo_light: null,
    new_favicon: null,
    new_banner: null
  };
  const { data, setData, post, errors, processing } = useForm({
    ...props.system.fields,
    ...mediaFields
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("settings.system.update", { id: props.system.id }));
  };
  return /* @__PURE__ */ jsx(Card, { className: "p-4 sm:p-6", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "border-b pb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-4 text-xl font-semibold", children: "Website Information" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Website Name *" }),
          /* @__PURE__ */ jsx(Input, { name: "name", value: data.name || "", onChange: (e) => onHandleChange(e, setData), placeholder: "Enter Website Name" }),
          /* @__PURE__ */ jsx(InputError, { message: errors.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Website Title *" }),
          /* @__PURE__ */ jsx(Input, { name: "title", value: data.title || "", onChange: (e) => onHandleChange(e, setData), placeholder: "Enter Website Title" }),
          /* @__PURE__ */ jsx(InputError, { message: errors.title })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "Keywords" }),
          /* @__PURE__ */ jsx(Input, { name: "keywords", value: data.keywords || "", onChange: (e) => onHandleChange(e, setData), placeholder: "Enter Keywords" }),
          /* @__PURE__ */ jsx(InputError, { message: errors.keywords })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "Description" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              rows: 4,
              name: "description",
              value: data.description || "",
              onChange: (e) => onHandleChange(e, setData),
              placeholder: "Enter Website Description"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Author" }),
          /* @__PURE__ */ jsx(Input, { name: "author", value: data.author || "", onChange: (e) => onHandleChange(e, setData), placeholder: "Enter Author Name" }),
          /* @__PURE__ */ jsx(InputError, { message: errors.author })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Slogan" }),
          /* @__PURE__ */ jsx(Input, { name: "slogan", value: data.slogan || "", onChange: (e) => onHandleChange(e, setData), placeholder: "Enter Website Slogan" }),
          /* @__PURE__ */ jsx(InputError, { message: errors.slogan })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-b pb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-4 text-xl font-semibold", children: "Contact Information" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "System Email *" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "email",
              name: "email",
              value: data.email || "",
              onChange: (e) => onHandleChange(e, setData),
              placeholder: "Enter System Email"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Phone" }),
          /* @__PURE__ */ jsx(Input, { name: "phone", value: data.phone || "", onChange: (e) => onHandleChange(e, setData), placeholder: "Enter Phone Number" }),
          /* @__PURE__ */ jsx(InputError, { message: errors.phone })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-b pb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-4 text-xl font-semibold", children: "Media" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Logo Dark" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "file",
              name: "new_logo_dark",
              accept: "image/*",
              onChange: (e) => onHandleChange(e, setData),
              placeholder: "Select Logo"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.new_logo_dark })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Logo Light" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "file",
              name: "new_logo_light",
              accept: "image/*",
              onChange: (e) => onHandleChange(e, setData),
              placeholder: "Select Logo"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.new_logo_light })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Favicon" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "file",
              name: "new_favicon",
              accept: "image/*",
              onChange: (e) => onHandleChange(e, setData),
              placeholder: "Select Favicon"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.new_favicon })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Banner" }),
          /* @__PURE__ */ jsx(Input, { type: "file", name: "new_banner", accept: "image/*", onChange: (e) => onHandleChange(e, setData), placeholder: "Select Banner" }),
          /* @__PURE__ */ jsx(InputError, { message: errors.new_banner })
        ] })
      ] })
    ] }),
    props.system.sub_type === "collaborative" && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-4 text-xl font-semibold", children: "Additional Settings" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: `Course Selling Currency (${data.selling_currency})` }),
          /* @__PURE__ */ jsx(
            Combobox,
            {
              data: currencies,
              defaultValue: data.selling_currency || "",
              placeholder: "Select a selling currency",
              onSelect: (selected) => setData("selling_currency", selected.value)
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.selling_currency })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Course Selling Tax (%)" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              name: "selling_tax",
              value: data.selling_tax || "",
              onChange: (e) => onHandleChange(e, setData),
              placeholder: "Enter Course Selling Tax Percentage"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.selling_tax })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Instructor Revenue (%)" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              name: "instructor_revenue",
              value: data.instructor_revenue || "",
              onChange: (e) => onHandleChange(e, setData),
              placeholder: "Enter Instructor Revenue Percentage"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.instructor_revenue })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(LoadingButton, { loading: processing, children: "Save Changes" }) })
  ] }) });
};
export {
  Website as default
};
