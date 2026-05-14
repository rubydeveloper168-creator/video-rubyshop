import { jsx, jsxs } from "react/jsx-runtime";
import { C as Card } from "./card-CXRouz5c.js";
import { g as getPageSection } from "./page-D-1sFXYI.js";
import { usePage } from "@inertiajs/react";
import Section from "./section-DM2a0QGA.js";
import "react";
import "./utils-BmtPBcb0.js";
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
import "lucide-react/dynamic";
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
const Statistics = () => {
  const { props } = usePage();
  const { customize } = props;
  const statisticsSection = getPageSection(props.page, "statistics");
  return /* @__PURE__ */ jsx(Section, { customize, pageSection: statisticsSection, containerClass: "relative z-10 py-11", children: /* @__PURE__ */ jsx(Card, { className: "text-primary-foreground dark:text-primary grid grid-cols-2 gap-20 border-none bg-[#004B50] p-10 !shadow-none md:grid-cols-4 md:flex-row md:gap-28 md:px-[120px]", children: statisticsSection == null ? void 0 : statisticsSection.properties.array.map((statistic) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold md:text-6xl", children: statistic.value }),
    /* @__PURE__ */ jsx("p", { className: "text-lg", children: statistic.label })
  ] }, statistic.id)) }) });
};
export {
  Statistics as default
};
