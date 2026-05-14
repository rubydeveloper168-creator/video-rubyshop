import { jsx, jsxs } from "react/jsx-runtime";
import { D as DeleteModal } from "./delete-modal-CvTLW8xe.js";
import { B as Button } from "./button-jZyzwgdo.js";
import { P as Popover, a as PopoverTrigger, b as PopoverContent } from "./popover-BV7JTqNd.js";
import { router } from "@inertiajs/react";
import { MoreVertical } from "lucide-react";
import { toast } from "sonner";
import "./dialog-DD5SXV81.js";
import "@radix-ui/react-dialog";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-popover";
const TableColumn = () => [
  {
    accessorKey: "name",
    header: () => /* @__PURE__ */ jsx("p", { className: "px-3", children: "Name" }),
    cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "px-3 py-1 text-sm font-medium", children: row.getValue("name") })
  },
  {
    accessorKey: "slug",
    header: () => /* @__PURE__ */ jsx("p", { className: "px-3", children: "Slug" }),
    cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-muted-foreground px-3 py-1 text-sm", children: row.getValue("slug") })
  },
  {
    accessorKey: "title",
    header: () => /* @__PURE__ */ jsx("p", { className: "px-3", children: "Title" }),
    cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-muted-foreground px-3 py-1 text-sm", children: row.getValue("title") })
  },
  {
    accessorKey: "meta_description",
    header: () => /* @__PURE__ */ jsx("p", { className: "px-3", children: "Meta Description" }),
    cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-muted-foreground px-3 py-1 text-sm", children: row.getValue("meta_description") })
  },
  {
    accessorKey: "meta_keywords",
    header: () => /* @__PURE__ */ jsx("p", { className: "px-3", children: "Meta Keywords" }),
    cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-muted-foreground px-3 py-1 text-sm", children: row.getValue("meta_keywords") })
  },
  {
    id: "action",
    header: () => /* @__PURE__ */ jsx("div", { className: "px-3 text-center", children: "action" }),
    cell: ({ row }) => {
      const page = row.original;
      const url = window.location.origin + "/" + page.slug;
      return /* @__PURE__ */ jsxs(Popover, { children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-end pr-4", children: /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
          Button,
          {
            size: "icon",
            variant: "ghost",
            onClick: (e) => e.stopPropagation(),
            className: "bg-muted hover:!bg-muted-foreground/10 h-8 w-8",
            children: /* @__PURE__ */ jsx(MoreVertical, { className: "h-4 w-4" })
          }
        ) }) }),
        /* @__PURE__ */ jsxs(PopoverContent, { align: "end", className: "flex w-[140px] flex-col space-y-1 p-2", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "sm",
              variant: "ghost",
              className: "bg-muted hover:!bg-muted-foreground/10",
              onClick: () => router.get(route("settings.custom-page.edit", page.id)),
              children: /* @__PURE__ */ jsx("span", { children: "Edit Page" })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "sm",
              variant: "ghost",
              className: "bg-muted hover:!bg-muted-foreground/10",
              onClick: () => {
                navigator.clipboard.writeText(url);
                toast.success("URL copied to clipboard");
              },
              children: /* @__PURE__ */ jsx("span", { children: "Copy URL" })
            }
          ),
          /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", className: "bg-muted hover:!bg-muted-foreground/10", children: /* @__PURE__ */ jsx("a", { target: "_blank", href: route("inner.page", page.slug), children: "Preview Page" }) }),
          page.slug !== "about-us" && page.slug !== "our-team" && page.slug !== "careers" && /* @__PURE__ */ jsx(
            DeleteModal,
            {
              routePath: route("settings.custom-page.destroy", page.id),
              actionComponent: /* @__PURE__ */ jsx(Button, { size: "sm", variant: "destructive", children: /* @__PURE__ */ jsx("span", { children: "Delete" }) })
            }
          )
        ] })
      ] });
    }
  }
];
export {
  TableColumn as default
};
