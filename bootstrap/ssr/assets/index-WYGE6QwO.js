import { jsxs, jsx } from "react/jsx-runtime";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-Bhd5qJJs.js";
import { D as DashboardLayout } from "./layout-DNClQoa9.js";
import Footer from "./footer-Z16sn2eV.js";
import Navbar from "./navbar-J3XuF3IC.js";
import Style from "./style-BGl7_o9L.js";
import Website from "./website-D5KVMxOz.js";
import "react";
import "@radix-ui/react-tabs";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "./sidebar-6wqj6oXO.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "lucide-react";
import "./button-jZyzwgdo.js";
import "./separator-R7EO2G8T.js";
import "@radix-ui/react-separator";
import "./sheet-CuVwNO0O.js";
import "@radix-ui/react-dialog";
import "./tooltip-DswKljFZ.js";
import "@radix-ui/react-tooltip";
import "@inertiajs/react";
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
import "./scroll-area-DPHRDnwL.js";
import "@radix-ui/react-scroll-area";
import "./app-logo-GKkeg_7r.js";
import "./accordion-DVAMjldm.js";
import "@radix-ui/react-accordion";
import "./route-DlE7FdTW.js";
import "./avatar-Cr_jqfHL.js";
import "@radix-ui/react-avatar";
import "./card-CXRouz5c.js";
import "./data-sort-modal-Cg4d_jDY.js";
import "nprogress";
import "./dialog-DD5SXV81.js";
import "./delete-modal-CvTLW8xe.js";
import "./input-C6-Ta46A.js";
import "./label-Dd_w2I6M.js";
import "@radix-ui/react-label";
import "./select-BxPdBi6V.js";
import "@radix-ui/react-select";
import "./switch-CNsdrSya.js";
import "@radix-ui/react-switch";
import "./badge-B4crNM73.js";
import "lucide-react/dynamic";
import "./profile-toggle-CeGVdaNT.js";
import "nanoid";
import "./input-error-CEW4jhey.js";
import "./loading-button-C4Hk_jCd.js";
import "./theme-BnORSbS2.js";
import "@codemirror/language";
import "@codemirror/view";
import "@lezer/highlight";
import "@codemirror/autocomplete";
import "@codemirror/commands";
import "@codemirror/lang-css";
import "@codemirror/search";
import "@codemirror/state";
import "./combobox-VTqRvK5M.js";
import "cmdk";
import "./textarea-DctRxpgE.js";
import "./inertia-BtwbgBI3.js";
const System = () => {
  return /* @__PURE__ */ jsxs("div", { className: "md:px-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "System Settings" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Manage your system's core settings" })
    ] }),
    /* @__PURE__ */ jsxs(Tabs, { defaultValue: "website", children: [
      /* @__PURE__ */ jsxs(TabsList, { className: "h-13 px-2", children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "website", className: "h-10 cursor-pointer px-6", children: "Website" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "navbar", className: "h-10 cursor-pointer px-6", children: "Navbar" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "footer", className: "h-10 cursor-pointer px-6", children: "Footer" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "style", className: "h-10 cursor-pointer px-6", children: "Style" })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "website", children: /* @__PURE__ */ jsx(Website, {}) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "navbar", children: /* @__PURE__ */ jsx(Navbar, {}) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "footer", children: /* @__PURE__ */ jsx(Footer, {}) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "style", children: /* @__PURE__ */ jsx(Style, {}) })
    ] })
  ] });
};
System.layout = (page) => /* @__PURE__ */ jsx(DashboardLayout, { children: page });
export {
  System as default
};
