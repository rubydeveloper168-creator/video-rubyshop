import { jsx, jsxs } from "react/jsx-runtime";
import { C as Combobox } from "./combobox-VTqRvK5M.js";
import { I as InputError } from "./input-error-CEW4jhey.js";
import { L as LoadingButton } from "./loading-button-C4Hk_jCd.js";
import { T as TagInput } from "./tag-input-BplrELmW.js";
import { C as Card } from "./card-CXRouz5c.js";
import { I as Input } from "./input-C6-Ta46A.js";
import { L as Label } from "./label-Dd_w2I6M.js";
import { T as Textarea } from "./textarea-DctRxpgE.js";
import { D as DashboardLayout } from "./layout-DNClQoa9.js";
import { o as onHandleChange } from "./inertia-BtwbgBI3.js";
import { useForm } from "@inertiajs/react";
import "./button-jZyzwgdo.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "cmdk";
import "lucide-react";
import "./popover-BV7JTqNd.js";
import "@radix-ui/react-popover";
import "@yaireo/tagify";
import "@radix-ui/react-label";
import "./sidebar-6wqj6oXO.js";
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
import "date-fns";
import "./scroll-area-DPHRDnwL.js";
import "@radix-ui/react-scroll-area";
import "./app-logo-GKkeg_7r.js";
import "./accordion-DVAMjldm.js";
import "@radix-ui/react-accordion";
import "./route-DlE7FdTW.js";
import "./avatar-Cr_jqfHL.js";
import "@radix-ui/react-avatar";
const CreateUpdate = ({ instructor, users }) => {
  const initialOptions = (instructor == null ? void 0 : instructor.skills) ? typeof instructor.skills === "string" ? JSON.parse(instructor.skills) : instructor.skills : [];
  const { data, setData, post, processing, errors, reset } = useForm({
    user_id: "",
    designation: (instructor == null ? void 0 : instructor.designation) || "",
    skills: initialOptions,
    biography: (instructor == null ? void 0 : instructor.biography) || "",
    resume: null
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (instructor) {
      post(route("become-instructor.update", { id: instructor.id }));
    } else {
      post(route("become-instructor.store"), {
        onSuccess: () => {
          reset();
        }
      });
    }
  };
  const transformedUsers = users.map((user) => ({
    value: user.id.toString(),
    label: user.name
  }));
  return /* @__PURE__ */ jsx(Card, { className: "p-4 sm:p-6", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "relative space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { children: "Course Instructor *" }),
      /* @__PURE__ */ jsx(Combobox, { data: transformedUsers, placeholder: "Select an user", onSelect: (selected) => setData("user_id", selected.value) }),
      /* @__PURE__ */ jsx(InputError, { message: errors.user_id })
    ] }),
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
      /* @__PURE__ */ jsx(TagInput, { defaultTags: data.skills, placeholder: "Enter the skills as a tag", onChange: (values) => setData("skills", values) })
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
CreateUpdate.layout = (page) => /* @__PURE__ */ jsx(DashboardLayout, { children: page });
export {
  CreateUpdate as default
};
