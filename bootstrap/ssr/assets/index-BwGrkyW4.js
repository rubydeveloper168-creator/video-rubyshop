import { jsxs, jsx } from "react/jsx-runtime";
import { T as TableFilter } from "./table-filter-Bb8orCSv.js";
import { T as TableFooter } from "./table-footer-DKVIQyQk.js";
import { T as Table, a as TableHeader, b as TableBody, c as TableRow, d as TableCell } from "./table-header-DWitEfum.js";
import { B as Button } from "./button-jZyzwgdo.js";
import { C as Card } from "./card-CXRouz5c.js";
import { S as Separator } from "./separator-R7EO2G8T.js";
import { D as DashboardLayout } from "./layout-DNClQoa9.js";
import { Link } from "@inertiajs/react";
import { useReactTable, getFilteredRowModel, getSortedRowModel, getCoreRowModel, flexRender } from "@tanstack/react-table";
import * as React from "react";
import AdminTableColumn from "./admin-table-columns-VuVchRDT.js";
import InstructorTableColumn from "./instructor-table-columns-AwOxcjA_.js";
import "./debounce-ZFxqVthq.js";
import "./route-DlE7FdTW.js";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "lucide-react";
import "./dropdown-menu-CECYoeyz.js";
import "@radix-ui/react-dropdown-menu";
import "./scroll-area-DPHRDnwL.js";
import "@radix-ui/react-scroll-area";
import "./table-page-size-Cwe1Bz4B.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-separator";
import "./sidebar-6wqj6oXO.js";
import "./sheet-CuVwNO0O.js";
import "@radix-ui/react-dialog";
import "./tooltip-DswKljFZ.js";
import "@radix-ui/react-tooltip";
import "./main-BqrosZ6t.js";
import "next-themes";
import "sonner";
import "./appearance-DLkkIZHp.js";
import "./notification-Dc7j1bw9.js";
import "./popover-BV7JTqNd.js";
import "@radix-ui/react-popover";
import "date-fns";
import "./app-logo-GKkeg_7r.js";
import "./accordion-DVAMjldm.js";
import "@radix-ui/react-accordion";
import "./avatar-Cr_jqfHL.js";
import "@radix-ui/react-avatar";
import "./delete-modal-CvTLW8xe.js";
import "./dialog-DD5SXV81.js";
import "./badge-B4crNM73.js";
const Index = (props) => {
  const [sorting, setSorting] = React.useState([]);
  const table = useReactTable({
    data: props.enrollments.data,
    columns: props.auth.user.role === "admin" ? AdminTableColumn : InstructorTableColumn,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting }
  });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Link, { href: route("enrollments.create"), children: /* @__PURE__ */ jsx(Button, { children: "Add New Enrollment" }) }),
    /* @__PURE__ */ jsx(Separator, { className: "my-6" }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(
        TableFilter,
        {
          data: props.enrollments,
          title: "Course List",
          globalSearch: true,
          tablePageSizes: [10, 15, 20, 25],
          routeName: "enrollments.index"
        }
      ),
      /* @__PURE__ */ jsxs(Table, { className: "border-border border-y", children: [
        /* @__PURE__ */ jsx(TableHeader, { table }),
        /* @__PURE__ */ jsx(TableBody, { children: props.enrollments.data && props.enrollments.data.length > 0 ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(TableRow, { "data-state": row.getIsSelected() && "selected", children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id)) }, row.id)) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { className: "h-24 text-center", children: "No results." }) }) })
      ] }),
      /* @__PURE__ */ jsx(TableFooter, { className: "p-5 sm:p-7", routeName: "enrollments.index", paginationInfo: props.enrollments })
    ] })
  ] });
};
Index.layout = (page) => /* @__PURE__ */ jsx(DashboardLayout, { children: page });
export {
  Index as default
};
