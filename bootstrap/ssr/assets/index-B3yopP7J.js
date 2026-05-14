import { jsx } from "react/jsx-runtime";
import CallToAction from "./call-to-action-9FQlziOY.js";
import Hero from "./hero-DBsp8RnO.js";
import SuccessStatistics from "./success-statistics-DZFUoiXe.js";
import Team from "./team-39UZhIKm.js";
import TopInstructors from "./top-instructors-Dc32sWBy.js";
import "./subscribe-input-AB-2gOUD.js";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "@inertiajs/react";
import "./button-gradient-primary-Dgn8gIzu.js";
import "./button-jZyzwgdo.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./input-error-CEW4jhey.js";
import "./page-D-1sFXYI.js";
import "./section-DM2a0QGA.js";
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
const Index = ({ sections }) => {
  const components = [];
  sections.filter((section) => section.active).map((section) => {
    switch (section.slug) {
      case "hero":
        components.push(Hero);
        break;
      case "success_statistics":
        components.push(SuccessStatistics);
        break;
      case "team":
        components.push(Team);
        break;
      case "call_to_action":
        components.push(CallToAction);
        break;
      case "top_instructors":
        components.push(TopInstructors);
        break;
    }
  });
  return /* @__PURE__ */ jsx("div", { children: components.map((Component, index) => /* @__PURE__ */ jsx(Component, {}, `about-us-1-${index}`)) });
};
export {
  Index as default
};
