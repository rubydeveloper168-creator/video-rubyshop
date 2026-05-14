import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import Blogs from "./blogs-AOWW4zKQ.js";
import CallToAction from "./call-to-action-BQaOVsWK.js";
import CategoryCourses from "./category-courses-BIt3YF1w.js";
import Features from "./features-BERH8tqv.js";
import Hero from "./hero-CPyKVhMS.js";
import NewCourses from "./new-courses-CsTHmgFJ.js";
import Overview from "./overview-B8s05tVN.js";
import Testimonials from "./testimonials-CR8bEwJ9.js";
import TopCategories from "./top-categories-BzmHQf3L.js";
import TopInstructors from "./top-instructors-Z86AITBB.js";
import Layout from "./layout-CV--V7We.js";
import "./blog-card-1-BzXuNtWf.js";
import "./card-CXRouz5c.js";
import "react";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "date-fns";
import "./avatar-Cr_jqfHL.js";
import "@radix-ui/react-avatar";
import "./button-jZyzwgdo.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./carousel-EYxgwHQ0.js";
import "embla-carousel-react";
import "./page-D-1sFXYI.js";
import "embla-carousel-autoplay";
import "lucide-react";
import "./section-DM2a0QGA.js";
import "./dialog-DD5SXV81.js";
import "@radix-ui/react-dialog";
import "./chunked-uploader-input-MwXGR7K4.js";
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
import "./subscribe-input-AB-2gOUD.js";
import "./button-gradient-primary-Dgn8gIzu.js";
import "./course-card-2-Der02Vfk.js";
import "./tabs-Bhd5qJJs.js";
import "@radix-ui/react-tabs";
import "./partners-Ckbf83qx.js";
import "./instructor-socials-Dio3oqYc.js";
import "./data-sort-modal-Cg4d_jDY.js";
import "nprogress";
import "./switch-CNsdrSya.js";
import "@radix-ui/react-switch";
import "./landing-layout-evsEYR3t.js";
import "./app-logo-GKkeg_7r.js";
import "./main-BqrosZ6t.js";
import "next-themes";
import "./appearance-DLkkIZHp.js";
import "./notification-Dc7j1bw9.js";
import "./popover-BV7JTqNd.js";
import "@radix-ui/react-popover";
import "./profile-toggle-CeGVdaNT.js";
import "nanoid";
import "./use-auth-8FvJer_G.js";
import "./use-screen-B7SDA5zE.js";
const Home2 = ({ page, system }) => {
  const { sections } = page;
  const components = [];
  sections.filter((section) => section.active).map((section) => {
    switch (section.slug) {
      case "hero":
        components.push(Hero);
        break;
      case "overview":
        components.push(Overview);
        break;
      case "category_courses":
        components.push(CategoryCourses);
        break;
      case "top_instructors":
        components.push(TopInstructors);
        break;
      case "features":
        components.push(Features);
        break;
      case "top_categories":
        components.push(TopCategories);
        break;
      case "new_courses":
        components.push(NewCourses);
        break;
      case "testimonials":
        components.push(Testimonials);
        break;
      case "call_to_action":
        components.push(CallToAction);
        break;
      case "blogs":
        components.push(Blogs);
        break;
    }
  });
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(Head, { title: system.fields.name }),
    components.map((Component, index) => /* @__PURE__ */ jsx(Component, {}, `home-2-${index}`))
  ] });
};
export {
  Home2 as default
};
