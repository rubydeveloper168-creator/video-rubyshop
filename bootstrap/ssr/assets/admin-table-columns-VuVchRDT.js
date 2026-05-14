import { jsx, jsxs } from "react/jsx-runtime";
import { D as DeleteModal } from "./delete-modal-CvTLW8xe.js";
import { B as Badge } from "./badge-B4crNM73.js";
import { B as Button } from "./button-jZyzwgdo.js";
import { Trash2 } from "lucide-react";
import "./dialog-DD5SXV81.js";
import "@radix-ui/react-dialog";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "@inertiajs/react";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
const AdminTableColumn = [
  {
    id: "index",
    header: () => /* @__PURE__ */ jsx("div", { className: "pl-4", children: "#" }),
    cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "w-4 pl-4 text-center font-medium", children: row.index + 1 })
  },
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original.user;
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-muted h-12 w-12 overflow-hidden rounded-full", children: user.photo ? /* @__PURE__ */ jsx("img", { src: user.photo, alt: user.name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center bg-gray-200 text-gray-500", children: /* @__PURE__ */ jsx("span", { className: "text-lg", children: "IMG" }) }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium", children: user.name }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: user.email })
        ] })
      ] });
    }
  },
  {
    id: "enrolled_course",
    header: "Enrolled Course",
    cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "max-w-md", children: /* @__PURE__ */ jsx("p", { className: "line-clamp-1", children: row.original.course.title }) })
  },
  {
    id: "enrolled_date",
    header: "Enrolled Date",
    cell: ({ row }) => {
      const date = new Date(row.original.entry_date);
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric"
      });
      return /* @__PURE__ */ jsx("div", { children: formattedDate });
    }
  },
  {
    id: "expiry_date",
    header: "Expiry Date",
    cell: ({ row }) => {
      if (!row.original.expiry_date) {
        return /* @__PURE__ */ jsx(Badge, { className: "bg-green-100 text-green-800 hover:bg-green-100", children: "Lifetime access" });
      }
      const date = new Date(row.original.expiry_date);
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric"
      });
      return /* @__PURE__ */ jsx("div", { children: formattedDate });
    }
  },
  {
    id: "actions",
    header: () => /* @__PURE__ */ jsx("div", { className: "pr-4 text-end", children: "Action" }),
    cell: ({ row }) => {
      return /* @__PURE__ */ jsx("div", { className: "flex justify-end pr-4", children: /* @__PURE__ */ jsx(
        DeleteModal,
        {
          routePath: route("enrollments.destroy", row.original.id),
          actionComponent: /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-500", children: /* @__PURE__ */ jsx(Trash2, { className: "h-5 w-5" }) })
        }
      ) });
    }
  }
];
export {
  AdminTableColumn as default
};
