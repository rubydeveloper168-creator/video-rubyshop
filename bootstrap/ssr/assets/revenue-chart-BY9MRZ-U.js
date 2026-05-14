import { jsxs, jsx } from "react/jsx-runtime";
import { C as Card } from "./card-CXRouz5c.js";
import { usePage } from "@inertiajs/react";
import { useMemo } from "react";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from "recharts";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
const RevenueChart = () => {
  const { props } = usePage();
  const { auth, revenueData } = props;
  const isAdmin = auth.user.role === "admin";
  const chartData = useMemo(() => {
    return Object.entries(revenueData).map(([month, value]) => ({
      month,
      value
    }));
  }, [revenueData]);
  return /* @__PURE__ */ jsxs(Card, { className: "p-4 sm:p-6", children: [
    /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg font-medium", children: isAdmin ? "Admin Revenue This Year" : "Instructor Revenue This Year" }),
    /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 320, children: /* @__PURE__ */ jsxs(AreaChart, { data: chartData, margin: { top: 10, right: 0, left: -20, bottom: 0 }, children: [
      /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false }),
      /* @__PURE__ */ jsx(XAxis, { dataKey: "month", tickLine: false, axisLine: false, tickMargin: 8, tickFormatter: (value) => value.slice(0, 3) }),
      /* @__PURE__ */ jsx(YAxis, { axisLine: false, tickLine: false, tickMargin: 0 }),
      /* @__PURE__ */ jsx(Tooltip, { formatter: (value) => [`$${value}`, isAdmin ? "Admin Revenue" : "Instructor Revenue"] }),
      /* @__PURE__ */ jsx(
        Area,
        {
          type: "monotone",
          dataKey: "value",
          fill: "var(--color-secondary-dark)",
          stroke: "var(--color-secondary-foreground)",
          fillOpacity: 0.4,
          name: isAdmin ? "Admin Revenue" : "Instructor Revenue"
        }
      )
    ] }) })
  ] });
};
export {
  RevenueChart as default
};
