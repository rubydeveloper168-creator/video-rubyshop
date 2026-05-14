import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { I as InputError } from "./input-error-CEW4jhey.js";
import { L as LoadingButton } from "./loading-button-C4Hk_jCd.js";
import { T as TagInput } from "./tag-input-BplrELmW.js";
import { B as Button } from "./button-jZyzwgdo.js";
import { C as Card } from "./card-CXRouz5c.js";
import { I as Input } from "./input-C6-Ta46A.js";
import { L as Label } from "./label-Dd_w2I6M.js";
import { T as Textarea } from "./textarea-DctRxpgE.js";
import { o as onHandleChange } from "./inertia-BtwbgBI3.js";
import { usePage, useForm } from "@inertiajs/react";
import { useState } from "react";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "lucide-react";
import "@yaireo/tagify";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
const BecomeInstructor = ({ instructor }) => {
  const { props } = usePage();
  const [isEditing, setIsEditing] = useState(instructor ? false : true);
  const initialOptions = (instructor == null ? void 0 : instructor.skills) ? typeof instructor.skills === "string" ? JSON.parse(instructor.skills) : instructor.skills : [];
  const { data, setData, post, processing, errors } = useForm({
    user_id: props.auth.user.id,
    skills: initialOptions,
    designation: (instructor == null ? void 0 : instructor.designation) || "",
    biography: (instructor == null ? void 0 : instructor.biography) || "",
    resume: null
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (instructor) {
      post(route("become-instructor.update", instructor.id));
    } else {
      post(route("become-instructor.store"));
    }
  };
  return /* @__PURE__ */ jsx(Card, { className: "p-4 sm:p-6", children: !isEditing ? /* @__PURE__ */ jsx("div", { className: "space-y-6 text-center", children: instructor.status === "rejected" ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("p", { className: "text-red-600", children: "Unfortunately, your application has been rejected. Please review the requirements and submit again with updated information." }),
    /* @__PURE__ */ jsxs(Button, { type: "button", onClick: () => setIsEditing(true), variant: "destructive", className: "text-primary-foreground capitalize", children: [
      "Application is ",
      instructor.status,
      " - Reapply"
    ] })
  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("p", { children: "Your application is currently under review by our team. We will get back to you as soon as possible." }),
    /* @__PURE__ */ jsxs(Button, { type: "button", className: "capitalize", children: [
      "Application is ",
      instructor.status
    ] })
  ] }) }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "relative space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { children: "Designation" }),
      /* @__PURE__ */ jsx(Input, { type: "text", name: "designation", onChange: (e) => onHandleChange(e, setData), placeholder: "Enter your designation" }),
      /* @__PURE__ */ jsx(InputError, { message: errors.designation })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { children: "Resume" }),
      /* @__PURE__ */ jsx(Input, { readOnly: true, type: "file", name: "resume", onChange: (e) => onHandleChange(e, setData) }),
      /* @__PURE__ */ jsx(InputError, { message: errors.resume })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { children: "Skills" }),
      /* @__PURE__ */ jsx(TagInput, { defaultTags: data.skills, placeholder: "Enter the skills as a tag", onChange: (values) => setData("skills", values) }),
      /* @__PURE__ */ jsx(InputError, { message: errors.skills })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "pb-3", children: [
      /* @__PURE__ */ jsx(Label, { children: "Biography" }),
      /* @__PURE__ */ jsx(
        Textarea,
        {
          rows: 5,
          required: true,
          name: "biography",
          value: data.biography,
          onChange: (e) => onHandleChange(e, setData),
          placeholder: "Write about yourself"
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.biography })
    ] }),
    /* @__PURE__ */ jsx(LoadingButton, { loading: processing, className: "mt-2", children: instructor ? "Update Application" : "Submit Application" })
  ] }) });
};
export {
  BecomeInstructor as default
};
