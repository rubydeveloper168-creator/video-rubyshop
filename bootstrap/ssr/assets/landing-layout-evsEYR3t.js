import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as AppLogo } from "./app-logo-GKkeg_7r.js";
import { B as Button } from "./button-jZyzwgdo.js";
import { usePage, Link } from "@inertiajs/react";
import { DynamicIcon } from "lucide-react/dynamic";
import { M as Main } from "./main-BqrosZ6t.js";
import { A as Appearance } from "./appearance-DLkkIZHp.js";
import { N as Notification } from "./notification-Dc7j1bw9.js";
import { P as ProfileToggle } from "./profile-toggle-CeGVdaNT.js";
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuItem } from "./dropdown-menu-CECYoeyz.js";
import { S as ScrollArea } from "./scroll-area-DPHRDnwL.js";
import { u as useAuth } from "./use-auth-8FvJer_G.js";
import { u as useScreen } from "./use-screen-B7SDA5zE.js";
import { c as cn } from "./utils-BmtPBcb0.js";
import { X, Menu, ChevronDown } from "lucide-react";
import { useState, useEffect, Fragment as Fragment$1 } from "react";
const Index = () => {
  const { props } = usePage();
  const { footer, system } = props;
  const sortedItems = footer.footer_items.sort((a, b) => a.sort - b.sort);
  const listItems = sortedItems.filter((item) => item.type === "list" && item.active);
  const copyrightItem = sortedItems.find((item) => item.type === "copyright" && item.active);
  const socialMediaItem = sortedItems.find((item) => item.type === "social_media" && item.active);
  const paymentMethodsItem = sortedItems.find((item) => item.type === "payment_methods" && item.active);
  return /* @__PURE__ */ jsxs("div", { className: "overflow-hidden bg-[rgba(255,222,99,0.06)]", children: [
    /* @__PURE__ */ jsxs("div", { className: "container space-y-9 pt-[60px] pb-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start justify-between gap-10 md:flex-row", children: [
        /* @__PURE__ */ jsxs("div", { className: "w-full space-y-5 md:max-w-[300px]", children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(AppLogo, { className: "h-7" }) }) }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: system.fields.description }),
          socialMediaItem && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: socialMediaItem.items && Array.isArray(socialMediaItem.items) && socialMediaItem.items.map((socialItem, idx) => /* @__PURE__ */ jsx(
            Button,
            {
              size: "icon",
              variant: "ghost",
              className: "bg-muted hover:bg-primary hover:text-primary-foreground text-muted-foreground rounded-full transition-colors",
              asChild: true,
              children: /* @__PURE__ */ jsxs(Link, { href: socialItem.url, target: "_blank", rel: "noopener noreferrer", children: [
                /* @__PURE__ */ jsx(DynamicIcon, { name: socialItem.icon, className: "h-5 w-5" }),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: socialItem.title })
              ] })
            },
            idx
          )) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex w-full flex-col justify-between gap-10 md:max-w-[640px] md:flex-row", children: listItems.map((section) => {
          var _a;
          return /* @__PURE__ */ jsxs("div", { className: "relative w-full", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-3 text-lg font-semibold", children: section.title }),
            /* @__PURE__ */ jsx("ul", { className: "text-muted-foreground flex flex-col gap-2 text-sm", children: (_a = section.items) == null ? void 0 : _a.map(
              (item, itemIndex) => section.slug === "address" ? /* @__PURE__ */ jsx("li", { children: item.title }, `item-${itemIndex}`) : /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: item.url, children: item.title }) }, `item-${itemIndex}`)
            ) })
          ] });
        }) })
      ] }),
      paymentMethodsItem && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-base font-medium", children: paymentMethodsItem.title }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: paymentMethodsItem.items && Array.isArray(paymentMethodsItem.items) && paymentMethodsItem.items.map((paymentItem, idx) => /* @__PURE__ */ jsx("div", { className: "flex h-7 items-center justify-center gap-5 md:justify-start", children: paymentItem.image && /* @__PURE__ */ jsx("img", { src: paymentItem.image, alt: `Payment method ${idx + 1}`, className: "h-full w-auto object-contain" }) }, idx)) })
      ] })
    ] }),
    copyrightItem && /* @__PURE__ */ jsx("div", { className: "px-6 py-8 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: copyrightItem.title }) })
  ] });
};
const Navbar = ({ heightCover = true, customizable = true }) => {
  const { props } = usePage();
  const { ziggy, navbar } = props;
  const { isAdmin, isLoggedIn } = useAuth();
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { screen } = useScreen();
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const renderNavItems = (item) => {
    switch (item.type) {
      case "url":
        return /* @__PURE__ */ jsx(Link, { href: item.value || "", className: "text-sm font-normal", children: item.title }, item.id);
      case "dropdown":
        return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxs(DropdownMenuTrigger, { className: "flex cursor-pointer items-center gap-1 text-sm", children: [
            item.title,
            /* @__PURE__ */ jsx(ChevronDown, { className: "ml-1 h-4 w-4" })
          ] }),
          /* @__PURE__ */ jsx(DropdownMenuContent, { align: "start", className: "min-w-20", children: item.items && Array.isArray(item.items) && item.items.map((subItem, idx) => /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, className: "cursor-pointer px-5", children: /* @__PURE__ */ jsx(Link, { href: subItem.url || "", children: subItem.title }) }, idx)) })
        ] }, item.id);
      default:
        return null;
    }
  };
  const sortedItems = navbar.navbar_items.sort((a, b) => a.sort - b.sort);
  const customizeLink = props.customize ? ziggy.location : "?customize=true";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: cn("fixed top-0 z-30 w-full", isMenuOpen && "bg-background"), children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: cn(
            "container mt-0 flex h-[72px] items-center justify-between gap-1 !px-4 transition-all duration-200 md:gap-6",
            isSticky && "bg-background shadow-card mx-auto mt-4 h-16 w-full rounded-2xl md:!max-w-6xl",
            screen < 768 && "mt-0 h-[72px] rounded-none"
          ),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-10", children: [
              /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(AppLogo, {}) }),
              /* @__PURE__ */ jsx("div", { className: "hidden gap-4 md:flex md:items-center", children: sortedItems.map((item) => /* @__PURE__ */ jsx(Fragment$1, { children: renderNavItems(item) }, item.id)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              customizable && isAdmin && /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", className: "hidden text-sm font-normal sm:block", children: /* @__PURE__ */ jsx(Link, { href: customizeLink, children: props.customize ? "Back" : "Customize" }) }),
              sortedItems.map((item) => {
                if (item.slug === "theme") {
                  return /* @__PURE__ */ jsx(Appearance, {});
                } else {
                  return null;
                }
              }),
              isLoggedIn ? sortedItems.map((item) => {
                if (item.slug === "notification") {
                  return /* @__PURE__ */ jsx(Notification, {});
                } else if (item.slug === "profile") {
                  return /* @__PURE__ */ jsx(ProfileToggle, {});
                } else {
                  return null;
                }
              }) : /* @__PURE__ */ jsxs("div", { className: "hidden space-x-2 sm:block", children: [
                /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", className: "", children: /* @__PURE__ */ jsx(Link, { href: route("register"), children: "Sign Up" }) }),
                /* @__PURE__ */ jsx(Button, { asChild: true, className: "", children: /* @__PURE__ */ jsx(Link, { href: route("login"), children: "Log In" }) })
              ] }),
              /* @__PURE__ */ jsx(Button, { size: "icon", variant: "secondary", className: "md:hidden", onClick: () => setIsMenuOpen(!isMenuOpen), children: isMenuOpen ? /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx(Menu, { className: "h-6 w-6" }) })
            ] })
          ]
        }
      ),
      isMenuOpen && /* @__PURE__ */ jsx(ScrollArea, { className: "bg-background h-[calc(100vh-72px)] border-t md:hidden", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-4 px-6 py-4", children: [
        sortedItems.map((item) => /* @__PURE__ */ jsx(Fragment$1, { children: renderNavItems(item) }, item.id)),
        customizable && isAdmin && /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", className: "text-sm font-normal", children: /* @__PURE__ */ jsx(Link, { href: customizeLink, children: props.customize ? "Back" : "Customize" }) }),
        !isLoggedIn && /* @__PURE__ */ jsxs("div", { className: "block space-y-2 sm:hidden", children: [
          /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", className: "w-full rounded-sm shadow-none sm:px-5 md:h-10", children: /* @__PURE__ */ jsx(Link, { href: route("register"), children: "Sign Up" }) }),
          /* @__PURE__ */ jsx(Button, { asChild: true, className: "w-full rounded-sm shadow-none sm:px-5 md:h-10", children: /* @__PURE__ */ jsx(Link, { href: route("login"), children: "Log In" }) })
        ] })
      ] }) })
    ] }),
    heightCover && /* @__PURE__ */ jsx("div", { className: "relative z-20 h-[72px] bg-transparent" })
  ] });
};
const LandingLayout = ({ children, navbarHeight = true, customizable }) => {
  return /* @__PURE__ */ jsx(Main, { children: /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col justify-between overflow-x-hidden", children: [
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(Navbar, { heightCover: navbarHeight, customizable }),
      children
    ] }),
    /* @__PURE__ */ jsx(Index, {})
  ] }) });
};
export {
  LandingLayout as L
};
