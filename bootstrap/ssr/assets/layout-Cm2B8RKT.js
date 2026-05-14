import { jsx, jsxs } from "react/jsx-runtime";
import { B as Button } from "./button-jZyzwgdo.js";
import { C as Card } from "./card-CXRouz5c.js";
import { S as ScrollArea } from "./scroll-area-DPHRDnwL.js";
import { S as Sheet, a as SheetTrigger, b as SheetContent } from "./sheet-CuVwNO0O.js";
import { u as useScreen } from "./use-screen-B7SDA5zE.js";
import { L as LandingLayout } from "./landing-layout-evsEYR3t.js";
import { g as getQueryParams } from "./route-DlE7FdTW.js";
import { usePage } from "@inertiajs/react";
import { ListFilter } from "lucide-react";
import { useState } from "react";
import BlogFilter from "./blog-filter-BpW1oWoy.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-scroll-area";
import "@radix-ui/react-dialog";
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
import "./search-input-_KZEhUeb.js";
import "./debounce-ZFxqVthq.js";
import "./radio-group-sSS5HHUP.js";
import "@radix-ui/react-radio-group";
const Layout = ({ children }) => {
  const { url, props } = usePage();
  const { category } = props;
  const [open, setOpen] = useState(false);
  getQueryParams(url);
  const { screen } = useScreen();
  return /* @__PURE__ */ jsx(LandingLayout, { customizable: false, children: /* @__PURE__ */ jsxs("div", { className: "container flex items-start gap-6 py-6", children: [
    screen > 768 && /* @__PURE__ */ jsx(Card, { className: "sticky top-24 w-64 p-4", children: /* @__PURE__ */ jsx(BlogFilter, {}) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-6 flex items-center justify-between", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        screen < 768 && /* @__PURE__ */ jsxs(Sheet, { open, onOpenChange: setOpen, children: [
          /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "icon", variant: "outline", children: /* @__PURE__ */ jsx(ListFilter, { className: "h-5 w-5" }) }) }),
          /* @__PURE__ */ jsx(SheetContent, { side: "left", className: "border-border w-[220px]", children: /* @__PURE__ */ jsx(ScrollArea, { className: "h-full", children: /* @__PURE__ */ jsx(BlogFilter, { setOpen }) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold capitalize", children: [
            category ? category == null ? void 0 : category.name : "All",
            " Blogs"
          ] }),
          category && category.description && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: category == null ? void 0 : category.description })
        ] })
      ] }) }),
      children
    ] })
  ] }) });
};
export {
  Layout as default
};
