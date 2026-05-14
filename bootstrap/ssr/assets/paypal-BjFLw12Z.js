import { jsxs, jsx } from "react/jsx-runtime";
import { I as InputError } from "./input-error-CEW4jhey.js";
import { L as LoadingButton } from "./loading-button-C4Hk_jCd.js";
import { C as Card } from "./card-CXRouz5c.js";
import { I as Input } from "./input-C6-Ta46A.js";
import { L as Label } from "./label-Dd_w2I6M.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BxPdBi6V.js";
import { S as Switch } from "./switch-CNsdrSya.js";
import { o as onHandleChange } from "./inertia-BtwbgBI3.js";
import { useForm } from "@inertiajs/react";
import "./utils-BmtPBcb0.js";
import "clsx";
import "tailwind-merge";
import "lucide-react";
import "react";
import "./button-jZyzwgdo.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "@radix-ui/react-select";
import "@radix-ui/react-switch";
const paypalCurrencies = [
  { label: "Australian Dollar", value: "AUD" },
  { label: "Brazilian Real", value: "BRL" },
  { label: "Canadian Dollar", value: "CAD" },
  { label: "Chinese Yuan", value: "CNY" },
  { label: "Czech Koruna", value: "CZK" },
  { label: "Danish Krone", value: "DKK" },
  { label: "Euro", value: "EUR" },
  { label: "Hong Kong Dollar", value: "HKD" },
  { label: "Hungarian Forint", value: "HUF" },
  { label: "Israeli Shekel", value: "ILS" },
  { label: "Japanese Yen", value: "JPY" },
  { label: "Malaysian Ringgit", value: "MYR" },
  { label: "Mexican Peso", value: "MXN" },
  { label: "Norwegian Krone", value: "NOK" },
  { label: "New Zealand Dollar", value: "NZD" },
  { label: "Philippine Peso", value: "PHP" },
  { label: "Polish Zloty", value: "PLN" },
  { label: "Pound Sterling", value: "GBP" },
  { label: "Russian Ruble", value: "RUB" },
  { label: "Singapore Dollar", value: "SGD" },
  { label: "Swedish Krona", value: "SEK" },
  { label: "Swiss Franc", value: "CHF" },
  { label: "Taiwan New Dollar", value: "TWD" },
  { label: "Thai Baht", value: "THB" },
  { label: "U.S. Dollar", value: "USD" }
];
const Paypal = ({ payment }) => {
  const { data, setData, post, errors, processing } = useForm({
    ...payment.fields,
    type: "paypal"
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("settings.payment.update", { id: payment.id }));
  };
  return /* @__PURE__ */ jsxs(Card, { className: "p-4 sm:p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "PayPal Settings" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Configure PayPal payment gateway" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "status", children: data.active ? "Enabled" : "Disabled" }),
        /* @__PURE__ */ jsx(Switch, { id: "status", checked: data.active, onCheckedChange: (checked) => setData("active", checked) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Currency" }),
          /* @__PURE__ */ jsxs(Select, { value: data.currency, onValueChange: (value) => setData("currency", value), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select Currency" }) }),
            /* @__PURE__ */ jsx(SelectContent, { children: paypalCurrencies.map((currency) => /* @__PURE__ */ jsxs(SelectItem, { value: currency.value, children: [
              currency.label,
              " (",
              currency.value,
              ")"
            ] }, currency.value)) })
          ] }),
          /* @__PURE__ */ jsx(InputError, { message: errors.currency })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Test Mode:" }),
          /* @__PURE__ */ jsx(Switch, { id: "status", checked: data.test_mode, onCheckedChange: (checked) => setData("test_mode", checked) }),
          /* @__PURE__ */ jsx(Label, { htmlFor: "status", className: "text-gray-500", children: data.test_mode ? "Using Sandbox Environment" : "Using Production Environment" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `border-b pb-6 ${!data.test_mode ? "opacity-60" : ""}`, children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg font-medium", children: "Sandbox Credentials" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-1", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Client ID *" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                name: "sandbox_client_id",
                value: data.sandbox_client_id || "",
                onChange: (e) => onHandleChange(e, setData),
                placeholder: "Enter sandbox client ID",
                disabled: !data.test_mode
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.sandbox_client_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Secret Key *" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                name: "sandbox_secret_key",
                value: data.sandbox_secret_key || "",
                onChange: (e) => onHandleChange(e, setData),
                placeholder: "Enter sandbox secret key",
                disabled: !data.test_mode,
                type: "password"
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.sandbox_secret_key })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `border-b pb-6 ${data.test_mode ? "opacity-60" : ""}`, children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg font-medium", children: "Production Credentials" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-1", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Client ID *" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                name: "production_client_id",
                value: data.production_client_id || "",
                onChange: (e) => onHandleChange(e, setData),
                placeholder: "Enter production client ID",
                disabled: data.test_mode
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.production_client_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Secret Key *" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                name: "production_secret_key",
                value: data.production_secret_key || "",
                onChange: (e) => onHandleChange(e, setData),
                placeholder: "Enter production secret key",
                disabled: data.test_mode,
                type: "password"
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.production_secret_key })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: data.active ? "PayPal is currently enabled" : "PayPal is currently disabled" }),
        /* @__PURE__ */ jsx(LoadingButton, { loading: processing, children: "Save Changes" })
      ] })
    ] })
  ] });
};
export {
  Paypal as default
};
