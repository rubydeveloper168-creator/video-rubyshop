import { jsxs, jsx } from "react/jsx-runtime";
import { T as TiptapRenderer } from "./client-renderer-CUBmzaOS.js";
import { B as Badge } from "./badge-B4crNM73.js";
import { B as Button } from "./button-jZyzwgdo.js";
import { C as Card, a as CardHeader, d as CardTitle, b as CardContent, e as CardDescription } from "./card-CXRouz5c.js";
import { L as LandingLayout } from "./landing-layout-evsEYR3t.js";
import { usePage, Head } from "@inertiajs/react";
import { Building2, MapPin, Clock, Mail, Eye, Zap } from "lucide-react";
import { useState } from "react";
/* empty css               */
import "react-icons/lu";
import "hast-util-to-jsx-runtime";
import "shiki/bundle/full";
import "rehype-parse";
import "rehype-react";
import "unified";
import "unist-util-visit";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
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
import "./avatar-Cr_jqfHL.js";
import "@radix-ui/react-avatar";
import "nanoid";
import "./use-auth-8FvJer_G.js";
import "./use-screen-B7SDA5zE.js";
const JobCircularShow = () => {
  const { jobCircular } = usePage().props;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const getExperienceLevelLabel = (level) => {
    const levels = {
      entry: "Entry Level",
      mid: "Mid Level",
      senior: "Senior Level",
      lead: "Lead",
      manager: "Manager",
      director: "Director",
      executive: "Executive"
    };
    return levels[level] || level;
  };
  const getJobTypeLabel = (type) => {
    const types = {
      "full-time": "Full Time",
      "part-time": "Part Time",
      contract: "Contract",
      freelance: "Freelance",
      internship: "Internship",
      temporary: "Temporary"
    };
    return types[type] || type;
  };
  const getWorkTypeLabel = (type) => {
    const types = {
      "on-site": "On-Site",
      remote: "Remote",
      hybrid: "Hybrid",
      flexible: "Flexible"
    };
    return types[type] || type;
  };
  const getDaysUntilDeadline = () => {
    const deadline = new Date(jobCircular.application_deadline);
    const today = /* @__PURE__ */ new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
    if (diffDays < 0) return "Expired";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day left";
    return `${diffDays} days left`;
  };
  const getFormattedSalary = () => {
    const min = jobCircular.salary_min.toLocaleString();
    const max = jobCircular.salary_max.toLocaleString();
    const currency = jobCircular.salary_currency;
    if (jobCircular.salary_negotiable) {
      return `${currency} ${min} - ${max} (Negotiable)`;
    }
    return `${currency} ${min} - ${max}`;
  };
  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: "Active", variant: "default" },
      draft: { label: "Draft", variant: "secondary" },
      closed: { label: "Closed", variant: "destructive" },
      expired: { label: "Expired", variant: "outline" }
    };
    const config = statusConfig[status] || { label: status, variant: "outline" };
    return /* @__PURE__ */ jsx(Badge, { variant: config.variant, children: config.label });
  };
  return /* @__PURE__ */ jsxs(LandingLayout, { customizable: false, children: [
    /* @__PURE__ */ jsx(Head, { title: jobCircular.title }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
      /* @__PURE__ */ jsx("div", { className: "border-border border-b", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: jobCircular.title }),
            getStatusBadge(jobCircular.status)
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground mt-2 flex items-center space-x-4 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(Building2, { className: "mr-1 h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { children: "TechCorp Inc." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "mr-1 h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { children: jobCircular.location })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(Clock, { className: "mr-1 h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { children: getDaysUntilDeadline() })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-3", children: /* @__PURE__ */ jsx(Button, { size: "sm", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: `mailto:${jobCircular.contact_email}`, children: [
          /* @__PURE__ */ jsx(Mail, { className: "mr-2 h-4 w-4" }),
          "Apply Now"
        ] }) }) })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-8 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-6 lg:col-span-2", children: [
          /* @__PURE__ */ jsxs(Card, { className: "!shadow-none", children: [
            /* @__PURE__ */ jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsx(CardTitle, { className: "mb-2 text-xl font-semibold", children: jobCircular.title }),
              /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsx("h6", { className: "text-secondary-foreground text-lg font-semibold", children: getFormattedSalary() }),
                /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground mt-1 text-sm", children: [
                  jobCircular.positions_available,
                  " position",
                  jobCircular.positions_available !== 1 ? "s" : "",
                  " available"
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 md:grid-cols-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-muted rounded-lg p-4 text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "mb-2 text-2xl", children: "🎯" }),
                /* @__PURE__ */ jsx("div", { className: "font-semibold", children: getExperienceLevelLabel(jobCircular.experience_level) }),
                /* @__PURE__ */ jsx("div", { className: "text-muted-foreground text-sm", children: "Experience" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-muted rounded-lg p-4 text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "mb-2 text-2xl", children: "💼" }),
                /* @__PURE__ */ jsx("div", { className: "font-semibold", children: getJobTypeLabel(jobCircular.job_type) }),
                /* @__PURE__ */ jsx("div", { className: "text-muted-foreground text-sm", children: "Job Type" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-muted rounded-lg p-4 text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "mb-2 text-2xl", children: "🏢" }),
                /* @__PURE__ */ jsx("div", { className: "font-semibold", children: getWorkTypeLabel(jobCircular.work_type) }),
                /* @__PURE__ */ jsx("div", { className: "text-muted-foreground text-sm", children: "Work Type" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-muted rounded-lg p-4 text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "mb-2 text-2xl", children: "📅" }),
                /* @__PURE__ */ jsx("div", { className: "font-semibold", children: getDaysUntilDeadline() }),
                /* @__PURE__ */ jsx("div", { className: "text-muted-foreground text-sm", children: "Deadline" })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(Card, { className: "!shadow-none", children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-xl font-semibold", children: "Job Description" }) }),
            /* @__PURE__ */ jsxs(CardContent, { children: [
              /* @__PURE__ */ jsx("div", { className: `${showFullDescription ? "" : "max-h-96 overflow-hidden"}`, children: /* @__PURE__ */ jsx(TiptapRenderer, { children: jobCircular.description }) }),
              !showFullDescription && /* @__PURE__ */ jsx("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: () => setShowFullDescription(true), className: "w-full", children: [
                /* @__PURE__ */ jsx(Eye, { className: "mr-2 h-4 w-4" }),
                "Show Full Description"
              ] }) }),
              showFullDescription && /* @__PURE__ */ jsx("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: () => setShowFullDescription(false), className: "w-full", children: [
                /* @__PURE__ */ jsx(Eye, { className: "mr-2 h-4 w-4" }),
                "Show Less"
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Card, { className: "!shadow-none", children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center text-xl font-semibold", children: [
              /* @__PURE__ */ jsx(Zap, { className: "mr-2 h-5 w-5 text-yellow-500" }),
              "Required Skills"
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: jobCircular.skills_required.map((skill, index) => /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "px-3 py-1 text-sm", children: skill }, index)) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs(Card, { className: "!shadow-none", children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "text-center", children: [
              /* @__PURE__ */ jsx(CardTitle, { className: "text-xl font-semibold", children: "Quick Apply" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Send your application directly to our team" })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsx(Button, { className: "w-full", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: `mailto:${jobCircular.contact_email}`, children: [
                /* @__PURE__ */ jsx(Mail, { className: "mr-2 h-4 w-4" }),
                "Apply via Email"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground text-center text-sm", children: [
                /* @__PURE__ */ jsx("p", { children: "Application deadline:" }),
                /* @__PURE__ */ jsx("p", { className: "font-semibold", children: new Date(jobCircular.application_deadline).toLocaleDateString() })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Card, { className: "!shadow-none", children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-lg font-semibold", children: "Job Statistics" }) }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-secondary text-secondary-foreground rounded-lg p-3 text-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-2xl font-semibold", children: jobCircular.positions_available }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm", children: "Positions" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-secondary text-secondary-foreground rounded-lg p-3 text-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-2xl font-semibold", children: getDaysUntilDeadline().includes("Expired") ? "0" : "Active" }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm", children: "Status" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground text-center text-sm", children: [
                /* @__PURE__ */ jsxs("p", { children: [
                  "Posted ",
                  new Date(jobCircular.created_at).toLocaleDateString()
                ] }),
                /* @__PURE__ */ jsxs("p", { children: [
                  "Last updated ",
                  new Date(jobCircular.updated_at).toLocaleDateString()
                ] })
              ] })
            ] })
          ] })
        ] })
      ] }) })
    ] })
  ] });
};
export {
  JobCircularShow as default
};
