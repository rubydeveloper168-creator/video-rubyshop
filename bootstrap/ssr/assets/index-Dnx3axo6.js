import { jsxs, jsx } from "react/jsx-runtime";
import { T as TableFilter } from "./table-filter-Bb8orCSv.js";
import { T as TableFooter } from "./table-footer-DKVIQyQk.js";
import { B as Button } from "./button-jZyzwgdo.js";
import { C as Card } from "./card-CXRouz5c.js";
import { L as LandingLayout } from "./landing-layout-evsEYR3t.js";
import { c as cn } from "./utils-BmtPBcb0.js";
import { router, Link } from "@inertiajs/react";
import { formatDistanceToNow, format } from "date-fns";
import "./debounce-ZFxqVthq.js";
import "./route-DlE7FdTW.js";
import "lucide-react";
import "react";
import "./dropdown-menu-CECYoeyz.js";
import "@radix-ui/react-dropdown-menu";
import "./scroll-area-DPHRDnwL.js";
import "@radix-ui/react-scroll-area";
import "./table-page-size-Cwe1Bz4B.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./app-logo-GKkeg_7r.js";
import "lucide-react/dynamic";
import "./main-BqrosZ6t.js";
import "next-themes";
import "sonner";
import "./appearance-DLkkIZHp.js";
import "./notification-Dc7j1bw9.js";
import "./popover-BV7JTqNd.js";
import "@radix-ui/react-popover";
import "./profile-toggle-CeGVdaNT.js";
import "./avatar-Cr_jqfHL.js";
import "@radix-ui/react-avatar";
import "nanoid";
import "./use-auth-8FvJer_G.js";
import "./use-screen-B7SDA5zE.js";
import "clsx";
import "tailwind-merge";
const Index = ({ notifications }) => {
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-2xl py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4 pb-5 md:pb-6", children: [
      /* @__PURE__ */ jsx(
        TableFilter,
        {
          data: notifications,
          title: "Notification List",
          globalSearch: false,
          tablePageSizes: [10, 15, 20, 25],
          routeName: "notifications.index",
          className: "w-full p-0 md:p-0"
        }
      ),
      notifications.total > 0 && /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => router.put(route("notifications.mark-all-as-read")), children: "Mark all as read" })
    ] }),
    /* @__PURE__ */ jsx(Card, { className: "flex flex-col divide-y", children: notifications.data.length > 0 ? notifications.data.map(({ id, data, created_at }) => {
      const time = formatDistanceToNow(new Date(created_at), { addSuffix: true });
      const timeText = time.slice(0, 1).toUpperCase() + time.slice(1);
      return /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("notifications.show", id),
          className: cn("hover:bg-accent/50 flex flex-col gap-1 px-4 py-2 transition-colors"),
          children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium capitalize", children: data.title }),
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-xs", title: format(new Date(created_at), "PPpp"), children: timeText })
          ]
        },
        id
      );
    }) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground p-6 text-center text-sm", children: "No unread notifications" }) }),
    /* @__PURE__ */ jsx(TableFooter, { className: "mt-1 p-5 sm:p-7", routeName: "notifications.index", paginationInfo: notifications })
  ] });
};
Index.layout = (page) => /* @__PURE__ */ jsx(LandingLayout, { children: page, customizable: false });
export {
  Index as default
};
