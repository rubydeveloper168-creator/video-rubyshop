import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { B as Button } from "./button-jZyzwgdo.js";
import { C as Card } from "./card-CXRouz5c.js";
import { S as ScrollArea } from "./scroll-area-DPHRDnwL.js";
import { S as Sheet, a as SheetTrigger, b as SheetContent } from "./sheet-CuVwNO0O.js";
import { T as Tabs, c as TabsContent } from "./tabs-Bhd5qJJs.js";
import { u as useScreen } from "./use-screen-B7SDA5zE.js";
import { L as LandingLayout } from "./landing-layout-evsEYR3t.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { GraduationCap, Heart, UserCircle, Settings, LoaderCircle, ListFilter } from "lucide-react";
import { nanoid } from "nanoid";
import { useState } from "react";
import BecomeInstructor from "./become-instructor-CLl9Pand.js";
import MyCourses from "./my-courses-CsR9FWTq.js";
import MyProfile from "./my-profile-BkE6LtD3.js";
import Settings$1 from "./settings-Cn6m0cw5.js";
import TabLists from "./tab-lists-TvCC128g.js";
import Wishlist from "./wishlist-CGViKcs6.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-scroll-area";
import "@radix-ui/react-dialog";
import "@radix-ui/react-tabs";
import "./app-logo-GKkeg_7r.js";
import "lucide-react/dynamic";
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
import "./profile-toggle-CeGVdaNT.js";
import "./avatar-Cr_jqfHL.js";
import "@radix-ui/react-avatar";
import "./use-auth-8FvJer_G.js";
import "./input-error-CEW4jhey.js";
import "./loading-button-C4Hk_jCd.js";
import "./tag-input-BplrELmW.js";
import "@yaireo/tagify";
import "./input-C6-Ta46A.js";
import "./label-Dd_w2I6M.js";
import "@radix-ui/react-label";
import "./textarea-DctRxpgE.js";
import "./inertia-BtwbgBI3.js";
import "./progress-BuQTjce4.js";
import "@radix-ui/react-progress";
import "./button-gradient-primary-Dgn8gIzu.js";
import "./forget-password-CZOrV-ju.js";
import "./course-card-1-C7AKR2gh.js";
import "./tooltip-DswKljFZ.js";
import "@radix-ui/react-tooltip";
const Index = (props) => {
  const { screen } = useScreen();
  const [open, setOpen] = useState(false);
  const { instructor, enrollments, wishlists, hasVerifiedEmail, status } = props;
  const tabs = [
    {
      id: nanoid(),
      name: "My Courses",
      slug: "courses",
      Icon: GraduationCap,
      Component: enrollments ? /* @__PURE__ */ jsx(MyCourses, { enrollments }) : /* @__PURE__ */ jsx(Fragment, {})
    },
    {
      id: nanoid(),
      name: "Wishlist",
      slug: "wishlist",
      Icon: Heart,
      Component: wishlists ? /* @__PURE__ */ jsx(Wishlist, { wishlists }) : /* @__PURE__ */ jsx(Fragment, {})
    },
    {
      id: nanoid(),
      name: "My Profile",
      slug: "profile",
      Icon: UserCircle,
      Component: /* @__PURE__ */ jsx(MyProfile, {})
    },
    {
      id: nanoid(),
      name: "Settings",
      slug: "settings",
      Icon: Settings,
      Component: /* @__PURE__ */ jsx(Settings$1, {})
    }
  ];
  const { post, processing } = useForm({});
  const submit = (e) => {
    e.preventDefault();
    post(route("verification.send"));
  };
  return /* @__PURE__ */ jsxs("div", { className: "container py-6", children: [
    /* @__PURE__ */ jsx(Head, { title: "Student Dashboard" }),
    /* @__PURE__ */ jsxs(Tabs, { value: props.tab, defaultValue: tabs[0].slug, className: "flex items-start gap-6 lg:gap-10", children: [
      screen > 768 && /* @__PURE__ */ jsx(Card, { className: "sticky top-24 w-full max-w-[270px] border-none p-4", children: /* @__PURE__ */ jsx(TabLists, { tabs }) }),
      /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
        !hasVerifiedEmail && /* @__PURE__ */ jsxs("div", { className: "mb-6 rounded-md bg-red-50 p-6", children: [
          status === "verification-link-sent" ? /* @__PURE__ */ jsx("p", { className: "mb-4 text-center text-sm font-medium text-green-600", children: "A new verification link has been sent to the email address you provided during registration." }) : /* @__PURE__ */ jsx("p", { className: "mb-4 text-center text-sm font-medium text-red-500", children: "Your email is not verified yet. Please verify your email address by clicking on the link we just emailed to you." }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "flex items-center justify-center gap-4 text-center", children: [
            /* @__PURE__ */ jsxs(Button, { disabled: processing, variant: "secondary", children: [
              processing && /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
              "Resend verification email"
            ] }),
            /* @__PURE__ */ jsx(Link, { href: route("logout"), method: "post", children: /* @__PURE__ */ jsx(Button, { children: "Log out" }) })
          ] })
        ] }),
        tabs.map(({ id, name, slug, Component }) => /* @__PURE__ */ jsxs(TabsContent, { value: slug, className: "m-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-2", children: [
            screen < 768 && /* @__PURE__ */ jsxs(Sheet, { open, onOpenChange: setOpen, children: [
              /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "icon", variant: "outline", children: /* @__PURE__ */ jsx(ListFilter, { className: "h-5 w-5" }) }) }),
              /* @__PURE__ */ jsx(SheetContent, { side: "left", className: "border-border w-[230px]", children: /* @__PURE__ */ jsx(ScrollArea, { className: "h-full", children: /* @__PURE__ */ jsx(TabLists, { tabs }) }) })
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: name })
          ] }),
          Component
        ] }, id)),
        (!instructor || instructor && instructor.status !== "approved") && /* @__PURE__ */ jsxs(TabsContent, { value: "instructor", className: "m-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-2", children: [
            screen < 768 && /* @__PURE__ */ jsxs(Sheet, { open, onOpenChange: setOpen, children: [
              /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "icon", variant: "outline", children: /* @__PURE__ */ jsx(ListFilter, { className: "h-5 w-5" }) }) }),
              /* @__PURE__ */ jsx(SheetContent, { side: "left", className: "border-border w-[230px]", children: /* @__PURE__ */ jsx(ScrollArea, { className: "h-full", children: /* @__PURE__ */ jsx(TabLists, { tabs }) }) })
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Become an Instructor" })
          ] }),
          /* @__PURE__ */ jsx(BecomeInstructor, { instructor })
        ] })
      ] })
    ] })
  ] });
};
Index.layout = (page) => /* @__PURE__ */ jsx(LandingLayout, { children: page, customizable: false });
export {
  Index as default
};
