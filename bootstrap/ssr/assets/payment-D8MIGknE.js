import { jsx, jsxs } from "react/jsx-runtime";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-Bhd5qJJs.js";
import { D as DashboardLayout } from "./layout-DNClQoa9.js";
import { g as getQueryParams } from "./route-DlE7FdTW.js";
import { usePage, router } from "@inertiajs/react";
import Mollie from "./mollie-CrPuMCWj.js";
import Paypal from "./paypal-BjFLw12Z.js";
import Paystack from "./paystack-Bo_jeG9q.js";
import Razorpay from "./razorpay-CluJjG1b.js";
import SSLCommerz from "./sslcommerz-D0Mur9vn.js";
import Stripe from "./stripe-BIuoxLP3.js";
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
import "./avatar-Cr_jqfHL.js";
import "@radix-ui/react-avatar";
import "./input-error-CEW4jhey.js";
import "./loading-button-C4Hk_jCd.js";
import "./card-CXRouz5c.js";
import "./input-C6-Ta46A.js";
import "./label-Dd_w2I6M.js";
import "@radix-ui/react-label";
import "./select-BxPdBi6V.js";
import "@radix-ui/react-select";
import "./switch-CNsdrSya.js";
import "@radix-ui/react-switch";
import "./inertia-BtwbgBI3.js";
const Payment = ({ payments }) => {
  const page = usePage();
  const params = getQueryParams(page.url);
  const tabs = payments.map((payment) => {
    let Component;
    switch (payment.sub_type) {
      case "paypal":
        Component = Paypal;
        break;
      case "stripe":
        Component = Stripe;
        break;
      case "mollie":
        Component = Mollie;
        break;
      case "paystack":
        Component = Paystack;
        break;
      case "sslcommerz":
        Component = SSLCommerz;
        break;
      case "razorpay":
        Component = Razorpay;
        break;
      default:
        Component = ({ payment: payment2 }) => /* @__PURE__ */ jsx("div", { children: "No component found" });
        break;
    }
    return {
      ...payment,
      Component
    };
  });
  return /* @__PURE__ */ jsx("section", { className: "md:px-3", children: /* @__PURE__ */ jsxs(Tabs, { value: params["tab"] ?? tabs[0].sub_type, className: "grid grid-rows-1 gap-5 md:grid-cols-4", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(TabsList, { className: "horizontal-tabs-list", children: tabs.map(({ id, title, sub_type }) => /* @__PURE__ */ jsx(
      TabsTrigger,
      {
        value: sub_type,
        className: "horizontal-tabs-trigger",
        onClick: () => router.get(
          route("settings.payment", {
            tab: sub_type
          })
        ),
        children: title
      },
      id
    )) }) }),
    /* @__PURE__ */ jsx("div", { className: "md:col-span-3", children: tabs.map((payment) => /* @__PURE__ */ jsx(TabsContent, { value: payment.sub_type, className: "m-0", children: /* @__PURE__ */ jsx(payment.Component, { payment }) }, payment.id)) })
  ] }) });
};
Payment.layout = (page) => /* @__PURE__ */ jsx(DashboardLayout, { children: page });
export {
  Payment as default
};
