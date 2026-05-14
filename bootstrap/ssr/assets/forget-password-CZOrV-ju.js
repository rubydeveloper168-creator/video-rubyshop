import { jsxs, jsx } from "react/jsx-runtime";
import { I as InputError } from "./input-error-CEW4jhey.js";
import { C as Card } from "./card-CXRouz5c.js";
import { I as Input } from "./input-C6-Ta46A.js";
import { L as Label } from "./label-Dd_w2I6M.js";
import { usePage, useForm } from "@inertiajs/react";
import { L as LoadingButton } from "./loading-button-C4Hk_jCd.js";
const ChangeEmail = () => {
  const { props } = usePage();
  const { email } = props.auth.user;
  const { errors } = props;
  const { data, setData, post, processing } = useForm({
    current_email: email,
    new_email: ""
  });
  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };
  const submit = (e) => {
    e.preventDefault();
    post(route("account.change-email"));
  };
  return /* @__PURE__ */ jsxs(Card, { className: "border-none", children: [
    /* @__PURE__ */ jsx("div", { className: "border-b-border border-b px-7 pt-7 pb-4", children: /* @__PURE__ */ jsx("p", { className: "text18 font-bold", children: "Change Email" }) }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "px-7 py-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Current Email" }),
        /* @__PURE__ */ jsx(Input, { required: true, readOnly: true, type: "email", name: "current_email", value: data.current_email, placeholder: "Enter your current email" }),
        /* @__PURE__ */ jsx(InputError, { message: errors.current_email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "py-5", children: [
        /* @__PURE__ */ jsx(Label, { children: "New Email" }),
        /* @__PURE__ */ jsx(Input, { required: true, type: "email", name: "new_email", value: data.new_email, placeholder: "Enter your new email", onChange: onHandleChange }),
        /* @__PURE__ */ jsx(InputError, { message: errors.new_email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx(LoadingButton, { loading: processing, children: "Get Email Change Link" })
    ] })
  ] });
};
const ChangePassword = () => {
  const { props } = usePage();
  const { errors } = props;
  const { data, setData, put, processing } = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
  });
  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };
  const submit = (e) => {
    e.preventDefault();
    put(route("account.change-password"));
  };
  return /* @__PURE__ */ jsxs(Card, { className: "border-none", children: [
    /* @__PURE__ */ jsx("div", { className: "border-b-border border-b px-7 pt-7 pb-4", children: /* @__PURE__ */ jsx("p", { className: "text18 font-bold", children: "Change Password" }) }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "flex flex-col gap-5 px-7 py-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Current Password" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            required: true,
            type: "password",
            name: "current_password",
            value: data.current_password,
            placeholder: "Enter your current password",
            onChange: onHandleChange
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.current_password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "New Password" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            required: true,
            type: "password",
            name: "password",
            value: data.password,
            placeholder: "Enter your new password",
            onChange: onHandleChange
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Confirm New Password" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            required: true,
            type: "password",
            name: "password_confirmation",
            value: data.password_confirmation,
            placeholder: "Rewrite your new password",
            onChange: onHandleChange
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(LoadingButton, { loading: processing, className: "h-9", children: "Change Password" }) })
    ] })
  ] });
};
const ForgetPassword = () => {
  const { props } = usePage();
  const { email } = props.auth.user;
  const { data, post, errors, clearErrors, processing } = useForm({
    email
  });
  const submit = (e) => {
    e.preventDefault();
    clearErrors();
    post(route("account.forgot-password"));
  };
  return /* @__PURE__ */ jsxs(Card, { className: "border-none", children: [
    /* @__PURE__ */ jsx("div", { className: "border-b-border border-b px-7 pt-7 pb-4", children: /* @__PURE__ */ jsx("p", { className: "text18 font-bold", children: "Forget Password" }) }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "px-7 py-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Your Email" }),
        /* @__PURE__ */ jsx(Input, { readOnly: true, required: true, type: "email", value: data.email }),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx(LoadingButton, { className: "mt-5 h-9", loading: processing, children: "Get Password Reset Link" })
    ] })
  ] });
};
export {
  ChangeEmail as C,
  ForgetPassword as F,
  ChangePassword as a
};
