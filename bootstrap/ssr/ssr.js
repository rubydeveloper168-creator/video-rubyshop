import { jsx } from "react/jsx-runtime";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
async function resolvePageComponent(path, pages) {
  for (const p2 of Array.isArray(path) ? path : [path]) {
    const page = pages[p2];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
function t() {
  return t = Object.assign ? Object.assign.bind() : function(t4) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var r2 = arguments[e2];
      for (var n2 in r2) ({}).hasOwnProperty.call(r2, n2) && (t4[n2] = r2[n2]);
    }
    return t4;
  }, t.apply(null, arguments);
}
var e = String.prototype.replace, r = /%20/g, n = "RFC3986", o = { default: n, formatters: { RFC1738: function(t4) {
  return e.call(t4, r, "+");
}, RFC3986: function(t4) {
  return String(t4);
} }, RFC1738: "RFC1738" }, i = Object.prototype.hasOwnProperty, u = Array.isArray, a = function() {
  for (var t4 = [], e2 = 0; e2 < 256; ++e2) t4.push("%" + ((e2 < 16 ? "0" : "") + e2.toString(16)).toUpperCase());
  return t4;
}(), s = function(t4, e2) {
  for (var r2 = e2 && e2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, n2 = 0; n2 < t4.length; ++n2) void 0 !== t4[n2] && (r2[n2] = t4[n2]);
  return r2;
}, f = { arrayToObject: s, assign: function(t4, e2) {
  return Object.keys(e2).reduce(function(t5, r2) {
    return t5[r2] = e2[r2], t5;
  }, t4);
}, combine: function(t4, e2) {
  return [].concat(t4, e2);
}, compact: function(t4) {
  for (var e2 = [{ obj: { o: t4 }, prop: "o" }], r2 = [], n2 = 0; n2 < e2.length; ++n2) for (var o2 = e2[n2], i2 = o2.obj[o2.prop], a2 = Object.keys(i2), s2 = 0; s2 < a2.length; ++s2) {
    var f2 = a2[s2], c2 = i2[f2];
    "object" == typeof c2 && null !== c2 && -1 === r2.indexOf(c2) && (e2.push({ obj: i2, prop: f2 }), r2.push(c2));
  }
  return function(t5) {
    for (; t5.length > 1; ) {
      var e3 = t5.pop(), r3 = e3.obj[e3.prop];
      if (u(r3)) {
        for (var n3 = [], o3 = 0; o3 < r3.length; ++o3) void 0 !== r3[o3] && n3.push(r3[o3]);
        e3.obj[e3.prop] = n3;
      }
    }
  }(e2), t4;
}, decode: function(t4, e2, r2) {
  var n2 = t4.replace(/\+/g, " ");
  if ("iso-8859-1" === r2) return n2.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n2);
  } catch (t5) {
    return n2;
  }
}, encode: function(t4, e2, r2, n2, i2) {
  if (0 === t4.length) return t4;
  var u2 = t4;
  if ("symbol" == typeof t4 ? u2 = Symbol.prototype.toString.call(t4) : "string" != typeof t4 && (u2 = String(t4)), "iso-8859-1" === r2) return escape(u2).replace(/%u[0-9a-f]{4}/gi, function(t5) {
    return "%26%23" + parseInt(t5.slice(2), 16) + "%3B";
  });
  for (var s2 = "", f2 = 0; f2 < u2.length; ++f2) {
    var c2 = u2.charCodeAt(f2);
    45 === c2 || 46 === c2 || 95 === c2 || 126 === c2 || c2 >= 48 && c2 <= 57 || c2 >= 65 && c2 <= 90 || c2 >= 97 && c2 <= 122 || i2 === o.RFC1738 && (40 === c2 || 41 === c2) ? s2 += u2.charAt(f2) : c2 < 128 ? s2 += a[c2] : c2 < 2048 ? s2 += a[192 | c2 >> 6] + a[128 | 63 & c2] : c2 < 55296 || c2 >= 57344 ? s2 += a[224 | c2 >> 12] + a[128 | c2 >> 6 & 63] + a[128 | 63 & c2] : (c2 = 65536 + ((1023 & c2) << 10 | 1023 & u2.charCodeAt(f2 += 1)), s2 += a[240 | c2 >> 18] + a[128 | c2 >> 12 & 63] + a[128 | c2 >> 6 & 63] + a[128 | 63 & c2]);
  }
  return s2;
}, isBuffer: function(t4) {
  return !(!t4 || "object" != typeof t4 || !(t4.constructor && t4.constructor.isBuffer && t4.constructor.isBuffer(t4)));
}, isRegExp: function(t4) {
  return "[object RegExp]" === Object.prototype.toString.call(t4);
}, maybeMap: function(t4, e2) {
  if (u(t4)) {
    for (var r2 = [], n2 = 0; n2 < t4.length; n2 += 1) r2.push(e2(t4[n2]));
    return r2;
  }
  return e2(t4);
}, merge: function t2(e2, r2, n2) {
  if (!r2) return e2;
  if ("object" != typeof r2) {
    if (u(e2)) e2.push(r2);
    else {
      if (!e2 || "object" != typeof e2) return [e2, r2];
      (n2 && (n2.plainObjects || n2.allowPrototypes) || !i.call(Object.prototype, r2)) && (e2[r2] = true);
    }
    return e2;
  }
  if (!e2 || "object" != typeof e2) return [e2].concat(r2);
  var o2 = e2;
  return u(e2) && !u(r2) && (o2 = s(e2, n2)), u(e2) && u(r2) ? (r2.forEach(function(r3, o3) {
    if (i.call(e2, o3)) {
      var u2 = e2[o3];
      u2 && "object" == typeof u2 && r3 && "object" == typeof r3 ? e2[o3] = t2(u2, r3, n2) : e2.push(r3);
    } else e2[o3] = r3;
  }), e2) : Object.keys(r2).reduce(function(e3, o3) {
    var u2 = r2[o3];
    return e3[o3] = i.call(e3, o3) ? t2(e3[o3], u2, n2) : u2, e3;
  }, o2);
} }, c = Object.prototype.hasOwnProperty, l = { brackets: function(t4) {
  return t4 + "[]";
}, comma: "comma", indices: function(t4, e2) {
  return t4 + "[" + e2 + "]";
}, repeat: function(t4) {
  return t4;
} }, p = Array.isArray, h = String.prototype.split, y = Array.prototype.push, d = function(t4, e2) {
  y.apply(t4, p(e2) ? e2 : [e2]);
}, g = Date.prototype.toISOString, b = o.default, v = { addQueryPrefix: false, allowDots: false, charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encoder: f.encode, encodeValuesOnly: false, format: b, formatter: o.formatters[b], indices: false, serializeDate: function(t4) {
  return g.call(t4);
}, skipNulls: false, strictNullHandling: false }, m = function t3(e2, r2, n2, o2, i2, u2, a2, s2, c2, l2, y2, g2, b2, m2) {
  var j2, w2 = e2;
  if ("function" == typeof a2 ? w2 = a2(r2, w2) : w2 instanceof Date ? w2 = l2(w2) : "comma" === n2 && p(w2) && (w2 = f.maybeMap(w2, function(t4) {
    return t4 instanceof Date ? l2(t4) : t4;
  })), null === w2) {
    if (o2) return u2 && !b2 ? u2(r2, v.encoder, m2, "key", y2) : r2;
    w2 = "";
  }
  if ("string" == typeof (j2 = w2) || "number" == typeof j2 || "boolean" == typeof j2 || "symbol" == typeof j2 || "bigint" == typeof j2 || f.isBuffer(w2)) {
    if (u2) {
      var $2 = b2 ? r2 : u2(r2, v.encoder, m2, "key", y2);
      if ("comma" === n2 && b2) {
        for (var O2 = h.call(String(w2), ","), E2 = "", R2 = 0; R2 < O2.length; ++R2) E2 += (0 === R2 ? "" : ",") + g2(u2(O2[R2], v.encoder, m2, "value", y2));
        return [g2($2) + "=" + E2];
      }
      return [g2($2) + "=" + g2(u2(w2, v.encoder, m2, "value", y2))];
    }
    return [g2(r2) + "=" + g2(String(w2))];
  }
  var S2, x2 = [];
  if (void 0 === w2) return x2;
  if ("comma" === n2 && p(w2)) S2 = [{ value: w2.length > 0 ? w2.join(",") || null : void 0 }];
  else if (p(a2)) S2 = a2;
  else {
    var N2 = Object.keys(w2);
    S2 = s2 ? N2.sort(s2) : N2;
  }
  for (var T2 = 0; T2 < S2.length; ++T2) {
    var k = S2[T2], C = "object" == typeof k && void 0 !== k.value ? k.value : w2[k];
    if (!i2 || null !== C) {
      var _ = p(w2) ? "function" == typeof n2 ? n2(r2, k) : r2 : r2 + (c2 ? "." + k : "[" + k + "]");
      d(x2, t3(C, _, n2, o2, i2, u2, a2, s2, c2, l2, y2, g2, b2, m2));
    }
  }
  return x2;
}, j = Object.prototype.hasOwnProperty, w = Array.isArray, $ = { allowDots: false, allowPrototypes: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decoder: f.decode, delimiter: "&", depth: 5, ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, O = function(t4) {
  return t4.replace(/&#(\d+);/g, function(t5, e2) {
    return String.fromCharCode(parseInt(e2, 10));
  });
}, E = function(t4, e2) {
  return t4 && "string" == typeof t4 && e2.comma && t4.indexOf(",") > -1 ? t4.split(",") : t4;
}, R = function(t4, e2, r2, n2) {
  if (t4) {
    var o2 = r2.allowDots ? t4.replace(/\.([^.[]+)/g, "[$1]") : t4, i2 = /(\[[^[\]]*])/g, u2 = r2.depth > 0 && /(\[[^[\]]*])/.exec(o2), a2 = u2 ? o2.slice(0, u2.index) : o2, s2 = [];
    if (a2) {
      if (!r2.plainObjects && j.call(Object.prototype, a2) && !r2.allowPrototypes) return;
      s2.push(a2);
    }
    for (var f2 = 0; r2.depth > 0 && null !== (u2 = i2.exec(o2)) && f2 < r2.depth; ) {
      if (f2 += 1, !r2.plainObjects && j.call(Object.prototype, u2[1].slice(1, -1)) && !r2.allowPrototypes) return;
      s2.push(u2[1]);
    }
    return u2 && s2.push("[" + o2.slice(u2.index) + "]"), function(t5, e3, r3, n3) {
      for (var o3 = n3 ? e3 : E(e3, r3), i3 = t5.length - 1; i3 >= 0; --i3) {
        var u3, a3 = t5[i3];
        if ("[]" === a3 && r3.parseArrays) u3 = [].concat(o3);
        else {
          u3 = r3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var s3 = "[" === a3.charAt(0) && "]" === a3.charAt(a3.length - 1) ? a3.slice(1, -1) : a3, f3 = parseInt(s3, 10);
          r3.parseArrays || "" !== s3 ? !isNaN(f3) && a3 !== s3 && String(f3) === s3 && f3 >= 0 && r3.parseArrays && f3 <= r3.arrayLimit ? (u3 = [])[f3] = o3 : "__proto__" !== s3 && (u3[s3] = o3) : u3 = { 0: o3 };
        }
        o3 = u3;
      }
      return o3;
    }(s2, e2, r2, n2);
  }
}, S = function(t4, e2) {
  var r2 = /* @__PURE__ */ function(t5) {
    return $;
  }();
  if ("" === t4 || null == t4) return r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n2 = "string" == typeof t4 ? function(t5, e3) {
    var r3, n3 = {}, o3 = (e3.ignoreQueryPrefix ? t5.replace(/^\?/, "") : t5).split(e3.delimiter, Infinity === e3.parameterLimit ? void 0 : e3.parameterLimit), i3 = -1, u3 = e3.charset;
    if (e3.charsetSentinel) for (r3 = 0; r3 < o3.length; ++r3) 0 === o3[r3].indexOf("utf8=") && ("utf8=%E2%9C%93" === o3[r3] ? u3 = "utf-8" : "utf8=%26%2310003%3B" === o3[r3] && (u3 = "iso-8859-1"), i3 = r3, r3 = o3.length);
    for (r3 = 0; r3 < o3.length; ++r3) if (r3 !== i3) {
      var a3, s3, c2 = o3[r3], l2 = c2.indexOf("]="), p2 = -1 === l2 ? c2.indexOf("=") : l2 + 1;
      -1 === p2 ? (a3 = e3.decoder(c2, $.decoder, u3, "key"), s3 = e3.strictNullHandling ? null : "") : (a3 = e3.decoder(c2.slice(0, p2), $.decoder, u3, "key"), s3 = f.maybeMap(E(c2.slice(p2 + 1), e3), function(t6) {
        return e3.decoder(t6, $.decoder, u3, "value");
      })), s3 && e3.interpretNumericEntities && "iso-8859-1" === u3 && (s3 = O(s3)), c2.indexOf("[]=") > -1 && (s3 = w(s3) ? [s3] : s3), n3[a3] = j.call(n3, a3) ? f.combine(n3[a3], s3) : s3;
    }
    return n3;
  }(t4, r2) : t4, o2 = r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, i2 = Object.keys(n2), u2 = 0; u2 < i2.length; ++u2) {
    var a2 = i2[u2], s2 = R(a2, n2[a2], r2, "string" == typeof t4);
    o2 = f.merge(o2, s2, r2);
  }
  return f.compact(o2);
};
class x {
  constructor(t4, e2, r2) {
    var n2, o2;
    this.name = t4, this.definition = e2, this.bindings = null != (n2 = e2.bindings) ? n2 : {}, this.wheres = null != (o2 = e2.wheres) ? o2 : {}, this.config = r2;
  }
  get template() {
    const t4 = `${this.origin}/${this.definition.uri}`.replace(/\/+$/, "");
    return "" === t4 ? "/" : t4;
  }
  get origin() {
    return this.config.absolute ? this.definition.domain ? `${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port ? `:${this.config.port}` : ""}` : this.config.url : "";
  }
  get parameterSegments() {
    var t4, e2;
    return null != (t4 = null == (e2 = this.template.match(/{[^}?]+\??}/g)) ? void 0 : e2.map((t5) => ({ name: t5.replace(/{|\??}/g, ""), required: !/\?}$/.test(t5) }))) ? t4 : [];
  }
  matchesUrl(t4) {
    var e2;
    if (!this.definition.methods.includes("GET")) return false;
    const r2 = this.template.replace(/[.*+$()[\]]/g, "\\$&").replace(/(\/?){([^}?]*)(\??)}/g, (t5, e3, r3, n3) => {
      var o3;
      const i3 = `(?<${r3}>${(null == (o3 = this.wheres[r3]) ? void 0 : o3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+"})`;
      return n3 ? `(${e3}${i3})?` : `${e3}${i3}`;
    }).replace(/^\w+:\/\//, ""), [n2, o2] = t4.replace(/^\w+:\/\//, "").split("?"), i2 = null != (e2 = new RegExp(`^${r2}/?$`).exec(n2)) ? e2 : new RegExp(`^${r2}/?$`).exec(decodeURI(n2));
    if (i2) {
      for (const t5 in i2.groups) i2.groups[t5] = "string" == typeof i2.groups[t5] ? decodeURIComponent(i2.groups[t5]) : i2.groups[t5];
      return { params: i2.groups, query: S(o2) };
    }
    return false;
  }
  compile(t4) {
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, (e2, r2, n2) => {
      var o2, i2;
      if (!n2 && [null, void 0].includes(t4[r2])) throw new Error(`Ziggy error: '${r2}' parameter is required for route '${this.name}'.`);
      if (this.wheres[r2] && !new RegExp(`^${n2 ? `(${this.wheres[r2]})?` : this.wheres[r2]}$`).test(null != (i2 = t4[r2]) ? i2 : "")) throw new Error(`Ziggy error: '${r2}' parameter '${t4[r2]}' does not match required format '${this.wheres[r2]}' for route '${this.name}'.`);
      return encodeURI(null != (o2 = t4[r2]) ? o2 : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template;
  }
}
class N extends String {
  constructor(e2, r2, n2 = true, o2) {
    if (super(), this.t = null != o2 ? o2 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, this.t = t({}, this.t, { absolute: n2 }), e2) {
      if (!this.t.routes[e2]) throw new Error(`Ziggy error: route '${e2}' is not in the route list.`);
      this.i = new x(e2, this.t.routes[e2], this.t), this.u = this.l(r2);
    }
  }
  toString() {
    const e2 = Object.keys(this.u).filter((t4) => !this.i.parameterSegments.some(({ name: e3 }) => e3 === t4)).filter((t4) => "_query" !== t4).reduce((e3, r2) => t({}, e3, { [r2]: this.u[r2] }), {});
    return this.i.compile(this.u) + function(t4, e3) {
      var r2, n2 = t4, i2 = function(t5) {
        if (!t5) return v;
        if (null != t5.encoder && "function" != typeof t5.encoder) throw new TypeError("Encoder has to be a function.");
        var e4 = t5.charset || v.charset;
        if (void 0 !== t5.charset && "utf-8" !== t5.charset && "iso-8859-1" !== t5.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        var r3 = o.default;
        if (void 0 !== t5.format) {
          if (!c.call(o.formatters, t5.format)) throw new TypeError("Unknown format option provided.");
          r3 = t5.format;
        }
        var n3 = o.formatters[r3], i3 = v.filter;
        return ("function" == typeof t5.filter || p(t5.filter)) && (i3 = t5.filter), { addQueryPrefix: "boolean" == typeof t5.addQueryPrefix ? t5.addQueryPrefix : v.addQueryPrefix, allowDots: void 0 === t5.allowDots ? v.allowDots : !!t5.allowDots, charset: e4, charsetSentinel: "boolean" == typeof t5.charsetSentinel ? t5.charsetSentinel : v.charsetSentinel, delimiter: void 0 === t5.delimiter ? v.delimiter : t5.delimiter, encode: "boolean" == typeof t5.encode ? t5.encode : v.encode, encoder: "function" == typeof t5.encoder ? t5.encoder : v.encoder, encodeValuesOnly: "boolean" == typeof t5.encodeValuesOnly ? t5.encodeValuesOnly : v.encodeValuesOnly, filter: i3, format: r3, formatter: n3, serializeDate: "function" == typeof t5.serializeDate ? t5.serializeDate : v.serializeDate, skipNulls: "boolean" == typeof t5.skipNulls ? t5.skipNulls : v.skipNulls, sort: "function" == typeof t5.sort ? t5.sort : null, strictNullHandling: "boolean" == typeof t5.strictNullHandling ? t5.strictNullHandling : v.strictNullHandling };
      }(e3);
      "function" == typeof i2.filter ? n2 = (0, i2.filter)("", n2) : p(i2.filter) && (r2 = i2.filter);
      var u2 = [];
      if ("object" != typeof n2 || null === n2) return "";
      var a2 = l[e3 && e3.arrayFormat in l ? e3.arrayFormat : e3 && "indices" in e3 ? e3.indices ? "indices" : "repeat" : "indices"];
      r2 || (r2 = Object.keys(n2)), i2.sort && r2.sort(i2.sort);
      for (var s2 = 0; s2 < r2.length; ++s2) {
        var f2 = r2[s2];
        i2.skipNulls && null === n2[f2] || d(u2, m(n2[f2], f2, a2, i2.strictNullHandling, i2.skipNulls, i2.encode ? i2.encoder : null, i2.filter, i2.sort, i2.allowDots, i2.serializeDate, i2.format, i2.formatter, i2.encodeValuesOnly, i2.charset));
      }
      var h2 = u2.join(i2.delimiter), y2 = true === i2.addQueryPrefix ? "?" : "";
      return i2.charsetSentinel && (y2 += "iso-8859-1" === i2.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), h2.length > 0 ? y2 + h2 : "";
    }(t({}, e2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: (t4, e3) => "boolean" == typeof t4 ? Number(t4) : e3(t4) });
  }
  p(e2) {
    e2 ? this.t.absolute && e2.startsWith("/") && (e2 = this.h().host + e2) : e2 = this.v();
    let r2 = {};
    const [n2, o2] = Object.entries(this.t.routes).find(([t4, n3]) => r2 = new x(t4, n3, this.t).matchesUrl(e2)) || [void 0, void 0];
    return t({ name: n2 }, r2, { route: o2 });
  }
  v() {
    const { host: t4, pathname: e2, search: r2 } = this.h();
    return (this.t.absolute ? t4 + e2 : e2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + r2;
  }
  current(e2, r2) {
    const { name: n2, params: o2, query: i2, route: u2 } = this.p();
    if (!e2) return n2;
    const a2 = new RegExp(`^${e2.replace(/\./g, "\\.").replace(/\*/g, ".*")}$`).test(n2);
    if ([null, void 0].includes(r2) || !a2) return a2;
    const s2 = new x(n2, u2, this.t);
    r2 = this.l(r2, s2);
    const f2 = t({}, o2, i2);
    if (Object.values(r2).every((t4) => !t4) && !Object.values(f2).some((t4) => void 0 !== t4)) return true;
    const c2 = (t4, e3) => Object.entries(t4).every(([t5, r3]) => Array.isArray(r3) && Array.isArray(e3[t5]) ? r3.every((r4) => e3[t5].includes(r4)) : "object" == typeof r3 && "object" == typeof e3[t5] && null !== r3 && null !== e3[t5] ? c2(r3, e3[t5]) : e3[t5] == r3);
    return c2(r2, f2);
  }
  h() {
    var t4, e2, r2, n2, o2, i2;
    const { host: u2 = "", pathname: a2 = "", search: s2 = "" } = "undefined" != typeof window ? window.location : {};
    return { host: null != (t4 = null == (e2 = this.t.location) ? void 0 : e2.host) ? t4 : u2, pathname: null != (r2 = null == (n2 = this.t.location) ? void 0 : n2.pathname) ? r2 : a2, search: null != (o2 = null == (i2 = this.t.location) ? void 0 : i2.search) ? o2 : s2 };
  }
  get params() {
    const { params: e2, query: r2 } = this.p();
    return t({}, e2, r2);
  }
  get routeParams() {
    return this.p().params;
  }
  get queryParams() {
    return this.p().query;
  }
  has(t4) {
    return this.t.routes.hasOwnProperty(t4);
  }
  l(e2 = {}, r2 = this.i) {
    null != e2 || (e2 = {}), e2 = ["string", "number"].includes(typeof e2) ? [e2] : e2;
    const n2 = r2.parameterSegments.filter(({ name: t4 }) => !this.t.defaults[t4]);
    return Array.isArray(e2) ? e2 = e2.reduce((e3, r3, o2) => t({}, e3, n2[o2] ? { [n2[o2].name]: r3 } : "object" == typeof r3 ? r3 : { [r3]: "" }), {}) : 1 !== n2.length || e2[n2[0].name] || !e2.hasOwnProperty(Object.values(r2.bindings)[0]) && !e2.hasOwnProperty("id") || (e2 = { [n2[0].name]: e2 }), t({}, this.m(r2), this.j(e2, r2));
  }
  m(e2) {
    return e2.parameterSegments.filter(({ name: t4 }) => this.t.defaults[t4]).reduce((e3, { name: r2 }, n2) => t({}, e3, { [r2]: this.t.defaults[r2] }), {});
  }
  j(e2, { bindings: r2, parameterSegments: n2 }) {
    return Object.entries(e2).reduce((e3, [o2, i2]) => {
      if (!i2 || "object" != typeof i2 || Array.isArray(i2) || !n2.some(({ name: t4 }) => t4 === o2)) return t({}, e3, { [o2]: i2 });
      if (!i2.hasOwnProperty(r2[o2])) {
        if (!i2.hasOwnProperty("id")) throw new Error(`Ziggy error: object passed as '${o2}' parameter is missing route model binding key '${r2[o2]}'.`);
        r2[o2] = "id";
      }
      return t({}, e3, { [o2]: i2[r2[o2]] });
    }, {});
  }
  valueOf() {
    return this.toString();
  }
}
function T(t4, e2, r2, n2) {
  const o2 = new N(t4, e2, r2, n2);
  return t4 ? o2.toString() : o2;
}
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => `${title}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, /* @__PURE__ */ Object.assign({ "./pages/auth/confirm-password.tsx": () => import("./assets/confirm-password-C2cYpB1o.js"), "./pages/auth/forgot-password.tsx": () => import("./assets/forgot-password-C-m6wiuH.js"), "./pages/auth/login.tsx": () => import("./assets/login-BJf5o7Nw.js"), "./pages/auth/register.tsx": () => import("./assets/register-B_f4Ve0K.js"), "./pages/auth/reset-password.tsx": () => import("./assets/reset-password-ClRYzAi3.js"), "./pages/auth/verify-email.tsx": () => import("./assets/verify-email-BeXzM3Fq.js"), "./pages/blogs/index.tsx": () => import("./assets/index-DomqpDb-.js"), "./pages/blogs/partials/blog-comments.tsx": () => import("./assets/blog-comments-BgM-jOdg.js"), "./pages/blogs/partials/blog-filter.tsx": () => import("./assets/blog-filter-BpW1oWoy.js"), "./pages/blogs/partials/blog-like-dislike.tsx": () => import("./assets/blog-like-dislike-B-CTg9wv.js"), "./pages/blogs/partials/layout.tsx": () => import("./assets/layout-Cm2B8RKT.js"), "./pages/blogs/show.tsx": () => import("./assets/show-Dor2Sspo.js"), "./pages/cart/index.tsx": () => import("./assets/index-BvQmCKNS.js"), "./pages/cart/partials/cart-summery.tsx": () => import("./assets/cart-summery-DGzBC4w_.js"), "./pages/cart/partials/course-card.tsx": () => import("./assets/course-card-xxA2SH7g.js"), "./pages/course-player/forms/forum-edit.tsx": () => import("./assets/forum-edit-DQ2RVNRG.js"), "./pages/course-player/forms/forum-reply.tsx": () => import("./assets/forum-reply-BjjYooAP.js"), "./pages/course-player/forms/review-edit.tsx": () => import("./assets/review-edit-DA4Afna8.js"), "./pages/course-player/forms/review.tsx": () => import("./assets/review-DuVOKZyF.js"), "./pages/course-player/index.tsx": () => import("./assets/index-Boz0vsDD.js"), "./pages/course-player/live-class/zoom-live-class.tsx": () => import("./assets/zoom-live-class--j3C0X9T.js"), "./pages/course-player/partials/certificate.tsx": () => import("./assets/certificate-E4D9w8dR.js"), "./pages/course-player/partials/content-list.tsx": () => import("./assets/content-list-DSInkTYP.js"), "./pages/course-player/partials/content-summery.tsx": () => import("./assets/content-summery-C3u9JoRh.js"), "./pages/course-player/partials/document-viewer.tsx": () => import("./assets/document-viewer-CmDtS_91.js"), "./pages/course-player/partials/embed-viewer.tsx": () => import("./assets/embed-viewer-CRjXuKs5.js"), "./pages/course-player/partials/forum.tsx": () => import("./assets/forum-DXPdP6lk.js"), "./pages/course-player/partials/lesson-control.tsx": () => import("./assets/lesson-control-2pONF3aa.js"), "./pages/course-player/partials/lesson-viewer.tsx": () => import("./assets/lesson-viewer-BffNYLvk.js"), "./pages/course-player/partials/lesson.tsx": () => import("./assets/lesson-CpyKEqKB.js"), "./pages/course-player/partials/live-class-status.tsx": () => import("./assets/live-class-status-f_TxZKGA.js"), "./pages/course-player/partials/navbar.tsx": () => import("./assets/navbar---BV-H35.js"), "./pages/course-player/partials/quiz-viewer.tsx": () => import("./assets/quiz-viewer-DX-1E998.js"), "./pages/course-player/partials/quiz.tsx": () => import("./assets/quiz-BODlPz_N.js"), "./pages/course-player/partials/sidebar-toggle.tsx": () => import("./assets/sidebar-toggle-BaGex-DV.js"), "./pages/courses/index.tsx": () => import("./assets/index-BlrY4BEc.js"), "./pages/courses/layout.tsx": () => import("./assets/layout-CVyy04Ag.js"), "./pages/courses/partials/course-filter.tsx": () => import("./assets/course-filter-SbkidpJ7.js"), "./pages/courses/partials/course-header.tsx": () => import("./assets/course-header-CdRatnfU.js"), "./pages/courses/partials/course-player-button.tsx": () => import("./assets/course-player-button-C5bf5Cdr.js"), "./pages/courses/partials/course-preview.tsx": () => import("./assets/course-preview-CGcQKfwY.js"), "./pages/courses/partials/course-reviews.tsx": () => import("./assets/course-reviews-Inqv7ssg.js"), "./pages/courses/partials/course-summery.tsx": () => import("./assets/course-summery-DtyBJa_r.js"), "./pages/courses/partials/curriculum.tsx": () => import("./assets/curriculum-sYY9My6d.js"), "./pages/courses/partials/details.tsx": () => import("./assets/details-NTl8K5Bh.js"), "./pages/courses/partials/instructor.tsx": () => import("./assets/instructor-CBIxDvgH.js"), "./pages/courses/partials/overview.tsx": () => import("./assets/overview-BXFPAy5q.js"), "./pages/courses/partials/table-footer.tsx": () => import("./assets/table-footer-DZeR0XCI.js"), "./pages/courses/show.tsx": () => import("./assets/show-DmBaTpNv.js"), "./pages/dashboard/blogs/categories.tsx": () => import("./assets/categories-DuTqUMnW.js"), "./pages/dashboard/blogs/create-edit.tsx": () => import("./assets/create-edit-Dw4pyNwT.js"), "./pages/dashboard/blogs/index.tsx": () => import("./assets/index-CJ3WArNh.js"), "./pages/dashboard/blogs/partials/blog-form.tsx": () => import("./assets/blog-form-Cfl6mME7.js"), "./pages/dashboard/blogs/partials/category-form.tsx": () => import("./assets/category-form-VYznSP0g.js"), "./pages/dashboard/blogs/partials/table-columns.tsx": () => import("./assets/table-columns-CUMzMGY9.js"), "./pages/dashboard/blogs/preview.tsx": () => import("./assets/preview-BU6EDxHe.js"), "./pages/dashboard/categories/index.tsx": () => import("./assets/index-CRcGtUMe.js"), "./pages/dashboard/categories/partials/category-child-form.tsx": () => import("./assets/category-child-form-UUQ-ivJ4.js"), "./pages/dashboard/categories/partials/category-form.tsx": () => import("./assets/category-form-CtUrUZhT.js"), "./pages/dashboard/courses/create.tsx": () => import("./assets/create-4x1sYfFm.js"), "./pages/dashboard/courses/index.tsx": () => import("./assets/index-C6POK_63.js"), "./pages/dashboard/courses/partials/basic.tsx": () => import("./assets/basic-DP1dahtb.js"), "./pages/dashboard/courses/partials/course-status-filter.tsx": () => import("./assets/course-status-filter-BY8sX2jr.js"), "./pages/dashboard/courses/partials/course-update-header.tsx": () => import("./assets/course-update-header-D7qgg-if.js"), "./pages/dashboard/courses/partials/curriculum.tsx": () => import("./assets/curriculum-Db399_6M.js"), "./pages/dashboard/courses/partials/drip-content.tsx": () => import("./assets/drip-content-ECqBcsK3.js"), "./pages/dashboard/courses/partials/forms/faq-form.tsx": () => import("./assets/faq-form-CT8jLy5J.js"), "./pages/dashboard/courses/partials/forms/lesson-form.tsx": () => import("./assets/lesson-form-Dd8mUjm0.js"), "./pages/dashboard/courses/partials/forms/live-class-form.tsx": () => import("./assets/live-class-form-CNPGVnFR.js"), "./pages/dashboard/courses/partials/forms/outcome-form.tsx": () => import("./assets/outcome-form-CH10_hKT.js"), "./pages/dashboard/courses/partials/forms/question-form.tsx": () => import("./assets/question-form-ClHezF_6.js"), "./pages/dashboard/courses/partials/forms/question-questions.tsx": () => import("./assets/question-questions-Oyj4_ecF.js"), "./pages/dashboard/courses/partials/forms/quiz-form.tsx": () => import("./assets/quiz-form-DQLpdqb8.js"), "./pages/dashboard/courses/partials/forms/requirement-form.tsx": () => import("./assets/requirement-form-DBTOPI_1.js"), "./pages/dashboard/courses/partials/forms/section-form.tsx": () => import("./assets/section-form-FeCsHLYS.js"), "./pages/dashboard/courses/partials/info.tsx": () => import("./assets/info-D6gSQeNw.js"), "./pages/dashboard/courses/partials/live-class-status.tsx": () => import("./assets/live-class-status-BIKu7H7z.js"), "./pages/dashboard/courses/partials/live-class.tsx": () => import("./assets/live-class-CNOws6Rw.js"), "./pages/dashboard/courses/partials/media.tsx": () => import("./assets/media-Mdb2uPqg.js"), "./pages/dashboard/courses/partials/pricing.tsx": () => import("./assets/pricing-Baa0OIWJ.js"), "./pages/dashboard/courses/partials/seo.tsx": () => import("./assets/seo-CY3FzLEi.js"), "./pages/dashboard/courses/partials/table-columns.tsx": () => import("./assets/table-columns-B4HN_xjF.js"), "./pages/dashboard/courses/update.tsx": () => import("./assets/update-DgzFWMX9.js"), "./pages/dashboard/enrollments/create.tsx": () => import("./assets/create-MSUAQpJx.js"), "./pages/dashboard/enrollments/index.tsx": () => import("./assets/index-BwGrkyW4.js"), "./pages/dashboard/enrollments/partials/admin-table-columns.tsx": () => import("./assets/admin-table-columns-VuVchRDT.js"), "./pages/dashboard/enrollments/partials/instructor-table-columns.tsx": () => import("./assets/instructor-table-columns-AwOxcjA_.js"), "./pages/dashboard/index.tsx": () => import("./assets/index-DZLsk8XM.js"), "./pages/dashboard/instructors/Partials/application-approval.tsx": () => import("./assets/application-approval-BUZ3W5Vb.js"), "./pages/dashboard/instructors/Partials/applications-table-columns.tsx": () => import("./assets/applications-table-columns-oVQaJL1X.js"), "./pages/dashboard/instructors/Partials/instructors-table-columns.tsx": () => import("./assets/instructors-table-columns-T73PYp35.js"), "./pages/dashboard/instructors/applications.tsx": () => import("./assets/applications-Dex5Rrg7.js"), "./pages/dashboard/instructors/create-update.tsx": () => import("./assets/create-update-taNZcI8z.js"), "./pages/dashboard/instructors/index.tsx": () => import("./assets/index-DuWGkm--.js"), "./pages/dashboard/job-circulars/create.tsx": () => import("./assets/create-Cz1w9Tqa.js"), "./pages/dashboard/job-circulars/edit.tsx": () => import("./assets/edit-B4UtshF6.js"), "./pages/dashboard/job-circulars/index.tsx": () => import("./assets/index-9dSwxRMn.js"), "./pages/dashboard/job-circulars/partials/job-circular-form.tsx": () => import("./assets/job-circular-form-C_mOk4Ke.js"), "./pages/dashboard/newsletters/index.tsx": () => import("./assets/index-DpPmg9ka.js"), "./pages/dashboard/newsletters/partials/newsletter-form.tsx": () => import("./assets/newsletter-form-B_vq4dxo.js"), "./pages/dashboard/newsletters/partials/newsletter-send.tsx": () => import("./assets/newsletter-send-BJQHTb0V.js"), "./pages/dashboard/partials/revenue-chart.tsx": () => import("./assets/revenue-chart-BY9MRZ-U.js"), "./pages/dashboard/payouts/history.tsx": () => import("./assets/history-CokJbXN1.js"), "./pages/dashboard/payouts/index.tsx": () => import("./assets/index-WTEQbDqb.js"), "./pages/dashboard/payouts/partials/history-table-columns.tsx": () => import("./assets/history-table-columns-CeX5uDLo.js"), "./pages/dashboard/payouts/partials/mollie.tsx": () => import("./assets/mollie-BEWI5bWt.js"), "./pages/dashboard/payouts/partials/payouts-table-columns.tsx": () => import("./assets/payouts-table-columns-DnzWMwpj.js"), "./pages/dashboard/payouts/partials/paypal.tsx": () => import("./assets/paypal-CejCCPzm.js"), "./pages/dashboard/payouts/partials/paystack.tsx": () => import("./assets/paystack-tpgaDh6Q.js"), "./pages/dashboard/payouts/partials/request-table-columns.tsx": () => import("./assets/request-table-columns-B-HgXkFv.js"), "./pages/dashboard/payouts/partials/stripe.tsx": () => import("./assets/stripe-DGM42dJ3.js"), "./pages/dashboard/payouts/partials/withdraw-form.tsx": () => import("./assets/withdraw-form-C0QpOtTA.js"), "./pages/dashboard/payouts/request.tsx": () => import("./assets/request-VNKWjA8G.js"), "./pages/dashboard/payouts/settings.tsx": () => import("./assets/settings-DmLELIsS.js"), "./pages/dashboard/settings/account.tsx": () => import("./assets/account-BoXhEx9b.js"), "./pages/dashboard/settings/auth.tsx": () => import("./assets/auth-BxCJO9lk.js"), "./pages/dashboard/settings/live-class.tsx": () => import("./assets/live-class-B52VVFbn.js"), "./pages/dashboard/settings/maintenance/index.tsx": () => import("./assets/index-DfWzZUMT.js"), "./pages/dashboard/settings/maintenance/partials/application-backup-list.tsx": () => import("./assets/application-backup-list-DMlk-bTX.js"), "./pages/dashboard/settings/maintenance/partials/application-backup.tsx": () => import("./assets/application-backup-DlrnLCAq.js"), "./pages/dashboard/settings/maintenance/partials/application-update.tsx": () => import("./assets/application-update-D2o9QR2O.js"), "./pages/dashboard/settings/pages/index.tsx": () => import("./assets/index-Cxu6pbPu.js"), "./pages/dashboard/settings/pages/partials/custom-page-create-form.tsx": () => import("./assets/custom-page-create-form-BSEIfl9n.js"), "./pages/dashboard/settings/pages/partials/custom-pages-table-columns.tsx": () => import("./assets/custom-pages-table-columns-BFSvnhIY.js"), "./pages/dashboard/settings/pages/partials/home-pages-table-columns.tsx": () => import("./assets/home-pages-table-columns-DW9xLmNv.js"), "./pages/dashboard/settings/pages/update.tsx": () => import("./assets/update-BulIEp1x.js"), "./pages/dashboard/settings/partials/google.tsx": () => import("./assets/google-sjOp09js.js"), "./pages/dashboard/settings/partials/mollie.tsx": () => import("./assets/mollie-CrPuMCWj.js"), "./pages/dashboard/settings/partials/paypal.tsx": () => import("./assets/paypal-BjFLw12Z.js"), "./pages/dashboard/settings/partials/paystack.tsx": () => import("./assets/paystack-Bo_jeG9q.js"), "./pages/dashboard/settings/partials/paytm.tsx": () => import("./assets/paytm-BAmkdGhp.js"), "./pages/dashboard/settings/partials/profile.tsx": () => import("./assets/profile-BZ9FIXFb.js"), "./pages/dashboard/settings/partials/razorpay.tsx": () => import("./assets/razorpay-CluJjG1b.js"), "./pages/dashboard/settings/partials/sslcommerz.tsx": () => import("./assets/sslcommerz-D0Mur9vn.js"), "./pages/dashboard/settings/partials/stripe.tsx": () => import("./assets/stripe-BIuoxLP3.js"), "./pages/dashboard/settings/partials/update-profile.tsx": () => import("./assets/update-profile-DQgtstPw.js"), "./pages/dashboard/settings/payment.tsx": () => import("./assets/payment-D8MIGknE.js"), "./pages/dashboard/settings/smtp.tsx": () => import("./assets/smtp-B8Aax49N.js"), "./pages/dashboard/settings/storage.tsx": () => import("./assets/storage-DDBmD8TQ.js"), "./pages/dashboard/settings/system/index.tsx": () => import("./assets/index-WYGE6QwO.js"), "./pages/dashboard/settings/system/partials/footer.tsx": () => import("./assets/footer-Z16sn2eV.js"), "./pages/dashboard/settings/system/partials/navbar.tsx": () => import("./assets/navbar-J3XuF3IC.js"), "./pages/dashboard/settings/system/partials/style.tsx": () => import("./assets/style-BGl7_o9L.js"), "./pages/dashboard/settings/system/partials/website.tsx": () => import("./assets/website-D5KVMxOz.js"), "./pages/dashboard/users/Partials/edit-form.tsx": () => import("./assets/edit-form-CU2quFIa.js"), "./pages/dashboard/users/Partials/table-columns.tsx": () => import("./assets/table-columns-D1Lmwxxx.js"), "./pages/dashboard/users/index.tsx": () => import("./assets/index-CwqO30rh.js"), "./pages/inner/index.tsx": () => import("./assets/index-DPstG7e2.js"), "./pages/inner/partials/hero.tsx": () => import("./assets/hero-DL-8otSj.js"), "./pages/inner/sections/call-to-action.tsx": () => import("./assets/call-to-action-9FQlziOY.js"), "./pages/inner/sections/career.tsx": () => import("./assets/career-q1ynfPmr.js"), "./pages/inner/sections/hero.tsx": () => import("./assets/hero-DBsp8RnO.js"), "./pages/inner/sections/index.tsx": () => import("./assets/index-B3yopP7J.js"), "./pages/inner/sections/success-statistics.tsx": () => import("./assets/success-statistics-DZFUoiXe.js"), "./pages/inner/sections/team.tsx": () => import("./assets/team-39UZhIKm.js"), "./pages/inner/sections/top-instructors.tsx": () => import("./assets/top-instructors-Dc32sWBy.js"), "./pages/installer/Finish.tsx": () => import("./assets/Finish-CYUhK5e2.js"), "./pages/installer/Install.tsx": () => import("./assets/Install-CNmPDe78.js"), "./pages/installer/Partials/Layout.tsx": () => import("./assets/Layout-BabR1Av6.js"), "./pages/installer/Partials/Message.tsx": () => import("./assets/Message-DFXOluuJ.js"), "./pages/installer/Partials/StepNavigator.tsx": () => import("./assets/StepNavigator-Ce2PCpaO.js"), "./pages/installer/Step1.tsx": () => import("./assets/Step1-qZk_9Ea4.js"), "./pages/installer/Step2.tsx": () => import("./assets/Step2-BI0i6fG4.js"), "./pages/installer/Step3.tsx": () => import("./assets/Step3-1VxkUlDf.js"), "./pages/installer/Step4.tsx": () => import("./assets/Step4-RqnDMZNB.js"), "./pages/instructors/index.tsx": () => import("./assets/index-B2fyIckq.js"), "./pages/instructors/show.tsx": () => import("./assets/show-bk6GD4i4.js"), "./pages/intro/home-1.tsx": () => import("./assets/home-1-qeqUe6F8.js"), "./pages/intro/home-2.tsx": () => import("./assets/home-2-BG0O82-W.js"), "./pages/intro/home-3.tsx": () => import("./assets/home-3-Ba1XQXK1.js"), "./pages/intro/home-4.tsx": () => import("./assets/home-4-Dz_KemXH.js"), "./pages/intro/home-5.tsx": () => import("./assets/home-5-B5PqTo-5.js"), "./pages/intro/partials/contents/categories.tsx": () => import("./assets/categories-DDsBVKh9.js"), "./pages/intro/partials/contents/contents.tsx": () => import("./assets/contents-CJ4GrbVE.js"), "./pages/intro/partials/contents/courses.tsx": () => import("./assets/courses-DHkdS4VK.js"), "./pages/intro/partials/contents/instructors.tsx": () => import("./assets/instructors-CnrFCWqK.js"), "./pages/intro/partials/contents/partials/categories-table-columns.tsx": () => import("./assets/categories-table-columns-B8mcts5v.js"), "./pages/intro/partials/contents/partials/courses-table-columns.tsx": () => import("./assets/courses-table-columns-Ddn0Q5n-.js"), "./pages/intro/partials/contents/partials/instructors-table-columns.tsx": () => import("./assets/instructors-table-columns-fMFyOuiv.js"), "./pages/intro/partials/contents/partials/table-filter.tsx": () => import("./assets/table-filter-BfBC8k9t.js"), "./pages/intro/partials/contents/partials/table-footer.tsx": () => import("./assets/table-footer-CbqUzH_n.js"), "./pages/intro/partials/home-1/blogs.tsx": () => import("./assets/blogs-D-jx_8MJ.js"), "./pages/intro/partials/home-1/call-to-action.tsx": () => import("./assets/call-to-action-g8xLhwzR.js"), "./pages/intro/partials/home-1/cta-prev.tsx": () => import("./assets/cta-prev-B1yrzuM3.js"), "./pages/intro/partials/home-1/faqs.tsx": () => import("./assets/faqs-CGdjS0-T.js"), "./pages/intro/partials/home-1/hero.tsx": () => import("./assets/hero-Dg68EyuE.js"), "./pages/intro/partials/home-1/new-courses.tsx": () => import("./assets/new-courses-DG5tzMkv.js"), "./pages/intro/partials/home-1/overview.tsx": () => import("./assets/overview-DAh8tMaV.js"), "./pages/intro/partials/home-1/partners.tsx": () => import("./assets/partners-Bzqi5jZq.js"), "./pages/intro/partials/home-1/top-categories.tsx": () => import("./assets/top-categories-dlhzZHkj.js"), "./pages/intro/partials/home-1/top-courses.tsx": () => import("./assets/top-courses-BhlIZ61v.js"), "./pages/intro/partials/home-1/top-instructors.tsx": () => import("./assets/top-instructors-Coet8-Mf.js"), "./pages/intro/partials/home-2/blogs.tsx": () => import("./assets/blogs-Cppy06Z1.js"), "./pages/intro/partials/home-2/call-to-action.tsx": () => import("./assets/call-to-action-DHssf3Pu.js"), "./pages/intro/partials/home-2/cta-prev.tsx": () => import("./assets/cta-prev-DmT2bOn7.js"), "./pages/intro/partials/home-2/hero.tsx": () => import("./assets/hero-DGKXPV2N.js"), "./pages/intro/partials/home-2/new-courses.tsx": () => import("./assets/new-courses-BODiWg_c.js"), "./pages/intro/partials/home-2/overview.tsx": () => import("./assets/overview-sjeqqxF5.js"), "./pages/intro/partials/home-2/partners.tsx": () => import("./assets/partners-xloN1bgs.js"), "./pages/intro/partials/home-2/testimonials.tsx": () => import("./assets/testimonials-C3b1WQho.js"), "./pages/intro/partials/home-2/top-categories.tsx": () => import("./assets/top-categories-DC9KL8w-.js"), "./pages/intro/partials/home-2/top-courses.tsx": () => import("./assets/top-courses-Bk5J9bWw.js"), "./pages/intro/partials/home-2/top-instructors.tsx": () => import("./assets/top-instructors-D0qcRCAp.js"), "./pages/intro/partials/home-3/blogs.tsx": () => import("./assets/blogs-AOWW4zKQ.js"), "./pages/intro/partials/home-3/call-to-action.tsx": () => import("./assets/call-to-action-BQaOVsWK.js"), "./pages/intro/partials/home-3/category-courses.tsx": () => import("./assets/category-courses-BIt3YF1w.js"), "./pages/intro/partials/home-3/features.tsx": () => import("./assets/features-BERH8tqv.js"), "./pages/intro/partials/home-3/hero.tsx": () => import("./assets/hero-CPyKVhMS.js"), "./pages/intro/partials/home-3/new-courses.tsx": () => import("./assets/new-courses-CsTHmgFJ.js"), "./pages/intro/partials/home-3/overview.tsx": () => import("./assets/overview-B8s05tVN.js"), "./pages/intro/partials/home-3/partners.tsx": () => import("./assets/partners-Ckbf83qx.js"), "./pages/intro/partials/home-3/testimonials.tsx": () => import("./assets/testimonials-CR8bEwJ9.js"), "./pages/intro/partials/home-3/top-categories.tsx": () => import("./assets/top-categories-BzmHQf3L.js"), "./pages/intro/partials/home-3/top-instructors.tsx": () => import("./assets/top-instructors-Z86AITBB.js"), "./pages/intro/partials/home-4/blogs.tsx": () => import("./assets/blogs-D7ZfecTS.js"), "./pages/intro/partials/home-4/call-to-action.tsx": () => import("./assets/call-to-action-DVq1dKG0.js"), "./pages/intro/partials/home-4/faqs.tsx": () => import("./assets/faqs-CVG6pWO_.js"), "./pages/intro/partials/home-4/hero.tsx": () => import("./assets/hero-B_F55Viv.js"), "./pages/intro/partials/home-4/instructor.tsx": () => import("./assets/instructor-D9rOIDnf.js"), "./pages/intro/partials/home-4/overview.tsx": () => import("./assets/overview-BNz4TkZH.js"), "./pages/intro/partials/home-4/partners.tsx": () => import("./assets/partners-BsIbkCRA.js"), "./pages/intro/partials/home-4/statistics.tsx": () => import("./assets/statistics-DXC5qPhO.js"), "./pages/intro/partials/home-4/testimonials.tsx": () => import("./assets/testimonials-DEZ0C63a.js"), "./pages/intro/partials/home-4/top-categories.tsx": () => import("./assets/top-categories-CEaWJmfO.js"), "./pages/intro/partials/home-4/top-course.tsx": () => import("./assets/top-course-BXOqvu-d.js"), "./pages/intro/partials/home-4/top-courses.tsx": () => import("./assets/top-courses-EFDDeyK8.js"), "./pages/intro/partials/home-5/blogs.tsx": () => import("./assets/blogs-N6_SlAKG.js"), "./pages/intro/partials/home-5/call-to-action.tsx": () => import("./assets/call-to-action-BCiA3PzG.js"), "./pages/intro/partials/home-5/faqs.tsx": () => import("./assets/faqs-Cah1u373.js"), "./pages/intro/partials/home-5/hero.tsx": () => import("./assets/hero-Dd3lSxoF.js"), "./pages/intro/partials/home-5/instructor.tsx": () => import("./assets/instructor-CjL08Ysc.js"), "./pages/intro/partials/home-5/statistics.tsx": () => import("./assets/statistics-Dmw2sV5n.js"), "./pages/intro/partials/home-5/testimonials.tsx": () => import("./assets/testimonials-DAGN3P9O.js"), "./pages/intro/partials/home-5/top-categories.tsx": () => import("./assets/top-categories-VJgKOziG.js"), "./pages/intro/partials/home-5/top-course.tsx": () => import("./assets/top-course-AOd3gbJi.js"), "./pages/intro/partials/home-5/top-courses.tsx": () => import("./assets/top-courses-OPEZ9b2V.js"), "./pages/intro/partials/instructor-socials.tsx": () => import("./assets/instructor-socials-Dio3oqYc.js"), "./pages/intro/partials/layout.tsx": () => import("./assets/layout-CV--V7We.js"), "./pages/intro/partials/section.tsx": () => import("./assets/section-DM2a0QGA.js"), "./pages/job-circulars/show.tsx": () => import("./assets/show-BKa8fu6g.js"), "./pages/notification/index.tsx": () => import("./assets/index-Dnx3axo6.js"), "./pages/notification/show.tsx": () => import("./assets/show-BxEt2VBy.js"), "./pages/student/index.tsx": () => import("./assets/index-nuK8cr_I.js"), "./pages/student/partials/become-instructor.tsx": () => import("./assets/become-instructor-CLl9Pand.js"), "./pages/student/partials/my-courses.tsx": () => import("./assets/my-courses-CsR9FWTq.js"), "./pages/student/partials/my-profile.tsx": () => import("./assets/my-profile-BkE6LtD3.js"), "./pages/student/partials/settings.tsx": () => import("./assets/settings-Cn6m0cw5.js"), "./pages/student/partials/tab-lists.tsx": () => import("./assets/tab-lists-TvCC128g.js"), "./pages/student/partials/wishlist.tsx": () => import("./assets/wishlist-CGViKcs6.js"), "./pages/system/confirm.tsx": () => import("./assets/confirm-Zmm1H68t.js"), "./pages/system/index.tsx": () => import("./assets/index-N8zoke8a.js") })),
    setup: ({ App, props }) => {
      global.route = (name, params, absolute) => T(name, params, absolute, {
        // @ts-expect-error
        ...page.props.ziggy,
        // @ts-expect-error
        location: new URL(page.props.ziggy.location)
      });
      return /* @__PURE__ */ jsx(App, { ...props });
    }
  })
);
