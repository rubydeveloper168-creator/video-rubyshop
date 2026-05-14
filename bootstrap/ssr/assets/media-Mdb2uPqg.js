import { jsx, jsxs } from "react/jsx-runtime";
import { C as ChunkedUploaderInput } from "./chunked-uploader-input-MwXGR7K4.js";
import { I as InputError } from "./input-error-CEW4jhey.js";
import { L as LoadingButton } from "./loading-button-C4Hk_jCd.js";
import { C as Card } from "./card-CXRouz5c.js";
import { I as Input } from "./input-C6-Ta46A.js";
import { L as Label } from "./label-Dd_w2I6M.js";
import { R as RadioGroup, a as RadioGroupItem } from "./radio-group-sSS5HHUP.js";
import { S as Separator } from "./separator-R7EO2G8T.js";
import { V as VideoPlayer } from "./video-player-BtrF0lff.js";
import { D as DashboardLayout } from "./layout-DNClQoa9.js";
import { o as onHandleChange } from "./inertia-BtwbgBI3.js";
import { usePage, useForm } from "@inertiajs/react";
import { useState, useMemo, useEffect } from "react";
import "./button-jZyzwgdo.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "axios";
import "lucide-react";
import "sonner";
import "@radix-ui/react-label";
import "@radix-ui/react-radio-group";
import "@radix-ui/react-separator";
import "plyr-react";
/* empty css                */
import "./sidebar-6wqj6oXO.js";
import "./sheet-CuVwNO0O.js";
import "@radix-ui/react-dialog";
import "./tooltip-DswKljFZ.js";
import "@radix-ui/react-tooltip";
import "./main-BqrosZ6t.js";
import "next-themes";
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
const Media = () => {
  const { props } = usePage();
  const { tab, course } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [previewBanner, setPreviewBanner] = useState(course.banner);
  const [thumbnailBanner, setThumbnailBanner] = useState(course.thumbnail);
  const { data, setData, post, errors, reset, processing } = useForm({
    tab,
    thumbnail: null,
    banner: null,
    preview: course.preview,
    preview_type: "video_url"
  });
  const memoizedVideoPlayer = useMemo(() => {
    if (!course.preview) return null;
    return /* @__PURE__ */ jsx(Card, { className: "mt-2 flex max-h-[580px] items-center justify-center !overflow-hidden border-none", children: /* @__PURE__ */ jsx(
      VideoPlayer,
      {
        source: {
          type: "video",
          sources: [
            {
              src: course.preview || "",
              type: "video/mp4"
            }
          ]
        }
      }
    ) });
  }, [course.preview]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFileSelected) {
      setIsSubmit(true);
      return;
    }
    submitForm();
  };
  const submitForm = () => {
    post(route("courses.update", { id: course.id }), {
      onSuccess() {
        reset();
      }
    });
  };
  useEffect(() => {
    if (isSubmit && data.preview && isFileUploaded) {
      submitForm();
      reset();
      setIsSubmit(false);
      setIsFileUploaded(false);
    }
  }, [isSubmit, data.preview]);
  return /* @__PURE__ */ jsx(Card, { className: "container p-4 sm:p-6", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { children: "Thumbnail" }),
      /* @__PURE__ */ jsx(Input, { type: "file", name: "thumbnail", onChange: (e) => onHandleChange(e, setData, setThumbnailBanner) }),
      /* @__PURE__ */ jsx(InputError, { message: errors.thumbnail }),
      /* @__PURE__ */ jsx("img", { src: thumbnailBanner || "/assets/images/blank-image.jpg", alt: "", className: "mt-2 w-full max-w-sm rounded-md" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { children: "Banner" }),
      /* @__PURE__ */ jsx(Input, { type: "file", name: "banner", onChange: (e) => onHandleChange(e, setData, setPreviewBanner) }),
      /* @__PURE__ */ jsx(InputError, { message: errors.banner }),
      /* @__PURE__ */ jsx("img", { src: previewBanner || "/assets/images/blank-image.jpg", alt: "", className: "mt-2 w-full max-w-sm rounded-md" })
    ] }),
    /* @__PURE__ */ jsx(Separator, {}),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { children: "Preview Video Type" }),
      /* @__PURE__ */ jsxs(
        RadioGroup,
        {
          defaultValue: data.preview_type,
          onValueChange: (value) => setData("preview_type", value),
          className: "flex flex-wrap items-center gap-5 pt-3",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx(RadioGroupItem, { className: "cursor-pointer", id: "video_url", value: "video_url" }),
              /* @__PURE__ */ jsx(Label, { htmlFor: "video_url", className: "capitalize", children: "Video Url" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx(RadioGroupItem, { className: "cursor-pointer", id: "video", value: "video" }),
              /* @__PURE__ */ jsx(Label, { htmlFor: "video", className: "capitalize", children: "Video File" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.preview_type })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { children: "Preview Video" }),
      data.preview_type === "video_url" ? /* @__PURE__ */ jsx(
        Input,
        {
          type: "url",
          name: "preview",
          value: data.preview,
          placeholder: "Enter your video url",
          onChange: (e) => onHandleChange(e, setData)
        }
      ) : /* @__PURE__ */ jsx(
        ChunkedUploaderInput,
        {
          isSubmit,
          courseId: course.id || "",
          sectionId: course.course_section_id || "",
          filetype: data.preview_type,
          delayUpload: true,
          onFileSelected: (file) => {
            setIsFileSelected(true);
          },
          onFileUploaded: (fileData) => {
            setIsFileUploaded(true);
            setData("preview", fileData.file_url);
          },
          onError: (errors2) => {
            setIsSubmit(false);
          },
          onCancelUpload: () => {
            setIsSubmit(false);
          }
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.preview }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: data.preview_type === "video_url" ? "Supported URL: youtube or vimeo" : "Supported Video file: .mp4 or .webm or .ogg" }),
      memoizedVideoPlayer
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(LoadingButton, { loading: processing || isSubmit, disabled: processing || isSubmit, children: "Save Changes" }) })
  ] }) });
};
Media.layout = (page) => /* @__PURE__ */ jsx(DashboardLayout, { children: page });
export {
  Media as default
};
