import { jsxs, jsx } from "react/jsx-runtime";
import { B as Button } from "./button-jZyzwgdo.js";
import { C as Card } from "./card-CXRouz5c.js";
import { S as Separator } from "./separator-R7EO2G8T.js";
import { usePage, router } from "@inertiajs/react";
import { Plus } from "lucide-react";
import FaqForm from "./faq-form-CT8jLy5J.js";
import OutcomeForm from "./outcome-form-CH10_hKT.js";
import RequirementForm from "./requirement-form-DBTOPI_1.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-separator";
import "./input-error-CEW4jhey.js";
import "./loading-button-C4Hk_jCd.js";
import "./input-C6-Ta46A.js";
import "./textarea-DctRxpgE.js";
import "./inertia-BtwbgBI3.js";
const Info = () => {
  const { props } = usePage();
  const { faqs, requirements, outcomes } = props.course;
  return /* @__PURE__ */ jsxs(Card, { className: "space-y-7 p-4 sm:p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "gap-64md:flex-row justify-betwee3 flex flex-col", children: [
      /* @__PURE__ */ jsx("h6", { className: "w-[200px] font-medium", children: "Course Faqs" }),
      /* @__PURE__ */ jsxs("div", { className: "w-full space-y-6", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            className: "w-full",
            onClick: () => router.post(route("faqs.store"), {
              course_id: props.course.id
            }),
            children: [
              /* @__PURE__ */ jsx(Plus, {}),
              "Add"
            ]
          }
        ),
        faqs == null ? void 0 : faqs.map((faq) => /* @__PURE__ */ jsx(FaqForm, { faq }, faq.id))
      ] })
    ] }),
    /* @__PURE__ */ jsx(Separator, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 md:flex-row", children: [
      /* @__PURE__ */ jsx("h6", { className: "w-[200px] font-medium", children: "Requirements" }),
      /* @__PURE__ */ jsxs("div", { className: "w-full space-y-6", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            className: "w-full",
            onClick: () => router.post(route("requirements.store"), {
              course_id: props.course.id
            }),
            children: [
              /* @__PURE__ */ jsx(Plus, {}),
              "Add"
            ]
          }
        ),
        requirements == null ? void 0 : requirements.map((requirement) => /* @__PURE__ */ jsx(RequirementForm, { requirement }, requirement.id))
      ] })
    ] }),
    /* @__PURE__ */ jsx(Separator, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 md:flex-row", children: [
      /* @__PURE__ */ jsx("h6", { className: "w-[200px] font-medium", children: "Outcomes" }),
      /* @__PURE__ */ jsxs("div", { className: "w-full space-y-6", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            className: "w-full",
            onClick: () => router.post(route("outcomes.store"), {
              course_id: props.course.id
            }),
            children: [
              /* @__PURE__ */ jsx(Plus, {}),
              "Add"
            ]
          }
        ),
        outcomes == null ? void 0 : outcomes.map((outcome) => /* @__PURE__ */ jsx(OutcomeForm, { outcome }, outcome.id))
      ] })
    ] })
  ] });
};
export {
  Info as default
};
