import { jsxs, jsx } from "react/jsx-runtime";
import { I as IconPicker } from "./icon-picker-DQbRGSHn.js";
import { I as InputError } from "./input-error-CEW4jhey.js";
import { L as LoadingButton } from "./loading-button-C4Hk_jCd.js";
import { B as Button } from "./button-jZyzwgdo.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogFooter, f as DialogClose } from "./dialog-DD5SXV81.js";
import { I as Input } from "./input-C6-Ta46A.js";
import { L as Label } from "./label-Dd_w2I6M.js";
import { S as ScrollArea } from "./scroll-area-DPHRDnwL.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BxPdBi6V.js";
import { T as Textarea } from "./textarea-DctRxpgE.js";
import { o as onHandleChange } from "./inertia-BtwbgBI3.js";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import "./debounce-ZFxqVthq.js";
import "lucide-react";
import "./tooltip-DswKljFZ.js";
import "@radix-ui/react-tooltip";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "lucide-react/dynamic";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-dialog";
import "@radix-ui/react-label";
import "@radix-ui/react-scroll-area";
import "@radix-ui/react-select";
const CategoryForm = ({ title, category, lastPosition, handler }) => {
  const [open, setOpen] = useState(false);
  const [openIcon, setOpenIcon] = useState(false);
  const { data, setData, post, errors, processing, reset } = useForm({
    title: category ? category.title : "",
    icon: category ? category.icon : "",
    sort: category ? category.sort : lastPosition + 1,
    status: category ? category.status : 1,
    description: category ? category.description : "",
    thumbnail: null
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (category) {
      post(route("categories.update", category.id), {
        onSuccess: () => setOpen(false)
      });
    } else {
      post(route("categories.store"), {
        onSuccess: () => {
          reset();
          setOpen(false);
        }
      });
    }
  };
  return /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { children: handler }),
    /* @__PURE__ */ jsx(DialogContent, { className: "p-0", children: /* @__PURE__ */ jsxs(ScrollArea, { className: "max-h-[90vh] p-6", children: [
      /* @__PURE__ */ jsx(DialogHeader, { className: "mb-6", children: /* @__PURE__ */ jsx(DialogTitle, { children: title }) }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 p-0.5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Category Name" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              required: true,
              type: "text",
              name: "title",
              value: data.title,
              placeholder: "Enter your category name",
              onChange: (e) => onHandleChange(e, setData)
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.title })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Category Icon" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              required: true,
              readOnly: true,
              type: "text",
              name: "icon",
              value: data.icon,
              placeholder: "Pick your category icon",
              onClick: () => setOpenIcon(true)
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.icon }),
          /* @__PURE__ */ jsx(Dialog, { open: openIcon, onOpenChange: setOpenIcon, children: /* @__PURE__ */ jsx(DialogContent, { className: "p-0", children: /* @__PURE__ */ jsxs(ScrollArea, { className: "max-h-[90vh] p-6", children: [
            /* @__PURE__ */ jsx(DialogHeader, { className: "mb-6", children: /* @__PURE__ */ jsx(DialogTitle, { children: "Icon Picker" }) }),
            /* @__PURE__ */ jsx(
              IconPicker,
              {
                onSelect: (icon) => {
                  setData("icon", icon);
                  setOpenIcon(false);
                }
              }
            )
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Category Status" }),
          /* @__PURE__ */ jsxs(Select, { value: JSON.stringify(data.status), onValueChange: (e) => setData("status", JSON.parse(e)), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select the status" }) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "1", children: "Active" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "0", children: "Deactive" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Category Description (optional)" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              name: "description",
              value: data.description,
              placeholder: "Enter your description",
              onChange: (e) => onHandleChange(e, setData)
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Thumbnail (optional)" }),
          /* @__PURE__ */ jsx(Input, { type: "file", name: "thumbnail", onChange: (e) => onHandleChange(e, setData) }),
          /* @__PURE__ */ jsx(InputError, { message: errors.thumbnail })
        ] }),
        /* @__PURE__ */ jsxs(DialogFooter, { className: "flex justify-end space-x-2 pt-4", children: [
          /* @__PURE__ */ jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", children: "Close" }) }),
          /* @__PURE__ */ jsx(LoadingButton, { loading: processing, children: "Submit" })
        ] })
      ] })
    ] }) })
  ] });
};
export {
  CategoryForm as default
};
