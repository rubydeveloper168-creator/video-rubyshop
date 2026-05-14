import { jsxs, jsx } from "react/jsx-runtime";
const PayoutsTableColumn = [
  {
    accessorKey: "payout_amount",
    header: () => /* @__PURE__ */ jsx("div", { className: "pl-4", children: "Payout amount" }),
    cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "pl-4 capitalize", children: [
      /* @__PURE__ */ jsx("p", { children: row.original.amount }),
      /* @__PURE__ */ jsx("p", { children: new Date(row.original.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) })
    ] })
  },
  {
    accessorKey: "status",
    header: () => /* @__PURE__ */ jsx("div", { className: "text-center", children: "Status" }),
    cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center capitalize", children: row.getValue("status") })
  },
  {
    accessorKey: "payout_method",
    header: () => /* @__PURE__ */ jsx("div", { className: "text-center", children: "Payout Method" }),
    cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center capitalize", children: /* @__PURE__ */ jsx("p", { children: row.original.payout_method }) })
  },
  {
    id: "processed",
    header: () => /* @__PURE__ */ jsx("div", { className: "pr-4 text-end", children: "Processed Date" }),
    cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "pr-4 text-end", children: new Date(row.original.updated_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) })
  }
];
export {
  PayoutsTableColumn as default
};
