import { jsxs, jsx } from "react/jsx-runtime";
import { S as Separator } from "./separator-R7EO2G8T.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-Bhd5qJJs.js";
import "react";
import "@radix-ui/react-separator";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tabs";
const CourseSummery = () => {
  return /* @__PURE__ */ jsxs(Tabs, { defaultValue: "summery", className: "bg-card rounded-md border shadow", children: [
    /* @__PURE__ */ jsx(TabsList, { className: "overflow-hidden rounded-none bg-transparent px-0 py-6", children: tabs.map(({ label, value }) => /* @__PURE__ */ jsx(
      TabsTrigger,
      {
        value,
        className: "border-primary data-[state=active]:!bg-muted data-[state=active]:before:bg-primary relative flex items-center justify-start gap-3 rounded-none bg-transparent px-8 py-4 text-start !shadow-none before:absolute before:right-0 before:bottom-0 before:left-0 before:h-1 before:rounded-t-xl data-[state=active]:before:content-['.']",
        children: /* @__PURE__ */ jsx("span", { children: label })
      },
      value
    )) }),
    /* @__PURE__ */ jsx(Separator, { className: "mt-[1px]" }),
    tabs.map(({ value, Component }) => /* @__PURE__ */ jsx(TabsContent, { value, className: "m-0 p-5", children: Component }, value))
  ] });
};
const tabs = [
  {
    value: "summery",
    label: "Summery",
    Component: /* @__PURE__ */ jsx("h1", { children: "Summery" })
  },
  {
    value: "certificate",
    label: "Certificate",
    Component: /* @__PURE__ */ jsx("h1", { children: "Certificate" })
  },
  {
    value: "forum",
    label: "Forum",
    Component: /* @__PURE__ */ jsx("h1", { children: "Forum" })
  }
];
export {
  CourseSummery as default
};
