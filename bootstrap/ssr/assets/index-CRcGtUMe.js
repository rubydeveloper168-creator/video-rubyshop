import { jsxs, jsx } from "react/jsx-runtime";
import { D as DataSortModal } from "./data-sort-modal-Cg4d_jDY.js";
import { D as DeleteModal } from "./delete-modal-CvTLW8xe.js";
import { B as Button } from "./button-jZyzwgdo.js";
import { C as Card } from "./card-CXRouz5c.js";
import { S as Separator } from "./separator-R7EO2G8T.js";
import { u as useAuth } from "./use-auth-8FvJer_G.js";
import { D as DashboardLayout } from "./layout-DNClQoa9.js";
import { router } from "@inertiajs/react";
import { Pencil, Trash2, Plus, ArrowDownUp } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import CategoryChildForm from "./category-child-form-UUQ-ivJ4.js";
import CategoryForm from "./category-form-CtUrUZhT.js";
import "nprogress";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "react";
import "./dialog-DD5SXV81.js";
import "@radix-ui/react-dialog";
import "./scroll-area-DPHRDnwL.js";
import "@radix-ui/react-scroll-area";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-separator";
import "./sidebar-6wqj6oXO.js";
import "./sheet-CuVwNO0O.js";
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
import "./app-logo-GKkeg_7r.js";
import "./accordion-DVAMjldm.js";
import "@radix-ui/react-accordion";
import "./route-DlE7FdTW.js";
import "./avatar-Cr_jqfHL.js";
import "@radix-ui/react-avatar";
import "./icon-picker-DQbRGSHn.js";
import "./debounce-ZFxqVthq.js";
import "./label-Dd_w2I6M.js";
import "@radix-ui/react-label";
import "./input-error-CEW4jhey.js";
import "./loading-button-C4Hk_jCd.js";
import "./input-C6-Ta46A.js";
import "./select-BxPdBi6V.js";
import "@radix-ui/react-select";
import "./textarea-DctRxpgE.js";
import "./inertia-BtwbgBI3.js";
const Index = (props) => {
  const { isAdmin } = useAuth();
  const { categories, lastPosition, lastChildPosition } = props;
  const defaultCategory = categories.find((category) => category.slug === "default");
  const otherCategories = categories.filter((category) => category.slug !== "default");
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
      /* @__PURE__ */ jsx(CategoryForm, { title: "Add New Category", handler: /* @__PURE__ */ jsx(Button, { children: "Add New Category" }), lastPosition }),
      /* @__PURE__ */ jsx(
        DataSortModal,
        {
          title: "Sort Categories",
          data: categories,
          handler: /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "bg-muted hover:bg-muted-foreground/6", children: "Sort Categories" }),
          onOrderChange: (newOrder, setOpen) => {
            router.post(
              route("categories.sort"),
              {
                sortedData: newOrder
              },
              {
                preserveScroll: true,
                onSuccess: () => setOpen && setOpen(false)
              }
            );
          },
          renderContent: (item) => /* @__PURE__ */ jsx(Card, { className: "w-full px-4 py-3", children: /* @__PURE__ */ jsx("p", { children: item.title }) })
        }
      )
    ] }),
    categories.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-1 gap-6 border-t border-gray-300 py-6 md:grid-cols-2 lg:grid-cols-4", children: [
      defaultCategory && /* @__PURE__ */ jsxs(Card, { className: "p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(DynamicIcon, { size: 20, name: defaultCategory.icon }),
          /* @__PURE__ */ jsx("h2", { children: defaultCategory.title })
        ] }),
        /* @__PURE__ */ jsx(Separator, { className: "my-4" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Protected Category" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "When a specific category is deleted, all courses in that category will be moved to this default category. So default category cannot be edited or removed." })
        ] })
      ] }, defaultCategory.id),
      otherCategories.map((category) => {
        var _a;
        return /* @__PURE__ */ jsxs(Card, { className: "p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative text-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(DynamicIcon, { size: 20, name: category.icon }),
              /* @__PURE__ */ jsx("h2", { children: category.title })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "absolute -top-1 right-0 space-x-1", children: [
              /* @__PURE__ */ jsx(
                CategoryForm,
                {
                  title: "Update The Category",
                  category,
                  lastPosition,
                  handler: /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", className: "bg-muted hover:bg-muted-foreground/10 h-8 w-8 rounded-full p-0", children: /* @__PURE__ */ jsx(Pencil, { className: "text-sm" }) })
                }
              ),
              isAdmin && /* @__PURE__ */ jsx(
                DeleteModal,
                {
                  message: "After deleting the category, all the courses of this category will be moved to the default category.",
                  routePath: route("categories.destroy", category.id),
                  actionComponent: /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", className: "bg-destructive/8 hover:bg-destructive/6 h-8 w-8 rounded-full p-0", children: /* @__PURE__ */ jsx(Trash2, { className: "text-destructive text-sm" }) })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx(Separator, { className: "my-4" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            (_a = category.category_children) == null ? void 0 : _a.map((child) => /* @__PURE__ */ jsxs("div", { className: "border-border relative rounded-md border px-2 py-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(DynamicIcon, { size: 16, name: child.icon }),
                /* @__PURE__ */ jsx("p", { children: child.title })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "absolute top-0 right-0 flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(
                  CategoryChildForm,
                  {
                    categoryChild: child,
                    categoryId: Number(category.id),
                    title: "Update Child Category",
                    handler: /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8 p-0", children: /* @__PURE__ */ jsx(Pencil, { className: "text-sm" }) }),
                    lastChildPosition
                  }
                ),
                isAdmin && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                  DeleteModal,
                  {
                    message: "After deleting the child category, all the courses of this category will be moved to the parent category.",
                    routePath: route("category-child.destroy", child.id),
                    actionComponent: /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", className: "hover:bg-destructive/6 h-8 w-8", children: /* @__PURE__ */ jsx(Trash2, { className: "text-destructive text-sm" }) })
                  }
                ) })
              ] })
            ] }, child.id)),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-baseline gap-3", children: [
              /* @__PURE__ */ jsx(
                CategoryChildForm,
                {
                  categoryId: Number(category.id),
                  title: "Add New Child Category",
                  handler: /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "ghost", className: "bg-muted hover:!bg-muted-foreground/10 w-full", children: [
                    /* @__PURE__ */ jsx(Plus, { className: "text-sm" }),
                    /* @__PURE__ */ jsx("span", { children: "Add" })
                  ] }),
                  lastChildPosition
                }
              ),
              /* @__PURE__ */ jsx(
                DataSortModal,
                {
                  title: "Sort Child Categories",
                  data: category.category_children || [],
                  handler: /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "ghost", className: "bg-muted hover:!bg-muted-foreground/10 w-full", children: [
                    /* @__PURE__ */ jsx(ArrowDownUp, { className: "text-sm" }),
                    /* @__PURE__ */ jsx("span", { children: "Sort" })
                  ] }),
                  onOrderChange: (newOrder, setOpen) => {
                    router.post(
                      route("category-child.sort"),
                      {
                        sortedData: newOrder
                      },
                      {
                        preserveScroll: true,
                        onSuccess: () => setOpen && setOpen(false)
                      }
                    );
                  },
                  renderContent: (item) => /* @__PURE__ */ jsx(Card, { className: "w-full px-4 py-3", children: /* @__PURE__ */ jsx("p", { children: item.title }) })
                }
              )
            ] })
          ] })
        ] }, category.id);
      })
    ] }) : /* @__PURE__ */ jsx(Card, { className: "mt-6 border-t border-gray-300 p-6", children: /* @__PURE__ */ jsx("h2", { className: "text-center", children: "There no category created" }) })
  ] });
};
Index.layout = (page) => /* @__PURE__ */ jsx(DashboardLayout, { children: page });
export {
  Index as default
};
