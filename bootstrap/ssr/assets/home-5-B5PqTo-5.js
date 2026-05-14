import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import Blogs from "./blogs-N6_SlAKG.js";
import CallToAction from "./call-to-action-BCiA3PzG.js";
import FAQs from "./faqs-Cah1u373.js";
import Hero from "./hero-Dd3lSxoF.js";
import Instructor from "./instructor-CjL08Ysc.js";
import Statistics from "./statistics-Dmw2sV5n.js";
import Testimonials from "./testimonials-DAGN3P9O.js";
import TopCategories from "./top-categories-VJgKOziG.js";
import TopCourse from "./top-course-AOd3gbJi.js";
import TopCourses from "./top-courses-OPEZ9b2V.js";
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
import "./accordion-DVAMjldm.js";
import "@radix-ui/react-accordion";
import "./instructor-socials-Dio3oqYc.js";
import "./review-card-1-CvH9rEb9.js";
import "./category-card-4-DDDQQDQ7.js";
import "./course-card-5-DoRN8eum.js";
import "./separator-R7EO2G8T.js";
import "@radix-ui/react-separator";
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
const Home3 = ({ page, system }) => {
  const { sections } = page;
  const components = [];
  sections.filter((section) => section.active).map((section) => {
    switch (section.slug) {
      case "hero":
        components.push(Hero);
        break;
      case "statistics":
        components.push(Statistics);
        break;
      case "top_categories":
        components.push(TopCategories);
        break;
      case "top_course":
        components.push(TopCourse);
        break;
      case "top_courses":
        components.push(TopCourses);
        break;
      case "instructor":
        components.push(Instructor);
        break;
      case "faqs":
        components.push(FAQs);
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
    components.map((Component, index) => /* @__PURE__ */ jsx(Component, {}, `home-3-${index}`))
  ] });
};
export {
  Home3 as default
};
