import { jsxs, jsx } from "react/jsx-runtime";
import { C as CourseCard1 } from "./course-card-1-C7AKR2gh.js";
import { R as RatingStars } from "./rating-stars-Cw4PaRTw.js";
import { A as Avatar, a as AvatarImage, b as AvatarFallback } from "./avatar-Cr_jqfHL.js";
import { B as Button } from "./button-jZyzwgdo.js";
import { T as TooltipProvider, a as Tooltip, b as TooltipTrigger, c as TooltipContent } from "./tooltip-DswKljFZ.js";
import { L as LandingLayout } from "./landing-layout-evsEYR3t.js";
import { g as getQueryParams } from "./route-DlE7FdTW.js";
import { usePage, Head, router } from "@inertiajs/react";
import { Users, Book, Star, Grid, List } from "lucide-react";
import "./card-CXRouz5c.js";
import "react";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-avatar";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-tooltip";
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
import "./scroll-area-DPHRDnwL.js";
import "@radix-ui/react-scroll-area";
import "./profile-toggle-CeGVdaNT.js";
import "nanoid";
import "./use-auth-8FvJer_G.js";
import "./use-screen-B7SDA5zE.js";
const Show = ({ instructor, system }) => {
  var _a, _b, _c, _d;
  const { url } = usePage();
  const urlParams = getQueryParams(url);
  const viewType = urlParams["view"] ?? "grid";
  const { id, user, courses, total_reviews_count, total_average_rating, total_enrollments_count } = instructor;
  const pageTitle = `${user.name} - Expert Instructor | ${(_a = system.fields) == null ? void 0 : _a.name}`;
  const pageDescription = `Learn from ${user.name}, an expert instructor with ${courses.length} courses and ${total_enrollments_count} students. Average rating: ${total_average_rating ? Number(total_average_rating).toFixed(1) : "New"} stars.`;
  const pageKeywords = `${user.name}, instructor, online courses, ${((_b = system.fields) == null ? void 0 : _b.keywords) || "learning, education"}, teacher, expert`;
  const instructorImage = user.photo || "";
  const siteName = (_c = system.fields) == null ? void 0 : _c.name;
  const siteUrl = url;
  const siteOrigin = typeof window !== "undefined" ? window.location.origin : url.split("/").slice(0, 3).join("/");
  const rating = total_average_rating ? Number(total_average_rating).toFixed(1) : null;
  return /* @__PURE__ */ jsxs("div", { className: "container space-y-10 py-10 md:py-16", children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: pageTitle }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: pageDescription }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: pageKeywords }),
      /* @__PURE__ */ jsx("meta", { name: "author", content: ((_d = system.fields) == null ? void 0 : _d.author) || "UiLib" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "profile" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: siteUrl }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: `${user.name} - Expert Instructor` }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: pageDescription }),
      /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: siteName }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: instructorImage }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: "400" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: "400" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:alt", content: `${user.name} - Instructor Profile` }),
      /* @__PURE__ */ jsx("meta", { property: "profile:first_name", content: user.name.split(" ")[0] }),
      user.name.split(" ").length > 1 && /* @__PURE__ */ jsx("meta", { property: "profile:last_name", content: user.name.split(" ").slice(1).join(" ") }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: `${user.name} - Expert Instructor` }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: pageDescription }),
      instructorImage && /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: instructorImage }),
      /* @__PURE__ */ jsx("meta", { name: "instructor:name", content: user.name }),
      /* @__PURE__ */ jsx("meta", { name: "instructor:email", content: user.email }),
      /* @__PURE__ */ jsx("meta", { name: "instructor:courses_count", content: courses.length.toString() }),
      /* @__PURE__ */ jsx("meta", { name: "instructor:students_count", content: total_enrollments_count.toString() }),
      /* @__PURE__ */ jsx("meta", { name: "instructor:reviews_count", content: total_reviews_count.toString() }),
      rating && /* @__PURE__ */ jsx("meta", { name: "instructor:rating", content: rating }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: user.name,
        email: user.email,
        ...instructorImage && { image: instructorImage },
        jobTitle: "Online Course Instructor",
        description: pageDescription,
        url: siteUrl,
        worksFor: {
          "@type": "Organization",
          name: siteName,
          url: siteOrigin
        },
        knowsAbout: courses.map((course) => course.title).filter(Boolean),
        ...rating && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: rating,
            reviewCount: total_reviews_count,
            bestRating: 5,
            worstRating: 1
          }
        },
        hasCredential: courses.map((course) => ({
          "@type": "EducationalOccupationalCredential",
          name: `Instructor of ${course.title}`,
          ...course.short_description && { description: course.short_description }
        })).filter((credential) => credential.name)
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxs(Avatar, { className: "h-12 w-12", children: [
          /* @__PURE__ */ jsx(AvatarImage, { src: user.photo || "", alt: user.name, className: "object-cover" }),
          /* @__PURE__ */ jsx(AvatarFallback, { children: user.name.charAt(0) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "group", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: user.name }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: user.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "ml-auto flex items-center gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xl font-semibold", children: total_average_rating ? Number(total_average_rating).toFixed(1) : 0 }),
          /* @__PURE__ */ jsx(RatingStars, { rating: total_average_rating || 0, starClass: "h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Users, { className: "h-5 w-5 text-gray-500" }),
          /* @__PURE__ */ jsxs("span", { children: [
            total_enrollments_count,
            " Students"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Book, { className: "h-5 w-5 text-gray-500" }),
          /* @__PURE__ */ jsxs("span", { children: [
            courses.length,
            " Courses"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Star, { className: "h-5 w-5 text-gray-500" }),
          /* @__PURE__ */ jsxs("span", { children: [
            total_reviews_count,
            " Reviews"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "All Courses" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
            Button,
            {
              size: "icon",
              variant: viewType === "grid" ? "default" : "outline",
              onClick: () => router.get(route("instructors.show", { instructor: id, view: "grid" })),
              children: /* @__PURE__ */ jsx(Grid, { className: "h-4 w-4" })
            }
          ) }),
          /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: "Grid View" }) })
        ] }) }),
        /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
            Button,
            {
              size: "icon",
              variant: viewType === "list" ? "default" : "outline",
              onClick: () => router.get(route("instructors.show", { instructor: id, view: "list" })),
              children: /* @__PURE__ */ jsx(List, { className: "h-4 w-4" })
            }
          ) }),
          /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: "List View" }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: viewType === "grid" ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" : "space-y-7", children: courses.map((course) => /* @__PURE__ */ jsx(CourseCard1, { course, viewType }, course.id)) })
  ] });
};
Show.layout = (page) => /* @__PURE__ */ jsx(LandingLayout, { children: page, customizable: false });
export {
  Show as default
};
