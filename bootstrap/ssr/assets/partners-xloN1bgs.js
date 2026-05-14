import { jsxs, jsx } from "react/jsx-runtime";
import { g as getPageSection } from "./page-D-1sFXYI.js";
import { usePage } from "@inertiajs/react";
import Section from "./section-DM2a0QGA.js";
import "./dialog-DD5SXV81.js";
import "@radix-ui/react-dialog";
import "lucide-react";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "react";
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
import "./card-CXRouz5c.js";
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
const Partners = () => {
  var _a, _b;
  const { props } = usePage();
  const { customize, page } = props;
  const partnersSection = getPageSection(page, "partners");
  return /* @__PURE__ */ jsxs(Section, { customize, pageSection: partnersSection, containerClass: "py-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto mb-10 text-center md:max-w-xl", children: [
      /* @__PURE__ */ jsx("p", { className: "text-secondary-foreground mb-1 font-medium", children: partnersSection == null ? void 0 : partnersSection.title }),
      /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold sm:text-4xl", children: partnersSection == null ? void 0 : partnersSection.sub_title }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: partnersSection == null ? void 0 : partnersSection.description })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-x-14 gap-y-12 md:gap-x-20 md:gap-y-16", children: (_b = (_a = partnersSection == null ? void 0 : partnersSection.properties) == null ? void 0 : _a.array) == null ? void 0 : _b.map((partner) => /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx("img", { src: partner.image, alt: "", className: "h-7 w-auto" }) }, partner.id)) })
  ] });
};
export {
  Partners as default
};
