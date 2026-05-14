import { jsx, jsxs } from "react/jsx-runtime";
import { S as SubscribeInput } from "./subscribe-input-AB-2gOUD.js";
import { g as getPageSection } from "./page-D-1sFXYI.js";
import { usePage } from "@inertiajs/react";
import Section from "./section-DM2a0QGA.js";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "./button-gradient-primary-Dgn8gIzu.js";
import "./button-jZyzwgdo.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./input-error-CEW4jhey.js";
import "./dialog-DD5SXV81.js";
import "@radix-ui/react-dialog";
import "lucide-react";
import "./chunked-uploader-input-MwXGR7K4.js";
import "./input-C6-Ta46A.js";
import "axios";
import "sonner";
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
const CallToAction = () => {
  var _a;
  const { props } = usePage();
  const ctaSection = getPageSection(props.page, "call_to_action");
  return /* @__PURE__ */ jsx("div", { className: "bg-[rgba(79,103,254,0.06)] py-20", children: /* @__PURE__ */ jsxs(
    Section,
    {
      customize: props.customize,
      pageSection: ctaSection,
      contentClass: "grid grid-cols-1 items-center gap-12 space-y-5 rounded-2xl bg-[rgba(79,103,254,1)] bg-cover bg-center px-7 py-[60px] text-white md:grid-cols-2 md:px-[120px]",
      contentStyle: { backgroundImage: `url('${ctaSection == null ? void 0 : ctaSection.background_image}')` },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl leading-tight font-bold md:text-3xl md:leading-9", children: ctaSection == null ? void 0 : ctaSection.title }),
          /* @__PURE__ */ jsx("p", { children: ctaSection == null ? void 0 : ctaSection.description })
        ] }),
        /* @__PURE__ */ jsx(SubscribeInput, { buttonText: (_a = ctaSection == null ? void 0 : ctaSection.properties) == null ? void 0 : _a.button_text })
      ]
    }
  ) });
};
export {
  CallToAction as default
};
