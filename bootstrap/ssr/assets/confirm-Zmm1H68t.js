import { jsxs, jsx } from "react/jsx-runtime";
import { B as Button } from "./button-jZyzwgdo.js";
import { C as Card, a as CardHeader, d as CardTitle, e as CardDescription, b as CardContent } from "./card-CXRouz5c.js";
import { A as AuthLayout } from "./auth-layout-DmVWIKYr.js";
import { useForm, Head } from "@inertiajs/react";
import { Shield, Power } from "lucide-react";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "./app-logo-GKkeg_7r.js";
import "./main-BqrosZ6t.js";
import "next-themes";
import "sonner";
function SystemRebootConfirm() {
  const { post, processing } = useForm();
  const handleReboot = (e) => {
    e.preventDefault();
    post("/system/reboot/execute");
  };
  return /* @__PURE__ */ jsxs(AuthLayout, { title: "System Reboot Confirmation", description: "Please review the warnings before proceeding", children: [
    /* @__PURE__ */ jsx(Head, { title: "System Reboot Confirmation" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(Card, { className: "border-blue-200 bg-blue-50", children: /* @__PURE__ */ jsx(CardHeader, { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Shield, { className: "h-5 w-5 text-blue-600" }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-lg text-blue-900", children: "Admin Verified" })
      ] }) }) }),
      /* @__PURE__ */ jsxs(Card, { className: "border-yellow-200 bg-yellow-50", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "p-4", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-lg text-yellow-900", children: "System Operations" }),
          /* @__PURE__ */ jsx(CardDescription, { className: "text-yellow-700", children: "The following operations will be performed:" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-2 p-4 text-sm text-yellow-800", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "1." }),
            /* @__PURE__ */ jsx("span", { children: "Clear and rebuild application cache, route, view and config" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "5." }),
            /* @__PURE__ */ jsx("span", { children: "Bring application out of maintenance mode" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleReboot, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs(Button, { type: "submit", className: "w-full bg-orange-600 text-white hover:bg-orange-700", disabled: processing, size: "lg", children: [
          /* @__PURE__ */ jsx(Power, { className: "mr-2 h-4 w-4" }),
          processing ? "Rebooting System..." : "Reboot System"
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "secondary", className: "w-full", onClick: () => window.history.back(), disabled: processing, children: "Cancel" })
      ] })
    ] })
  ] });
}
export {
  SystemRebootConfirm as default
};
