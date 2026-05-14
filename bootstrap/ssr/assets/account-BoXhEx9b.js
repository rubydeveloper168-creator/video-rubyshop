import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { C as ChangeEmail, a as ChangePassword, F as ForgetPassword } from "./forget-password-CZOrV-ju.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-Bhd5qJJs.js";
import { D as DashboardLayout } from "./layout-DNClQoa9.js";
import { g as getQueryParams } from "./route-DlE7FdTW.js";
import { usePage, Head, router } from "@inertiajs/react";
import { nanoid } from "nanoid";
import UpdateProfile from "./update-profile-DQgtstPw.js";
import "./input-error-CEW4jhey.js";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "./card-CXRouz5c.js";
import "react";
import "./input-C6-Ta46A.js";
import "./label-Dd_w2I6M.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "./loading-button-C4Hk_jCd.js";
import "lucide-react";
import "./button-jZyzwgdo.js";
import "@radix-ui/react-slot";
import "@radix-ui/react-tabs";
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
import "./avatar-Cr_jqfHL.js";
import "@radix-ui/react-avatar";
import "./tag-input-BplrELmW.js";
import "@yaireo/tagify";
import "./textarea-DctRxpgE.js";
import "./inertia-BtwbgBI3.js";
const Account = ({ instructor }) => {
  const page = usePage();
  const params = getQueryParams(page.url);
  const tabs = [
    {
      id: nanoid(),
      slug: "profile-update",
      title: "Profile Update",
      Component: () => /* @__PURE__ */ jsx(UpdateProfile, { instructor })
    },
    {
      id: nanoid(),
      slug: "change-email",
      title: "Change Email",
      Component: ChangeEmail
    },
    {
      id: nanoid(),
      slug: "change-password",
      title: "Change Password",
      Component: ChangePassword
    },
    {
      id: nanoid(),
      slug: "forget-password",
      title: "Forget Password",
      Component: ForgetPassword
    }
    // {
    //    id: nanoid(),
    //    slug: 'delete-account',
    //    title: 'Delete Account',
    //    Component: DeleteUser,
    // },
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Account Settings" }),
    /* @__PURE__ */ jsxs(Tabs, { value: params["tab"] ?? tabs[0].slug, className: "grid grid-rows-1 gap-5 md:grid-cols-4 md:px-3", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(TabsList, { className: "horizontal-tabs-list", children: tabs.map(({ id, slug, title }) => /* @__PURE__ */ jsx(
        TabsTrigger,
        {
          value: slug,
          className: "horizontal-tabs-trigger",
          onClick: () => router.get(
            route("settings.account", {
              tab: slug
            })
          ),
          children: title
        },
        id
      )) }) }),
      /* @__PURE__ */ jsx("div", { className: "md:col-span-3", children: tabs.map(({ id, slug, Component }) => /* @__PURE__ */ jsx(TabsContent, { value: slug, className: "m-0", children: /* @__PURE__ */ jsx(Component, {}) }, id)) })
    ] })
  ] });
};
Account.layout = (page) => /* @__PURE__ */ jsx(DashboardLayout, { children: page });
export {
  Account as default
};
