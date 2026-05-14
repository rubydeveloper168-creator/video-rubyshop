import { jsxs, jsx } from "react/jsx-runtime";
import { T as TiptapRenderer } from "./client-renderer-CUBmzaOS.js";
import { Head } from "@inertiajs/react";
import Layout from "./layout-CV--V7We.js";
import Hero from "./hero-DL-8otSj.js";
import Index$1 from "./index-B3yopP7J.js";
import Career from "./career-q1ynfPmr.js";
/* empty css               */
import "react";
import "react-icons/lu";
import "hast-util-to-jsx-runtime";
import "shiki/bundle/full";
import "rehype-parse";
import "rehype-react";
import "unified";
import "unist-util-visit";
import "./data-sort-modal-Cg4d_jDY.js";
import "nprogress";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "lucide-react";
import "./dialog-DD5SXV81.js";
import "@radix-ui/react-dialog";
import "./scroll-area-DPHRDnwL.js";
import "@radix-ui/react-scroll-area";
import "./button-jZyzwgdo.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./card-CXRouz5c.js";
import "./label-Dd_w2I6M.js";
import "@radix-ui/react-label";
import "./switch-CNsdrSya.js";
import "@radix-ui/react-switch";
import "./landing-layout-evsEYR3t.js";
import "./app-logo-GKkeg_7r.js";
import "lucide-react/dynamic";
import "./main-BqrosZ6t.js";
import "next-themes";
import "sonner";
import "./appearance-DLkkIZHp.js";
import "./dropdown-menu-CECYoeyz.js";
import "@radix-ui/react-dropdown-menu";
import "./notification-Dc7j1bw9.js";
import "./popover-BV7JTqNd.js";
import "@radix-ui/react-popover";
import "date-fns";
import "./profile-toggle-CeGVdaNT.js";
import "./avatar-Cr_jqfHL.js";
import "@radix-ui/react-avatar";
import "nanoid";
import "./use-auth-8FvJer_G.js";
import "./use-screen-B7SDA5zE.js";
import "./call-to-action-9FQlziOY.js";
import "./subscribe-input-AB-2gOUD.js";
import "./button-gradient-primary-Dgn8gIzu.js";
import "./input-error-CEW4jhey.js";
import "./page-D-1sFXYI.js";
import "./section-DM2a0QGA.js";
import "./chunked-uploader-input-MwXGR7K4.js";
import "./input-C6-Ta46A.js";
import "axios";
import "./loading-button-C4Hk_jCd.js";
import "./textarea-DctRxpgE.js";
import "./inertia-BtwbgBI3.js";
import "./icon-picker-DQbRGSHn.js";
import "./debounce-ZFxqVthq.js";
import "./tooltip-DswKljFZ.js";
import "@radix-ui/react-tooltip";
import "./table-header-DWitEfum.js";
import "@tanstack/react-table";
import "./table-page-size-Cwe1Bz4B.js";
import "./route-DlE7FdTW.js";
import "./hero-DBsp8RnO.js";
import "./success-statistics-DZFUoiXe.js";
import "./team-39UZhIKm.js";
import "./top-instructors-Dc32sWBy.js";
import "./table-filter-Bb8orCSv.js";
import "./table-footer-DKVIQyQk.js";
import "./badge-B4crNM73.js";
const Index = ({ innerPage, jobCirculars }) => {
  return /* @__PURE__ */ jsxs(Layout, { page: innerPage, navbarHeight: false, children: [
    /* @__PURE__ */ jsx(Head, { title: innerPage.name }),
    /* @__PURE__ */ jsx(Hero, { innerPage }),
    innerPage.sections.length > 0 && /* @__PURE__ */ jsx(Index$1, { sections: innerPage.sections }),
    innerPage.slug === "careers" && jobCirculars && /* @__PURE__ */ jsx(Career, { jobCirculars }),
    /* @__PURE__ */ jsx("div", { className: "container", children: innerPage.description && /* @__PURE__ */ jsx("div", { className: "bg-muted mx-auto my-20 max-w-3xl rounded-2xl px-6 py-10 md:px-20", children: /* @__PURE__ */ jsx(TiptapRenderer, { children: innerPage.description }) }) })
  ] });
};
export {
  Index as default
};
