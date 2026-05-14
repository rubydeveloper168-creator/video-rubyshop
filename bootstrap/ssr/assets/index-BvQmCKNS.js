import { jsxs, jsx } from "react/jsx-runtime";
import { C as Card, b as CardContent } from "./card-CXRouz5c.js";
import { L as LandingLayout } from "./landing-layout-evsEYR3t.js";
import CartSummery from "./cart-summery-DGzBC4w_.js";
import CourseCard from "./course-card-xxA2SH7g.js";
import "react";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "./app-logo-GKkeg_7r.js";
import "@inertiajs/react";
import "./button-jZyzwgdo.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "lucide-react/dynamic";
import "./main-BqrosZ6t.js";
import "next-themes";
import "sonner";
import "./appearance-DLkkIZHp.js";
import "./dropdown-menu-CECYoeyz.js";
import "@radix-ui/react-dropdown-menu";
import "lucide-react";
import "./notification-Dc7j1bw9.js";
import "./popover-BV7JTqNd.js";
import "@radix-ui/react-popover";
import "date-fns";
import "./scroll-area-DPHRDnwL.js";
import "@radix-ui/react-scroll-area";
import "./profile-toggle-CeGVdaNT.js";
import "./avatar-Cr_jqfHL.js";
import "@radix-ui/react-avatar";
import "nanoid";
import "./use-auth-8FvJer_G.js";
import "./use-screen-B7SDA5zE.js";
import "./input-C6-Ta46A.js";
import "./separator-R7EO2G8T.js";
import "@radix-ui/react-separator";
const Index = (props) => {
  const { cart } = props;
  return /* @__PURE__ */ jsxs("div", { className: "container grid grid-cols-1 gap-8 py-6 lg:grid-cols-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-6 text-2xl font-bold", children: "Cart items" }),
      cart.length === 0 ? /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground py-8 text-center", children: "Your cart is empty" }) }) }) : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: cart.map((item) => /* @__PURE__ */ jsx(CourseCard, { course: item.course }, item.id)) })
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(CartSummery, {}) })
  ] });
};
Index.layout = (page) => /* @__PURE__ */ jsx(LandingLayout, { children: page, customizable: false });
export {
  Index as default
};
