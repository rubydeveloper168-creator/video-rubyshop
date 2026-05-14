import { jsxs, jsx } from "react/jsx-runtime";
import { T as Table, a as TableHeader, b as TableBody, c as TableRow, d as TableCell } from "./table-header-DWitEfum.js";
import { B as Button } from "./button-jZyzwgdo.js";
import { C as Card } from "./card-CXRouz5c.js";
import { D as DashboardLayout } from "./layout-DNClQoa9.js";
import { c as cn } from "./utils-BmtPBcb0.js";
import PayoutsTableColumn$1 from "./payouts-table-columns-DnzWMwpj.js";
import PayoutsTableColumn from "./request-table-columns-B-HgXkFv.js";
import { Head, Link } from "@inertiajs/react";
import { useReactTable, getFilteredRowModel, getSortedRowModel, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useMemo } from "react";
import { FiBookOpen, FiVideo, FiUserCheck, FiUsers, FiUserPlus } from "react-icons/fi";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import RevenueChart from "./revenue-chart-BY9MRZ-U.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./sidebar-6wqj6oXO.js";
import "lucide-react";
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
import "./route-DlE7FdTW.js";
import "./avatar-Cr_jqfHL.js";
import "@radix-ui/react-avatar";
import "clsx";
import "tailwind-merge";
const breadcrumbs = [
  {
    title: "Dashboard",
    href: "/dashboard"
  }
];
const Dashboard = (props) => {
  var _a;
  const { auth, system, statistics, revenueData, courseStatusDistribution, pendingWithdrawals } = props;
  const isAdmin = auth.user.role === "admin";
  useMemo(() => {
    return Object.entries(revenueData).map(([month, value]) => ({
      month,
      value
    }));
  }, [revenueData]);
  const pieChartData = useMemo(() => {
    return Object.entries(courseStatusDistribution).map(([name, value]) => ({
      name,
      value
    }));
  }, [courseStatusDistribution]);
  const table = useReactTable({
    data: pendingWithdrawals,
    columns: isAdmin ? PayoutsTableColumn : PayoutsTableColumn$1,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-7", children: [
    /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
    /* @__PURE__ */ jsxs("div", { className: cn("grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3", isAdmin ? "lg:grid-cols-5" : "lg:grid-cols-4"), children: [
      /* @__PURE__ */ jsx(StatCard, { title: "Courses", value: statistics.courses, icon: /* @__PURE__ */ jsx(FiBookOpen, { className: "h-6 w-6 text-blue-500" }) }),
      /* @__PURE__ */ jsx(StatCard, { title: "Lessons", value: statistics.lessons, icon: /* @__PURE__ */ jsx(FiVideo, { className: "h-6 w-6 text-green-500" }) }),
      /* @__PURE__ */ jsx(StatCard, { title: "Enrollment", value: statistics.enrollments, icon: /* @__PURE__ */ jsx(FiUserCheck, { className: "h-6 w-6 text-amber-500" }) }),
      /* @__PURE__ */ jsx(StatCard, { title: "Students", value: statistics.students, icon: /* @__PURE__ */ jsx(FiUsers, { className: "h-6 w-6 text-purple-500" }) }),
      isAdmin && /* @__PURE__ */ jsx(StatCard, { title: "Instructor", value: statistics.instructors, icon: /* @__PURE__ */ jsx(FiUserPlus, { className: "h-6 w-6 text-rose-500" }) })
    ] }),
    system.sub_type === "collaborative" && /* @__PURE__ */ jsx(RevenueChart, {}),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6 lg:grid-cols-12", children: [
      /* @__PURE__ */ jsxs(Card, { className: "col-span-full p-6 lg:col-span-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg font-medium", children: "Course Status" }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxs(PieChart, { children: [
          /* @__PURE__ */ jsx(
            Pie,
            {
              data: pieChartData,
              cx: "50%",
              cy: "50%",
              innerRadius: 0,
              outerRadius: 80,
              fill: "#8884d8",
              dataKey: "value",
              paddingAngle: 0,
              label: false,
              children: pieChartData.map((entry, index) => /* @__PURE__ */ jsx(
                Cell,
                {
                  fill: [
                    "oklch(0.8 0.14 160.7)",
                    // Lightest variant
                    "oklch(0.75 0.145 160.7)",
                    // Light variant
                    "oklch(0.65 0.145 160.7)",
                    // Base color (secondary-foreground)
                    "oklch(0.55 0.14 160.7)",
                    // Dark variant
                    "oklch(0.45 0.135 160.7)"
                    // Darkest variant
                  ][index % 5]
                },
                `cell-${index}`
              ))
            }
          ),
          /* @__PURE__ */ jsx(Legend, { layout: "horizontal", align: "center", verticalAlign: "bottom", iconType: "circle" }),
          /* @__PURE__ */ jsx(Tooltip, { formatter: (value) => [value, "Courses"] })
        ] }) }) })
      ] }),
      system.sub_type === "collaborative" ? /* @__PURE__ */ jsxs(Card, { className: "col-span-full lg:col-span-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-6 p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium", children: "Latest Pending Withdrawal Request" }),
          /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsx(Link, { href: isAdmin ? route("payouts.request.index") : route("payouts.index"), children: "View All" }) })
        ] }),
        /* @__PURE__ */ jsxs(Table, { className: "border-border border-y", children: [
          /* @__PURE__ */ jsx(TableHeader, { table }),
          /* @__PURE__ */ jsx(TableBody, { children: ((_a = table.getRowModel().rows) == null ? void 0 : _a.length) ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(TableRow, { "data-state": row.getIsSelected() && "selected", children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id)) }, row.id)) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { className: "h-24 text-center", children: "No results." }) }) })
        ] })
      ] }) : /* @__PURE__ */ jsx("div", { className: "col-span-full lg:col-span-8", children: /* @__PURE__ */ jsx(RevenueChart, {}) })
    ] })
  ] });
};
const StatCard = ({ title, value, icon }) => {
  return /* @__PURE__ */ jsx(Card, { className: "p-4 sm:p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm font-medium", children: title }),
      /* @__PURE__ */ jsx("h4", { className: "mt-1 text-2xl font-semibold", children: value })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "rounded-full bg-gray-100 p-3", children: icon })
  ] }) });
};
Dashboard.layout = (page) => /* @__PURE__ */ jsx(DashboardLayout, { children: page, breadcrumbs, headTitle: "Dashboard" });
export {
  Dashboard as default
};
