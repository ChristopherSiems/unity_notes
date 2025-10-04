// node_modules/@mediapipe/tasks-genai/genai_bundle.mjs
var t = "undefined" != typeof self ? self : {};
function e(e2, n2) {
  t: {
    for (var r2 = ["CLOSURE_FLAGS"], i2 = t, o2 = 0; o2 < r2.length; o2++) if (null == (i2 = i2[r2[o2]])) {
      r2 = null;
      break t;
    }
    r2 = i2;
  }
  return null != (e2 = r2 && r2[e2]) ? e2 : n2;
}
var n;
var r = "undefined" != typeof TextEncoder;
function i(t2) {
  if (r) t2 = (n ||= new TextEncoder()).encode(t2);
  else {
    let n2 = 0;
    const r2 = new Uint8Array(3 * t2.length);
    for (let i2 = 0; i2 < t2.length; i2++) {
      var e2 = t2.charCodeAt(i2);
      if (e2 < 128) r2[n2++] = e2;
      else {
        if (e2 < 2048) r2[n2++] = e2 >> 6 | 192;
        else {
          if (e2 >= 55296 && e2 <= 57343) {
            if (e2 <= 56319 && i2 < t2.length) {
              const o2 = t2.charCodeAt(++i2);
              if (o2 >= 56320 && o2 <= 57343) {
                e2 = 1024 * (e2 - 55296) + o2 - 56320 + 65536, r2[n2++] = e2 >> 18 | 240, r2[n2++] = e2 >> 12 & 63 | 128, r2[n2++] = e2 >> 6 & 63 | 128, r2[n2++] = 63 & e2 | 128;
                continue;
              }
              i2--;
            }
            e2 = 65533;
          }
          r2[n2++] = e2 >> 12 | 224, r2[n2++] = e2 >> 6 & 63 | 128;
        }
        r2[n2++] = 63 & e2 | 128;
      }
    }
    t2 = n2 === r2.length ? r2 : r2.subarray(0, n2);
  }
  return t2;
}
var o;
var s = e(610401301, false);
var a = e(748402147, e(1, true));
function u() {
  var e2 = t.navigator;
  return e2 && (e2 = e2.userAgent) ? e2 : "";
}
var c = t.navigator;
o = c && c.userAgentData || null;
var l = {};
var h = null;
function f(t2) {
  const e2 = t2.length;
  let n2 = 3 * e2 / 4;
  n2 % 3 ? n2 = Math.floor(n2) : -1 != "=.".indexOf(t2[e2 - 1]) && (n2 = -1 != "=.".indexOf(t2[e2 - 2]) ? n2 - 2 : n2 - 1);
  const r2 = new Uint8Array(n2);
  let i2 = 0;
  return (function(t3, e3) {
    function n3(e4) {
      for (; r3 < t3.length; ) {
        const e5 = t3.charAt(r3++), n4 = h[e5];
        if (null != n4) return n4;
        if (!/^[\s\xa0]*$/.test(e5)) throw Error("Unknown base64 encoding at char: " + e5);
      }
      return e4;
    }
    d();
    let r3 = 0;
    for (; ; ) {
      const t4 = n3(-1), r4 = n3(0), i3 = n3(64), o2 = n3(64);
      if (64 === o2 && -1 === t4) break;
      e3(t4 << 2 | r4 >> 4), 64 != i3 && (e3(r4 << 4 & 240 | i3 >> 2), 64 != o2 && e3(i3 << 6 & 192 | o2));
    }
  })(t2, (function(t3) {
    r2[i2++] = t3;
  })), i2 !== n2 ? r2.subarray(0, i2) : r2;
}
function d() {
  if (!h) {
    h = {};
    var t2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), e2 = ["+/=", "+/", "-_=", "-_.", "-_"];
    for (let n2 = 0; n2 < 5; n2++) {
      const r2 = t2.concat(e2[n2].split(""));
      l[n2] = r2;
      for (let t3 = 0; t3 < r2.length; t3++) {
        const e3 = r2[t3];
        void 0 === h[e3] && (h[e3] = t3);
      }
    }
  }
}
var p = "undefined" != typeof Uint8Array;
var m = !(!(s && o && o.brands.length > 0) && (-1 != u().indexOf("Trident") || -1 != u().indexOf("MSIE"))) && "function" == typeof btoa;
var g = /[-_.]/g;
var _ = { "-": "+", _: "/", ".": "=" };
function y(t2) {
  return _[t2] || "";
}
function b(t2) {
  if (!m) return f(t2);
  t2 = g.test(t2) ? t2.replace(g, y) : t2, t2 = atob(t2);
  const e2 = new Uint8Array(t2.length);
  for (let n2 = 0; n2 < t2.length; n2++) e2[n2] = t2.charCodeAt(n2);
  return e2;
}
function w(t2) {
  return p && null != t2 && t2 instanceof Uint8Array;
}
var v = {};
function S() {
  return A ||= new E(null, v);
}
var E = class {
  constructor(t2, e2) {
    if (T(e2), this.i = t2, null != t2 && 0 === t2.length) throw Error("ByteString should be constructed with non-empty values");
  }
};
var A;
var I;
function T(t2) {
  if (t2 !== v) throw Error("illegal external caller");
}
function P(t2, e2) {
  t2.__closure__error__context__984382 || (t2.__closure__error__context__984382 = {}), t2.__closure__error__context__984382.severity = e2;
}
function L(t2) {
  return P(t2 = Error(t2), "warning"), t2;
}
function O(e2, n2) {
  if (null != e2) {
    var r2 = I ??= {}, i2 = r2[e2] || 0;
    i2 >= n2 || (r2[e2] = i2 + 1, P(e2 = Error(), "incident"), (function(e3) {
      t.setTimeout((() => {
        throw e3;
      }), 0);
    })(e2));
  }
}
var j = "function" == typeof Symbol && "symbol" == typeof Symbol();
function k(t2, e2, n2 = false) {
  return "function" == typeof Symbol && "symbol" == typeof Symbol() ? n2 && Symbol.for && t2 ? Symbol.for(t2) : null != t2 ? Symbol(t2) : Symbol() : e2;
}
var x = k("jas", void 0, true);
var U = k(void 0, "1oa");
var B = k(void 0, "0ubsb");
var N = k(void 0, "0actk");
var F = k("m_m", "oa", true);
var R = { ga: { value: 0, configurable: true, writable: true, enumerable: false } };
var D = Object.defineProperties;
var M = j ? x : "ga";
var V;
var C = [];
function G(t2, e2) {
  j || M in t2 || D(t2, R), t2[M] |= e2;
}
function z(t2, e2) {
  j || M in t2 || D(t2, R), t2[M] = e2;
}
function W() {
  return "function" == typeof BigInt;
}
z(C, 7), V = Object.freeze(C);
var H = {};
function $(t2, e2) {
  return void 0 === e2 ? t2.i !== q && !!(2 & (0 | t2.m[M])) : !!(2 & e2) && t2.i !== q;
}
var q = {};
var K = Object.freeze({});
function Y(t2) {
  return t2.na = true, t2;
}
var J = Y(((t2) => "number" == typeof t2));
var X = Y(((t2) => "string" == typeof t2));
var Q = Y(((t2) => "boolean" == typeof t2));
var Z = "function" == typeof t.BigInt && "bigint" == typeof t.BigInt(0);
var tt = Y(((t2) => Z ? t2 >= nt && t2 <= it : "-" === t2[0] ? ot(t2, et) : ot(t2, rt)));
var et = Number.MIN_SAFE_INTEGER.toString();
var nt = Z ? BigInt(Number.MIN_SAFE_INTEGER) : void 0;
var rt = Number.MAX_SAFE_INTEGER.toString();
var it = Z ? BigInt(Number.MAX_SAFE_INTEGER) : void 0;
function ot(t2, e2) {
  if (t2.length > e2.length) return false;
  if (t2.length < e2.length || t2 === e2) return true;
  for (let n2 = 0; n2 < t2.length; n2++) {
    const r2 = t2[n2], i2 = e2[n2];
    if (r2 > i2) return false;
    if (r2 < i2) return true;
  }
}
var st;
var at = 0;
var ut = 0;
function ct(t2) {
  const e2 = t2 >>> 0;
  at = e2, ut = (t2 - e2) / 4294967296 >>> 0;
}
function lt(t2) {
  if (t2 < 0) {
    ct(-t2);
    const [e2, n2] = mt(at, ut);
    at = e2 >>> 0, ut = n2 >>> 0;
  } else ct(t2);
}
function ht(t2, e2) {
  const n2 = 4294967296 * e2 + (t2 >>> 0);
  return Number.isSafeInteger(n2) ? n2 : ft(t2, e2);
}
function ft(t2, e2) {
  if (t2 >>>= 0, (e2 >>>= 0) <= 2097151) var n2 = "" + (4294967296 * e2 + t2);
  else W() ? n2 = "" + (BigInt(e2) << BigInt(32) | BigInt(t2)) : (t2 = (16777215 & t2) + 6777216 * (n2 = 16777215 & (t2 >>> 24 | e2 << 8)) + 6710656 * (e2 = e2 >> 16 & 65535), n2 += 8147497 * e2, e2 *= 2, t2 >= 1e7 && (n2 += t2 / 1e7 >>> 0, t2 %= 1e7), n2 >= 1e7 && (e2 += n2 / 1e7 >>> 0, n2 %= 1e7), n2 = e2 + dt(n2) + dt(t2));
  return n2;
}
function dt(t2) {
  return t2 = String(t2), "0000000".slice(t2.length) + t2;
}
function pt(t2) {
  if (t2.length < 16) lt(Number(t2));
  else if (W()) t2 = BigInt(t2), at = Number(t2 & BigInt(4294967295)) >>> 0, ut = Number(t2 >> BigInt(32) & BigInt(4294967295));
  else {
    const e2 = +("-" === t2[0]);
    ut = at = 0;
    const n2 = t2.length;
    for (let r2 = e2, i2 = (n2 - e2) % 6 + e2; i2 <= n2; r2 = i2, i2 += 6) {
      const e3 = Number(t2.slice(r2, i2));
      ut *= 1e6, at = 1e6 * at + e3, at >= 4294967296 && (ut += Math.trunc(at / 4294967296), ut >>>= 0, at >>>= 0);
    }
    if (e2) {
      const [t3, e3] = mt(at, ut);
      at = t3, ut = e3;
    }
  }
}
function mt(t2, e2) {
  return e2 = ~e2, t2 ? t2 = 1 + ~t2 : e2 += 1, [t2, e2];
}
function gt(t2) {
  return Array.prototype.slice.call(t2);
}
var _t = "function" == typeof BigInt ? BigInt.asIntN : void 0;
var yt = "function" == typeof BigInt ? BigInt.asUintN : void 0;
var bt = Number.isSafeInteger;
var wt = Number.isFinite;
var vt = Math.trunc;
function St(t2) {
  if (null != t2 && "number" != typeof t2) throw Error(`Value of float/double field must be a number, found ${typeof t2}: ${t2}`);
  return t2;
}
function Et(t2) {
  return null == t2 || "number" == typeof t2 ? t2 : "NaN" === t2 || "Infinity" === t2 || "-Infinity" === t2 ? Number(t2) : void 0;
}
function At(t2) {
  if (null != t2 && "boolean" != typeof t2) {
    var e2 = typeof t2;
    throw Error(`Expected boolean but got ${"object" != e2 ? e2 : t2 ? Array.isArray(t2) ? "array" : e2 : "null"}: ${t2}`);
  }
  return t2;
}
function It(t2) {
  return null == t2 || "boolean" == typeof t2 ? t2 : "number" == typeof t2 ? !!t2 : void 0;
}
var Tt = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
function Pt(t2) {
  switch (typeof t2) {
    case "bigint":
      return true;
    case "number":
      return wt(t2);
    case "string":
      return Tt.test(t2);
    default:
      return false;
  }
}
function Lt(t2) {
  if ("number" != typeof t2) throw L("int32");
  if (!wt(t2)) throw L("int32");
  return 0 | t2;
}
function Ot(t2) {
  return null == t2 ? t2 : Lt(t2);
}
function jt(t2) {
  if (null == t2) return t2;
  if ("string" == typeof t2 && t2) t2 = +t2;
  else if ("number" != typeof t2) return;
  return wt(t2) ? 0 | t2 : void 0;
}
function kt(t2) {
  if (null == t2) return t2;
  if ("string" == typeof t2 && t2) t2 = +t2;
  else if ("number" != typeof t2) return;
  return wt(t2) ? t2 >>> 0 : void 0;
}
function xt(t2) {
  if ("-" === t2[0]) return false;
  const e2 = t2.length;
  return e2 < 20 || 20 === e2 && Number(t2.substring(0, 6)) < 184467;
}
function Ut(t2) {
  if (null == t2) return t2;
  var e2 = typeof t2;
  if ("bigint" === e2) return String(yt(64, t2));
  if (Pt(t2)) {
    if ("string" === e2) return e2 = vt(Number(t2)), bt(e2) && e2 >= 0 ? t2 = String(e2) : (-1 !== (e2 = t2.indexOf(".")) && (t2 = t2.substring(0, e2)), xt(t2) || (pt(t2), t2 = ft(at, ut))), t2;
    if ("number" === e2) return (t2 = vt(t2)) >= 0 && bt(t2) ? t2 : (function(t3) {
      if (t3 < 0) {
        lt(t3);
        var e3 = ft(at, ut);
        return t3 = Number(e3), bt(t3) ? t3 : e3;
      }
      return xt(e3 = String(t3)) ? e3 : (lt(t3), ht(at, ut));
    })(t2);
  }
}
function Bt(t2) {
  return null == t2 || "string" == typeof t2 ? t2 : void 0;
}
function Nt(t2, e2, n2) {
  if (null != t2 && t2[F] === H) return t2;
  if (Array.isArray(t2)) {
    var r2 = 0 | t2[M];
    return (n2 = r2 | 32 & n2 | 2 & n2) !== r2 && z(t2, n2), new e2(t2);
  }
}
function Ft(t2, e2, n2, r2) {
  var i2 = void 0 !== r2;
  r2 = !!r2;
  const o2 = [];
  var s2 = t2.length;
  let a2, u2 = 4294967295, c2 = false;
  const l2 = !!(64 & e2), h2 = l2 ? 128 & e2 ? 0 : -1 : void 0;
  for (1 & e2 || (a2 = s2 && t2[s2 - 1], null != a2 && "object" == typeof a2 && a2.constructor === Object ? u2 = --s2 : a2 = void 0, !l2 || 128 & e2 || i2 || (c2 = true, u2 = u2 - h2 + h2)), e2 = void 0, i2 = 0; i2 < s2; i2++) {
    let s3 = t2[i2];
    if (null != s3 && null != (s3 = n2(s3, r2))) if (l2 && i2 >= u2) {
      const t3 = i2 - h2;
      (e2 ??= {})[t3] = s3;
    } else o2[i2] = s3;
  }
  if (a2) for (let i3 in a2) {
    if (null == (t2 = a2[i3]) || null == (t2 = n2(t2, r2))) continue;
    let c3;
    s2 = +i3, l2 && !Number.isNaN(s2) && (c3 = s2 + h2) < u2 ? o2[c3] = t2 : (e2 ??= {})[i3] = t2;
  }
  return e2 && (c2 ? o2.push(e2) : o2[u2] = e2), o2;
}
function Rt(t2) {
  switch (typeof t2) {
    case "number":
      return Number.isFinite(t2) ? t2 : "" + t2;
    case "bigint":
      return tt(t2) ? Number(t2) : "" + t2;
    case "boolean":
      return t2 ? 1 : 0;
    case "object":
      if (Array.isArray(t2)) {
        var e2 = 0 | t2[M];
        return 0 === t2.length && 1 & e2 ? void 0 : Ft(t2, e2, Rt);
      }
      if (null != t2 && t2[F] === H) return Dt(t2);
      if (t2 instanceof E) {
        if (null == (e2 = t2.i)) t2 = "";
        else if ("string" == typeof e2) t2 = e2;
        else {
          if (m) {
            for (var n2 = "", r2 = 0, i2 = e2.length - 10240; r2 < i2; ) n2 += String.fromCharCode.apply(null, e2.subarray(r2, r2 += 10240));
            n2 += String.fromCharCode.apply(null, r2 ? e2.subarray(r2) : e2), e2 = btoa(n2);
          } else {
            void 0 === n2 && (n2 = 0), d(), n2 = l[n2], r2 = Array(Math.floor(e2.length / 3)), i2 = n2[64] || "";
            let t3 = 0, c2 = 0;
            for (; t3 < e2.length - 2; t3 += 3) {
              var o2 = e2[t3], s2 = e2[t3 + 1], a2 = e2[t3 + 2], u2 = n2[o2 >> 2];
              o2 = n2[(3 & o2) << 4 | s2 >> 4], s2 = n2[(15 & s2) << 2 | a2 >> 6], a2 = n2[63 & a2], r2[c2++] = u2 + o2 + s2 + a2;
            }
            switch (u2 = 0, a2 = i2, e2.length - t3) {
              case 2:
                a2 = n2[(15 & (u2 = e2[t3 + 1])) << 2] || i2;
              case 1:
                e2 = e2[t3], r2[c2] = n2[e2 >> 2] + n2[(3 & e2) << 4 | u2 >> 4] + a2 + i2;
            }
            e2 = r2.join("");
          }
          t2 = t2.i = e2;
        }
        return t2;
      }
      return;
  }
  return t2;
}
function Dt(t2) {
  return Ft(t2 = t2.m, 0 | t2[M], Rt);
}
var Mt;
var Vt;
function Ct(t2, e2, n2) {
  return Gt(t2, e2[0], e2[1], n2 ? 1 : 2);
}
function Gt(t2, e2, n2, r2 = 0) {
  if (null == t2) {
    var i2 = 32;
    n2 ? (t2 = [n2], i2 |= 128) : t2 = [], e2 && (i2 = -8380417 & i2 | (1023 & e2) << 13);
  } else {
    if (!Array.isArray(t2)) throw Error("narr");
    if (i2 = 0 | t2[M], a && 1 & i2) throw Error("rfarr");
    if (2048 & i2 && !(2 & i2) && (function() {
      if (a) throw Error("carr");
      O(N, 5);
    })(), 256 & i2) throw Error("farr");
    if (64 & i2) return 0 !== r2 || 2048 & i2 || z(t2, 2048 | i2), t2;
    if (n2 && (i2 |= 128, n2 !== t2[0])) throw Error("mid");
    t: {
      i2 |= 64;
      var o2 = (n2 = t2).length;
      if (o2) {
        var s2 = o2 - 1;
        const t3 = n2[s2];
        if (null != t3 && "object" == typeof t3 && t3.constructor === Object) {
          if ((s2 -= e2 = 128 & i2 ? 0 : -1) >= 1024) throw Error("pvtlmt");
          for (var u2 in t3) (o2 = +u2) < s2 && (n2[o2 + e2] = t3[u2], delete t3[u2]);
          i2 = -8380417 & i2 | (1023 & s2) << 13;
          break t;
        }
      }
      if (e2) {
        if ((u2 = Math.max(e2, o2 - (128 & i2 ? 0 : -1))) > 1024) throw Error("spvt");
        i2 = -8380417 & i2 | (1023 & u2) << 13;
      }
    }
  }
  return i2 |= 64, 0 === r2 && (i2 |= 2048), z(t2, i2), t2;
}
function zt(t2, e2) {
  if ("object" != typeof t2) return t2;
  if (Array.isArray(t2)) {
    var n2 = 0 | t2[M];
    return 0 === t2.length && 1 & n2 ? t2 = void 0 : 2 & n2 || (!e2 || 4096 & n2 || 16 & n2 ? t2 = Ht(t2, n2, false, e2 && !(16 & n2)) : (G(t2, 34), 4 & n2 && Object.freeze(t2))), t2;
  }
  return null != t2 && t2[F] === H ? $(t2, n2 = 0 | (e2 = t2.m)[M]) ? t2 : Yt(t2, e2, n2) ? Wt(t2, e2) : Ht(e2, n2) : t2 instanceof E ? t2 : void 0;
}
function Wt(t2, e2, n2) {
  return t2 = new t2.constructor(e2), n2 && (t2.i = q), t2.o = q, t2;
}
function Ht(t2, e2, n2, r2) {
  return r2 ??= !!(34 & e2), t2 = Ft(t2, e2, zt, r2), r2 = 32, n2 && (r2 |= 2), z(t2, e2 = 8380609 & e2 | r2), t2;
}
function $t(t2) {
  if (t2.i !== q) return false;
  var e2 = t2.m;
  return G(e2 = Ht(e2, 0 | e2[M]), 2048), t2.m = e2, t2.i = void 0, t2.o = void 0, true;
}
function qt(t2) {
  if (!$t(t2) && $(t2, 0 | t2.m[M])) throw Error();
}
function Kt(t2, e2) {
  void 0 === e2 && (e2 = 0 | t2[M]), 32 & e2 && !(4096 & e2) && z(t2, 4096 | e2);
}
function Yt(t2, e2, n2) {
  return !!(2 & n2) || !(!(32 & n2) || 4096 & n2) && (z(e2, 2 | n2), t2.i = q, true);
}
function Jt(t2, e2, n2) {
  if (null !== (t2 = Xt(t2.m, e2, void 0, n2))) return t2;
}
function Xt(t2, e2, n2, r2) {
  if (-1 === e2) return null;
  const i2 = e2 + (n2 ? 0 : -1), o2 = t2.length - 1;
  let s2, a2;
  if (!(o2 < 1 + (n2 ? 0 : -1))) {
    if (i2 >= o2) if (s2 = t2[o2], null != s2 && "object" == typeof s2 && s2.constructor === Object) n2 = s2[e2], a2 = true;
    else {
      if (i2 !== o2) return;
      n2 = s2;
    }
    else n2 = t2[i2];
    if (r2 && null != n2) {
      if (null == (r2 = r2(n2))) return r2;
      if (!Object.is(r2, n2)) return a2 ? s2[e2] = r2 : t2[i2] = r2, r2;
    }
    return n2;
  }
}
function Qt(t2, e2, n2) {
  qt(t2), Zt(t2 = t2.m, 0 | t2[M], e2, n2);
}
function Zt(t2, e2, n2, r2, i2) {
  const o2 = n2 + (i2 ? 0 : -1);
  var s2 = t2.length - 1;
  if (s2 >= 1 + (i2 ? 0 : -1) && o2 >= s2) {
    const i3 = t2[s2];
    if (null != i3 && "object" == typeof i3 && i3.constructor === Object) return i3[n2] = r2, e2;
  }
  return o2 <= s2 ? (t2[o2] = r2, e2) : (void 0 !== r2 && (n2 >= (s2 = (e2 ??= 0 | t2[M]) >> 13 & 1023 || 536870912) ? null != r2 && (t2[s2 + (i2 ? 0 : -1)] = { [n2]: r2 }) : t2[o2] = r2), e2);
}
function te(t2, e2, n2, r2, i2) {
  let o2 = t2.m, s2 = 0 | o2[M];
  r2 = $(t2, s2) ? 1 : r2, i2 = !!i2 || 3 === r2, 2 === r2 && $t(t2) && (o2 = t2.m, s2 = 0 | o2[M]);
  let a2 = (t2 = ne(o2, e2)) === V ? 7 : 0 | t2[M], u2 = re(a2, s2);
  var c2 = !(4 & u2);
  if (c2) {
    4 & u2 && (t2 = gt(t2), a2 = 0, u2 = fe(u2, s2), s2 = Zt(o2, s2, e2, t2));
    let r3 = 0, i3 = 0;
    for (; r3 < t2.length; r3++) {
      const e3 = n2(t2[r3]);
      null != e3 && (t2[i3++] = e3);
    }
    i3 < r3 && (t2.length = i3), n2 = -513 & (4 | u2), u2 = n2 &= -1025, u2 &= -4097;
  }
  return u2 !== a2 && (z(t2, u2), 2 & u2 && Object.freeze(t2)), ee(t2, u2, o2, s2, e2, r2, c2, i2);
}
function ee(t2, e2, n2, r2, i2, o2, s2, a2) {
  let u2 = e2;
  return 1 === o2 || 4 === o2 && (2 & e2 || !(16 & e2) && 32 & r2) ? ie(e2) || ((e2 |= !t2.length || s2 && !(4096 & e2) || 32 & r2 && !(4096 & e2 || 16 & e2) ? 2 : 256) !== u2 && z(t2, e2), Object.freeze(t2)) : (2 === o2 && ie(e2) && (t2 = gt(t2), u2 = 0, e2 = fe(e2, r2), r2 = Zt(n2, r2, i2, t2)), ie(e2) || (a2 || (e2 |= 16), e2 !== u2 && z(t2, e2))), 2 & e2 || !(4096 & e2 || 16 & e2) || Kt(n2, r2), t2;
}
function ne(t2, e2, n2) {
  return t2 = Xt(t2, e2, n2), Array.isArray(t2) ? t2 : V;
}
function re(t2, e2) {
  return 2 & e2 && (t2 |= 2), 1 | t2;
}
function ie(t2) {
  return !!(2 & t2) && !!(4 & t2) || !!(256 & t2);
}
function oe(t2, e2, n2) {
  qt(t2);
  let r2 = 0 | (t2 = t2.m)[M];
  if (null == n2) Zt(t2, r2, e2);
  else {
    var i2 = n2 === V ? 7 : 0 | n2[M], o2 = i2, s2 = ie(i2), a2 = s2 || Object.isFrozen(n2);
    for (s2 || (i2 = 0), a2 || (n2 = gt(n2), o2 = 0, i2 = fe(i2, r2), a2 = false), i2 |= 5, s2 = 0; s2 < n2.length; s2++) {
      const t3 = n2[s2], e3 = Lt(t3);
      Object.is(t3, e3) || (a2 && (n2 = gt(n2), o2 = 0, i2 = fe(i2, r2), a2 = false), n2[s2] = e3);
    }
    i2 !== o2 && (a2 && (n2 = gt(n2), i2 = fe(i2, r2)), z(n2, i2)), Zt(t2, r2, e2, n2);
  }
}
function se(t2, e2, n2, r2) {
  qt(t2), Zt(t2 = t2.m, 0 | t2[M], e2, ("0" === r2 ? 0 === Number(n2) : n2 === r2) ? void 0 : n2);
}
function ae(t2) {
  if (j) return t2[U] ?? (t2[U] = /* @__PURE__ */ new Map());
  if (U in t2) return t2[U];
  const e2 = /* @__PURE__ */ new Map();
  return Object.defineProperty(t2, U, { value: e2 }), e2;
}
function ue(t2, e2, n2) {
  var r2 = qr;
  let i2 = t2.get(r2);
  if (null != i2) return i2;
  i2 = 0;
  for (let t3 = 0; t3 < r2.length; t3++) {
    const o2 = r2[t3];
    null != Xt(e2, o2) && (0 !== i2 && (n2 = Zt(e2, n2, i2)), i2 = o2);
  }
  return t2.set(r2, i2), i2;
}
function ce(t2, e2, n2) {
  let r2 = t2.m, i2 = 0 | r2[M];
  if (e2 = (function(t3, e3, n3, r3) {
    let i3 = false;
    if (null != (r3 = Xt(t3, r3, void 0, ((t4) => {
      const r4 = Nt(t4, n3, e3);
      return i3 = r4 !== t4 && null != r4, r4;
    })))) return i3 && !$(r3) && Kt(t3, e3), r3;
  })(r2, i2, e2, n2), null == e2) return e2;
  if (i2 = 0 | r2[M], !$(t2, i2)) {
    var o2, s2 = e2;
    const a2 = s2.m, u2 = 0 | a2[M];
    (o2 = $(s2, u2) ? Yt(s2, a2, u2) ? Wt(s2, a2, true) : new s2.constructor(Ht(a2, u2, false)) : s2) !== e2 && ($t(t2) && (r2 = t2.m, i2 = 0 | r2[M]), i2 = Zt(r2, i2, n2, e2 = o2), Kt(r2, i2));
  }
  return e2;
}
function le(t2) {
  return null == t2 && (t2 = void 0), t2;
}
function he(t2, e2, n2) {
  return Qt(t2, e2, n2 = le(n2)), n2 && !$(n2) && Kt(t2.m), t2;
}
function fe(t2, e2) {
  return -273 & (2 & e2 ? 2 | t2 : -3 & t2);
}
function de(t2, e2, n2, r2) {
  var i2 = r2;
  qt(t2);
  var o2 = r2 = t2.m, s2 = 0 | r2[M];
  const a2 = $(t2, s2) ? 1 : 2;
  2 === a2 && $t(t2) && (s2 = 0 | (o2 = t2.m)[M]);
  let u2 = (t2 = ne(o2, e2)) === V ? 7 : 0 | t2[M];
  var c2 = re(u2, s2);
  const l2 = !(4 & c2);
  if (l2) {
    var h2 = t2, f2 = s2;
    const e3 = !!(2 & c2);
    e3 && (f2 |= 2);
    let r3 = !e3, i3 = true, o3 = 0, a3 = 0;
    for (; o3 < h2.length; o3++) {
      const t3 = Nt(h2[o3], n2, f2);
      if (t3 instanceof n2) {
        if (!e3) {
          const e4 = $(t3);
          r3 &&= !e4, i3 &&= e4;
        }
        h2[a3++] = t3;
      }
    }
    a3 < o3 && (h2.length = a3), c2 |= 4, c2 = i3 ? -4097 & c2 : 4096 | c2, c2 = r3 ? 8 | c2 : -9 & c2;
  }
  c2 !== u2 && (z(t2, c2), 2 & c2 && Object.freeze(t2)), e2 = t2 = ee(t2, c2, o2, s2, e2, a2, l2, true), i2 = null != i2 ? i2 : new n2(), e2.push(i2), o2 = n2 = e2 === V ? 7 : 0 | e2[M], (i2 = $(i2)) ? (n2 &= -9, 1 === e2.length && (n2 &= -4097)) : n2 |= 4096, n2 !== o2 && z(e2, n2), i2 || Kt(r2);
}
function pe(t2, e2) {
  return kt(Jt(t2, e2)) ?? 0;
}
function me(t2, e2, n2) {
  se(t2, e2, Ot(n2), 0);
}
function ge(t2, e2, n2) {
  if (null != n2) {
    if ("number" != typeof n2) throw L("uint32");
    if (!wt(n2)) throw L("uint32");
    n2 >>>= 0;
  }
  Qt(t2, e2, n2);
}
function _e(t2, e2, n2) {
  if (null != n2 && "string" != typeof n2) throw Error();
  se(t2, e2, n2, "");
}
function ye(t2, e2, n2) {
  if (qt(t2), e2 = (t2 = te(t2, e2, Bt, 2, true)).push, "string" != typeof n2) throw Error();
  e2.call(t2, n2);
}
var be = class {
  constructor(t2, e2, n2) {
    if (this.buffer = t2, n2 && !e2) throw Error();
  }
};
function we(t2) {
  if ("string" == typeof t2) return new be(b(t2), true);
  if (Array.isArray(t2)) return new be(new Uint8Array(t2), true);
  if (t2.constructor === Uint8Array) return new be(t2, false);
  if (t2.constructor === ArrayBuffer) return t2 = new Uint8Array(t2), new be(t2, false);
  if (t2.constructor === E) {
    T(v);
    var e2 = t2.i;
    return e2 = (null == (e2 = null == e2 || w(e2) ? e2 : "string" == typeof e2 ? b(e2) : null) ? e2 : t2.i = e2) || new Uint8Array(0), new be(e2, true, t2);
  }
  if (t2 instanceof Uint8Array) return t2 = t2.constructor === Uint8Array ? t2 : new Uint8Array(t2.buffer, t2.byteOffset, t2.byteLength), new be(t2, false);
  throw Error();
}
function ve(t2) {
  return t2 ? /^\d+$/.test(t2) ? (pt(t2), new Se(at, ut)) : null : Ee ||= new Se(0, 0);
}
var Se = class {
  constructor(t2, e2) {
    this.j = t2 >>> 0, this.i = e2 >>> 0;
  }
};
var Ee;
function Ae(t2) {
  return t2 ? /^-?\d+$/.test(t2) ? (pt(t2), new Ie(at, ut)) : null : Te ||= new Ie(0, 0);
}
var Ie = class {
  constructor(t2, e2) {
    this.j = t2 >>> 0, this.i = e2 >>> 0;
  }
};
var Te;
function Pe(t2, e2, n2) {
  for (; n2 > 0 || e2 > 127; ) t2.i.push(127 & e2 | 128), e2 = (e2 >>> 7 | n2 << 25) >>> 0, n2 >>>= 7;
  t2.i.push(e2);
}
function Le(t2, e2) {
  for (; e2 > 127; ) t2.i.push(127 & e2 | 128), e2 >>>= 7;
  t2.i.push(e2);
}
function Oe(t2, e2) {
  if (e2 >= 0) Le(t2, e2);
  else {
    for (let n2 = 0; n2 < 9; n2++) t2.i.push(127 & e2 | 128), e2 >>= 7;
    t2.i.push(1);
  }
}
function je(t2, e2) {
  0 !== e2.length && (t2.l.push(e2), t2.j += e2.length);
}
function ke(t2, e2, n2) {
  Le(t2.i, 8 * e2 + n2);
}
function xe(t2, e2) {
  return ke(t2, e2, 2), e2 = t2.i.end(), je(t2, e2), e2.push(t2.j), e2;
}
function Ue(t2, e2) {
  var n2 = e2.pop();
  for (n2 = t2.j + t2.i.length() - n2; n2 > 127; ) e2.push(127 & n2 | 128), n2 >>>= 7, t2.j++;
  e2.push(n2), t2.j++;
}
function Be(t2, e2, n2) {
  ke(t2, e2, 2), Le(t2.i, n2.length), je(t2, t2.i.end()), je(t2, n2);
}
function Ne() {
  const t2 = class {
    constructor() {
      throw Error();
    }
  };
  return Object.setPrototypeOf(t2, t2.prototype), t2;
}
var Fe = Ne();
var Re = Ne();
var De = Ne();
var Me = Ne();
var Ve = Ne();
var Ce = Ne();
var Ge = Ne();
var ze = Ne();
var We = Ne();
var He = Ne();
var $e = class {
  constructor(t2, e2) {
    this.m = Gt(t2, e2);
  }
  toJSON() {
    return Dt(this);
  }
};
$e.prototype[F] = H, $e.prototype.toString = function() {
  return this.m.toString();
};
var qe = class {
  constructor(t2, e2) {
    this.i = t2, t2 = Fe, this.j = !!t2 && e2 === t2 || false;
  }
};
function Ke(t2, e2, n2, r2, i2) {
  null != (e2 = en(e2, r2)) && (n2 = xe(t2, n2), i2(e2, t2), Ue(t2, n2));
}
var Ye = new qe(Ke, Fe);
var Je = new qe(Ke, Fe);
var Xe = Symbol();
var Qe = Symbol();
var Ze;
function tn(t2) {
  var e2 = nn, n2 = rn, r2 = t2[Xe];
  if (r2) return r2;
  (r2 = {}).ma = t2, r2.W = (function(t3) {
    switch (typeof t3) {
      case "boolean":
        return Mt ||= [0, void 0, true];
      case "number":
        return t3 > 0 ? void 0 : 0 === t3 ? Vt ||= [0, void 0] : [-t3, void 0];
      case "string":
        return [0, t3];
      case "object":
        return t3;
    }
  })(t2[0]);
  var i2 = t2[1];
  let o2 = 1;
  i2 && i2.constructor === Object && (r2.ba = i2, "function" == typeof (i2 = t2[++o2]) && (r2.ha = true, Ze ??= t2[o2 + 1], i2 = t2[o2 += 2]));
  const s2 = {};
  for (; i2 && Array.isArray(i2) && i2.length && "number" == typeof i2[0] && i2[0] > 0; ) {
    for (var a2 = 0; a2 < i2.length; a2++) s2[i2[a2]] = i2;
    i2 = t2[++o2];
  }
  for (a2 = 1; void 0 !== i2; ) {
    let s3;
    "number" == typeof i2 && (a2 += i2, i2 = t2[++o2]);
    var u2 = void 0;
    if (i2 instanceof qe ? s3 = i2 : (s3 = Ye, o2--), s3?.j) {
      i2 = t2[++o2], u2 = t2;
      var c2 = o2;
      "function" == typeof i2 && (i2 = i2(), u2[c2] = i2), u2 = i2;
    }
    for (c2 = a2 + 1, "number" == typeof (i2 = t2[++o2]) && i2 < 0 && (c2 -= i2, i2 = t2[++o2]); a2 < c2; a2++) u2 ? n2(r2, a2, s3, u2) : e2(r2, a2, s3);
  }
  return t2[Xe] = r2;
}
function en(t2, e2) {
  return t2 instanceof $e ? t2.m : Array.isArray(t2) ? Ct(t2, e2, false) : void 0;
}
function nn(t2, e2, n2) {
  t2[e2] = n2.i;
}
function rn(t2, e2, n2, r2) {
  let i2, o2;
  const s2 = n2.i;
  t2[e2] = (t3, e3, n3) => s2(t3, e3, n3, o2 ||= tn(r2).W, i2 ||= on(r2));
}
function on(t2) {
  let e2 = t2[Qe];
  if (!e2) {
    const n2 = tn(t2);
    e2 = (t3, e3) => sn(t3, e3, n2), t2[Qe] = e2;
  }
  return e2;
}
function sn(t2, e2, n2) {
  !(function(t3, e3, n3) {
    const r2 = 128 & e3 ? 0 : -1, i2 = t3.length;
    var o2;
    (o2 = !!i2) && (o2 = null != (o2 = t3[i2 - 1]) && "object" == typeof o2 && o2.constructor === Object);
    const s2 = i2 + (o2 ? -1 : 0);
    for (e3 = 128 & e3 ? 1 : 0; e3 < s2; e3++) n3(e3 - r2, t3[e3]);
    if (o2) {
      t3 = t3[i2 - 1];
      for (const e4 in t3) !isNaN(e4) && n3(+e4, t3[e4]);
    }
  })(t2, 0 | t2[M], ((t3, r2) => {
    if (null != r2) {
      var i2 = (function(t4, e3) {
        var n3 = t4[e3];
        if (n3) return n3;
        if ((n3 = t4.ba) && (n3 = n3[e3])) {
          var r3 = (n3 = Array.isArray(n3) ? n3[0] instanceof qe ? n3 : [Je, n3] : [n3, void 0])[0].i;
          if (n3 = n3[1]) {
            const e4 = on(n3), i3 = tn(n3).W;
            n3 = t4.ha ? Ze(i3, e4) : (t5, n4, o2) => r3(t5, n4, o2, i3, e4);
          } else n3 = r3;
          return t4[e3] = n3;
        }
      })(n2, t3);
      i2 ? i2(e2, r2, t3) : t3 < 500 || O(B, 3);
    }
  }));
}
var an;
var un = 0;
var cn = un;
if (X(cn)) {
  if (!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(cn)) throw Error(String(cn));
} else if ((an = J(cn)) && (an = !Number.isSafeInteger(cn)), an) throw Error(String(cn));
function ln(t2, e2) {
  if (Array.isArray(e2)) {
    var n2 = 0 | e2[M];
    if (4 & n2) return e2;
    for (var r2 = 0, i2 = 0; r2 < e2.length; r2++) {
      const n3 = t2(e2[r2]);
      null != n3 && (e2[i2++] = n3);
    }
    return i2 < r2 && (e2.length = i2), z(e2, -1537 & (5 | n2)), 2 & n2 && Object.freeze(e2), e2;
  }
}
function hn(t2, e2) {
  return new qe(t2, e2);
}
function fn(t2, e2, n2) {
  null != (e2 = Et(e2)) && (ke(t2, n2, 5), t2 = t2.i, (n2 = st ||= new DataView(new ArrayBuffer(8))).setFloat32(0, +e2, true), ut = 0, e2 = at = n2.getUint32(0, true), t2.i.push(e2 >>> 0 & 255), t2.i.push(e2 >>> 8 & 255), t2.i.push(e2 >>> 16 & 255), t2.i.push(e2 >>> 24 & 255));
}
function dn(t2, e2, n2) {
  null != (e2 = jt(e2)) && null != e2 && (ke(t2, n2, 0), Oe(t2.i, e2));
}
function pn(t2, e2, n2) {
  null != (e2 = It(e2)) && (ke(t2, n2, 0), t2.i.i.push(e2 ? 1 : 0));
}
function mn(t2, e2, n2) {
  null != (e2 = Bt(e2)) && Be(t2, n2, i(e2));
}
function gn(t2, e2, n2, r2, i2) {
  null != (e2 = en(e2, r2)) && (n2 = xe(t2, n2), i2(e2, t2), Ue(t2, n2));
}
function _n(t2, e2, n2) {
  null != (e2 = jt(e2)) && (e2 = parseInt(e2, 10), ke(t2, n2, 0), Oe(t2.i, e2));
}
Z || (un = Q(un) ? un ? "1" : "0" : X(un) ? un.trim() || "0" : String(un));
var yn;
var bn = hn(fn, ze);
var wn = hn(fn, ze);
var vn = hn((function(t2, e2, n2) {
  if (e2 = (function(t3) {
    if (null == t3) return t3;
    var e3 = typeof t3;
    if ("bigint" === e3) return String(_t(64, t3));
    if (Pt(t3)) {
      if ("string" === e3) {
        if (e3 = vt(Number(t3)), bt(e3)) t3 = String(e3);
        else if (-1 !== (e3 = t3.indexOf(".")) && (t3 = t3.substring(0, e3)), e3 = t3.length, !("-" === t3[0] ? e3 < 20 || 20 === e3 && Number(t3.substring(0, 7)) > -922337 : e3 < 19 || 19 === e3 && Number(t3.substring(0, 6)) < 922337)) if (pt(t3), t3 = at, 2147483648 & (e3 = ut)) if (W()) t3 = "" + (BigInt(0 | e3) << BigInt(32) | BigInt(t3 >>> 0));
        else {
          const [n4, r2] = mt(t3, e3);
          t3 = "-" + ft(n4, r2);
        }
        else t3 = ft(t3, e3);
        return t3;
      }
      if ("number" === e3) {
        if (t3 = vt(t3), !bt(t3)) {
          lt(t3), e3 = at;
          var n3 = ut;
          (t3 = 2147483648 & n3) && (n3 = ~n3 >>> 0, 0 == (e3 = 1 + ~e3 >>> 0) && (n3 = n3 + 1 >>> 0)), t3 = "number" == typeof (e3 = ht(e3, n3)) ? t3 ? -e3 : e3 : t3 ? "-" + e3 : e3;
        }
        return t3;
      }
    }
  })(e2), null != e2) {
    if ("string" == typeof e2) Ae(e2);
    if (null != e2) switch (ke(t2, n2, 0), typeof e2) {
      case "number":
        t2 = t2.i, lt(e2), Pe(t2, at, ut);
        break;
      case "bigint":
        n2 = BigInt.asUintN(64, e2), n2 = new Ie(Number(n2 & BigInt(4294967295)), Number(n2 >> BigInt(32))), Pe(t2.i, n2.j, n2.i);
        break;
      default:
        n2 = Ae(e2), Pe(t2.i, n2.j, n2.i);
    }
  }
}), Ce);
var Sn = hn((function(t2, e2, n2) {
  if (null != (e2 = Ut(e2))) {
    if ("string" == typeof e2) ve(e2);
    if (null != e2) switch (ke(t2, n2, 0), typeof e2) {
      case "number":
        t2 = t2.i, lt(e2), Pe(t2, at, ut);
        break;
      case "bigint":
        n2 = BigInt.asUintN(64, e2), n2 = new Se(Number(n2 & BigInt(4294967295)), Number(n2 >> BigInt(32))), Pe(t2.i, n2.j, n2.i);
        break;
      default:
        n2 = ve(e2), Pe(t2.i, n2.j, n2.i);
    }
  }
}), Ge);
var En = hn(dn, Me);
yn = new qe((function(t2, e2, n2) {
  if (null != (e2 = ln(jt, e2)) && e2.length) {
    n2 = xe(t2, n2);
    for (let n3 = 0; n3 < e2.length; n3++) Oe(t2.i, e2[n3]);
    Ue(t2, n2);
  }
}), Me);
var An;
var In = hn(dn, Me);
var Tn = hn(dn, Me);
var Pn = hn(pn, Re);
var Ln = hn(pn, Re);
var On = hn(mn, De);
An = new qe((function(t2, e2, n2) {
  if (null != (e2 = ln(Bt, e2))) for (let a2 = 0; a2 < e2.length; a2++) {
    var r2 = t2, o2 = n2, s2 = e2[a2];
    null != s2 && Be(r2, o2, i(s2));
  }
}), De);
var jn;
var kn = hn(mn, De);
var xn = hn(mn, De);
var Un = (function(t2, e2, n2 = Fe) {
  return new qe(e2, n2);
})(0, (function(t2, e2, n2, r2, i2) {
  if (Array.isArray(e2)) for (let o2 = 0; o2 < e2.length; o2++) gn(t2, e2[o2], n2, r2, i2);
}));
var Bn = new qe(gn, Fe);
var Nn = hn((function(t2, e2, n2) {
  null != (e2 = kt(e2)) && null != e2 && (ke(t2, n2, 0), Le(t2.i, e2));
}), Ve);
var Fn = hn(_n, He);
jn = new qe((function(t2, e2, n2) {
  if (null != (e2 = ln(jt, e2)) && e2.length) {
    n2 = xe(t2, n2);
    for (let n3 = 0; n3 < e2.length; n3++) Oe(t2.i, e2[n3]);
    Ue(t2, n2);
  }
}), He);
var Rn = hn(_n, He);
function Dn(t2) {
  return function() {
    const e2 = new class {
      constructor() {
        this.l = [], this.j = 0, this.i = new class {
          constructor() {
            this.i = [];
          }
          length() {
            return this.i.length;
          }
          end() {
            const t3 = this.i;
            return this.i = [], t3;
          }
        }();
      }
    }();
    sn(this.m, e2, tn(t2)), je(e2, e2.i.end());
    const n2 = new Uint8Array(e2.j), r2 = e2.l, i2 = r2.length;
    let o2 = 0;
    for (let t3 = 0; t3 < i2; t3++) {
      const e3 = r2[t3];
      n2.set(e3, o2), o2 += e3.length;
    }
    return e2.l = [n2], n2;
  };
}
function Mn(t2, e2) {
  if (null != e2) if (Array.isArray(e2)) Qt(t2, 2, Ft(e2, 0, Rt));
  else {
    if (!("string" == typeof e2 || e2 instanceof E || w(e2))) throw Error("invalid value in Any.value field: " + e2 + " expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");
    if (null != e2) {
      if ("string" == typeof e2) e2 = e2 ? new E(e2, v) : S();
      else if (e2.constructor !== E) {
        if (!w(e2)) throw Error();
        e2 = e2.length ? new E(new Uint8Array(e2), v) : S();
      }
    }
    se(t2, 2, e2, S());
  }
}
var Vn = class extends $e {
  constructor(t2) {
    super(t2);
  }
};
var Cn = [0, kn, hn((function(t2, e2, n2) {
  if (null != e2) {
    if (e2 instanceof $e) {
      const r2 = e2.pa;
      return void (r2 ? (e2 = r2(e2), null != e2 && Be(t2, n2, we(e2).buffer)) : O(B, 3));
    }
    if (Array.isArray(e2)) return void O(B, 3);
  }
  null != (e2 = null == e2 || "string" == typeof e2 || e2 instanceof E ? e2 : void 0) && Be(t2, n2, we(e2).buffer);
}), We)];
var Gn;
var zn = globalThis.trustedTypes;
function Wn(t2) {
  var e2;
  return void 0 === Gn && (Gn = (function() {
    let t3 = null;
    if (!zn) return t3;
    try {
      const e3 = (t4) => t4;
      t3 = zn.createPolicy("goog#html", { createHTML: e3, createScript: e3, createScriptURL: e3 });
    } catch (t4) {
    }
    return t3;
  })()), t2 = (e2 = Gn) ? e2.createScriptURL(t2) : t2, new class {
    constructor(t3) {
      this.i = t3;
    }
    toString() {
      return this.i + "";
    }
  }(t2);
}
function Hn(t2, ...e2) {
  if (0 === e2.length) return Wn(t2[0]);
  let n2 = t2[0];
  for (let r2 = 0; r2 < e2.length; r2++) n2 += encodeURIComponent(e2[r2]) + t2[r2 + 1];
  return Wn(n2);
}
var $n = {};
$n[336783863] = [0, On, Pn, -1, En, [0, [1, 2, 3, 4, 5, 6, 7, 8, 9], Bn, [0], Bn, [0, Pn, On, Pn, Fn, -1, jn, On, -1, [0, Pn, -1], Fn, Pn, -1], Bn, [0, On, -2], Bn, [0, En, Pn, 1, Pn, -3], Bn, [0, En, Fn, Pn, -1, yn, Fn, -1, Pn], Bn, [0, On, -2], Bn, [0, On, Fn], Bn, [0, Fn, On, -1, Pn], Bn, [0, Fn, -1, Pn]], [0, On], Pn, [0, [1, 3], [2, 4], Bn, [0, yn], -1, Bn, [0, An], -1, Un, [0, On, -1]], On];
var qn = class extends $e {
  constructor(t2) {
    super(t2);
  }
};
var Kn = [0, vn, -1, Ln, -3, vn, yn, kn, In, vn, -1, Ln, In, Ln, -2, kn];
var Yn = class extends $e {
  constructor(t2) {
    super(t2, 500);
  }
  N(t2) {
    return he(this, 7, t2);
  }
};
var Jn = [-1, {}];
var Xn = [0, On, 1, Jn];
var Qn = [0, On, An, Jn];
function Zn(t2, e2) {
  de(t2, 1, Yn, e2);
}
var tr = class extends $e {
  constructor(t2) {
    super(t2, 500);
  }
  N(t2) {
    return he(this, 1001, t2);
  }
};
tr.prototype.j = Dn([-500, Un, [-500, kn, -1, An, -3, [-2, $n, Pn], Un, Cn, In, -1, Xn, Qn, Un, [0, kn, Ln], kn, Kn, In, An, 987, An], 4, Un, [-500, On, -1, [-1, {}], 998, On], Un, [-500, On, An, -1, [-2, {}, Pn], 997, An, -1], In, Un, [-500, On, An, Jn, 998, An], An, In, Xn, Qn, Un, [0, kn, -1, Jn], An, -2, Kn, kn, -1, Ln, [0, Ln, Nn], 978, Jn, Un, Cn]);
var er = class extends $e {
  constructor(t2) {
    super(t2);
  }
};
var nr;
var rr = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]);
async function ir() {
  if (void 0 === nr) try {
    await WebAssembly.instantiate(rr), nr = true;
  } catch {
    nr = false;
  }
  return nr;
}
async function or(t2, e2 = Hn``) {
  const n2 = await ir() ? "wasm_internal" : "wasm_nosimd_internal";
  return { wasmLoaderPath: `${e2}/${t2}_${n2}.js`, wasmBinaryPath: `${e2}/${t2}_${n2}.wasm` };
}
var sr = class {
};
function ar(t2) {
  function e2(e3, n3) {
    return new ReadableStream({ start() {
    }, async pull(r3) {
      i2 = i2.then((async () => {
        if (e3.cache.length > 0) r3.enqueue(e3.cache.shift());
        else {
          var { value: i3, done: o3 } = await t2.read();
          i3 && (n3.active && n3.cache.push(i3), e3.active && r3.enqueue(i3)), o3 && r3.close();
        }
      })), await i2;
    }, cancel() {
      e3.active = false, e3.cache.length = 0, n3.active || t2.cancel();
    } });
  }
  var n2 = { cache: [], active: true };
  const r2 = { cache: [], active: true };
  let i2 = Promise.resolve();
  const o2 = e2(n2, r2);
  return n2 = e2(r2, n2), [o2.getReader(), n2.getReader()];
}
async function ur(t2, e2) {
  const n2 = new Uint8Array(e2);
  let r2 = 0;
  for (; r2 < e2; ) {
    const { value: i2, done: o2 } = await t2.read();
    if (i2) {
      const t3 = i2.subarray(0, e2 - r2);
      n2.set(t3, r2), r2 += t3.length;
    }
    if (o2) throw Error(`Expected ${e2} bytes, but stream ended after reading ${r2} bytes.`);
  }
  return await t2.cancel(), n2;
}
sr.forVisionTasks = function(t2) {
  return or("vision", t2);
}, sr.forTextTasks = function(t2) {
  return or("text", t2);
}, sr.forGenAiExperimentalTasks = function(t2) {
  return or("genai_experimental", t2);
}, sr.forGenAiTasks = function(t2) {
  return or("genai", t2);
}, sr.forAudioTasks = function(t2) {
  return or("audio", t2);
}, sr.isSimdSupported = function() {
  return ir();
};
var cr = [[0, async (t2) => {
  const e2 = new TextEncoder().encode("TFL3").length;
  return t2 = await ur(t2, e2 + 4), "TFL3" === new TextDecoder("utf-8").decode(t2.subarray(4, e2 + 4));
}], [1, async (t2) => 80 === (t2 = await ur(t2, 6))[4] && 75 === t2[5]]];
function lr() {
  var t2 = navigator;
  return "undefined" != typeof OffscreenCanvas && (!(function(t3 = navigator) {
    return (t3 = t3.userAgent).includes("Safari") && !t3.includes("Chrome");
  })(t2) || !!((t2 = t2.userAgent.match(/Version\/([\d]+).*Safari/)) && t2.length >= 1 && Number(t2[1]) >= 17));
}
async function hr(t2) {
  if ("function" != typeof importScripts) {
    const e2 = document.createElement("script");
    return e2.src = t2.toString(), e2.crossOrigin = "anonymous", new Promise(((t3, n2) => {
      e2.addEventListener("load", (() => {
        t3();
      }), false), e2.addEventListener("error", ((t4) => {
        n2(t4);
      }), false), document.body.appendChild(e2);
    }));
  }
  importScripts(t2.toString());
}
function fr(t2, e2, n2) {
  t2.o || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"), n2(e2 = t2.h.stringToNewUTF8(e2)), t2.h._free(e2);
}
function dr(t2, e2, n2) {
  t2.o || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");
  const r2 = new Uint32Array(e2.length);
  for (let n3 = 0; n3 < e2.length; n3++) r2[n3] = t2.h.stringToNewUTF8(e2[n3]);
  e2 = t2.h._malloc(4 * r2.length), t2.h.HEAPU32.set(r2, e2 >> 2), n2(e2);
  for (const e3 of r2) t2.h._free(e3);
  t2.h._free(e2);
}
function pr(t2, e2, n2) {
  t2.h.simpleListeners = t2.h.simpleListeners || {}, t2.h.simpleListeners[e2] = n2;
}
function mr(t2, e2, n2) {
  let r2 = [];
  t2.h.simpleListeners = t2.h.simpleListeners || {}, t2.h.simpleListeners[e2] = (t3, e3, i2) => {
    e3 ? (n2(r2, i2), r2 = []) : r2.push(t3);
  };
}
var gr = (_r = class {
  constructor(t2, e2) {
    this.l = true, this.h = t2, this.i = null, this.j = 0, this.o = "function" == typeof this.h._addIntToInputStream, void 0 !== e2 ? this.h.canvas = e2 : lr() ? this.h.canvas = new OffscreenCanvas(1, 1) : (console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."), this.h.canvas = document.createElement("canvas"));
  }
  async initializeGraph(t2) {
    const e2 = await (await fetch(t2)).arrayBuffer();
    t2 = !(t2.endsWith(".pbtxt") || t2.endsWith(".textproto")), this.setGraph(new Uint8Array(e2), t2);
  }
  setGraphFromString(t2) {
    this.setGraph(new TextEncoder().encode(t2), false);
  }
  setGraph(t2, e2) {
    const n2 = t2.length, r2 = this.h._malloc(n2);
    this.h.HEAPU8.set(t2, r2), e2 ? this.h._changeBinaryGraph(n2, r2) : this.h._changeTextGraph(n2, r2), this.h._free(r2);
  }
  configureAudio(t2, e2, n2, r2, i2) {
    this.h._configureAudio || console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'), fr(this, r2 || "input_audio", ((r3) => {
      fr(this, i2 = i2 || "audio_header", ((i3) => {
        this.h._configureAudio(r3, i3, t2, e2 ?? 0, n2);
      }));
    }));
  }
  setAutoResizeCanvas(t2) {
    this.l = t2;
  }
  setAutoRenderToScreen(t2) {
    this.h._setAutoRenderToScreen(t2);
  }
  setGpuBufferVerticalFlip(t2) {
    this.h.gpuOriginForWebTexturesIsBottomLeft = t2;
  }
  attachErrorListener(t2) {
    this.h.errorListener = t2;
  }
  attachEmptyPacketListener(t2, e2) {
    this.h.emptyPacketListeners = this.h.emptyPacketListeners || {}, this.h.emptyPacketListeners[t2] = e2;
  }
  addAudioToStream(t2, e2, n2) {
    this.addAudioToStreamWithShape(t2, 0, 0, e2, n2);
  }
  addAudioToStreamWithShape(t2, e2, n2, r2, i2) {
    const o2 = 4 * t2.length;
    this.j !== o2 && (this.i && this.h._free(this.i), this.i = this.h._malloc(o2), this.j = o2), this.h.HEAPF32.set(t2, this.i / 4), fr(this, r2, ((t3) => {
      this.h._addAudioToInputStream(this.i, e2, n2, t3, i2);
    }));
  }
  addGpuBufferToStream(t2, e2, n2) {
    fr(this, e2, ((e3) => {
      if (!this.h.canvas) throw Error("No OpenGL canvas configured.");
      e3 ? this.h._bindTextureToStream(e3) : this.h._bindTextureToCanvas();
      const r2 = this.h.canvas.getContext("webgl2") || this.h.canvas.getContext("webgl");
      if (!r2) throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");
      this.h.gpuOriginForWebTexturesIsBottomLeft && r2.pixelStorei(r2.UNPACK_FLIP_Y_WEBGL, true), r2.texImage2D(r2.TEXTURE_2D, 0, r2.RGBA, r2.RGBA, r2.UNSIGNED_BYTE, t2), this.h.gpuOriginForWebTexturesIsBottomLeft && r2.pixelStorei(r2.UNPACK_FLIP_Y_WEBGL, false);
      const [i2, o2] = void 0 !== t2.videoWidth ? [t2.videoWidth, t2.videoHeight] : void 0 !== t2.naturalWidth ? [t2.naturalWidth, t2.naturalHeight] : void 0 !== t2.displayWidth ? [t2.displayWidth, t2.displayHeight] : [t2.width, t2.height];
      !this.l || i2 === this.h.canvas.width && o2 === this.h.canvas.height || (this.h.canvas.width = i2, this.h.canvas.height = o2);
      const [s2, a2] = [i2, o2];
      this.h._addBoundTextureToStream(e3, s2, a2, n2);
    }));
  }
  addBoolToStream(t2, e2, n2) {
    fr(this, e2, ((e3) => {
      this.h._addBoolToInputStream(t2, e3, n2);
    }));
  }
  addDoubleToStream(t2, e2, n2) {
    fr(this, e2, ((e3) => {
      this.h._addDoubleToInputStream(t2, e3, n2);
    }));
  }
  addFloatToStream(t2, e2, n2) {
    fr(this, e2, ((e3) => {
      this.h._addFloatToInputStream(t2, e3, n2);
    }));
  }
  addIntToStream(t2, e2, n2) {
    fr(this, e2, ((e3) => {
      this.h._addIntToInputStream(t2, e3, n2);
    }));
  }
  addUintToStream(t2, e2, n2) {
    fr(this, e2, ((e3) => {
      this.h._addUintToInputStream(t2, e3, n2);
    }));
  }
  addStringToStream(t2, e2, n2) {
    fr(this, e2, ((e3) => {
      fr(this, t2, ((t3) => {
        this.h._addStringToInputStream(t3, e3, n2);
      }));
    }));
  }
  addStringRecordToStream(t2, e2, n2) {
    fr(this, e2, ((e3) => {
      dr(this, Object.keys(t2), ((r2) => {
        dr(this, Object.values(t2), ((i2) => {
          this.h._addFlatHashMapToInputStream(r2, i2, Object.keys(t2).length, e3, n2);
        }));
      }));
    }));
  }
  addProtoToStream(t2, e2, n2, r2) {
    fr(this, n2, ((n3) => {
      fr(this, e2, ((e3) => {
        const i2 = this.h._malloc(t2.length);
        this.h.HEAPU8.set(t2, i2), this.h._addProtoToInputStream(i2, t2.length, e3, n3, r2), this.h._free(i2);
      }));
    }));
  }
  addEmptyPacketToStream(t2, e2) {
    fr(this, t2, ((t3) => {
      this.h._addEmptyPacketToInputStream(t3, e2);
    }));
  }
  addBoolVectorToStream(t2, e2, n2) {
    fr(this, e2, ((e3) => {
      const r2 = this.h._allocateBoolVector(t2.length);
      if (!r2) throw Error("Unable to allocate new bool vector on heap.");
      for (const e4 of t2) this.h._addBoolVectorEntry(r2, e4);
      this.h._addBoolVectorToInputStream(r2, e3, n2);
    }));
  }
  addDoubleVectorToStream(t2, e2, n2) {
    fr(this, e2, ((e3) => {
      const r2 = this.h._allocateDoubleVector(t2.length);
      if (!r2) throw Error("Unable to allocate new double vector on heap.");
      for (const e4 of t2) this.h._addDoubleVectorEntry(r2, e4);
      this.h._addDoubleVectorToInputStream(r2, e3, n2);
    }));
  }
  addFloatVectorToStream(t2, e2, n2) {
    fr(this, e2, ((e3) => {
      const r2 = this.h._allocateFloatVector(t2.length);
      if (!r2) throw Error("Unable to allocate new float vector on heap.");
      for (const e4 of t2) this.h._addFloatVectorEntry(r2, e4);
      this.h._addFloatVectorToInputStream(r2, e3, n2);
    }));
  }
  addIntVectorToStream(t2, e2, n2) {
    fr(this, e2, ((e3) => {
      const r2 = this.h._allocateIntVector(t2.length);
      if (!r2) throw Error("Unable to allocate new int vector on heap.");
      for (const e4 of t2) this.h._addIntVectorEntry(r2, e4);
      this.h._addIntVectorToInputStream(r2, e3, n2);
    }));
  }
  addUintVectorToStream(t2, e2, n2) {
    fr(this, e2, ((e3) => {
      const r2 = this.h._allocateUintVector(t2.length);
      if (!r2) throw Error("Unable to allocate new unsigned int vector on heap.");
      for (const e4 of t2) this.h._addUintVectorEntry(r2, e4);
      this.h._addUintVectorToInputStream(r2, e3, n2);
    }));
  }
  addStringVectorToStream(t2, e2, n2) {
    fr(this, e2, ((e3) => {
      const r2 = this.h._allocateStringVector(t2.length);
      if (!r2) throw Error("Unable to allocate new string vector on heap.");
      for (const e4 of t2) fr(this, e4, ((t3) => {
        this.h._addStringVectorEntry(r2, t3);
      }));
      this.h._addStringVectorToInputStream(r2, e3, n2);
    }));
  }
  addBoolToInputSidePacket(t2, e2) {
    fr(this, e2, ((e3) => {
      this.h._addBoolToInputSidePacket(t2, e3);
    }));
  }
  addDoubleToInputSidePacket(t2, e2) {
    fr(this, e2, ((e3) => {
      this.h._addDoubleToInputSidePacket(t2, e3);
    }));
  }
  addFloatToInputSidePacket(t2, e2) {
    fr(this, e2, ((e3) => {
      this.h._addFloatToInputSidePacket(t2, e3);
    }));
  }
  addIntToInputSidePacket(t2, e2) {
    fr(this, e2, ((e3) => {
      this.h._addIntToInputSidePacket(t2, e3);
    }));
  }
  addUintToInputSidePacket(t2, e2) {
    fr(this, e2, ((e3) => {
      this.h._addUintToInputSidePacket(t2, e3);
    }));
  }
  addStringToInputSidePacket(t2, e2) {
    fr(this, e2, ((e3) => {
      fr(this, t2, ((t3) => {
        this.h._addStringToInputSidePacket(t3, e3);
      }));
    }));
  }
  addProtoToInputSidePacket(t2, e2, n2) {
    fr(this, n2, ((n3) => {
      fr(this, e2, ((e3) => {
        const r2 = this.h._malloc(t2.length);
        this.h.HEAPU8.set(t2, r2), this.h._addProtoToInputSidePacket(r2, t2.length, e3, n3), this.h._free(r2);
      }));
    }));
  }
  addBoolVectorToInputSidePacket(t2, e2) {
    fr(this, e2, ((e3) => {
      const n2 = this.h._allocateBoolVector(t2.length);
      if (!n2) throw Error("Unable to allocate new bool vector on heap.");
      for (const e4 of t2) this.h._addBoolVectorEntry(n2, e4);
      this.h._addBoolVectorToInputSidePacket(n2, e3);
    }));
  }
  addDoubleVectorToInputSidePacket(t2, e2) {
    fr(this, e2, ((e3) => {
      const n2 = this.h._allocateDoubleVector(t2.length);
      if (!n2) throw Error("Unable to allocate new double vector on heap.");
      for (const e4 of t2) this.h._addDoubleVectorEntry(n2, e4);
      this.h._addDoubleVectorToInputSidePacket(n2, e3);
    }));
  }
  addFloatVectorToInputSidePacket(t2, e2) {
    fr(this, e2, ((e3) => {
      const n2 = this.h._allocateFloatVector(t2.length);
      if (!n2) throw Error("Unable to allocate new float vector on heap.");
      for (const e4 of t2) this.h._addFloatVectorEntry(n2, e4);
      this.h._addFloatVectorToInputSidePacket(n2, e3);
    }));
  }
  addIntVectorToInputSidePacket(t2, e2) {
    fr(this, e2, ((e3) => {
      const n2 = this.h._allocateIntVector(t2.length);
      if (!n2) throw Error("Unable to allocate new int vector on heap.");
      for (const e4 of t2) this.h._addIntVectorEntry(n2, e4);
      this.h._addIntVectorToInputSidePacket(n2, e3);
    }));
  }
  addUintVectorToInputSidePacket(t2, e2) {
    fr(this, e2, ((e3) => {
      const n2 = this.h._allocateUintVector(t2.length);
      if (!n2) throw Error("Unable to allocate new unsigned int vector on heap.");
      for (const e4 of t2) this.h._addUintVectorEntry(n2, e4);
      this.h._addUintVectorToInputSidePacket(n2, e3);
    }));
  }
  addStringVectorToInputSidePacket(t2, e2) {
    fr(this, e2, ((e3) => {
      const n2 = this.h._allocateStringVector(t2.length);
      if (!n2) throw Error("Unable to allocate new string vector on heap.");
      for (const e4 of t2) fr(this, e4, ((t3) => {
        this.h._addStringVectorEntry(n2, t3);
      }));
      this.h._addStringVectorToInputSidePacket(n2, e3);
    }));
  }
  attachBoolListener(t2, e2) {
    pr(this, t2, e2), fr(this, t2, ((t3) => {
      this.h._attachBoolListener(t3);
    }));
  }
  attachBoolVectorListener(t2, e2) {
    mr(this, t2, e2), fr(this, t2, ((t3) => {
      this.h._attachBoolVectorListener(t3);
    }));
  }
  attachIntListener(t2, e2) {
    pr(this, t2, e2), fr(this, t2, ((t3) => {
      this.h._attachIntListener(t3);
    }));
  }
  attachIntVectorListener(t2, e2) {
    mr(this, t2, e2), fr(this, t2, ((t3) => {
      this.h._attachIntVectorListener(t3);
    }));
  }
  attachUintListener(t2, e2) {
    pr(this, t2, e2), fr(this, t2, ((t3) => {
      this.h._attachUintListener(t3);
    }));
  }
  attachUintVectorListener(t2, e2) {
    mr(this, t2, e2), fr(this, t2, ((t3) => {
      this.h._attachUintVectorListener(t3);
    }));
  }
  attachDoubleListener(t2, e2) {
    pr(this, t2, e2), fr(this, t2, ((t3) => {
      this.h._attachDoubleListener(t3);
    }));
  }
  attachDoubleVectorListener(t2, e2) {
    mr(this, t2, e2), fr(this, t2, ((t3) => {
      this.h._attachDoubleVectorListener(t3);
    }));
  }
  attachFloatListener(t2, e2) {
    pr(this, t2, e2), fr(this, t2, ((t3) => {
      this.h._attachFloatListener(t3);
    }));
  }
  attachFloatVectorListener(t2, e2) {
    mr(this, t2, e2), fr(this, t2, ((t3) => {
      this.h._attachFloatVectorListener(t3);
    }));
  }
  attachStringListener(t2, e2) {
    pr(this, t2, e2), fr(this, t2, ((t3) => {
      this.h._attachStringListener(t3);
    }));
  }
  attachStringVectorListener(t2, e2) {
    mr(this, t2, e2), fr(this, t2, ((t3) => {
      this.h._attachStringVectorListener(t3);
    }));
  }
  attachProtoListener(t2, e2, n2) {
    pr(this, t2, e2), fr(this, t2, ((t3) => {
      this.h._attachProtoListener(t3, n2 || false);
    }));
  }
  attachProtoVectorListener(t2, e2, n2) {
    mr(this, t2, e2), fr(this, t2, ((t3) => {
      this.h._attachProtoVectorListener(t3, n2 || false);
    }));
  }
  attachAudioListener(t2, e2, n2) {
    this.h._attachAudioListener || console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'), pr(this, t2, ((t3, n3) => {
      t3 = new Float32Array(t3.buffer, t3.byteOffset, t3.length / 4), e2(t3, n3);
    })), fr(this, t2, ((t3) => {
      this.h._attachAudioListener(t3, n2 || false);
    }));
  }
  finishProcessing() {
    this.h._waitUntilIdle();
  }
  closeGraph() {
    this.h._closeGraph(), this.h.simpleListeners = void 0, this.h.emptyPacketListeners = void 0;
  }
}, class extends _r {
  ja() {
    this.h._registerModelResourcesGraphService();
  }
});
var _r;
async function yr(t2, e2) {
  const n2 = await (async (t3, e3, n3) => {
    var r2 = ii;
    if (t3 && await hr(t3), !self.ModuleFactory) throw Error("ModuleFactory not set.");
    if (e3 && (await hr(e3), !self.ModuleFactory)) throw Error("ModuleFactory not set.");
    return self.Module && n3 && ((t3 = self.Module).locateFile = n3.locateFile, n3.mainScriptUrlOrBlob && (t3.mainScriptUrlOrBlob = n3.mainScriptUrlOrBlob)), n3 = await self.ModuleFactory(self.Module || n3), self.ModuleFactory = self.Module = void 0, new r2(n3, null);
  })(t2.wasmLoaderPath, t2.assetLoaderPath, { locateFile: (e3) => e3.endsWith(".wasm") ? t2.wasmBinaryPath.toString() : t2.assetBinaryPath && e3.endsWith(".data") ? t2.assetBinaryPath.toString() : e3 });
  return await n2.N(e2), n2;
}
async function br(t2, e2) {
  return yr(t2, e2);
}
function wr(t2) {
  try {
    const e2 = t2.J.length;
    if (1 === e2) throw Error(t2.J[0].message);
    if (e2 > 1) throw Error("Encountered multiple errors: " + t2.J.map(((t3) => t3.message)).join(", "));
  } finally {
    t2.J = [];
  }
}
function vr(t2, e2) {
  t2.I = Math.max(t2.I, e2);
}
var Sr = class {
  constructor(t2) {
    this.j = t2, this.J = [], this.I = 0, this.j.setAutoRenderToScreen(false);
  }
  setGraph(t2, e2) {
    this.j.attachErrorListener(((t3, e3) => {
      this.J.push(Error(e3));
    })), this.j.ja(), this.j.setGraph(t2, e2), wr(this);
  }
  finishProcessing() {
    this.j.finishProcessing(), wr(this);
  }
  close() {
    this.j.closeGraph();
  }
};
Sr.prototype.close = Sr.prototype.close;
var Er = class extends $e {
  constructor(t2) {
    super(t2);
  }
  j() {
    return jt(Jt(this, 2)) ?? 0;
  }
};
function Ar(t2, e2) {
  he(t2, 1, e2);
}
var Ir = class extends $e {
  constructor(t2) {
    super(t2);
  }
};
var Tr = [0, Rn, In, wn, -1, En];
function Pr(t2, e2, n2, r2) {
  if (void 0 !== t2.data) {
    var i2 = new Uint8Array(t2.data.buffer, e2, n2);
    return 1 === r2 && (function(t3, e3, n3) {
      t3.i.push([e3, n3]), t3.i.sort(((t4, e4) => t4[0] - e4[0])), e3 = 0;
      for (const [r3, i3] of t3.i) {
        const t4 = i3;
        (n3 = r3) <= e3 && (e3 = Math.max(e3, n3 + t4));
      }
      e3 === t3.length && (t3.data = void 0);
    })(t2, e2, n2), i2;
  }
}
Er.prototype.l = Dn(Tr);
var Lr = class {
  constructor(t2) {
    this.i = [], this.data = t2, this.length = t2.length;
  }
};
function Or(t2, e2) {
  return new kr((async () => {
    const { value: e3, done: n2 } = await t2.read();
    return n2 ? void 0 : e3;
  }), e2);
}
async function jr(t2, e2, n2, r2, i2) {
  if (2 === i2) return t2.i = [], t2.j = () => Promise.resolve(void 0), setTimeout((() => {
    t2.l();
  }), 0), Promise.resolve(0);
  for (; t2.size < n2 + r2; ) {
    var o2 = await t2.j();
    if (void 0 === o2) break;
    t2.i.push(new Lr(o2));
  }
  if (t2.size < n2 + r2) throw Error(`Data size is too small: ${t2.size}, expected at least ${n2 + r2}.`);
  o2 = e2._malloc(r2) >>> 0;
  let s2 = 0;
  for (let a2 = 0; a2 < t2.i.length; a2++) {
    const u2 = t2.i[a2];
    if (n2 >= u2.length) {
      n2 -= u2.length;
      continue;
    }
    const c2 = Math.min(r2, u2.length - n2);
    if (void 0 === (n2 = Pr(u2, n2, c2, i2))) throw Error("Data has already been released.");
    if (e2.HEAPU8.set(n2, o2 + s2), n2 = 0, s2 += c2, 0 === (r2 -= c2)) break;
  }
  if (0 !== r2) throw Error("Data not found.");
  return Promise.resolve(o2);
}
var kr = class {
  constructor(t2, e2) {
    this.i = [], this.j = t2, this.l = e2;
  }
  get size() {
    let t2 = 0;
    for (let e2 = 0; e2 < this.i.length; e2++) t2 += this.i[e2].length;
    return t2;
  }
};
function xr(t2) {
  return "object" == typeof t2 && null != t2 && "imageSource" in t2;
}
function Ur(t2) {
  return "object" == typeof t2 && null != t2 && "audioSource" in t2;
}
async function Br(t2, e2, n2) {
  t2 = new Fr(t2, n2);
  let r2 = 0;
  for (e2 = e2.getReader(); ; ) {
    const { value: n3, done: i2 } = await e2.read();
    if (i2) break;
    t2.set(n3, r2), r2 += n3.byteLength;
  }
  if (n2 !== r2) throw Nr(t2), Error(`File could not be fully loaded to memory, so was not retained. Loaded ${r2}/${n2} bytes before failure`);
  return t2;
}
function Nr(t2) {
  if (t2.i) try {
    t2.h._free(t2.j);
  } catch {
  } finally {
    t2.i = false;
  }
}
var Fr = class {
  constructor(t2, e2) {
    this.h = t2, this.l = e2, this.j = this.h._malloc(e2) >>> 0, this.o = this.h.HEAPU8, this.i = !!this.j;
  }
  get offset() {
    if (!this.i) throw Error("WasmFileReference has been freed.");
    return this.j;
  }
  get size() {
    if (!this.i) throw Error("WasmFileReference has been freed.");
    return this.l;
  }
  set(t2, e2) {
    this.o.set(t2, this.j + (e2 ?? 0));
  }
};
var Rr = class extends $e {
  constructor(t2) {
    super(t2);
  }
};
Rr.prototype.j = Dn([0, kn, 2, An, In, Ln]);
var Dr = class extends $e {
  constructor(t2) {
    super(t2);
  }
};
var Mr = class extends $e {
  constructor(t2) {
    super(t2);
  }
};
var Vr = class extends $e {
  constructor(t2) {
    super(t2);
  }
};
var Cr = class extends $e {
  constructor(t2) {
    super(t2);
  }
};
var Gr = [0, In, -6, 1, In, 1, [0, Ln, Rn, -2], [0, Ln, wn], Rn, -2, [0, Ln, -1, Rn, wn, Fn, En, Pn, -1], 1, Ln, In, En, -1, [0, Rn, In], Ln, -1, bn, In, -5, bn, -1, [0, En, bn], En, Pn, [0, En, -2], bn, [0, In], [0, In, -4], Pn, En, -2, Pn];
var zr = [0, kn, -2];
var Wr = [0, [4, 6], Gr, In, 1, Tn, An, xn, jn, zr, En, [0, [0, In, -1, Un, [0, In, [0, In, -1], -1, [0, Rn, -1], Ln], Ln, -2, In, -1], [0, In, -1, Ln], Gr, Ln, In, [0, In]], On, -3, [0, In, Ln], Gr, [0, zr, -2], yn];
Cr.prototype.j = Dn([0, kn, 8, [0, Ln, -6], 1, In, 1, In, [0, Un, [0, kn, Sn, -1, Rn], Wr, In], [0, In, Ln, -3], 1, Rn, 1, Wr, 1, In, 5, Rn, yn, 1, Tr, Ln, In]);
var Hr = class extends $e {
  constructor(t2) {
    super(t2);
  }
};
var $r = class extends $e {
  constructor(t2) {
    super(t2);
  }
};
var qr = [2, 4];
$r.prototype.j = Dn([0, qr, In, xn, In, Bn, [0, 1, kn]]);
var Kr = /* @__PURE__ */ (function(t2) {
  return class extends t2 {
    constructor() {
      super(...arguments), this.P = false, this.F = this.H = 0;
    }
    M() {
      if (this.P) throw Error("Cannot process because LLM inference engine is currently loading or processing.");
      this.P = true;
    }
    L() {
      this.P = false;
    }
    async createLlmInferenceEngine(t3, e2) {
      this.M();
      try {
        const n2 = Or(t3, (() => {
        }));
        await this.h.createLlmInferenceEngine(pe(e2, 2) ?? 512, ce(e2, Er, 3)?.j() ?? 40, It(Jt(e2, 6)) ?? false ?? false, pe(e2, 7) ?? 0, It(Jt(e2, 8)) ?? false ?? false, ((t4, e3, r2) => jr(n2, this.h, t4, e3, r2)));
      } finally {
        this.L();
      }
    }
    async aa(t3, e2) {
      this.M();
      try {
        await this.la(t3), await this.h.ccall("CreateLlmInferenceEngineConverted", "void", ["number", "number", "boolean"], [pe(e2, 2) ?? 512, ce(e2, Er, 3)?.j() ?? 40, It(Jt(e2, 6)) ?? false ?? false], { async: true });
      } finally {
        this.L();
      }
    }
    V() {
      this.M();
      try {
        const t3 = this.h;
        t3.ccall("DeleteLlmInferenceEngine", "void", [], [], { async: false }), this.H && (t3._FreeSession(this.H), this.F === this.H && (this.F = 0), this.H = 0), this.F && (t3._FreeSession(this.F), this.F = 0);
      } finally {
        this.L();
      }
    }
    async R(t3, e2, n2) {
      this.M();
      try {
        const r2 = [], i2 = this.h;
        i2._userProgressListener = (t4, e3) => {
          t4 && r2.push(t4), n2 && n2(t4, e3);
        };
        const o2 = e2.l(), s2 = o2.length, a2 = this.h._malloc(s2);
        this.h.HEAPU8.set(o2, a2);
        const u2 = t3.some(Ur), c2 = t3.some(xr);
        i2.ccallNum = i2.ccall;
        const l2 = await i2.ccallNum("MakeSessionForPredict", "number", ["number", "number", "boolean", "boolean"], [a2, s2, c2, u2], { async: true });
        e2 = [];
        for (const n3 of t3) if ("string" == typeof n3) fr(this, n3, ((t4) => {
          i2._AddTextQueryChunk(l2, t4);
        }));
        else if (xr(n3)) {
          const { image: t4, width: r3, height: o3 } = await this.ea(n3.imageSource), s3 = "undefined" != typeof OffscreenCanvas ? new OffscreenCanvas(r3, o3) : document.createElement("canvas");
          s3.width = r3, s3.height = o3;
          const a3 = s3.getContext("2d");
          a3.drawImage(t4, 0, 0);
          const u3 = a3.getImageData(0, 0, r3, o3), c3 = this.h._malloc(u3.width * u3.height * 4);
          this.h.HEAPU8.set(u3.data, c3), i2._AddImageQueryChunk(l2, c3, u3.width, u3.height), e2.push(c3);
        } else {
          if (!Ur(n3)) throw Error("Unsupported PromptPart type in query.");
          {
            const t4 = await this.da(n3.audioSource), r3 = this.h._malloc(t4.audioSamples.byteLength);
            this.h.HEAPF32.set(t4.audioSamples, r3 / 4), i2._AddAudioQueryChunk(l2, t4.audioSampleRateHz, r3, t4.audioSamples.length), e2.push(r3);
          }
        }
        await i2.ccall("PredictSession", "void", ["number"], [l2], { async: true }), t3 = true, c2 && 0 === this.F && (this.F = l2, t3 = false), u2 && 0 === this.H && (this.H = l2, t3 = false), t3 && i2._FreeSession(l2);
        for (const t4 of e2) this.h._free(t4);
        return e2.length = 0, n2 && n2("", true), this.h._free(a2), i2._userProgressListener = void 0, r2.join("");
      } finally {
        this.L();
      }
    }
    S(t3) {
      this.M();
      let e2 = 0, n2 = "";
      for (const r2 of t3) "string" == typeof r2 ? n2 += r2 : xr(r2) ? e2 += 260 : Ur(r2) && console.warn("sizeInTokens is not yet implemented for audio; audio tokens will not be counted");
      try {
        let t4;
        return fr(this, n2, ((e3) => {
          t4 = this.h._GetSizeInTokens(e3);
        })), e2 + t4;
      } finally {
        this.L();
      }
    }
    async la(t3) {
      t3 = await (async function(t4) {
        const e2 = [];
        for (var n2 = 0; ; ) {
          const { done: r2, value: i2 } = await t4.read();
          if (r2) break;
          e2.push(i2), n2 += i2.length;
        }
        if (0 === e2.length) return new Uint8Array(0);
        if (1 === e2.length) return e2[0];
        t4 = new Uint8Array(n2), n2 = 0;
        for (const r2 of e2) t4.set(r2, n2), n2 += r2.length;
        return t4;
      })(t3);
      try {
        this.h.FS_unlink("llm.task");
      } catch {
      }
      this.h.FS_createDataFile("/", "llm.task", t3, true, false, false);
    }
    async ea(t3) {
      if ("string" == typeof t3) {
        const e2 = new Image();
        e2.src = t3, e2.crossOrigin = "Anonymous";
        try {
          await e2.decode();
        } catch {
          throw Error(`Image from URL ${t3} failed to load`);
        }
        return { image: e2, width: e2.naturalWidth, height: e2.naturalHeight };
      }
      if (t3 instanceof HTMLImageElement) {
        try {
          await t3.decode();
        } catch {
          throw Error("Image from HTMLImageElement failed to load");
        }
        return { image: t3, width: t3.naturalWidth, height: t3.naturalHeight };
      }
      return t3 instanceof HTMLVideoElement ? { image: t3, width: t3.videoWidth, height: t3.videoHeight } : t3 instanceof VideoFrame ? { image: t3, width: t3.displayWidth, height: t3.displayHeight } : { image: t3, width: t3.width, height: t3.height };
    }
    async da(t3) {
      if ("string" == typeof t3) {
        const e2 = await fetch(t3);
        if (!e2.ok) throw Error(`Audio fetch for ${t3} had error: ${e2.status}`);
        return t3 = await e2.arrayBuffer(), { audioSamples: (t3 = await new AudioContext({ sampleRate: 16e3 }).decodeAudioData(t3)).getChannelData(0), audioSampleRateHz: t3.sampleRate };
      }
      return "object" == typeof t3 && null != t3 && "audioSamples" in t3 && "audioSampleRateHz" in t3 ? t3 : { audioSamples: t3.getChannelData(0), audioSampleRateHz: t3.sampleRate };
    }
  };
})(/* @__PURE__ */ (function(t2) {
  return class e2 extends t2 {
    static async ka(t3, n2) {
      let r2;
      n2 ||= await e2.X();
      const i2 = [];
      for (const e3 of t3?.requiredFeatures ?? []) n2.features.has(e3) ? i2.push(e3) : console.warn(`WebGPU feature ${e3} is not supported.`);
      t3 = { ...t3, requiredFeatures: i2 };
      try {
        r2 = await n2.requestDevice(t3);
      } catch (t4) {
        throw console.error("Unable to initialize WebGPU with the requested features."), t4;
      }
      return (t3 = r2).adapterInfo || (t3.adapterInfo = n2.info), r2;
    }
    static async X(t3) {
      if (!(t3 = await navigator.gpu.requestAdapter(t3))) throw Error("Unable to request adapter from navigator.gpu; Ensure WebGPU is enabled.");
      return t3;
    }
    fa(t3) {
      if (e3) "undefined" != typeof HTMLCanvasElement && e3 instanceof HTMLCanvasElement && (e3.id = "canvas_webgpu");
      else var e3 = new OffscreenCanvas(1, 1);
      e3.getContext("webgpu").configure({ device: t3, format: navigator.gpu.getPreferredCanvasFormat() }), this.h.preinitializedWebGPUDevice = t3;
    }
    Z() {
      return this.h.ccall("closeGraph", "void", [], [], { async: true });
    }
  };
})(/* @__PURE__ */ (function(t2) {
  return class extends t2 {
    addStreamingReaderToInputSidePacket(t3, e2) {
      this.h.addStreamingReaderToInputSidePacket(((e3, n2, r2) => jr(t3, this.h, e3, n2, r2)), e2);
    }
  };
})(/* @__PURE__ */ (function(t2) {
  return class extends t2 {
    Y(t3, e2) {
      fr(this, "lora_model_ref_in", ((n2) => {
        this.h._addRawDataSpanToInputStream(t3.offset, t3.size, n2, e2);
      }));
    }
  };
})(class extends gr {
}))));
var Yr = class extends Kr {
};
var Jr = class {
  constructor(t2) {
    this.j = t2, this.i = Xr, Xr++;
  }
};
var Xr = 1;
var Qr = class {
  constructor() {
    let t2, e2;
    this.promise = new Promise(((n2, r2) => {
      t2 = n2, e2 = r2;
    })), this.resolve = t2, this.reject = e2;
  }
};
function Zr(t2) {
  return 1 === t2 ? 1 : t2 + t2 % 2;
}
async function ti() {
  const t2 = await Yr.X({ powerPreference: "high-performance" });
  var e2 = t2.limits.maxBufferSize, n2 = t2.limits.maxStorageBufferBindingSize;
  return e2 < 524550144 && console.warn(`This WebGPU device is unable to execute most LLM tasks, because the required maxBufferSize is usually at least 524550144, but your device only supports maxBufferSize of ${e2}`), n2 < 524550144 && console.warn(`The WebGPU device is unable to execute LLM tasks, because the required maxStorageBufferBindingSize is usually at least 524550144, but your device only supports maxStorageBufferBindingSize of ${n2}`), e2 = { requiredFeatures: ["shader-f16"], requiredLimits: { maxStorageBufferBindingSize: n2, maxBufferSize: e2, maxStorageBuffersPerShaderStage: t2.limits.maxStorageBuffersPerShaderStage } }, t2.features.has("subgroups") && (console.warn("Experimental Chromium WGSL subgroup support detected. Enabling this feature in the inference engine."), n2 = ["shader-f16", "subgroups"], t2.features.has("subgroups-f16") && n2.push("subgroups-f16"), e2.requiredFeatures = n2), Yr.ka(e2, t2);
}
function ei(t2) {
  if (t2.D.length > 0) {
    const e2 = [...t2.D];
    if (t2.D.length = 0, !t2.o) throw e2;
    t2.o.reject(e2), t2.o = void 0;
  }
}
function ni(t2) {
  const e2 = (function(t3) {
    const e3 = new tr();
    ye(e3, 10, "text_in"), ye(e3, 10, "token_cost_in"), ye(e3, 10, "lora_model_id_to_apply_in"), ye(e3, 10, "lora_model_ref_in"), ye(e3, 10, "lora_model_id_to_load_in"), ye(e3, 16, "streaming_reader"), ye(e3, 15, "text_out"), ye(e3, 15, "text_end"), ye(e3, 15, "token_cost_out");
    var n3 = new Yn();
    _e(n3, 2, "TokenizerInputBuildCalculator"), ye(n3, 3, "PROMPT:text_in"), ye(n3, 3, "LORA_ID:lora_model_id_to_apply_in"), ye(n3, 4, "prompt"), Zn(e3, n3), _e(n3 = new Yn(), 2, "ModelDataCalculator"), ye(n3, 6, "MODEL_DATA:__side_packet_1"), ye(n3, 6, "MODEL_TYPE:model_type"), ye(n3, 5, "READ_DATA_FN:streaming_reader"), ye(n3, 3, "LORA_MODEL_SPAN:lora_model_ref_in"), ye(n3, 3, "LORA_MODEL_ID:lora_model_id_to_load_in"), ye(n3, 4, "LORA_DATA:lora_model_data"), Zn(e3, n3), _e(n3 = new Yn(), 2, "Gpt2UnicodeMappingCalculator"), ye(n3, 5, "MODEL_TYPE:model_type"), ye(n3, 6, "BYTES_TO_UNICODE_MAPPING:tokenizer_mapping"), Zn(e3, n3), _e(n3 = new Vn(), 1, "type.googleapis.com/odml.infra.proto.TokenizerCalculatorOptions");
    var r2 = new $r(), i2 = pe(t3.i, 2);
    me(r2, 1, i2), _e(i2 = new Hr(), 2, "spm_vocab_model"), i2 = le(i2);
    t: {
      qt(r2);
      var o2 = r2.m, s2 = 0 | o2[M];
      if (null == i2) {
        var a2 = ae(o2);
        if (4 !== ue(a2, o2, s2)) break t;
        a2.set(qr, 0);
      } else {
        const t4 = ae(a2 = o2), e4 = ue(t4, a2, s2);
        4 !== e4 && (e4 && (s2 = Zt(a2, s2, e4)), t4.set(qr, 4));
      }
      Zt(o2, s2, 4, i2);
    }
    return i2 && !$(i2) && Kt(r2.m), me(r2, 3, 2), Mn(n3, r2.j()), _e(r2 = new Yn(), 2, "TokenizerCalculator"), de(r2, 8, Vn, n3), ye(r2, 5, "MODEL_DATA:__side_packet_1"), ye(r2, 3, "PROMPT_AND_INPUT_OPTIONS:prompt"), ye(r2, 5, "BYTES_TO_UNICODE_MAPPING:tokenizer_mapping"), ye(r2, 6, "PROCESSOR_GETTER:__input_side_1"), ye(r2, 4, "IDS_AND_INPUT_OPTIONS:__stream_0"), Zn(e3, r2), _e(n3 = new Vn(), 1, "type.googleapis.com/odml.infra.proto.LlmGpuCalculatorOptions"), me(r2 = new Cr(), 12, 3), _e(r2, 1, "llm.tflite"), me(r2, 14, 0), i2 = Zr(pe(t3.i, 5)), me(r2, 22, i2), i2 = ce(t3.i, Er, 3), he(r2, 31, i2), se(i2 = new Dr(), 1, At(true), false), null != It(Jt(t3.i, 6)) && (It(Jt(t3.i, 6)) ?? false) && se(i2, 1, At(false), false), se(i2, 2, At(true), false), se(i2, 5, At(true), false), he(r2, 10, i2), i2 = te(t3.i, 4, jt, void 0 === K ? 2 : 4), oe(r2, 29, i2), i2 = new Vr(), me(o2 = new Mr(), 1, 1), a2 = pe(t3.i, 2), me(o2, 2, a2), he(i2, 1, o2), he(r2, 20, i2), Mn(n3, r2.j()), _e(r2 = new Yn(), 2, "LlmGpuCalculator"), de(r2, 8, Vn, n3), ye(r2, 3, "IDS_AND_INPUT_OPTIONS:__stream_0"), ye(r2, 3, "FINISH:finish"), ye(r2, 3, "LORA_DATA:lora_model_data"), ye(r2, 5, "MODEL_DATA:__side_packet_1"), ye(r2, 4, "DECODED_IDS:__stream_3"), ye(r2, 4, "OUTPUT_END:__stream_4"), _e(n3 = new qn(), 1, "FINISH"), se(n3, 2, At(true), false), de(r2, 13, qn, n3), Zn(e3, r2), _e(n3 = new Yn(), 2, "IsPacketPresentCalculator"), ye(n3, 3, "__stream_4"), ye(n3, 4, "text_end"), Zn(e3, n3), _e(n3 = new Vn(), 1, "type.googleapis.com/odml.infra.proto.DetokenizerCalculatorOptions"), r2 = new Rr(), t3 = Zr(pe(t3.i, 5)), me(r2, 5, t3), ye(r2, 4, "<eos>"), ye(r2, 4, "<|endoftext|>"), Mn(n3, r2.j()), _e(t3 = new Yn(), 2, "DetokenizerCalculator"), de(t3, 8, Vn, n3), ye(t3, 3, "IDS_AND_INPUT_OPTIONS:__stream_3"), ye(t3, 5, "PROCESSOR_GETTER:__input_side_1"), ye(t3, 5, "BYTES_TO_UNICODE_MAPPING:tokenizer_mapping"), ye(t3, 5, "MODEL_DATA:__side_packet_1"), ye(t3, 4, "FINISH_AND_INPUT_OPTIONS:finish"), ye(t3, 4, "WORDS:text_out"), Zn(e3, t3), _e(t3 = new Yn(), 2, "TokenCostCalculator"), ye(t3, 3, "PROMPT:token_cost_in"), ye(t3, 5, "PROCESSOR_GETTER:__input_side_1"), ye(t3, 5, "BYTES_TO_UNICODE_MAPPING:tokenizer_mapping"), ye(t3, 4, "NUM_TOKENS:token_cost_out"), Zn(e3, t3), e3;
  })(t2);
  t2.j.attachStringVectorListener("text_out", ((e3, n3) => {
    e3 = (function(t3, e4) {
      return null == t3 || 0 === t3.length ? [] : t3.map(((t4) => (t4 = (t4 = t4.replaceAll("\u2581", " ")).replaceAll("<0x0A>", "\n"), e4 && (t4 = t4.trimStart()), t4.split("\\[eod\\]", 1)[0])));
    })(e3, 0 === t2.G.length), e3.forEach(((e4, n4) => {
      n4 < pe(t2.i, 5) && t2.G[n4].push(e4);
    })), t2.v && 0 === t2.D.length && (t2.A ? (e3.length > pe(t2.i, 5) && e3.pop(), t2.v(e3, false)) : t2.v(e3[0], false)), vr(t2, n3);
  })), t2.j.attachEmptyPacketListener("text_out", ((e3) => {
    vr(t2, e3);
  })), t2.j.attachBoolListener("text_end", ((e3, n3) => {
    vr(t2, n3);
    try {
      ei(t2);
    } catch (e4) {
      throw t2.l = false, e4;
    }
    if (t2.o && (t2.o.resolve(t2.G.map(((t3) => t3.join("")))), t2.o = void 0), t2.v) if (t2.A) {
      for (e3 = [], n3 = 0; n3 < pe(t2.i, 5); n3++) e3.push("");
      t2.v(e3, true);
    } else t2.v("", true);
    t2.l = false, t2.A = void 0;
  })), t2.j.attachEmptyPacketListener("text_end", ((e3) => {
    t2.l = false, t2.A = void 0, vr(t2, e3), ei(t2), t2.o && (t2.o.resolve(t2.G.map(((t3) => t3.join("")))), t2.o = void 0);
  })), t2.j.attachIntListener("token_cost_out", ((e3, n3) => {
    t2.T = e3, vr(t2, n3);
  })), t2.U && t2.j.addStreamingReaderToInputSidePacket(t2.U, "streaming_reader");
  const n2 = e2.j();
  return t2.C?.removeEventListener("uncapturederror", t2.K), t2.j.Z().then((() => {
    t2.C?.addEventListener("uncapturederror", t2.K), t2.D.length = 0, t2.setGraph(new Uint8Array(n2), true), t2.finishProcessing();
  }));
}
function ri(t2, e2, n2, r2) {
  if (t2.v = "function" == typeof n2 ? n2 : r2, (r2 = (e2 = Array.isArray(e2) ? e2 : [e2]).filter(((t3) => xr(t3))).length) > 0 && (null == kt(Jt(t2.i, 7)) || pe(t2.i, 7) < r2)) throw Error(`maxNumImages is set to ${null != kt(Jt(t2.i, 7)) ? pe(t2.i, 7) : 0}, but the query included ${r2} images.`);
  if ((r2 = e2.filter(((t3) => Ur(t3))).length) > 0 && (null == It(Jt(t2.i, 8)) || !It(Jt(t2.i, 8)))) throw Error(`supportAudio was not enabled, but the query included ${r2} audio chunks.`);
  if (t2.B) {
    if (t2.A && pe(t2.i, 5) > 1) throw Error("Multi-response generation is not supported for converted LLM models (.task format) yet, nor is it supported for multimodality. Please use the .bin format without multimodality or request only one response.");
    if (n2 instanceof Jr) throw Error("LoRA is not supported for converted LLM models (.task format) yet, nor is it supported for multimodality. Please use the .bin format without multimodality to use LoRA.");
    return t2.j.R(e2, t2.u, ((e3, n3) => {
      0 === t2.D.length && t2.v && (t2.A ? t2.v([e3], n3) : t2.v(e3, n3));
    })).then(((e3) => (ei(t2), [e3])));
  }
  if (t2.l) throw Error("Previous invocation or loading is still ongoing.");
  for (t2.l = true, t2.G.length = 0, r2 = 0; r2 < pe(t2.i, 5); r2++) t2.G[r2] = [];
  if (r2 = t2.I + 1, t2.j.addStringToStream(e2.join(""), "text_in", r2), n2 instanceof Jr) {
    if (n2.j !== t2) throw t2.l = false, t2.A = void 0, Error("The LoRA model was not loaded by this LLM Inference task.");
    t2.j.addUintToStream(n2.i, "lora_model_id_to_apply_in", r2);
  } else t2.j.addEmptyPacketToStream("lora_model_id_to_apply_in", r2);
  return t2.finishProcessing(), t2.o = new Qr(), t2.o.promise;
}
var ii = class extends Sr {
  constructor(t2, e2) {
    if (super(new Yr(t2, e2)), this.G = [], this.O = this.B = this.l = false, this.D = [], this.K = (t3) => {
      if ((t3 = t3.error).message.match(/exceeds the max buffer size limit/)) throw Error(`Failed to run this LLM model because it requires a buffer size that exceeds the maximum size your device supports, but you could try a smaller LLM model or different device.
WebGPU throws: "${t3.message}"`);
      if (t3.message.match(/is larger than the maximum storage buffer binding size/)) throw Error(`Failed to run this LLM model because it requires a storage buffer binding size that exceeds the maximum size your device supports, but you could try a smaller LLM model or different device.
WebGPU throws: "${t3.message}"`);
      this.D.push(t3);
    }, this.i = new Ir(), Ar(this.i, new er()), this.u = new Er(), he(this.i, 3, this.u), ge(this.i, 2, 512), t2 = this.u, !wt(2)) throw L("enum");
    se(t2, 1, 2, 0), me(this.u, 2, 40), se(this.u, 3, St(1), 0), Qt(this.u, 5, Ot(0)), se(this.u, 4, St(0.8), 0), ge(this.i, 5, 1);
  }
  async N(t2) {
    if (this.l) throw Error("Cannot set options while loading or processing.");
    if (t2.baseOptions?.modelAssetPath && t2.baseOptions?.modelAssetBuffer) throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");
    let e2;
    const n2 = new Promise(((t3) => {
      e2 = t3;
    }));
    if (t2.baseOptions?.modelAssetPath) {
      var r2 = await fetch(t2.baseOptions.modelAssetPath.toString());
      if (!r2.ok) throw Error(`Failed to fetch model: ${t2.baseOptions.modelAssetPath} (${r2.status})`);
      if (!r2.body) throw Error(`Failed to fetch model: ${t2.baseOptions.modelAssetPath} (no body)`);
      r2 = r2.body.getReader();
    } else t2.baseOptions?.modelAssetBuffer instanceof Uint8Array ? r2 = (function(t3) {
      return new ReadableStream({ start() {
      }, async pull(e3) {
        e3.enqueue(t3), e3.close();
      } });
    })(t2.baseOptions.modelAssetBuffer).getReader() : t2.baseOptions?.modelAssetBuffer instanceof ReadableStreamDefaultReader ? (r2 = t2.baseOptions.modelAssetBuffer, t2.baseOptions.modelAssetBuffer = void 0) : e2();
    if (!r2) throw Error("No model asset provided.");
    {
      const [n3, s2] = ar(r2);
      this.O = 1 === await (async function(t3) {
        const e3 = [];
        let n4;
        for (const [i3, o3] of cr) {
          const s3 = i3;
          var r3 = o3;
          [t3, n4] = ar(t3), r3 = await r3(n4), await n4.cancel(), r3 && e3.push(s3);
        }
        if (await t3.cancel(), 0 === e3.length) throw Error("No model format matched.");
        if (1 === e3.length) return e3[0];
        throw Error(`Multiple model formats matched: ${e3}`);
      })(s2);
      var i2 = "maxNumImages" in t2 && t2.maxNumImages ? t2.maxNumImages : 0;
      ge(this.i, 7, i2);
      var o2 = "supportAudio" in t2 && !!t2.supportAudio;
      Qt(this.i, 8, At(o2)), this.O || i2 > 0 || o2 ? (this.B = true, r2 = n3) : (this.B = false, this.U = Or(n3, e2));
    }
    if (t2.baseOptions?.gpuOptions?.device && (this.C && this.C.removeEventListener("uncapturederror", this.K), this.C = t2.baseOptions.gpuOptions.device, this.j.fa(this.C), this.C.addEventListener("uncapturederror", this.K)), "maxTokens" in t2 && ge(this.i, 2, t2.maxTokens ?? 512), "topK" in t2 && me(this.u, 2, t2.topK ?? 40), "temperature" in t2 && se(this.u, 4, St(t2.temperature ?? 0.8), 0), "randomSeed" in t2 && Qt(this.u, 5, Ot(t2.randomSeed ?? 0)), "loraRanks" in t2 && (function(t3, e3) {
      oe(t3, 4, e3);
    })(this.i, t2.loraRanks ?? []), "numResponses" in t2) {
      if ((i2 = t2.numResponses ?? 1) < 1) throw Error("'numResponses' must be at least 1.");
      if (this.B && i2 > 1) throw Error("'numResponses > 1' is not supported for converted LLM models yet, and is also not supported with multimodality.");
      ge(this.i, 5, i2), o2 = ce(this.i, Er, 3), i2 > 1 && o2 && (o2.j() <= 1 || (Jt(o2, 4, Et) ?? 0) <= 0) && console.warn("To generate multiple responses, it is expected topK > 1 and temperature > 0; otherwise, all the generated responses may be the same.");
    }
    return "forceF32" in t2 && void 0 !== t2.forceF32 && Qt(this.i, 6, At(t2.forceF32)), this.B ? (this.j.V(), this.O ? this.j.aa(r2, this.i).then((() => {
      ei(this);
    })) : this.j.createLlmInferenceEngine(r2, this.i).then((() => {
      ei(this);
    }))) : (this.l = true, t2 = ni(this).then((() => {
    })), Promise.all([n2, t2]).then((() => {
      this.l = false, ei(this);
    })));
  }
  get baseOptions() {
    return ce(this.i, er, 1);
  }
  set baseOptions(t2) {
    Ar(this.i, t2);
  }
  get isIdle() {
    return !this.l && !this.o;
  }
  R(t2, e2, n2) {
    return pe(this.i, 5) > 1 && console.warn("'numResponses' is set larger than 1 and this function only returns the first response, so we recommend either using 'generateResponses()' to obtain multiple responses, or else setting 'numResponses' to 1 for better performance."), this.A = false, ri(this, t2, e2, n2).then(((t3) => t3[0]));
  }
  ca(t2, e2, n2) {
    return this.A = true, ri(this, t2, e2, n2);
  }
  S(t2) {
    if (t2 = Array.isArray(t2) ? t2 : [t2], this.B) return this.j.S(t2);
    if (this.l) throw Error("Previous invocation or loading is still ongoing.");
    if (t2.some(xr)) throw Error("sizeInTokens requires maxNumImages > 0 for images.");
    if (t2.some(Ur)) throw Error("sizeInTokens requires supportAudio for audio.");
    return t2 = t2.join(""), this.l = true, this.T = void 0, this.j.addStringToStream(t2, "token_cost_in", this.I + 1), this.finishProcessing(), this.l = false, this.T;
  }
  async ia(t2) {
    if (this.B) throw Error("LoRA is not supported for converted LLM models (.task format) yet, nor is it supported for multimodality. Please use the old format (.bin) without multimodality to use LoRA.");
    if (this.l) throw Error("Cannot load LoRA model while loading or processing.");
    if (this.l = true, t2 instanceof Uint8Array) {
      var e2 = new Fr(this.j.h, t2.length);
      e2.set(t2), t2 = e2;
    } else t2 = t2 instanceof Blob ? await (async function(t3, e3) {
      return Br(t3, e3.stream(), e3.size);
    })(this.j.h, t2) : await (async function(t3, e3) {
      e3 = await fetch(e3.toString());
      const n3 = Number(e3.headers.get("content-length"));
      if (!e3.body) throw Error("Response body is not available.");
      if (!n3) throw Error("File size is 0.");
      return Br(t3, e3.body, n3);
    })(this.j.h, t2);
    e2 = new Jr(this);
    const n2 = this.I + 1;
    return this.j.Y(t2, n2), this.j.addUintToStream(e2.i, "lora_model_id_to_load_in", n2), this.finishProcessing(), Nr(t2), vr(this, n2), this.l = false, e2;
  }
  close() {
    this.B && this.j.V(), this.C?.removeEventListener("uncapturederror", this.K), super.close();
  }
};
ii.prototype.loadLoraModel = ii.prototype.ia, ii.prototype.sizeInTokens = ii.prototype.S, ii.prototype.generateResponses = ii.prototype.ca, ii.prototype.generateResponse = ii.prototype.R, ii.prototype.setOptions = ii.prototype.N, ii.createWebGpuDevice = ti, ii.createFromModelPath = async function(t2, e2) {
  return br(t2, e2 = { baseOptions: { gpuOptions: { device: await ti() }, modelAssetPath: e2 } });
}, ii.createFromModelBuffer = async function(t2, e2) {
  return br(t2, e2 = { baseOptions: { gpuOptions: { device: await ti() }, modelAssetBuffer: e2 } });
}, ii.createFromOptions = async function(t2, e2) {
  if (!e2.baseOptions?.gpuOptions?.device) {
    const t3 = await ti();
    e2.baseOptions = e2.baseOptions ?? {}, e2.baseOptions.gpuOptions = e2?.baseOptions?.gpuOptions ?? {}, e2.baseOptions.gpuOptions.device = t3;
  }
  return br(t2, e2);
};

// background.js
var llmInference;
async function initGemma() {
  const genai = await sr.forGenAiTasks(
    chrome.runtime.getURL("assets/wasm")
  );
  llmInference = await ii.createFromOptions(genai, {
    baseOptions: {
      modelAssetPath: chrome.runtime.getURL(
        "assets/gemma-3n-E4B-it-int4-Web.litertlm"
      )
    },
    maxTokens: 200,
    topK: 40,
    temperature: 0.8
  });
  console.log("\u2705 Gemma model loaded.");
}
await initGemma();
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "gemmaPopup",
    title: 'Ask Gemma about: "%s"',
    contexts: ["selection"]
  });
});
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "gemmaPopup" && llmInference) {
    const text = info.selectionText;
    const response = await llmInference.generateResponse(text);
    chrome.tabs.sendMessage(tab.id, { selectedText: text, response });
  }
});
