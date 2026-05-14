import { jsx } from "react/jsx-runtime";
import { D as DashboardLayout } from "./layout-DNClQoa9.js";
import Google from "./google-sjOp09js.js";
import "./sidebar-6wqj6oXO.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "lucide-react";
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
import "./input-error-CEW4jhey.js";
import "./loading-button-C4Hk_jCd.js";
import "./card-CXRouz5c.js";
import "./input-C6-Ta46A.js";
import "./label-Dd_w2I6M.js";
import "@radix-ui/react-label";
import "./switch-CNsdrSya.js";
import "@radix-ui/react-switch";
import "./inertia-BtwbgBI3.js";
const Auth = ({ auths }) => {
  const components = [Google];
  const tabs = auths.map((auth, index) => ({
    ...auth,
    Component: components[index] ?? /* @__PURE__ */ jsx("div", { children: "No component found" })
  }));
  return /* @__PURE__ */ jsx("section", { className: "md:px-3", children: tabs.map((auth) => /* @__PURE__ */ jsx(auth.Component, { auth }, auth.id)) });
};
Auth.layout = (page) => /* @__PURE__ */ jsx(DashboardLayout, { children: page });
export {
  Auth as default
};
