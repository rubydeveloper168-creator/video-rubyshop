import { jsx, jsxs } from "react/jsx-runtime";
import { C as Card } from "./card-CXRouz5c.js";
import { g as getPageSection } from "./page-D-1sFXYI.js";
import { h as getColorWithOpacity } from "./utils-BmtPBcb0.js";
import { usePage } from "@inertiajs/react";
import { DynamicIcon } from "lucide-react/dynamic";
import Section from "./section-DM2a0QGA.js";
import "react";
import "clsx";
import "tailwind-merge";
import "./dialog-DD5SXV81.js";
import "@radix-ui/react-dialog";
import "lucide-react";
import "./chunked-uploader-input-MwXGR7K4.js";
import "./button-jZyzwgdo.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./input-C6-Ta46A.js";
import "axios";
import "sonner";
import "./input-error-CEW4jhey.js";
import "./loading-button-C4Hk_jCd.js";
import "./label-Dd_w2I6M.js";
import "@radix-ui/react-label";
import "./textarea-DctRxpgE.js";
import "./inertia-BtwbgBI3.js";
import "./icon-picker-DQbRGSHn.js";
import "./debounce-ZFxqVthq.js";
import "./tooltip-DswKljFZ.js";
import "@radix-ui/react-tooltip";
import "./scroll-area-DPHRDnwL.js";
import "@radix-ui/react-scroll-area";
import "./table-header-DWitEfum.js";
import "@tanstack/react-table";
import "./table-page-size-Cwe1Bz4B.js";
import "./dropdown-menu-CECYoeyz.js";
import "@radix-ui/react-dropdown-menu";
import "./route-DlE7FdTW.js";
import "./avatar-Cr_jqfHL.js";
import "@radix-ui/react-avatar";
const Overview = () => {
  const { props } = usePage();
  const overviewSection = getPageSection(props.page, "overview");
  return /* @__PURE__ */ jsx(Section, { customize: props.customize, pageSection: overviewSection, containerClass: "py-20", children: /* @__PURE__ */ jsx("div", { className: "relative grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-4", children: overviewSection == null ? void 0 : overviewSection.properties.array.map((stat, index) => {
    return /* @__PURE__ */ jsxs(
      Card,
      {
        className: "bg-secondary-lighter relative rounded-3xl border-none px-6 py-10 !shadow-none md:py-12",
        style: { backgroundColor: getColorWithOpacity(stat.bg_color, 1), color: getColorWithOpacity(stat.text_color, 1) },
        children: [
          /* @__PURE__ */ jsx("img", { src: stat.image, alt: "", className: "absolute top-0 right-0 w-full max-w-[100px]" }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "flex h-14 w-14 items-center justify-center rounded-full",
              style: { backgroundColor: getColorWithOpacity(stat.text_color, 0.1) },
              children: /* @__PURE__ */ jsx(DynamicIcon, { name: stat.icon, className: "h-8 w-8" })
            }
          ),
          /* @__PURE__ */ jsx("h3", { className: "mt-8 text-3xl font-semibold md:text-4xl", children: stat.count }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm", children: stat.title })
        ]
      },
      `element-${index}`
    );
  }) }) });
};
export {
  Overview as default
};
