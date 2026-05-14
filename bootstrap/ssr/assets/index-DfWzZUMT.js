import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { D as DashboardLayout } from "./layout-DNClQoa9.js";
import { usePage, Head } from "@inertiajs/react";
import { CheckCircle, AlertTriangle } from "lucide-react";
import ApplicationBackup from "./application-backup-DlrnLCAq.js";
import ApplicationBackupList from "./application-backup-list-DMlk-bTX.js";
import ApplicationUpdate from "./application-update-D2o9QR2O.js";
import "./sidebar-6wqj6oXO.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "./button-jZyzwgdo.js";
import "./separator-R7EO2G8T.js";
import "@radix-ui/react-separator";
import "./sheet-CuVwNO0O.js";
import "@radix-ui/react-dialog";
import "./tooltip-DswKljFZ.js";
import "@radix-ui/react-tooltip";
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
import "./input-error-CEW4jhey.js";
import "./loading-button-C4Hk_jCd.js";
import "./card-CXRouz5c.js";
import "./dialog-DD5SXV81.js";
import "./chunked-uploader-input-MwXGR7K4.js";
import "./input-C6-Ta46A.js";
import "axios";
import "./label-Dd_w2I6M.js";
import "@radix-ui/react-label";
const Maintenance = ({ version }) => {
  var _a, _b;
  const page = usePage();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "App Maintenance" }),
    /* @__PURE__ */ jsxs("div", { className: "md:px-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col justify-between gap-7 sm:flex-row sm:items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-nowrap", children: "App Maintenance" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm md:text-base", children: "Update, backup and restore your application safely and automatically." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-nowrap", children: "App Version" }),
          /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground text-sm text-nowrap md:text-base", children: [
            "Current Version: ",
            /* @__PURE__ */ jsx("span", { className: "text-primary font-bold", children: version })
          ] })
        ] })
      ] }),
      ((_a = page.props.flash) == null ? void 0 : _a.success) && /* @__PURE__ */ jsx("div", { className: "mb-6 rounded-lg border border-green-200 bg-green-50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
        /* @__PURE__ */ jsx(CheckCircle, { className: "mt-0.5 h-5 w-5 text-green-600" }),
        /* @__PURE__ */ jsx("div", { className: "ml-3", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-green-800", children: String(page.props.flash.success) }) })
      ] }) }),
      ((_b = page.props.flash) == null ? void 0 : _b.error) && /* @__PURE__ */ jsx("div", { className: "mb-6 rounded-lg border border-red-200 bg-red-50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
        /* @__PURE__ */ jsx(AlertTriangle, { className: "mt-0.5 h-5 w-5 text-red-600" }),
        /* @__PURE__ */ jsx("div", { className: "ml-3", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-red-800", children: String(page.props.flash.error) }) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx(ApplicationUpdate, {}),
        /* @__PURE__ */ jsx(ApplicationBackup, {}),
        /* @__PURE__ */ jsx(ApplicationBackupList, {})
      ] })
    ] })
  ] });
};
Maintenance.layout = (page) => /* @__PURE__ */ jsx(DashboardLayout, { children: page });
export {
  Maintenance as default
};
