import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { T as TableFilter } from "./table-filter-Bb8orCSv.js";
import { T as TableFooter } from "./table-footer-DKVIQyQk.js";
import { T as Table, a as TableHeader, b as TableBody, c as TableRow, d as TableCell } from "./table-header-DWitEfum.js";
import { B as Button } from "./button-jZyzwgdo.js";
import { C as Card, b as CardContent, d as CardTitle } from "./card-CXRouz5c.js";
import { D as DashboardLayout } from "./layout-DNClQoa9.js";
import { useReactTable, getFilteredRowModel, getSortedRowModel, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { CircleDollarSign, Wallet, DollarSign, Plus } from "lucide-react";
import PayoutsTableColumn from "./payouts-table-columns-DnzWMwpj.js";
import WithdrawForm from "./withdraw-form-C0QpOtTA.js";
import "./debounce-ZFxqVthq.js";
import "./route-DlE7FdTW.js";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "@inertiajs/react";
import "react";
import "./dropdown-menu-CECYoeyz.js";
import "@radix-ui/react-dropdown-menu";
import "./scroll-area-DPHRDnwL.js";
import "@radix-ui/react-scroll-area";
import "./table-page-size-Cwe1Bz4B.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./sidebar-6wqj6oXO.js";
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
import "./notification-Dc7j1bw9.js";
import "./popover-BV7JTqNd.js";
import "@radix-ui/react-popover";
import "date-fns";
import "./app-logo-GKkeg_7r.js";
import "./accordion-DVAMjldm.js";
import "@radix-ui/react-accordion";
import "./avatar-Cr_jqfHL.js";
import "@radix-ui/react-avatar";
import "./input-error-CEW4jhey.js";
import "./loading-button-C4Hk_jCd.js";
import "./dialog-DD5SXV81.js";
import "./input-C6-Ta46A.js";
import "./label-Dd_w2I6M.js";
import "@radix-ui/react-label";
import "./inertia-BtwbgBI3.js";
const Index = (props) => {
  var _a;
  const { payouts, totalEarnings, totalPayouts, pendingPayouts, availableForWithdrawal } = props;
  const table = useReactTable({
    data: payouts.data,
    columns: PayoutsTableColumn,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 grid gap-6 sm:grid-cols-2 md:grid-cols-4", children: [
      /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "flex items-center gap-4 p-6", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-primary/10 rounded-lg p-2", children: /* @__PURE__ */ jsx(CircleDollarSign, { className: "text-primary h-6 w-6" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-base font-medium", children: "Total Earnings" }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-2xl font-bold", children: [
            totalEarnings,
            " $"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "flex items-center gap-4 p-6", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-primary/10 rounded-lg p-2", children: /* @__PURE__ */ jsx(Wallet, { className: "text-primary h-6 w-6" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-base font-medium", children: "Available" }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-2xl font-bold", children: [
            availableForWithdrawal,
            " $"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "flex items-center gap-4 p-6", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-primary/10 rounded-lg p-2", children: /* @__PURE__ */ jsx(DollarSign, { className: "text-primary h-6 w-6" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-base font-medium", children: "Total Payout" }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-2xl font-bold", children: [
            totalPayouts,
            " $"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "flex items-center gap-4 p-6", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-primary/10 rounded-lg p-2", children: /* @__PURE__ */ jsx(CircleDollarSign, { className: "text-primary h-6 w-6" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-base font-medium", children: "Requested" }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-2xl font-bold", children: [
            pendingPayouts,
            " $"
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "gap-0 py-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-between", children: [
        /* @__PURE__ */ jsx(
          TableFilter,
          {
            data: payouts,
            title: "Withdraw List",
            globalSearch: true,
            tablePageSizes: [10, 15, 20, 25],
            routeName: "payouts.index",
            className: "w-full md:pr-3"
          }
        ),
        /* @__PURE__ */ jsx(
          WithdrawForm,
          {
            title: "Add Withdraw Request",
            handler: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "absolute top-5 right-6 md:static md:mr-6 md:mb-1", children: [
              /* @__PURE__ */ jsx(Plus, {}),
              /* @__PURE__ */ jsx("span", { children: "Request" })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(Table, { className: "border-border border-y", children: [
        /* @__PURE__ */ jsx(TableHeader, { table }),
        /* @__PURE__ */ jsx(TableBody, { children: ((_a = table.getRowModel().rows) == null ? void 0 : _a.length) ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(TableRow, { "data-state": row.getIsSelected() && "selected", children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id)) }, row.id)) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { className: "h-24 text-center", children: "No results." }) }) })
      ] }),
      /* @__PURE__ */ jsx(TableFooter, { className: "mt-1 p-5 sm:p-7", routeName: "payouts.index", paginationInfo: payouts })
    ] })
  ] });
};
Index.layout = (children) => /* @__PURE__ */ jsx(DashboardLayout, { children });
export {
  Index as default
};
