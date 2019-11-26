!function (e) {
    var t = {};

    function n(o) {
        if (t[o]) return t[o].exports;
        var i = t[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(i.exports, i, i.exports, n), i.l = !0, i.exports;
    }

    n.m = e, n.c = t, n.d = function (e, t, o) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: o
        });
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var o = Object.create(null);
        if (n.r(o), Object.defineProperty(o, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var i in e) {
            n.d(o, i, function (t) {
                return e[t];
            }.bind(null, i));
        }
        return o;
    }, n.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default;
        } : function () {
            return e;
        };
        return n.d(t, "a", t), t;
    }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, n.p = "", n(n.s = 4);
}([function (e, t, n) {
    var o;
    !function () {
        "use strict";

        var i = {
            not_string: /[^s]/,
            not_bool: /[^t]/,
            not_type: /[^T]/,
            not_primitive: /[^v]/,
            number: /[diefg]/,
            numeric_arg: /[bcdiefguxX]/,
            json: /[j]/,
            not_json: /[^j]/,
            text: /^[^\x25]+/,
            modulo: /^\x25{2}/,
            placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
            key: /^([a-z_][a-z_\d]*)/i,
            key_access: /^\.([a-z_][a-z_\d]*)/i,
            index_access: /^\[(\d+)\]/,
            sign: /^[+-]/
        };

        function r(e) {
            return function (e, t) {
                var n,
                    o,
                    s,
                    c,
                    a,
                    u,
                    l,
                    f,
                    h,
                    p = 1,
                    d = e.length,
                    g = "";

                for (o = 0; o < d; o++) {
                    if ("string" == typeof e[o]) g += e[o];else if ("object" == typeof e[o]) {
                        if ((c = e[o]).keys) for (n = t[p], s = 0; s < c.keys.length; s++) {
                            if (null == n) throw new Error(r('[sprintf] Cannot access property "%s" of undefined value "%s"', c.keys[s], c.keys[s - 1]));
                            n = n[c.keys[s]];
                        } else n = c.param_no ? t[c.param_no] : t[p++];
                        if (i.not_type.test(c.type) && i.not_primitive.test(c.type) && n instanceof Function && (n = n()), i.numeric_arg.test(c.type) && "number" != typeof n && isNaN(n)) throw new TypeError(r("[sprintf] expecting number but found %T", n));

                        switch (i.number.test(c.type) && (f = n >= 0), c.type) {
                            case "b":
                                n = parseInt(n, 10).toString(2);
                                break;

                            case "c":
                                n = String.fromCharCode(parseInt(n, 10));
                                break;

                            case "d":
                            case "i":
                                n = parseInt(n, 10);
                                break;

                            case "j":
                                n = JSON.stringify(n, null, c.width ? parseInt(c.width) : 0);
                                break;

                            case "e":
                                n = c.precision ? parseFloat(n).toExponential(c.precision) : parseFloat(n).toExponential();
                                break;

                            case "f":
                                n = c.precision ? parseFloat(n).toFixed(c.precision) : parseFloat(n);
                                break;

                            case "g":
                                n = c.precision ? String(Number(n.toPrecision(c.precision))) : parseFloat(n);
                                break;

                            case "o":
                                n = (parseInt(n, 10) >>> 0).toString(8);
                                break;

                            case "s":
                                n = String(n), n = c.precision ? n.substring(0, c.precision) : n;
                                break;

                            case "t":
                                n = String(!!n), n = c.precision ? n.substring(0, c.precision) : n;
                                break;

                            case "T":
                                n = Object.prototype.toString.call(n).slice(8, -1).toLowerCase(), n = c.precision ? n.substring(0, c.precision) : n;
                                break;

                            case "u":
                                n = parseInt(n, 10) >>> 0;
                                break;

                            case "v":
                                n = n.valueOf(), n = c.precision ? n.substring(0, c.precision) : n;
                                break;

                            case "x":
                                n = (parseInt(n, 10) >>> 0).toString(16);
                                break;

                            case "X":
                                n = (parseInt(n, 10) >>> 0).toString(16).toUpperCase();
                        }

                        i.json.test(c.type) ? g += n : (!i.number.test(c.type) || f && !c.sign ? h = "" : (h = f ? "+" : "-", n = n.toString().replace(i.sign, "")), u = c.pad_char ? "0" === c.pad_char ? "0" : c.pad_char.charAt(1) : " ", l = c.width - (h + n).length, a = c.width && l > 0 ? u.repeat(l) : "", g += c.align ? h + n + a : "0" === u ? h + a + n : a + h + n);
                    }
                }

                return g;
            }(function (e) {
                if (c[e]) return c[e];
                var t,
                    n = e,
                    o = [],
                    r = 0;

                for (; n;) {
                    if (null !== (t = i.text.exec(n))) o.push(t[0]);else if (null !== (t = i.modulo.exec(n))) o.push("%");else {
                        if (null === (t = i.placeholder.exec(n))) throw new SyntaxError("[sprintf] unexpected placeholder");

                        if (t[2]) {
                            r |= 1;
                            var s = [],
                                a = t[2],
                                u = [];
                            if (null === (u = i.key.exec(a))) throw new SyntaxError("[sprintf] failed to parse named argument key");

                            for (s.push(u[1]); "" !== (a = a.substring(u[0].length));) {
                                if (null !== (u = i.key_access.exec(a))) s.push(u[1]);else {
                                    if (null === (u = i.index_access.exec(a))) throw new SyntaxError("[sprintf] failed to parse named argument key");
                                    s.push(u[1]);
                                }
                            }

                            t[2] = s;
                        } else r |= 2;

                        if (3 === r) throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
                        o.push({
                            placeholder: t[0],
                            param_no: t[1],
                            keys: t[2],
                            sign: t[3],
                            pad_char: t[4],
                            align: t[5],
                            width: t[6],
                            precision: t[7],
                            type: t[8]
                        });
                    }
                    n = n.substring(t[0].length);
                }

                return c[e] = o;
            }(e), arguments);
        }

        function s(e, t) {
            return r.apply(null, [e].concat(t || []));
        }

        var c = Object.create(null);
        t.sprintf = r, t.vsprintf = s, "undefined" != typeof window && (window.sprintf = r, window.vsprintf = s, void 0 === (o = function () {
            return {
                sprintf: r,
                vsprintf: s
            };
        }.call(t, n, t, e)) || (e.exports = o));
    }();
}, function (e, t, n) {
    "use strict";

    function o(e) {
        return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e;
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        })(e);
    }

    function i(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function r(e, t) {
        return !t || "object" !== o(t) && "function" != typeof t ? function (e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
        }(e) : t;
    }

    function s(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }), t && u(e, t);
    }

    function c(e) {
        var t = "function" == typeof Map ? new Map() : void 0;
        return (c = function c(e) {
            if (null === e || (n = e, -1 === Function.toString.call(n).indexOf("[native code]"))) return e;
            var n;
            if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");

            if (void 0 !== t) {
                if (t.has(e)) return t.get(e);
                t.set(e, o);
            }

            function o() {
                return a(e, arguments, l(this).constructor);
            }

            return o.prototype = Object.create(e.prototype, {
                constructor: {
                    value: o,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), u(o, e);
        })(e);
    }

    function a(e, t, n) {
        return (a = function () {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;

            try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
            } catch (e) {
                return !1;
            }
        }() ? Reflect.construct : function (e, t, n) {
            var o = [null];
            o.push.apply(o, t);
            var i = new (Function.bind.apply(e, o))();
            return n && u(i, n.prototype), i;
        }).apply(null, arguments);
    }

    function u(e, t) {
        return (u = Object.setPrototypeOf || function (e, t) {
            return e.__proto__ = t, e;
        })(e, t);
    }

    function l(e) {
        return (l = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
        })(e);
    }

    var f = function (e) {
            function t(e) {
                var n;
                return i(this, t), (n = r(this, l(t).call(this, e))).name = "ValueError", console.log("EXCEPTION: " + n.name + " MESSAGE: " + n.message), n;
            }

            return s(t, c(Error)), t;
        }(),
        h = function (e) {
            function t(e) {
                var n;
                return i(this, t), (n = r(this, l(t).call(this, e))).name = "UnImplementedMethod", console.log("EXCEPTION: " + n.name + " MESSAGE: " + n.message), n;
            }

            return s(t, c(Error)), t;
        }(),
        p = function (e) {
            function t(e, n) {
                var o;
                return i(this, t), (o = r(this, l(t).call(this, e))).name = "IllegalArgument", o.argument = n, console.log("EXCEPTION: " + o.name + " MESSAGE: " + o.message), o;
            }

            return s(t, c(Error)), t;
        }(),
        d = function (e) {
            function t(e) {
                var n;
                return i(this, t), (n = r(this, l(t).call(this, e))).name = "IllegalState", console.log("EXCEPTION: " + n.name + " MESSAGE: " + n.message), n;
            }

            return s(t, c(Error)), t;
        }(),
        g = function g(e, t, n) {
            var o = new XMLHttpRequest();
            o.open(e.method || "GET", e.url), e.headers && Object.keys(e.headers).forEach(function (t) {
                o.setRequestHeader(t, e.headers[t]);
            }), o.onload = function () {
                o.status >= 200 && o.status < 300 ? t(o) : n(o);
            }, o.onerror = function () {
                return n(o);
            }, o.send(e.body);
        };

    function y(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
        }
    }

    var v = new (function () {
            function e() {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, e);
            }

            var t, n, o;
            return t = e, (n = [{
                key: "update",
                value: function value(e) {
                    var t = e || {};
                    this.region = t.region || this.region, this.endpointOverride = t.endpoint || this.endpointOverride, this.reconnect = !1 !== t.reconnect;
                }
            }, {
                key: "getRegion",
                value: function value() {
                    return this.region;
                }
            }, {
                key: "getEndpointOverride",
                value: function value() {
                    return this.endpointOverride;
                }
            }]) && y(t.prototype, n), o && y(t, o), e;
        }())(),
        b = n(0);

    function _(e) {
        return (_ = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e;
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        })(e);
    }

    var m = {
            assertTrue: function assertTrue(e, t) {
                if (!e) throw new f(t);
            },
            assertNotNull: function assertNotNull(e, t) {
                return m.assertTrue(null !== e && void 0 !== _(e), Object(b.sprintf)("%s must be provided", t || "A value")), e;
            },
            now: function now() {
                return new Date().getTime();
            },
            isString: function isString(e) {
                return "string" == typeof e;
            },
            randomId: function randomId() {
                return Object(b.sprintf)("%s-%s", m.now(), Math.random().toString(36).slice(2));
            },
            assertIsNonEmptyString: function assertIsNonEmptyString(e, t) {
                if (!e || "string" != typeof e) throw new p(t + " is not a non-empty string!");
            },
            assertIsList: function assertIsList(e, t) {
                if (!Array.isArray(e)) throw new p(t + " is not an array");
            },
            assertIsEnum: function assertIsEnum(e, t, n) {
                var o;

                for (o = 0; o < t.length; o++) {
                    if (t[o] === e) return;
                }

                throw new p(n + " passed is not valid. Allowed values are: " + t);
            },
            makeEnum: function makeEnum(e) {
                var t = {};
                return e.forEach(function (e) {
                    var n = e.replace(/\.?([a-z]+)_?/g, function (e, t) {
                        return t.toUpperCase() + "_";
                    }).replace(/_$/, "");
                    t[n] = e;
                }), t;
            },
            contains: function contains(e, t) {
                return e instanceof Array ? null !== m.find(e, function (e) {
                    return e === t;
                }) : t in e;
            },
            find: function find(e, t) {
                for (var n = 0; n < e.length; n++) {
                    if (t(e[n])) return e[n];
                }

                return null;
            },
            containsValue: function containsValue(e, t) {
                return e instanceof Array ? null !== m.find(e, function (e) {
                    return e === t;
                }) : null !== m.find(m.values(e), function (e) {
                    return e === t;
                });
            },
            isFunction: function isFunction(e) {
                return !!(e && e.constructor && e.call && e.apply);
            },
            values: function values(e) {
                var t = [];

                for (var n in m.assertNotNull(e, "map"), e) {
                    t.push(e[n]);
                }

                return t;
            },
            isObject: function isObject(e) {
                return !("object" !== _(e) || null === e);
            },
            assertIsObject: function assertIsObject(e, t) {
                if (!m.isObject(e)) throw new p(t + " is not an object!");
            },
            delay: function delay(e) {
                return new Promise(function (t) {
                    return setTimeout(t, e);
                });
            },
            asyncWhileInterval: function asyncWhileInterval(e, t, n) {
                var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
                    i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null,
                    r = new Date();
                return t(o) ? e(o).catch(function (i) {
                    var s = Math.max(0, n - new Date().valueOf() + r.valueOf());
                    return m.delay(s).then(function () {
                        return m.asyncWhileInterval(e, t, n, o + 1, i);
                    });
                }) : Promise.reject(i || new Error("async while aborted"));
            }
        },
        w = m,
        C = "/contact/chat/participant/message",
        S = "/contact/chat/participant/transcript",
        k = "/contact/chat/participant/event",
        E = "/contact/chat/participant/disconnect",
        I = "/contact/chat/participant/connection-details",
        T = "post",
        O = "PERSISTED",
        M = {
            textPlain: "text/plain"
        },
        N = w.makeEnum(["ALL", "MANAGER", "AGENT", "CUSTOMER", "THIRDPARTY"]),
        A = w.makeEnum(["PERSISTED", "NON_PERSISTED"]),
        P = {
            "us-west-2": {
                invokeUrl: "https://eap1w93j0k.execute-api.us-west-2.amazonaws.com/prod"
            },
            "us-east-1": {
                invokeUrl: "https://4agcjusx3k.execute-api.us-east-1.amazonaws.com/prod"
            },
            "ap-southeast-2": {
                invokeUrl: "https://v4u8oq0cve.execute-api.ap-southeast-2.amazonaws.com/prod"
            },
            "ap-northeast-1": {
                invokeUrl: "https://3fidunfyz7.execute-api.ap-northeast-1.amazonaws.com/prod"
            },
            "eu-central-1": {
                invokeUrl: "https://1gynaarm3e.execute-api.eu-central-1.amazonaws.com/prod"
            }
        },
        D = 30,
        L = 60,
        R = {
            AGENT: "AGENT",
            CUSTOMER: "CUSTOMER"
        },
        x = "INCOMING_MESSAGE",
        U = "INCOMING_TYPING",
        j = "CONNECTION_ESTABLISHED",
        B = "CONNECTION_LOST",
        F = "CONNECTION_BROKEN",
        q = "CONNECTION_ACK",
        G = 15,
        V = "ASCENDING",
        W = "BACKWARD",
        H = "NULL",
        K = "CLIENT_LOGGER",
        z = "DEBUG",
        J = "us-west-2",
        Q = {
            interval: 3e3,
            maxRetries: 5
        },
        Y = {
            interval: 3e3,
            maxRetries: 5
        };

    function X(e) {
        return (X = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e;
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        })(e);
    }

    function $(e, t) {
        return !t || "object" !== X(t) && "function" != typeof t ? function (e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
        }(e) : t;
    }

    function Z(e) {
        return (Z = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
        })(e);
    }

    function ee(e, t) {
        return (ee = Object.setPrototypeOf || function (e, t) {
            return e.__proto__ = t, e;
        })(e, t);
    }

    function te(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function ne(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
        }
    }

    function oe(e, t, n) {
        return t && ne(e.prototype, t), n && ne(e, n), e;
    }

    var ie = function () {
            function e() {
                te(this, e);
            }

            return oe(e, [{
                key: "debug",
                value: function value(e) {}
            }, {
                key: "info",
                value: function value(e) {}
            }, {
                key: "warn",
                value: function value(e) {}
            }, {
                key: "error",
                value: function value(e) {}
            }]), e;
        }(),
        re = {
            DEBUG: 10,
            INFO: 20,
            WARN: 30,
            ERROR: 40
        },
        se = function () {
            function e() {
                te(this, e), this.updateLoggerConfig(), this.consoleLoggerWrapper = ue();
            }

            return oe(e, [{
                key: "writeToClientLogger",
                value: function value(e, t) {
                    if (this.hasClientLogger()) switch (e) {
                        case re.DEBUG:
                            return this._clientLogger.debug(t);

                        case re.INFO:
                            return this._clientLogger.info(t);

                        case re.WARN:
                            return this._clientLogger.warn(t);

                        case re.ERROR:
                            return this._clientLogger.error(t);
                    }
                }
            }, {
                key: "isLevelEnabled",
                value: function value(e) {
                    return e >= this._level;
                }
            }, {
                key: "hasClientLogger",
                value: function value() {
                    return null !== this._clientLogger;
                }
            }, {
                key: "getLogger",
                value: function value(e) {
                    var t = e.prefix || "";
                    return this._logsDestination === z ? this.consoleLoggerWrapper : new ae(t);
                }
            }, {
                key: "updateLoggerConfig",
                value: function value(e) {
                    var t = e || {};
                    this._level = t.level || re.INFO, this._clientLogger = t.logger || null, this._logsDestination = H, t.debug && (this._logsDestination = z), t.logger && (this._logsDestination = K);
                }
            }]), e;
        }(),
        ce = function () {
            function e() {
                te(this, e);
            }

            return oe(e, [{
                key: "debug",
                value: function value() {}
            }, {
                key: "info",
                value: function value() {}
            }, {
                key: "warn",
                value: function value() {}
            }, {
                key: "error",
                value: function value() {}
            }]), e;
        }(),
        ae = function (e) {
            function t(e) {
                var n;
                return te(this, t), (n = $(this, Z(t).call(this))).prefix = e || "", n;
            }

            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && ee(e, t);
            }(t, ce), oe(t, [{
                key: "debug",
                value: function value() {
                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
                        t[n] = arguments[n];
                    }

                    this._log(re.DEBUG, t);
                }
            }, {
                key: "info",
                value: function value() {
                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
                        t[n] = arguments[n];
                    }

                    this._log(re.INFO, t);
                }
            }, {
                key: "warn",
                value: function value() {
                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
                        t[n] = arguments[n];
                    }

                    this._log(re.WARN, t);
                }
            }, {
                key: "error",
                value: function value() {
                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
                        t[n] = arguments[n];
                    }

                    this._log(re.ERROR, t);
                }
            }, {
                key: "_shouldLog",
                value: function value(e) {
                    return le.hasClientLogger() && le.isLevelEnabled(e);
                }
            }, {
                key: "_writeToClientLogger",
                value: function value(e, t) {
                    le.writeToClientLogger(e, t);
                }
            }, {
                key: "_log",
                value: function value(e, t) {
                    if (this._shouldLog(e)) {
                        var n = this._convertToSingleStatement(t);

                        this._writeToClientLogger(e, n);
                    }
                }
            }, {
                key: "_convertToSingleStatement",
                value: function value(e) {
                    var t = "";
                    this.prefix && (t += this.prefix + " ");

                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        t += this._convertToString(o) + " ";
                    }

                    return t;
                }
            }, {
                key: "_convertToString",
                value: function value(e) {
                    try {
                        if (!e) return "";
                        if (w.isString(e)) return e;

                        if (w.isObject(e) && w.isFunction(e.toString)) {
                            var t = e.toString();
                            if ("[object Object]" !== t) return t;
                        }

                        return JSON.stringify(e);
                    } catch (t) {
                        return console.error("Error while converting argument to string", e, t), "";
                    }
                }
            }]), t;
        }(),
        ue = function ue() {
            var e = new ce();
            return e.debug = console.debug.bind(window.console), e.info = console.info.bind(window.console), e.warn = console.warn.bind(window.console), e.error = console.error.bind(window.console), e;
        },
        le = new se();

    function fe(e) {
        return (fe = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e;
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        })(e);
    }

    function he(e, t) {
        return !t || "object" !== fe(t) && "function" != typeof t ? function (e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
        }(e) : t;
    }

    function pe(e) {
        return (pe = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
        })(e);
    }

    function de(e, t) {
        return (de = Object.setPrototypeOf || function (e, t) {
            return e.__proto__ = t, e;
        })(e, t);
    }

    function ge(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function ye(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
        }
    }

    function ve(e, t, n) {
        return t && ye(e.prototype, t), n && ye(e, n), e;
    }

    var be = function () {
            function e() {
                ge(this, e), this.clientCache = {};
            }

            return ve(e, [{
                key: "getCachedClient",
                value: function value(e) {
                    var t = Object.assign({}, e),
                        n = e.region || v.getRegion() || J;
                    if (t.region = n, this.clientCache[n]) return this.clientCache[n];

                    var o = this._createClient(t);

                    return this.clientCache[n] = o, o;
                }
            }, {
                key: "_createClient",
                value: function value(e) {
                    var t = e.region,
                        n = v.getEndpointOverride(),
                        o = P[t];
                    return n && (o.invokeUrl = n), new me({
                        stageConfig: o
                    });
                }
            }]), e;
        }(),
        _e = function () {
            function e() {
                ge(this, e);
            }

            return ve(e, [{
                key: "sendMessage",
                value: function value(e, t, n) {
                    throw new h("sendTextMessage in ChatClient");
                }
            }, {
                key: "disconnectChat",
                value: function value(e) {
                    throw new h("disconnectChat in ChatClient");
                }
            }, {
                key: "sendEvent",
                value: function value(e, t, n, o) {
                    throw new h("sendEvent in ChatClient");
                }
            }, {
                key: "createConnectionDetails",
                value: function value(e) {
                    throw new h("reconnectChat in ChatClient");
                }
            }]), e;
        }(),
        me = function (e) {
            function t(e) {
                var n;
                return ge(this, t), (n = he(this, pe(t).call(this))).invokeUrl = e.stageConfig.invokeUrl, n.callHttpClient = g, n.logger = le.getLogger({
                    prefix: "ChatClient"
                }), n;
            }

            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && de(e, t);
            }(t, _e), ve(t, [{
                key: "sendMessage",
                value: function value(e, t, n) {
                    console.log(n);
                    var o = {
                            Message: {
                                ContentType: M.textPlain,
                                Content: t,
                                Persistence: O
                            }
                        },
                        i = {
                            method: T,
                            headers: {},
                            url: this.invokeUrl + C,
                            body: o
                        };
                    return i.headers["x-amzn-connect-connection-token"] = e, this._callHttpClient(i);
                }
            }, {
                key: "getTranscript",
                value: function value(e, t) {
                    var n = {
                        method: T,
                        headers: {},
                        url: this.invokeUrl + S,
                        body: t
                    };
                    return n.headers["x-amzn-connect-connection-token"] = e, this._callHttpClient(n);
                }
            }, {
                key: "sendEvent",
                value: function value(e, t, n, o, i) {
                    console.log(n), console.log(i);
                    var r = {
                            ParticipantEvent: {
                                Visibility: o,
                                ParticipantEventType: t
                            }
                        },
                        s = {
                            method: T,
                            headers: {},
                            url: this.invokeUrl + k,
                            body: r
                        };
                    return s.headers["x-amzn-connect-connection-token"] = e, this._callHttpClient(s);
                }
            }, {
                key: "disconnectChat",
                value: function value(e) {
                    var t = {
                        method: T,
                        headers: {},
                        url: this.invokeUrl + E,
                        body: {}
                    };
                    return t.headers["x-amzn-connect-connection-token"] = e, this._callHttpClient(t);
                }
            }, {
                key: "createConnectionDetails",
                value: function value(e) {
                    var t = {
                        method: T,
                        headers: {},
                        url: this.invokeUrl + I,
                        body: {}
                    };
                    return t.headers["x-amzn-connect-participant-token"] = e, this._callHttpClient(t);
                }
            }, {
                key: "_callHttpClient",
                value: function value(e) {
                    var t = this;
                    return e.headers = Object.assign({
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }, e.headers), e.body = JSON.stringify(e.body), new Promise(function (n, o) {
                        t.callHttpClient(e, function (e) {
                            var t = {};
                            t.data = JSON.parse(e.responseText), n(t);
                        }, function (e) {
                            var n = {};
                            n.statusText = e.statusText;

                            try {
                                n.error = JSON.parse(e.responseText);
                            } catch (e) {
                                t.logger.warn("invalid json error from server"), n.error = null;
                            }

                            o(n);
                        });
                    });
                }
            }]), t;
        }(),
        we = new be();

    function Ce(e) {
        return (Ce = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e;
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        })(e);
    }

    function Se(e, t) {
        return !t || "object" !== Ce(t) && "function" != typeof t ? function (e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
        }(e) : t;
    }

    function ke(e) {
        return (ke = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
        })(e);
    }

    function Ee(e, t) {
        return (Ee = Object.setPrototypeOf || function (e, t) {
            return e.__proto__ = t, e;
        })(e, t);
    }

    function Ie(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function Te(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
        }
    }

    function Oe(e, t, n) {
        return t && Te(e.prototype, t), n && Te(e, n), e;
    }

    var Me = function () {
            function e() {
                Ie(this, e);
            }

            return Oe(e, [{
                key: "validateNewControllerDetails",
                value: function value(e) {
                    return !0;
                }
            }, {
                key: "validateSendMessage",
                value: function value(e, t) {
                    w.isString(e) || w.assertIsObject(e, "message"), w.assertIsEnum(t, Object.values(M), "type");
                }
            }, {
                key: "validateConnectChat",
                value: function value(e) {
                    return !0;
                }
            }, {
                key: "validateLogger",
                value: function value(e) {
                    w.assertIsObject(e, "logger"), ["debug", "info", "warn", "error"].forEach(function (t) {
                        if (!w.isFunction(e[t])) throw new p(t + " should be a valid function on the passed logger object!");
                    });
                }
            }, {
                key: "validateSendEvent",
                value: function value(e) {
                    w.assertIsNonEmptyString(e.eventType, "eventType"), void 0 !== e.messageIds && w.assertIsList(e.messageIds), void 0 !== e.visibility && w.assertIsEnum(e.visibility, Object.values(N), "visibility"), void 0 !== e.persistence && w.assertIsEnum(e.persistence, Object.values(A), "persistence");
                }
            }, {
                key: "validateGetMessages",
                value: function value(e) {
                    return !0;
                }
            }]), e;
        }(),
        Ne = function (e) {
            function t() {
                return Ie(this, t), Se(this, ke(t).apply(this, arguments));
            }

            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && Ee(e, t);
            }(t, Me), Oe(t, [{
                key: "validateChatDetails",
                value: function value(e) {
                    w.assertIsObject(e, "chatDetails"), w.assertIsNonEmptyString(e.contactId, "chatDetails.contactId"), w.assertIsNonEmptyString(e.participantId, "chatDetails.participantId"), e.connectionDetails ? (w.assertIsObject(e.connectionDetails, "chatDetails.connectionDetails"), w.assertIsNonEmptyString(e.connectionDetails.PreSignedConnectionUrl, "chatDetails.connectionDetails.PreSignedConnectionUrl"), w.assertIsNonEmptyString(e.connectionDetails.ConnectionId, "chatDetails.connectionDetails.ConnectionId"), w.assertIsNonEmptyString(e.connectionDetails.connectionToken, "chatDetails.connectionDetails.connectionToken")) : w.assertIsNonEmptyString(e.participantToken, "chatDetails.participantToken");
                }
            }, {
                key: "validateInitiateChatResponse",
                value: function value() {
                    return !0;
                }
            }]), t;
        }();

    function Ae(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
        }
    }

    var Pe = {
            NeverStarted: "NeverStarted",
            Starting: "Starting",
            Connected: "Connected",
            ConnectionLost: "ConnectionLost",
            Ended: "Ended"
        },
        De = "ConnectionLost",
        Le = "ConnectionGained",
        Re = "Ended",
        xe = "IncomingMessage",
        Ue = "IOT",
        je = "LPC",
        Be = function () {
            function e(t) {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, e), this.connectionDetailsProvider = t, this.isStarted = !1;
            }

            var t, n, o;
            return t = e, (n = [{
                key: "startConnectionTokenPolling",
                value: function value() {
                    var e = this;
                    this.interval = setInterval(function () {
                        e.connectionDetailsProvider.fetchConnectionToken();
                    }, 432e5);
                }
            }, {
                key: "start",
                value: function value() {
                    this.isStarted || (this.isStarted = !0, this.startConnectionTokenPolling());
                }
            }, {
                key: "end",
                value: function value() {
                    clearInterval(this.interval);
                }
            }, {
                key: "getConnectionToken",
                value: function value() {
                    return this.connectionDetailsProvider.connectionToken;
                }
            }]) && Ae(t.prototype, n), o && Ae(t, o), e;
        }(),
        Fe = function Fe(e, t, n) {
            this.subMap = e, this.id = w.randomId(), this.eventName = t, this.f = n;
        };

    Fe.prototype.unsubscribe = function () {
        this.subMap.unsubscribe(this.eventName, this.id);
    };

    var qe = function qe() {
        this.subIdMap = {}, this.subEventNameMap = {};
    };

    qe.prototype.subscribe = function (e, t) {
        var n = new Fe(this, e, t);
        this.subIdMap[n.id] = n;
        var o = this.subEventNameMap[e] || [];
        return o.push(n), this.subEventNameMap[e] = o, function () {
            return n.unsubscribe();
        };
    }, qe.prototype.unsubscribe = function (e, t) {
        w.contains(this.subEventNameMap, e) && (this.subEventNameMap[e] = this.subEventNameMap[e].filter(function (e) {
            return e.id !== t;
        }), this.subEventNameMap[e].length < 1 && delete this.subEventNameMap[e]), w.contains(this.subIdMap, t) && delete this.subIdMap[t];
    }, qe.prototype.getAllSubscriptions = function () {
        return w.values(this.subEventNameMap).reduce(function (e, t) {
            return e.concat(t);
        }, []);
    }, qe.prototype.getSubscriptions = function (e) {
        return this.subEventNameMap[e] || [];
    };

    var Ge = function Ge(e) {
        var t = e || {};
        this.subMap = new qe(), this.logEvents = t.logEvents || !1;
    };

    function Ve(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
        }
    }

    Ge.prototype.subscribe = function (e, t) {
        return w.assertNotNull(e, "eventName"), w.assertNotNull(t, "f"), w.assertTrue(w.isFunction(t), "f must be a function"), this.subMap.subscribe(e, t);
    }, Ge.prototype.subscribeAll = function (e) {
        return w.assertNotNull(e, "f"), w.assertTrue(w.isFunction(e), "f must be a function"), this.subMap.subscribe("<<all>>", e);
    }, Ge.prototype.getSubscriptions = function (e) {
        return this.subMap.getSubscriptions(e);
    }, Ge.prototype.trigger = function (e, t) {
        w.assertNotNull(e, "eventName");
        var n = this,
            o = this.subMap.getSubscriptions("<<all>>"),
            i = this.subMap.getSubscriptions(e);
        o.concat(i).forEach(function (o) {
            try {
                o.f(t || null, e, n);
            } catch (e) {}
        });
    }, Ge.prototype.triggerAsync = function (e, t) {
        var n = this;
        setTimeout(function () {
            return n.trigger(e, t);
        }, 0);
    }, Ge.prototype.bridge = function () {
        var e = this;
        return function (t, n) {
            e.trigger(n, t);
        };
    }, Ge.prototype.unsubscribeAll = function () {
        this.subMap.getAllSubscriptions().forEach(function (e) {
            e.unsubscribe();
        });
    };

    var We = function () {
            function e(t, n, o) {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, e), this.chatClient = o, this.participantToken = n || null, this.connectionDetails = t || null, this.connectionToken = null, this.connectionType = null, this.firstCall = !0;
            }

            var t, n, o;
            return t = e, (n = [{
                key: "init",
                value: function value() {
                    var e = this;
                    return this.participantToken ? this._fetchConnectionDetails().then(function () {
                        return e.connectionDetails;
                    }) : this.connectionDetails ? Promise.resolve().then(function () {
                        return e._handlePresetConnectionDetails(), e.connectionDetails;
                    }) : Promise.reject("Fatal: Cannot get connection details.");
                }
            }, {
                key: "fetchConnectionDetails",
                value: function value() {
                    var e = this;
                    return this.firstCall ? (this.firstCall = !1, Promise.resolve(this.connectionDetails)) : this.participantToken ? this._fetchConnectionDetails().then(function () {
                        return e.connectionDetails;
                    }) : Promise.reject("Fatal: Cannot use static connection details more than once.");
                }
            }, {
                key: "fetchConnectionToken",
                value: function value() {
                    var e = this;
                    return this.firstCall ? (this.firstCall = !1, Promise.resolve(this.connectionToken)) : this.participantToken ? this._fetchConnectionDetails().then(function () {
                        return e.connectionToken;
                    }) : Promise.reject("Fatal: Cannot use static connection details more than once.");
                }
            }, {
                key: "_handlePresetConnectionDetails",
                value: function value() {
                    this.connectionType = Ue, this.connectionToken = this.connectionDetails.connectionToken, this.connectionDetails = {
                        connectionId: this.connectionDetails.ConnectionId,
                        preSignedConnectionUrl: this.connectionDetails.PreSignedConnectionUrl
                    };
                }
            }, {
                key: "_handleResponse",
                value: function value(e) {
                    this.connectionType = e.ConnectionId ? Ue : je, this.connectionToken = e.ParticipantCredentials.ConnectionAuthenticationToken, this.connectionDetails = {
                        connectionId: e.ConnectionId,
                        preSignedConnectionUrl: e.PreSignedConnectionUrl
                    };
                }
            }, {
                key: "_fetchConnectionDetails",
                value: function value() {
                    var e = this;
                    return this.chatClient.createConnectionDetails(this.participantToken).then(function (t) {
                        return e._handleResponse(t.data);
                    }).catch(function (e) {
                        return Promise.reject({
                            reason: "Failed to fetch connectionDetails",
                            _debug: e
                        });
                    });
                }
            }]) && Ve(t.prototype, n), o && Ve(t, o), e;
        }(),
        He = n(3),
        Ke = n.n(He);

    function ze(e) {
        return (ze = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e;
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        })(e);
    }

    function Je(e) {
        return (Je = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
        })(e);
    }

    function Qe(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e;
    }

    function Ye(e, t) {
        return (Ye = Object.setPrototypeOf || function (e, t) {
            return e.__proto__ = t, e;
        })(e, t);
    }

    function Xe(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function $e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
        }
    }

    function Ze(e, t, n) {
        return t && $e(e.prototype, t), n && $e(e, n), e;
    }

    var et = function () {
            function e() {
                Xe(this, e);
            }

            return Ze(e, [{
                key: "connect",
                value: function value(e) {
                    throw new h("connect in IotClient");
                }
            }, {
                key: "disconnect",
                value: function value() {
                    throw new h("connect in IotClient");
                }
            }, {
                key: "subscribe",
                value: function value(e, t) {
                    throw new h("connect in IotClient");
                }
            }, {
                key: "unsubscribe",
                value: function value(e, t) {
                    throw new h("connect in IotClient");
                }
            }]), e;
        }(),
        tt = Object.freeze({
            NeverConnected: "NeverConnected",
            Connecting: "Connecting",
            Connected: "Connected",
            Disconnected: "Disconnected"
        }),
        nt = Object.freeze({
            MESSAGE: "Message",
            DISCONNECTED: "Disconnected"
        }),
        ot = function (e) {
            function t(e) {
                var n;
                Xe(this, t), (n = function (e, t) {
                    return !t || "object" !== ze(t) && "function" != typeof t ? Qe(e) : t;
                }(this, Je(t).call(this))).preSignedUrl = e.preSignedUrl, n.connectionId = e.connectionId, n.status = tt.NeverConnected, n.pahoClient = new Ke.a.Client(n.preSignedUrl, n.connectionId);
                var o = Qe(n);
                return n.pahoClient.onMessageArrived = function (e) {
                    o._messageArrivedCallback(e);
                }, n.pahoClient.onConnectionLost = function (e) {
                    o._connectionLostCallBack(e);
                }, n.pahoClient.onMessageArrived = function (e) {
                    o._messageArrivedCallback(e);
                }, n.callback = e.callback, n.neverConnected = !0, n._subscribedTopics = [], n;
            }

            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && Ye(e, t);
            }(t, et), Ze(t, [{
                key: "connect",
                value: function value(e) {
                    var t = this;
                    return new Promise(function (n, o) {
                        e.onSuccess = function (e) {
                            t.neverConnected = !1, t._onConnectSuccess(e), n({});
                        }, e.onFailure = function (e) {
                            var n = {
                                reason: e
                            };
                            t._onConnectFailure(n), o(n);
                        }, t.status = tt.Connecting, t.pahoClient.connect(e);
                    });
                }
            }, {
                key: "_connectionLostCallBack",
                value: function value(e) {
                    console.warn("Connection lost: ", e);
                    var t = {
                        reason: e
                    };
                    this._subscribedTopics = [], this.status !== tt.Disconnected && (this.status = tt.Disconnected, this.callback(nt.DISCONNECTED, t));
                }
            }, {
                key: "_messageArrivedCallback",
                value: function value(e) {
                    var t = {
                        topic: e.topic,
                        qos: e.qos,
                        payloadString: e.payloadString
                    };
                    this.callback(nt.MESSAGE, t);
                }
            }, {
                key: "_onConnectSuccess",
                value: function value(e) {
                    this.status = tt.Connected;
                }
            }, {
                key: "_onConnectFailure",
                value: function value(e) {
                    this.neverConnected ? this.status = tt.NeverConnected : this.status = tt.Disconnected;
                }
            }, {
                key: "disconnect",
                value: function value() {
                    this._subscribedTopics = [], this.status = tt.Disconnected, this.pahoClient.disconnect();
                }
            }, {
                key: "subscribe",
                value: function value(e, t) {
                    var n = this;
                    return new Promise(function (o, i) {
                        t.onSuccess = function (t) {
                            n._subscribeSuccess(e, t);

                            var i = {
                                topic: e,
                                qos: t.grantedQos
                            };
                            o(i);
                        }, t.onFailure = function (t) {
                            i({
                                topic: e,
                                error: t
                            });
                        }, n.pahoClient.subscribe(e, t);
                    });
                }
            }, {
                key: "_addToTopics",
                value: function value(e) {
                    this._subscribedTopics.indexOf(e) >= 0 || this._subscribedTopics.push(e);
                }
            }, {
                key: "_subscribeSuccess",
                value: function value(e, t) {
                    this._addToTopics(e);
                }
            }, {
                key: "getSubscribedTopics",
                value: function value() {
                    return this._subscribedTopics.slice(0);
                }
            }, {
                key: "unsubscribe",
                value: function value(e, t) {
                    var n = this;
                    return new Promise(function (o, i) {
                        t.onSuccess = function (t) {
                            var i = {
                                topic: e,
                                response: t
                            };
                            n._unsubscribeSuccess(e, i), o(i);
                        }, t.onFailure = function (t) {
                            i({
                                topic: e,
                                error: t
                            });
                        }, n.pahoClient.unsubscribe(e, t);
                    });
                }
            }, {
                key: "_unsubscribeSuccess",
                value: function value(e, t) {
                    this._subscribedTopics = this._subscribedTopics.filter(function (t) {
                        return t !== e;
                    });
                }
            }, {
                key: "getStatus",
                value: function value() {
                    return this.status;
                }
            }]), t;
        }();

    function it(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function rt(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
        }
    }

    function st(e, t, n) {
        return t && rt(e.prototype, t), n && rt(e, n), e;
    }

    function ct(e) {
        return (ct = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e;
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        })(e);
    }

    var at = function () {
            function e() {
                it(this, e);
            }

            return st(e, [{
                key: "onOnline",
                value: function value() {}
            }, {
                key: "onOffline",
                value: function value() {}
            }, {
                key: "isOnline",
                value: function value() {
                    return !0;
                }
            }, {
                key: "whenOnline",
                value: function value() {
                    return Promise.resolve();
                }
            }]), e;
        }(),
        ut = function () {
            function e() {
                var t = this;
                it(this, e), this.eventBus = new Ge(), this.onlinePromise = null, window.addEventListener("online", function () {
                    t.eventBus.trigger("online");
                }), window.addEventListener("offline", function () {
                    t.eventBus.trigger("offline");
                });
            }

            return st(e, [{
                key: "onOnline",
                value: function value(e) {
                    return this.eventBus.subscribe("online", e);
                }
            }, {
                key: "onOffline",
                value: function value(e) {
                    return this.eventBus.subscribe("offline", e);
                }
            }, {
                key: "isOnline",
                value: function value() {
                    return window.navigator.onLine;
                }
            }, {
                key: "whenOnline",
                value: function value() {
                    var e = this;
                    return this.isOnline() ? Promise.resolve() : (this.onlinePromise || (this.onlinePromise = new Promise(function (t) {
                        var n = e.onOnline(function () {
                            e.onlinePromise = null, n(), t();
                        });
                    })), this.onlinePromise);
                }
            }]), e;
        }(),
        lt = "object" === ("undefined" == typeof window ? "undefined" : ct(window)) && window.navigator && window.addEventListener ? new ut() : new at();

    function ft(e) {
        return (ft = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e;
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        })(e);
    }

    function ht(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
        }
    }

    function pt(e, t) {
        return !t || "object" !== ft(t) && "function" != typeof t ? function (e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
        }(e) : t;
    }

    function dt(e, t, n) {
        return (dt = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (e, t, n) {
            var o = function (e, t) {
                for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = gt(e));) {
                    ;
                }

                return e;
            }(e, t);

            if (o) {
                var i = Object.getOwnPropertyDescriptor(o, t);
                return i.get ? i.get.call(n) : i.value;
            }
        })(e, t, n || e);
    }

    function gt(e) {
        return (gt = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
        })(e);
    }

    function yt(e, t) {
        return (yt = Object.setPrototypeOf || function (e, t) {
            return e.__proto__ = t, e;
        })(e, t);
    }

    var vt = function (e) {
        function t(e, n, o) {
            var i;
            return function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            }(this, t), (i = pt(this, gt(t).call(this, n))).logger = le.getLogger({
                prefix: "ContactId-" + e + ": "
            }), i.status = Pe.NeverStarted, i.eventBus = new Ge(), i._unsubscribeFunctions = [], i.reconnectConfig = o, i._connectCalledAtleastOnce = !1, i._setNetworkEventHandlers(), i;
        }

        var n, o, i;
        return function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), t && yt(e, t);
        }(t, Be), n = t, (o = [{
            key: "start",
            value: function value() {
                if (dt(gt(t.prototype), "start", this).call(this), this.status !== Pe.NeverStarted) throw new d("Connection helper started twice!!");
                return this.status = Pe.Starting, this._initiateConnectWithRetry();
            }
        }, {
            key: "end",
            value: function value() {
                dt(gt(t.prototype), "end", this).call(this), this._handleBrokenConnection({
                    reason: "user action"
                }), this.iotConnection && this.iotConnection.disconnect();
            }
        }, {
            key: "getStatus",
            value: function value() {
                return this.status;
            }
        }, {
            key: "_initIotConnection",
            value: function value(e) {
                this.iotConnection = new ot({
                    preSignedUrl: e.preSignedConnectionUrl,
                    connectionId: e.connectionId,
                    callback: this._handleIotEvent.bind(this)
                });
            }
        }, {
            key: "_connect",
            value: function value() {
                var e = this;
                return this._connectCalledAtleastOnce = !0, this.connectionDetailsProvider.fetchConnectionDetails().then(this._initIotConnection.bind(this)).then(function () {
                    var t = {
                        useSSL: !0,
                        keepAliveInterval: D,
                        reconnect: !1,
                        mqttVersion: 4,
                        timeout: L
                    };
                    return new Promise(function (n, o) {
                        e.iotConnection.connect(t).then(function (t) {
                            e._subscribe(n, o, t);
                        }).catch(function (t) {
                            e._connectFailed(o, t);
                        });
                    });
                });
            }
        }, {
            key: "_connectFailed",
            value: function value(e, t) {
                e({
                    connectSuccess: !1,
                    reason: "ConnectionToBrokerFailed",
                    details: t
                });
            }
        }, {
            key: "_subscribe",
            value: function value(e, t) {
                var n = this;
                this.iotConnection.subscribe(this.connectionDetailsProvider.connectionDetails.connectionId, {
                    qos: 1
                }).then(function (t) {
                    n._postSubscribe(e, t);
                }).catch(function (e) {
                    n._subscribeFailed(t, e);
                });
            }
        }, {
            key: "_postSubscribe",
            value: function value(e, t) {
                e({
                    details: t,
                    connectSuccess: !0
                });
            }
        }, {
            key: "_subscribeFailed",
            value: function value(e, t) {
                var n = {
                    connectSuccess: !1,
                    details: t,
                    reason: "SubscribtionToTopicFailed"
                };
                this.iotConnection.disconnect(), e(n);
            }
        }, {
            key: "_handleIotEvent",
            value: function value(e, t) {
                switch (e) {
                    case nt.MESSAGE:
                        this.logger.debug("Received incoming data", t.payloadString);

                        try {
                            var n = JSON.parse(t.payloadString);
                            this.eventBus.trigger(xe, n);
                        } catch (e) {
                            this.logger.error("Wrong message format: ", t.payloadString);
                        }

                        break;

                    case nt.DISCONNECTED:
                        v.reconnect && 0 !== t.reason.errorCode ? this._handleLostConnection(t) : this._handleBrokenConnection(t);
                }
            }
        }, {
            key: "_initiateConnectWithRetry",
            value: function value() {
                var e = this;
                return this._initiateConnectPromise || (this._initiateConnectPromise = w.asyncWhileInterval(function (t) {
                    return e.logger.info("Connect - ".concat(t, ". try")), e._connect();
                }, function (t) {
                    return t < e.reconnectConfig.maxRetries && e._canConnect();
                }, this.reconnectConfig.interval).then(function () {
                    e.logger.info("Connect - Success"), e._handleGainedConnection();
                }).catch(function (t) {
                    return e.logger.info("Connect - Failed"), lt.isOnline() ? (e._handleBrokenConnection(t), e.iotConnection && e.iotConnection.disconnect()) : e.state !== Pe.ConnectionLost && e._handleLostConnection(t), Promise.reject(t);
                }).finally(function () {
                    e._initiateConnectPromise = null;
                })), this._initiateConnectPromise;
            }
        }, {
            key: "_canConnect",
            value: function value() {
                return lt.isOnline() && (this.status === Pe.ConnectionLost || this.status === Pe.Starting);
            }
        }, {
            key: "_handleBrokenConnection",
            value: function value(e) {
                this.status !== Pe.Ended && (this.status = Pe.Ended, this._unsubscribeFunctions.forEach(function (e) {
                    return e();
                }), this.eventBus.trigger(Re, e));
            }
        }, {
            key: "_handleLostConnection",
            value: function value(e) {
                this.status = Pe.ConnectionLost, this.eventBus.trigger(De, e), lt.isOnline() && this._initiateConnectWithRetry().catch(function () {});
            }
        }, {
            key: "_handleGainedConnection",
            value: function value() {
                this.status = Pe.Connected, this.eventBus.trigger(Le, {});
            }
        }, {
            key: "_setNetworkEventHandlers",
            value: function value() {
                var e = this,
                    t = lt.onOnline(function () {
                        e._connectCalledAtleastOnce && e._canConnect() && e._initiateConnectWithRetry().catch(function () {});
                    });

                this._unsubscribeFunctions.push(t);
            }
        }, {
            key: "onEnded",
            value: function value(e) {
                return this.eventBus.subscribe(Re, e);
            }
        }, {
            key: "onConnectionLost",
            value: function value(e) {
                return this.eventBus.subscribe(De, e);
            }
        }, {
            key: "onConnectionGain",
            value: function value(e) {
                return this.eventBus.subscribe(Le, e);
            }
        }, {
            key: "onMessage",
            value: function value(e) {
                return this.eventBus.subscribe(xe, e);
            }
        }]) && ht(n.prototype, o), i && ht(n, i), t;
    }();

    function bt(e) {
        return (bt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e;
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        })(e);
    }

    function _t(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function mt(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
        }
    }

    function wt(e, t, n) {
        return t && mt(e.prototype, t), n && mt(e, n), e;
    }

    function Ct(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e;
    }

    function St(e, t, n) {
        return (St = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (e, t, n) {
            var o = function (e, t) {
                for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = kt(e));) {
                    ;
                }

                return e;
            }(e, t);

            if (o) {
                var i = Object.getOwnPropertyDescriptor(o, t);
                return i.get ? i.get.call(n) : i.value;
            }
        })(e, t, n || e);
    }

    function kt(e) {
        return (kt = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
        })(e);
    }

    function Et(e, t) {
        return (Et = Object.setPrototypeOf || function (e, t) {
            return e.__proto__ = t, e;
        })(e, t);
    }

    var It = function (e) {
        function t(e, n, o) {
            var i;
            return _t(this, t), (i = function (e, t) {
                return !t || "object" !== bt(t) && "function" != typeof t ? Ct(e) : t;
            }(this, kt(t).call(this, n))).cleanUpBaseInstance = !o, t.baseInstance || (t.baseInstance = new Tt(n, o)), i.initialContactId = e, i.eventBus = new Ge(), i.subscriptions = [t.baseInstance.onEnded(i.handleEnded.bind(Ct(i))), t.baseInstance.onConnectionGain(i.handleConnectionGain.bind(Ct(i))), t.baseInstance.onConnectionLost(i.handleConnectionLost.bind(Ct(i))), t.baseInstance.onMessage(i.handleMessage.bind(Ct(i)))], i;
        }

        return function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), t && Et(e, t);
        }(t, Be), wt(t, [{
            key: "start",
            value: function value() {
                return St(kt(t.prototype), "start", this).call(this), t.baseInstance.start();
            }
        }, {
            key: "end",
            value: function value() {
                St(kt(t.prototype), "end", this).call(this), this.eventBus.unsubscribeAll(), this.subscriptions.forEach(function (e) {
                    return e();
                }), t.baseInstance && this.cleanUpBaseInstance && (t.baseInstance.end(), t.baseInstance = null);
            }
        }, {
            key: "getStatus",
            value: function value() {
                return t.baseInstance.getStatus();
            }
        }, {
            key: "onEnded",
            value: function value(e) {
                return this.eventBus.subscribe(Re, e);
            }
        }, {
            key: "handleEnded",
            value: function value() {
                this.eventBus.trigger(Re, {});
            }
        }, {
            key: "onConnectionGain",
            value: function value(e) {
                return this.eventBus.subscribe(Le, e);
            }
        }, {
            key: "handleConnectionGain",
            value: function value() {
                this.eventBus.trigger(Le, {});
            }
        }, {
            key: "onConnectionLost",
            value: function value(e) {
                return this.eventBus.subscribe(De, e);
            }
        }, {
            key: "handleConnectionLost",
            value: function value() {
                this.eventBus.trigger(De, {});
            }
        }, {
            key: "onMessage",
            value: function value(e) {
                return this.eventBus.subscribe(xe, e);
            }
        }, {
            key: "handleMessage",
            value: function value(e) {
                e.InitialContactId === this.initialContactId && this.eventBus.trigger(xe, e);
            }
        }]), t;
    }();

    It.baseInstance = null;

    var Tt = function () {
            function e(t, n) {
                _t(this, e), this.status = Pe.NeverStarted, this.eventBus = new Ge(), this.logger = le.getLogger({
                    prefix: "LPC WebSockets: "
                }), this.initWebsocketManager(n, t);
            }

            return wt(e, [{
                key: "initWebsocketManager",
                value: function value(e, t) {
                    this.websocketManager = e || connect.WebSocketManager.create(), this.websocketManager.subscribeTopics(["aws/chat"]), this.subscriptions = [this.websocketManager.onMessage("aws/chat", this.handleMessage.bind(this)), this.websocketManager.onConnectionGain(this.handleConnectionGain.bind(this)), this.websocketManager.onConnectionLost(this.handleConnectionLost.bind(this)), this.websocketManager.onInitFailure(this.handleEnded.bind(this))], e || this.websocketManager.init(function () {
                        return t.fetchConnectionDetails().then(function (e) {
                            return {
                                webSocketTransport: {
                                    url: e.preSignedConnectionUrl,
                                    transportLifeTimeInSeconds: 7140
                                }
                            };
                        });
                    });
                }
            }, {
                key: "end",
                value: function value() {
                    this.websocketManager.closeWebSocket(), this.eventBus.unsubscribeAll(), this.subscriptions.forEach(function (e) {
                        return e();
                    });
                }
            }, {
                key: "start",
                value: function value() {
                    return this.status === Pe.NeverStarted && (this.status = Pe.Starting), Promise.resolve();
                }
            }, {
                key: "onEnded",
                value: function value(e) {
                    return this.eventBus.subscribe(Re, e);
                }
            }, {
                key: "handleEnded",
                value: function value() {
                    this.status = Pe.Ended, this.eventBus.trigger(Re, {});
                }
            }, {
                key: "onConnectionGain",
                value: function value(e) {
                    return this.eventBus.subscribe(Le, e);
                }
            }, {
                key: "handleConnectionGain",
                value: function value() {
                    this.status = Pe.Connected, this.eventBus.trigger(Le, {});
                }
            }, {
                key: "onConnectionLost",
                value: function value(e) {
                    return this.eventBus.subscribe(De, e);
                }
            }, {
                key: "handleConnectionLost",
                value: function value() {
                    this.status = Pe.ConnectionLost, this.eventBus.trigger(De, {});
                }
            }, {
                key: "onMessage",
                value: function value(e) {
                    return this.eventBus.subscribe(xe, e);
                }
            }, {
                key: "handleMessage",
                value: function value(e) {
                    var t;

                    try {
                        t = JSON.parse(e.content), this.eventBus.trigger(xe, t);
                    } catch (t) {
                        this.logger.error("Wrong message format: ", e);
                    }
                }
            }]), e;
        }(),
        Ot = It;

    function Mt(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
        }
    }

    var Nt = new (function () {
        function e() {
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            }(this, e);
        }

        var t, n, o;
        return t = e, (n = [{
            key: "get",
            value: function value(e) {
                var t = e.contactId,
                    n = e.initialContactId,
                    o = e.connectionDetails,
                    i = e.participantToken,
                    r = e.chatClient,
                    s = e.websocketManager,
                    c = e.reconnectConfig,
                    a = new We(o, i, r);
                return a.init().then(function () {
                    return a.connectionType === je ? new Ot(n, a, s) : a.connectionType === Ue ? new vt(t, a, c) : void 0;
                });
            }
        }]) && Mt(t.prototype, n), o && Mt(t, o), e;
    }())();

    function At(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
        }
    }

    var Pt = "NeverEstablished",
        Dt = "Establishing",
        Lt = "Established",
        Rt = "Broken",
        xt = function () {
            function e(t) {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, e), this.logger = le.getLogger({
                    prefix: "ContactId-" + t.chatDetails.contactId + ": "
                }), this.argsValidator = new Ne(), this.pubsub = new Ge(), this.sessionType = t.sessionType, this.connectionDetails = t.chatDetails.connectionDetails, this.initialContactId = t.chatDetails.initialContactId, this.contactId = t.chatDetails.contactId, this.participantId = t.chatDetails.participantId, this.chatClient = t.chatClient, this.participantToken = t.chatDetails.participantToken, this.websocketManager = t.websocketManager, this._participantDisconnected = !1, this.sessionMetadata = {};
            }

            var t, n, o;
            return t = e, (n = [{
                key: "subscribe",
                value: function value(e, t) {
                    this.pubsub.subscribe(e, t), this.logger.info("Subscribed successfully to eventName: ", e);
                }
            }, {
                key: "handleRequestSuccess",
                value: function value(e, t, n) {
                    var o = this;
                    return function (i) {
                        return i.metadata = e, o.logger.debug("".concat(n, " successful! Response: "), i, " / Request: ", t), i;
                    };
                }
            }, {
                key: "handleRequestFailure",
                value: function value(e, t, n) {
                    var o = this;
                    return function (i) {
                        return i.metadata = e, o.logger.debug("".concat(n, " failed! Error: "), i, " / Request: ", t), Promise.reject(i);
                    };
                }
            }, {
                key: "sendMessage",
                value: function value(e) {
                    var t = e.message,
                        n = e.type || M.textPlain,
                        o = e.metadata || null;
                    this.argsValidator.validateSendMessage(t, n);
                    var i = this.connectionHelper.getConnectionToken();
                    return this.chatClient.sendMessage(i, t, n).then(this.handleRequestSuccess(o, e, "sendMessage")).catch(this.handleRequestFailure(o, e, "sendMessage"));
                }
            }, {
                key: "sendEvent",
                value: function value(e) {
                    var t = e.metadata || null;
                    this.argsValidator.validateSendEvent(e);
                    var n = this.connectionHelper.getConnectionToken(),
                        o = e.persistence || A.PERSISTED,
                        i = e.visibility || N.ALL;
                    return this.chatClient.sendEvent(n, e.eventType, e.messageIds, i, o).then(this.handleRequestSuccess(t, e, "sendEvent")).catch(this.handleRequestFailure(t, e, "sendEvent"));
                }
            }, {
                key: "getTranscript",
                value: function value(e) {
                    var t = e.metadata || null,
                        n = {
                            InitialContactId: this.initialContactId,
                            StartKey: e.StartKey || {},
                            ScanDirection: e.ScanDirection || W,
                            SortKey: e.SortKey || V,
                            MaxResults: e.MaxResults || G
                        };
                    e.NextToken && (n.NextToken = e.NextToken);
                    var o = this.connectionHelper.getConnectionToken();
                    return this.chatClient.getTranscript(o, n).then(this.handleRequestSuccess(t, n, "getTranscript")).catch(this.handleRequestFailure(t, n, "getTranscript"));
                }
            }, {
                key: "connect",
                value: function value() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return this.sessionMetadata = e.metadata || null, this.argsValidator.validateConnectChat(e), Nt.get({
                        contactId: this.contactId,
                        initialContactId: this.initialContactId,
                        connectionDetails: this.connectionDetails,
                        participantToken: this.participantToken,
                        chatClient: this.chatClient,
                        websocketManager: this.websocketManager,
                        reconnectConfig: this.sessionType === R.AGENT ? Q : Y
                    }).then(this._initConnectionHelper.bind(this)).then(this._onConnectSuccess.bind(this), this._onConnectFailure.bind(this));
                }
            }, {
                key: "_initConnectionHelper",
                value: function value(e) {
                    return this.connectionHelper = e, this.connectionHelper.onEnded(this._handleEndedConnection.bind(this)), this.connectionHelper.onConnectionLost(this._handleLostConnection.bind(this)), this.connectionHelper.onConnectionGain(this._handleGainedConnection.bind(this)), this.connectionHelper.onMessage(this._handleIncomingMessage.bind(this)), this.connectionHelper.start();
                }
            }, {
                key: "_handleEndedConnection",
                value: function value(e) {
                    this._forwardChatEvent(F, {
                        data: e,
                        chatDetails: this.getChatDetails()
                    });
                }
            }, {
                key: "_handleLostConnection",
                value: function value(e) {
                    this._forwardChatEvent(B, {
                        data: e,
                        chatDetails: this.getChatDetails()
                    });
                }
            }, {
                key: "_handleGainedConnection",
                value: function value(e) {
                    this._forwardChatEvent(j, {
                        data: e,
                        chatDetails: this.getChatDetails()
                    });
                }
            }, {
                key: "_handleIncomingMessage",
                value: function value(e) {
                    try {
                        var t = {
                            TYPING: U
                        }[e.Data.Type] || x;

                        this._forwardChatEvent(t, {
                            data: e,
                            chatDetails: this.getChatDetails()
                        });
                    } catch (t) {
                        this.logger.error("Error occured while handling message from Connection. eventData: ", e, " Causing exception: ", t);
                    }
                }
            }, {
                key: "_forwardChatEvent",
                value: function value(e, t) {
                    this.logger.debug("Triggering event for subscribers:", e, t), this.pubsub.triggerAsync(e, t);
                }
            }, {
                key: "_onConnectSuccess",
                value: function value(e) {
                    this.logger.info("Connect successful!");
                    var t = {
                            _debug: e,
                            connectSuccess: !0,
                            connectCalled: !0,
                            metadata: this.sessionMetadata
                        },
                        n = Object.assign({
                            chatDetails: this.getChatDetails()
                        }, t);
                    return this.pubsub.triggerAsync(j, n), this._shouldAcknowledgeContact() && this.sendEvent({
                        eventType: q,
                        messageIds: [],
                        visibility: N.ALL,
                        persistence: A.NON_PERSISTED
                    }), t;
                }
            }, {
                key: "_onConnectFailure",
                value: function value(e) {
                    var t = {
                        _debug: e,
                        connectSuccess: !1,
                        connectCalled: !0,
                        metadata: this.sessionMetadata
                    };
                    return this.logger.error("Connect Failed with data: ", t), Promise.reject(t);
                }
            }, {
                key: "_shouldAcknowledgeContact",
                value: function value() {
                    return this.sessionType === R.AGENT;
                }
            }, {
                key: "breakConnection",
                value: function value() {
                    return this.connectionHelper ? this.connectionHelper.end() : Promise.resolve();
                }
            }, {
                key: "cleanUpOnParticipantDisconnect",
                value: function value() {
                    this.pubsub.unsubscribeAll();
                }
            }, {
                key: "disconnectParticipant",
                value: function value() {
                    var e = this,
                        t = this.connectionHelper.getConnectionToken();
                    return this.chatClient.disconnectChat(t).then(function (t) {
                        return e.logger.info("disconnect participant successful"), e._participantDisconnected = !0, e.cleanUpOnParticipantDisconnect(), e.breakConnection(), t;
                    }, function (t) {
                        return e.logger.error("disconnect participant failed with error: ", t), Promise.reject(t);
                    });
                }
            }, {
                key: "getChatDetails",
                value: function value() {
                    return {
                        initialContactId: this.initialContactId,
                        contactId: this.contactId,
                        participantId: this.participantId,
                        participantToken: this.participantToken,
                        connectionDetails: this.connectionDetails
                    };
                }
            }, {
                key: "_convertConnectionHelperStatus",
                value: function value(e) {
                    switch (e) {
                        case Pe.NeverStarted:
                            return Pt;

                        case Pe.Starting:
                            return Dt;

                        case Pe.Ended:
                        case Pe.ConnectionLost:
                            return Rt;

                        case Pe.Connected:
                            return Lt;
                    }

                    this.logger.error("Reached invalid state. Unknown connectionHelperStatus: ", e);
                }
            }, {
                key: "getConnectionStatus",
                value: function value() {
                    return this._convertConnectionHelperStatus(this.connectionHelper.getStatus());
                }
            }]) && At(t.prototype, n), o && At(t, o), e;
        }();

    function Ut(e) {
        return (Ut = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e;
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        })(e);
    }

    function jt(e, t) {
        return !t || "object" !== Ut(t) && "function" != typeof t ? function (e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
        }(e) : t;
    }

    function Bt(e) {
        return (Bt = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
        })(e);
    }

    function Ft(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }), t && qt(e, t);
    }

    function qt(e, t) {
        return (qt = Object.setPrototypeOf || function (e, t) {
            return e.__proto__ = t, e;
        })(e, t);
    }

    function Gt(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function Vt(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
        }
    }

    function Wt(e, t, n) {
        return t && Vt(e.prototype, t), n && Vt(e, n), e;
    }

    n.d(t, "a", function () {
        return Xt;
    });

    var Ht = function () {
            function e() {
                Gt(this, e);
            }

            return Wt(e, [{
                key: "createAgentChatController",
                value: function value(e, t) {
                    throw new h("createAgentChatController in ChatControllerFactory.");
                }
            }, {
                key: "createCustomerChatController",
                value: function value(e, t) {
                    throw new h("createCustomerChatController in ChatControllerFactory.");
                }
            }]), e;
        }(),
        Kt = function (e) {
            function t() {
                var e;
                return Gt(this, t), (e = jt(this, Bt(t).call(this))).argsValidator = new Ne(), e;
            }

            return Ft(t, Ht), Wt(t, [{
                key: "createChatSession",
                value: function value(e, t, n) {
                    var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
                        i = this._createChatController(e, t, n, o);

                    if (e === R.AGENT) return new Jt(i);
                    if (e === R.CUSTOMER) return new Qt(i);
                    throw new p("Unkown value for session type, Allowed values are: " + Object.values(R), e);
                }
            }, {
                key: "_createChatController",
                value: function value(e, t, n, o) {
                    var i = {
                        sessionType: e,
                        chatDetails: this._normalizeChatDetails(t),
                        chatClient: we.getCachedClient(n),
                        websocketManager: o
                    };
                    return new xt(i);
                }
            }, {
                key: "_normalizeChatDetails",
                value: function value(e) {
                    var t = {};
                    if (e.participantToken || e.ParticipantToken) return t.participantId = e.ParticipantId || e.participantId, t.contactId = e.ContactId || e.contactId, t.initialContactId = e.InitialContactId || e.initialContactId || t.contactId, t.participantToken = e.ParticipantToken || e.participantToken, this.argsValidator.validateChatDetails(t), t;

                    if (e.ChatConnectionAttributes && e.ChatConnectionAttributes.ParticipantCredentials) {
                        this.argsValidator.validateInitiateChatResponse(e);
                        var n = {};
                        return n.connectionToken = e.ChatConnectionAttributes.ParticipantCredentials.ConnectionAuthenticationToken, n.ConnectionId = e.ChatConnectionAttributes.ConnectionId, n.PreSignedConnectionUrl = e.ChatConnectionAttributes.PreSignedConnectionUrl, t.connectionDetails = n, t.participantId = e.ParticipantId, t.contactId = e.ContactId, t.initialContactId = e.ContactId, t;
                    }

                    return this.argsValidator.validateChatDetails(e), e;
                }
            }]), t;
        }(),
        zt = function () {
            function e(t) {
                Gt(this, e), this.controller = t;
            }

            return Wt(e, [{
                key: "onMessage",
                value: function value(e) {
                    this.controller.subscribe(x, e);
                }
            }, {
                key: "onTyping",
                value: function value(e) {
                    this.controller.subscribe(U, e);
                }
            }, {
                key: "onConnectionBroken",
                value: function value(e) {
                    this.controller.subscribe(F, e);
                }
            }, {
                key: "onConnectionEstablished",
                value: function value(e) {
                    this.controller.subscribe(j, e);
                }
            }, {
                key: "sendMessage",
                value: function value(e) {
                    return this.controller.sendMessage(e);
                }
            }, {
                key: "connect",
                value: function value(e) {
                    return this.controller.connect(e);
                }
            }, {
                key: "sendEvent",
                value: function value(e) {
                    return this.controller.sendEvent(e);
                }
            }, {
                key: "getTranscript",
                value: function value(e) {
                    return this.controller.getTranscript(e);
                }
            }, {
                key: "getChatDetails",
                value: function value() {
                    return this.controller.getChatDetails();
                }
            }]), e;
        }(),
        Jt = function (e) {
            function t(e) {
                return Gt(this, t), jt(this, Bt(t).call(this, e));
            }

            return Ft(t, zt), Wt(t, [{
                key: "cleanUpOnParticipantDisconnect",
                value: function value() {
                    return this.controller.cleanUpOnParticipantDisconnect();
                }
            }]), t;
        }(),
        Qt = function (e) {
            function t(e) {
                return Gt(this, t), jt(this, Bt(t).call(this, e));
            }

            return Ft(t, zt), Wt(t, [{
                key: "disconnectParticipant",
                value: function value() {
                    return this.controller.disconnectParticipant();
                }
            }]), t;
        }(),
        Yt = new Kt(),
        Xt = {
            create: function create(e) {
                var t = e.options || {},
                    n = e.type || R.AGENT;
                return Yt.createChatSession(n, e.chatDetails, t, e.websocketManager);
            },
            setGlobalConfig: function setGlobalConfig(e) {
                var t = e.loggerConfig;
                v.update(e), le.updateLoggerConfig(t);
            },
            LogLevel: re,
            Logger: ie,
            SessionTypes: R
        };
}, function (e, t) {
    var n;

    n = function () {
        return this;
    }();

    try {
        n = n || new Function("return this")();
    } catch (e) {
        "object" == typeof window && (n = window);
    }

    e.exports = n;
}, function (e, t, n) {
    (function (e, o) {
        var i, r, s;

        function c(e) {
            return (c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e;
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            })(e);
        }

        s = function s() {
            return function (e) {
                var t,
                    n = e.localStorage || (t = {}, {
                        setItem: function setItem(e, n) {
                            t[e] = n;
                        },
                        getItem: function getItem(e) {
                            return t[e];
                        },
                        removeItem: function removeItem(e) {
                            delete t[e];
                        }
                    }),
                    o = {
                        CONNECT: 1,
                        CONNACK: 2,
                        PUBLISH: 3,
                        PUBACK: 4,
                        PUBREC: 5,
                        PUBREL: 6,
                        PUBCOMP: 7,
                        SUBSCRIBE: 8,
                        SUBACK: 9,
                        UNSUBSCRIBE: 10,
                        UNSUBACK: 11,
                        PINGREQ: 12,
                        PINGRESP: 13,
                        DISCONNECT: 14
                    },
                    i = function i(e, t) {
                        for (var n in e) {
                            if (e.hasOwnProperty(n)) {
                                if (!t.hasOwnProperty(n)) {
                                    var o = "Unknown property, " + n + ". Valid properties are:";

                                    for (var i in t) {
                                        t.hasOwnProperty(i) && (o = o + " " + i);
                                    }

                                    throw new Error(o);
                                }

                                if (c(e[n]) !== t[n]) throw new Error(u(s.INVALID_TYPE, [c(e[n]), n]));
                            }
                        }
                    },
                    r = function r(e, t) {
                        return function () {
                            return e.apply(t, arguments);
                        };
                    },
                    s = {
                        OK: {
                            code: 0,
                            text: "AMQJSC0000I OK."
                        },
                        CONNECT_TIMEOUT: {
                            code: 1,
                            text: "AMQJSC0001E Connect timed out."
                        },
                        SUBSCRIBE_TIMEOUT: {
                            code: 2,
                            text: "AMQJS0002E Subscribe timed out."
                        },
                        UNSUBSCRIBE_TIMEOUT: {
                            code: 3,
                            text: "AMQJS0003E Unsubscribe timed out."
                        },
                        PING_TIMEOUT: {
                            code: 4,
                            text: "AMQJS0004E Ping timed out."
                        },
                        INTERNAL_ERROR: {
                            code: 5,
                            text: "AMQJS0005E Internal error. Error Message: {0}, Stack trace: {1}"
                        },
                        CONNACK_RETURNCODE: {
                            code: 6,
                            text: "AMQJS0006E Bad Connack return code:{0} {1}."
                        },
                        SOCKET_ERROR: {
                            code: 7,
                            text: "AMQJS0007E Socket error:{0}."
                        },
                        SOCKET_CLOSE: {
                            code: 8,
                            text: "AMQJS0008I Socket closed."
                        },
                        MALFORMED_UTF: {
                            code: 9,
                            text: "AMQJS0009E Malformed UTF data:{0} {1} {2}."
                        },
                        UNSUPPORTED: {
                            code: 10,
                            text: "AMQJS0010E {0} is not supported by this browser."
                        },
                        INVALID_STATE: {
                            code: 11,
                            text: "AMQJS0011E Invalid state {0}."
                        },
                        INVALID_TYPE: {
                            code: 12,
                            text: "AMQJS0012E Invalid type {0} for {1}."
                        },
                        INVALID_ARGUMENT: {
                            code: 13,
                            text: "AMQJS0013E Invalid argument {0} for {1}."
                        },
                        UNSUPPORTED_OPERATION: {
                            code: 14,
                            text: "AMQJS0014E Unsupported operation."
                        },
                        INVALID_STORED_DATA: {
                            code: 15,
                            text: "AMQJS0015E Invalid data in local storage key={0} value={1}."
                        },
                        INVALID_MQTT_MESSAGE_TYPE: {
                            code: 16,
                            text: "AMQJS0016E Invalid MQTT message type {0}."
                        },
                        MALFORMED_UNICODE: {
                            code: 17,
                            text: "AMQJS0017E Malformed Unicode string:{0} {1}."
                        },
                        BUFFER_FULL: {
                            code: 18,
                            text: "AMQJS0018E Message buffer is full, maximum buffer size: {0}."
                        }
                    },
                    a = {
                        0: "Connection Accepted",
                        1: "Connection Refused: unacceptable protocol version",
                        2: "Connection Refused: identifier rejected",
                        3: "Connection Refused: server unavailable",
                        4: "Connection Refused: bad user name or password",
                        5: "Connection Refused: not authorized"
                    },
                    u = function u(e, t) {
                        var n = e.text;
                        if (t) for (var o, i, r = 0; r < t.length; r++) {
                            if (o = "{" + r + "}", (i = n.indexOf(o)) > 0) {
                                var s = n.substring(0, i),
                                    c = n.substring(i + o.length);
                                n = s + t[r] + c;
                            }
                        }
                        return n;
                    },
                    l = [0, 6, 77, 81, 73, 115, 100, 112, 3],
                    f = [0, 4, 77, 81, 84, 84, 4],
                    h = function h(e, t) {
                        for (var n in this.type = e, t) {
                            t.hasOwnProperty(n) && (this[n] = t[n]);
                        }
                    };

                function p(e, t) {
                    var n,
                        i = t,
                        r = e[t],
                        s = r >> 4,
                        c = r &= 15;
                    t += 1;
                    var a = 0,
                        u = 1;

                    do {
                        if (t == e.length) return [null, i];
                        a += (127 & (n = e[t++])) * u, u *= 128;
                    } while (0 != (128 & n));

                    var l = t + a;
                    if (l > e.length) return [null, i];
                    var f = new h(s);

                    switch (s) {
                        case o.CONNACK:
                            1 & e[t++] && (f.sessionPresent = !0), f.returnCode = e[t++];
                            break;

                        case o.PUBLISH:
                            var p = c >> 1 & 3,
                                d = y(e, t),
                                g = _(e, t += 2, d);

                            t += d, p > 0 && (f.messageIdentifier = y(e, t), t += 2);
                            var v = new S(e.subarray(t, l));
                            1 == (1 & c) && (v.retained = !0), 8 == (8 & c) && (v.duplicate = !0), v.qos = p, v.destinationName = g, f.payloadMessage = v;
                            break;

                        case o.PUBACK:
                        case o.PUBREC:
                        case o.PUBREL:
                        case o.PUBCOMP:
                        case o.UNSUBACK:
                            f.messageIdentifier = y(e, t);
                            break;

                        case o.SUBACK:
                            f.messageIdentifier = y(e, t), t += 2, f.returnCode = e.subarray(t, l);
                    }

                    return [f, l];
                }

                function d(e, t, n) {
                    return t[n++] = e >> 8, t[n++] = e % 256, n;
                }

                function g(e, t, n, o) {
                    return b(e, n, o = d(t, n, o)), o + t;
                }

                function y(e, t) {
                    return 256 * e[t] + e[t + 1];
                }

                function v(e) {
                    for (var t = 0, n = 0; n < e.length; n++) {
                        var o = e.charCodeAt(n);
                        o > 2047 ? (55296 <= o && o <= 56319 && (n++, t++), t += 3) : o > 127 ? t += 2 : t++;
                    }

                    return t;
                }

                function b(e, t, n) {
                    for (var o = n, i = 0; i < e.length; i++) {
                        var r = e.charCodeAt(i);

                        if (55296 <= r && r <= 56319) {
                            var c = e.charCodeAt(++i);
                            if (isNaN(c)) throw new Error(u(s.MALFORMED_UNICODE, [r, c]));
                            r = c - 56320 + (r - 55296 << 10) + 65536;
                        }

                        r <= 127 ? t[o++] = r : r <= 2047 ? (t[o++] = r >> 6 & 31 | 192, t[o++] = 63 & r | 128) : r <= 65535 ? (t[o++] = r >> 12 & 15 | 224, t[o++] = r >> 6 & 63 | 128, t[o++] = 63 & r | 128) : (t[o++] = r >> 18 & 7 | 240, t[o++] = r >> 12 & 63 | 128, t[o++] = r >> 6 & 63 | 128, t[o++] = 63 & r | 128);
                    }

                    return t;
                }

                function _(e, t, n) {
                    for (var o, i = "", r = t; r < t + n;) {
                        var c = e[r++];
                        if (c < 128) o = c;else {
                            var a = e[r++] - 128;
                            if (a < 0) throw new Error(u(s.MALFORMED_UTF, [c.toString(16), a.toString(16), ""]));
                            if (c < 224) o = 64 * (c - 192) + a;else {
                                var l = e[r++] - 128;
                                if (l < 0) throw new Error(u(s.MALFORMED_UTF, [c.toString(16), a.toString(16), l.toString(16)]));
                                if (c < 240) o = 4096 * (c - 224) + 64 * a + l;else {
                                    var f = e[r++] - 128;
                                    if (f < 0) throw new Error(u(s.MALFORMED_UTF, [c.toString(16), a.toString(16), l.toString(16), f.toString(16)]));
                                    if (!(c < 248)) throw new Error(u(s.MALFORMED_UTF, [c.toString(16), a.toString(16), l.toString(16), f.toString(16)]));
                                    o = 262144 * (c - 240) + 4096 * a + 64 * l + f;
                                }
                            }
                        }
                        o > 65535 && (o -= 65536, i += String.fromCharCode(55296 + (o >> 10)), o = 56320 + (1023 & o)), i += String.fromCharCode(o);
                    }

                    return i;
                }

                h.prototype.encode = function () {
                    var e,
                        t = (15 & this.type) << 4,
                        n = 0,
                        i = [],
                        r = 0;

                    switch (void 0 !== this.messageIdentifier && (n += 2), this.type) {
                        case o.CONNECT:
                            switch (this.mqttVersion) {
                                case 3:
                                    n += l.length + 3;
                                    break;

                                case 4:
                                    n += f.length + 3;
                            }

                            n += v(this.clientId) + 2, void 0 !== this.willMessage && (n += v(this.willMessage.destinationName) + 2, (e = this.willMessage.payloadBytes) instanceof Uint8Array || (e = new Uint8Array(c)), n += e.byteLength + 2), void 0 !== this.userName && (n += v(this.userName) + 2), void 0 !== this.password && (n += v(this.password) + 2);
                            break;

                        case o.SUBSCRIBE:
                            t |= 2;

                            for (var s = 0; s < this.topics.length; s++) {
                                i[s] = v(this.topics[s]), n += i[s] + 2;
                            }

                            n += this.requestedQos.length;
                            break;

                        case o.UNSUBSCRIBE:
                            t |= 2;

                            for (s = 0; s < this.topics.length; s++) {
                                i[s] = v(this.topics[s]), n += i[s] + 2;
                            }

                            break;

                        case o.PUBREL:
                            t |= 2;
                            break;

                        case o.PUBLISH:
                            this.payloadMessage.duplicate && (t |= 8), t = t |= this.payloadMessage.qos << 1, this.payloadMessage.retained && (t |= 1), n += (r = v(this.payloadMessage.destinationName)) + 2;
                            var c = this.payloadMessage.payloadBytes;
                            n += c.byteLength, c instanceof ArrayBuffer ? c = new Uint8Array(c) : c instanceof Uint8Array || (c = new Uint8Array(c.buffer));
                            break;

                        case o.DISCONNECT:
                    }

                    var a = function (e) {
                            var t = new Array(1),
                                n = 0;

                            do {
                                var o = e % 128;
                                (e >>= 7) > 0 && (o |= 128), t[n++] = o;
                            } while (e > 0 && n < 4);

                            return t;
                        }(n),
                        u = a.length + 1,
                        h = new ArrayBuffer(n + u),
                        p = new Uint8Array(h);

                    if (p[0] = t, p.set(a, 1), this.type == o.PUBLISH) u = g(this.payloadMessage.destinationName, r, p, u);else if (this.type == o.CONNECT) {
                        switch (this.mqttVersion) {
                            case 3:
                                p.set(l, u), u += l.length;
                                break;

                            case 4:
                                p.set(f, u), u += f.length;
                        }

                        var y = 0;
                        this.cleanSession && (y = 2), void 0 !== this.willMessage && (y |= 4, y |= this.willMessage.qos << 3, this.willMessage.retained && (y |= 32)), void 0 !== this.userName && (y |= 128), void 0 !== this.password && (y |= 64), p[u++] = y, u = d(this.keepAliveInterval, p, u);
                    }

                    switch (void 0 !== this.messageIdentifier && (u = d(this.messageIdentifier, p, u)), this.type) {
                        case o.CONNECT:
                            u = g(this.clientId, v(this.clientId), p, u), void 0 !== this.willMessage && (u = g(this.willMessage.destinationName, v(this.willMessage.destinationName), p, u), u = d(e.byteLength, p, u), p.set(e, u), u += e.byteLength), void 0 !== this.userName && (u = g(this.userName, v(this.userName), p, u)), void 0 !== this.password && (u = g(this.password, v(this.password), p, u));
                            break;

                        case o.PUBLISH:
                            p.set(c, u);
                            break;

                        case o.SUBSCRIBE:
                            for (s = 0; s < this.topics.length; s++) {
                                u = g(this.topics[s], i[s], p, u), p[u++] = this.requestedQos[s];
                            }

                            break;

                        case o.UNSUBSCRIBE:
                            for (s = 0; s < this.topics.length; s++) {
                                u = g(this.topics[s], i[s], p, u);
                            }

                    }

                    return h;
                };

                var m = function m(e, t) {
                        this._client = e, this._keepAliveInterval = 1e3 * t, this.isReset = !1;

                        var n = new h(o.PINGREQ).encode(),
                            i = function i(e) {
                                return function () {
                                    return r.apply(e);
                                };
                            },
                            r = function r() {
                                this.isReset ? (this.isReset = !1, this._client._trace("Pinger.doPing", "send PINGREQ"), this._client.socket.send(n), this.timeout = setTimeout(i(this), this._keepAliveInterval)) : (this._client._trace("Pinger.doPing", "Timed out"), this._client._disconnected(s.PING_TIMEOUT.code, u(s.PING_TIMEOUT)));
                            };

                        this.reset = function () {
                            this.isReset = !0, clearTimeout(this.timeout), this._keepAliveInterval > 0 && (this.timeout = setTimeout(i(this), this._keepAliveInterval));
                        }, this.cancel = function () {
                            clearTimeout(this.timeout);
                        };
                    },
                    w = function w(e, t, n, o) {
                        t || (t = 30);
                        this.timeout = setTimeout(function (e, t, n) {
                            return function () {
                                return e.apply(t, n);
                            };
                        }(n, e, o), 1e3 * t), this.cancel = function () {
                            clearTimeout(this.timeout);
                        };
                    },
                    C = function C(t, o, i, r, c) {
                        if (!("WebSocket" in e && null !== e.WebSocket)) throw new Error(u(s.UNSUPPORTED, ["WebSocket"]));
                        if (!("ArrayBuffer" in e && null !== e.ArrayBuffer)) throw new Error(u(s.UNSUPPORTED, ["ArrayBuffer"]));

                        for (var a in this._trace("Paho.Client", t, o, i, r, c), this.host = o, this.port = i, this.path = r, this.uri = t, this.clientId = c, this._wsuri = null, this._localKey = o + ":" + i + ("/mqtt" != r ? ":" + r : "") + ":" + c + ":", this._msg_queue = [], this._buffered_msg_queue = [], this._sentMessages = {}, this._receivedMessages = {}, this._notify_msg_sent = {}, this._message_identifier = 1, this._sequence = 0, n) {
                            0 !== a.indexOf("Sent:" + this._localKey) && 0 !== a.indexOf("Received:" + this._localKey) || this.restore(a);
                        }
                    };

                C.prototype.host = null, C.prototype.port = null, C.prototype.path = null, C.prototype.uri = null, C.prototype.clientId = null, C.prototype.socket = null, C.prototype.connected = !1, C.prototype.maxMessageIdentifier = 65536, C.prototype.connectOptions = null, C.prototype.hostIndex = null, C.prototype.onConnected = null, C.prototype.onConnectionLost = null, C.prototype.onMessageDelivered = null, C.prototype.onMessageArrived = null, C.prototype.traceFunction = null, C.prototype._msg_queue = null, C.prototype._buffered_msg_queue = null, C.prototype._connectTimeout = null, C.prototype.sendPinger = null, C.prototype.receivePinger = null, C.prototype._reconnectInterval = 1, C.prototype._reconnecting = !1, C.prototype._reconnectTimeout = null, C.prototype.disconnectedPublishing = !1, C.prototype.disconnectedBufferSize = 5e3, C.prototype.receiveBuffer = null, C.prototype._traceBuffer = null, C.prototype._MAX_TRACE_ENTRIES = 100, C.prototype.connect = function (e) {
                    var t = this._traceMask(e, "password");

                    if (this._trace("Client.connect", t, this.socket, this.connected), this.connected) throw new Error(u(s.INVALID_STATE, ["already connected"]));
                    if (this.socket) throw new Error(u(s.INVALID_STATE, ["already connected"]));
                    this._reconnecting && (this._reconnectTimeout.cancel(), this._reconnectTimeout = null, this._reconnecting = !1), this.connectOptions = e, this._reconnectInterval = 1, this._reconnecting = !1, e.uris ? (this.hostIndex = 0, this._doConnect(e.uris[0])) : this._doConnect(this.uri);
                }, C.prototype.subscribe = function (e, t) {
                    if (this._trace("Client.subscribe", e, t), !this.connected) throw new Error(u(s.INVALID_STATE, ["not connected"]));
                    var n = new h(o.SUBSCRIBE);
                    n.topics = e.constructor === Array ? e : [e], void 0 === t.qos && (t.qos = 0), n.requestedQos = [];

                    for (var i = 0; i < n.topics.length; i++) {
                        n.requestedQos[i] = t.qos;
                    }

                    t.onSuccess && (n.onSuccess = function (e) {
                        t.onSuccess({
                            invocationContext: t.invocationContext,
                            grantedQos: e
                        });
                    }), t.onFailure && (n.onFailure = function (e) {
                        t.onFailure({
                            invocationContext: t.invocationContext,
                            errorCode: e,
                            errorMessage: u(e)
                        });
                    }), t.timeout && (n.timeOut = new w(this, t.timeout, t.onFailure, [{
                        invocationContext: t.invocationContext,
                        errorCode: s.SUBSCRIBE_TIMEOUT.code,
                        errorMessage: u(s.SUBSCRIBE_TIMEOUT)
                    }])), this._requires_ack(n), this._schedule_message(n);
                }, C.prototype.unsubscribe = function (e, t) {
                    if (this._trace("Client.unsubscribe", e, t), !this.connected) throw new Error(u(s.INVALID_STATE, ["not connected"]));
                    var n = new h(o.UNSUBSCRIBE);
                    n.topics = e.constructor === Array ? e : [e], t.onSuccess && (n.callback = function () {
                        t.onSuccess({
                            invocationContext: t.invocationContext
                        });
                    }), t.timeout && (n.timeOut = new w(this, t.timeout, t.onFailure, [{
                        invocationContext: t.invocationContext,
                        errorCode: s.UNSUBSCRIBE_TIMEOUT.code,
                        errorMessage: u(s.UNSUBSCRIBE_TIMEOUT)
                    }])), this._requires_ack(n), this._schedule_message(n);
                }, C.prototype.send = function (e) {
                    this._trace("Client.send", e);

                    var t = new h(o.PUBLISH);
                    if (t.payloadMessage = e, this.connected) e.qos > 0 ? this._requires_ack(t) : this.onMessageDelivered && (this._notify_msg_sent[t] = this.onMessageDelivered(t.payloadMessage)), this._schedule_message(t);else {
                        if (!this._reconnecting || !this.disconnectedPublishing) throw new Error(u(s.INVALID_STATE, ["not connected"]));
                        if (Object.keys(this._sentMessages).length + this._buffered_msg_queue.length > this.disconnectedBufferSize) throw new Error(u(s.BUFFER_FULL, [this.disconnectedBufferSize]));
                        e.qos > 0 ? this._requires_ack(t) : (t.sequence = ++this._sequence, this._buffered_msg_queue.unshift(t));
                    }
                }, C.prototype.disconnect = function () {
                    if (this._trace("Client.disconnect"), this._reconnecting && (this._reconnectTimeout.cancel(), this._reconnectTimeout = null, this._reconnecting = !1), !this.socket) throw new Error(u(s.INVALID_STATE, ["not connecting or connected"]));
                    var e = new h(o.DISCONNECT);
                    this._notify_msg_sent[e] = r(this._disconnected, this), this._schedule_message(e);
                }, C.prototype.getTraceLog = function () {
                    if (null !== this._traceBuffer) {
                        for (var e in this._trace("Client.getTraceLog", new Date()), this._trace("Client.getTraceLog in flight messages", this._sentMessages.length), this._sentMessages) {
                            this._trace("_sentMessages ", e, this._sentMessages[e]);
                        }

                        for (var e in this._receivedMessages) {
                            this._trace("_receivedMessages ", e, this._receivedMessages[e]);
                        }

                        return this._traceBuffer;
                    }
                }, C.prototype.startTrace = function () {
                    null === this._traceBuffer && (this._traceBuffer = []), this._trace("Client.startTrace", new Date(), "@VERSION@-@BUILDLEVEL@");
                }, C.prototype.stopTrace = function () {
                    delete this._traceBuffer;
                }, C.prototype._doConnect = function (e) {
                    if (this.connectOptions.useSSL) {
                        var t = e.split(":");
                        t[0] = "wss", e = t.join(":");
                    }

                    this._wsuri = e, this.connected = !1, this.connectOptions.mqttVersion < 4 ? this.socket = new WebSocket(e, ["mqttv3.1"]) : this.socket = new WebSocket(e, ["mqtt"]), this.socket.binaryType = "arraybuffer", this.socket.onopen = r(this._on_socket_open, this), this.socket.onmessage = r(this._on_socket_message, this), this.socket.onerror = r(this._on_socket_error, this), this.socket.onclose = r(this._on_socket_close, this), this.sendPinger = new m(this, this.connectOptions.keepAliveInterval), this.receivePinger = new m(this, this.connectOptions.keepAliveInterval), this._connectTimeout && (this._connectTimeout.cancel(), this._connectTimeout = null), this._connectTimeout = new w(this, this.connectOptions.timeout, this._disconnected, [s.CONNECT_TIMEOUT.code, u(s.CONNECT_TIMEOUT)]);
                }, C.prototype._schedule_message = function (e) {
                    this._msg_queue.unshift(e), this.connected && this._process_queue();
                }, C.prototype.store = function (e, t) {
                    var i = {
                        type: t.type,
                        messageIdentifier: t.messageIdentifier,
                        version: 1
                    };

                    switch (t.type) {
                        case o.PUBLISH:
                            t.pubRecReceived && (i.pubRecReceived = !0), i.payloadMessage = {};

                            for (var r = "", c = t.payloadMessage.payloadBytes, a = 0; a < c.length; a++) {
                                c[a] <= 15 ? r = r + "0" + c[a].toString(16) : r += c[a].toString(16);
                            }

                            i.payloadMessage.payloadHex = r, i.payloadMessage.qos = t.payloadMessage.qos, i.payloadMessage.destinationName = t.payloadMessage.destinationName, t.payloadMessage.duplicate && (i.payloadMessage.duplicate = !0), t.payloadMessage.retained && (i.payloadMessage.retained = !0), 0 === e.indexOf("Sent:") && (void 0 === t.sequence && (t.sequence = ++this._sequence), i.sequence = t.sequence);
                            break;

                        default:
                            throw Error(u(s.INVALID_STORED_DATA, [e + this._localKey + t.messageIdentifier, i]));
                    }

                    n.setItem(e + this._localKey + t.messageIdentifier, JSON.stringify(i));
                }, C.prototype.restore = function (e) {
                    var t = n.getItem(e),
                        i = JSON.parse(t),
                        r = new h(i.type, i);

                    switch (i.type) {
                        case o.PUBLISH:
                            for (var c = i.payloadMessage.payloadHex, a = new ArrayBuffer(c.length / 2), l = new Uint8Array(a), f = 0; c.length >= 2;) {
                                var p = parseInt(c.substring(0, 2), 16);
                                c = c.substring(2, c.length), l[f++] = p;
                            }

                            var d = new S(l);
                            d.qos = i.payloadMessage.qos, d.destinationName = i.payloadMessage.destinationName, i.payloadMessage.duplicate && (d.duplicate = !0), i.payloadMessage.retained && (d.retained = !0), r.payloadMessage = d;
                            break;

                        default:
                            throw Error(u(s.INVALID_STORED_DATA, [e, t]));
                    }

                    0 === e.indexOf("Sent:" + this._localKey) ? (r.payloadMessage.duplicate = !0, this._sentMessages[r.messageIdentifier] = r) : 0 === e.indexOf("Received:" + this._localKey) && (this._receivedMessages[r.messageIdentifier] = r);
                }, C.prototype._process_queue = function () {
                    for (var e = null; e = this._msg_queue.pop();) {
                        this._socket_send(e), this._notify_msg_sent[e] && (this._notify_msg_sent[e](), delete this._notify_msg_sent[e]);
                    }
                }, C.prototype._requires_ack = function (e) {
                    var t = Object.keys(this._sentMessages).length;
                    if (t > this.maxMessageIdentifier) throw Error("Too many messages:" + t);

                    for (; void 0 !== this._sentMessages[this._message_identifier];) {
                        this._message_identifier++;
                    }

                    e.messageIdentifier = this._message_identifier, this._sentMessages[e.messageIdentifier] = e, e.type === o.PUBLISH && this.store("Sent:", e), this._message_identifier === this.maxMessageIdentifier && (this._message_identifier = 1);
                }, C.prototype._on_socket_open = function () {
                    var e = new h(o.CONNECT, this.connectOptions);
                    e.clientId = this.clientId, this._socket_send(e);
                }, C.prototype._on_socket_message = function (e) {
                    this._trace("Client._on_socket_message", e.data);

                    for (var t = this._deframeMessages(e.data), n = 0; n < t.length; n += 1) {
                        this._handleMessage(t[n]);
                    }
                }, C.prototype._deframeMessages = function (e) {
                    var t = new Uint8Array(e),
                        n = [];

                    if (this.receiveBuffer) {
                        var o = new Uint8Array(this.receiveBuffer.length + t.length);
                        o.set(this.receiveBuffer), o.set(t, this.receiveBuffer.length), t = o, delete this.receiveBuffer;
                    }

                    try {
                        for (var i = 0; i < t.length;) {
                            var r = p(t, i),
                                c = r[0];
                            if (i = r[1], null === c) break;
                            n.push(c);
                        }

                        i < t.length && (this.receiveBuffer = t.subarray(i));
                    } catch (e) {
                        var a = "undefined" == e.hasOwnProperty("stack") ? e.stack.toString() : "No Error Stack Available";
                        return void this._disconnected(s.INTERNAL_ERROR.code, u(s.INTERNAL_ERROR, [e.message, a]));
                    }

                    return n;
                }, C.prototype._handleMessage = function (e) {
                    this._trace("Client._handleMessage", e);

                    try {
                        switch (e.type) {
                            case o.CONNACK:
                                if (this._connectTimeout.cancel(), this._reconnectTimeout && this._reconnectTimeout.cancel(), this.connectOptions.cleanSession) {
                                    for (var t in this._sentMessages) {
                                        var i = this._sentMessages[t];
                                        n.removeItem("Sent:" + this._localKey + i.messageIdentifier);
                                    }

                                    for (var t in this._sentMessages = {}, this._receivedMessages) {
                                        var r = this._receivedMessages[t];
                                        n.removeItem("Received:" + this._localKey + r.messageIdentifier);
                                    }

                                    this._receivedMessages = {};
                                }

                                if (0 !== e.returnCode) {
                                    this._disconnected(s.CONNACK_RETURNCODE.code, u(s.CONNACK_RETURNCODE, [e.returnCode, a[e.returnCode]]));

                                    break;
                                }

                                this.connected = !0, this.connectOptions.uris && (this.hostIndex = this.connectOptions.uris.length);
                                var c = [];

                                for (var l in this._sentMessages) {
                                    this._sentMessages.hasOwnProperty(l) && c.push(this._sentMessages[l]);
                                }

                                if (this._buffered_msg_queue.length > 0) for (var f = null; f = this._buffered_msg_queue.pop();) {
                                    c.push(f), this.onMessageDelivered && (this._notify_msg_sent[f] = this.onMessageDelivered(f.payloadMessage));
                                }
                                c = c.sort(function (e, t) {
                                    return e.sequence - t.sequence;
                                });

                                for (var p = 0, d = c.length; p < d; p++) {
                                    if ((i = c[p]).type == o.PUBLISH && i.pubRecReceived) {
                                        var g = new h(o.PUBREL, {
                                            messageIdentifier: i.messageIdentifier
                                        });

                                        this._schedule_message(g);
                                    } else this._schedule_message(i);
                                }

                                this.connectOptions.onSuccess && this.connectOptions.onSuccess({
                                    invocationContext: this.connectOptions.invocationContext
                                });
                                var y = !1;
                                this._reconnecting && (y = !0, this._reconnectInterval = 1, this._reconnecting = !1), this._connected(y, this._wsuri), this._process_queue();
                                break;

                            case o.PUBLISH:
                                this._receivePublish(e);

                                break;

                            case o.PUBACK:
                                (i = this._sentMessages[e.messageIdentifier]) && (delete this._sentMessages[e.messageIdentifier], n.removeItem("Sent:" + this._localKey + e.messageIdentifier), this.onMessageDelivered && this.onMessageDelivered(i.payloadMessage));
                                break;

                            case o.PUBREC:
                                if (i = this._sentMessages[e.messageIdentifier]) {
                                    i.pubRecReceived = !0;
                                    g = new h(o.PUBREL, {
                                        messageIdentifier: e.messageIdentifier
                                    });
                                    this.store("Sent:", i), this._schedule_message(g);
                                }

                                break;

                            case o.PUBREL:
                                r = this._receivedMessages[e.messageIdentifier];
                                n.removeItem("Received:" + this._localKey + e.messageIdentifier), r && (this._receiveMessage(r), delete this._receivedMessages[e.messageIdentifier]);
                                var v = new h(o.PUBCOMP, {
                                    messageIdentifier: e.messageIdentifier
                                });

                                this._schedule_message(v);

                                break;

                            case o.PUBCOMP:
                                i = this._sentMessages[e.messageIdentifier];
                                delete this._sentMessages[e.messageIdentifier], n.removeItem("Sent:" + this._localKey + e.messageIdentifier), this.onMessageDelivered && this.onMessageDelivered(i.payloadMessage);
                                break;

                            case o.SUBACK:
                                (i = this._sentMessages[e.messageIdentifier]) && (i.timeOut && i.timeOut.cancel(), 128 === e.returnCode[0] ? i.onFailure && i.onFailure(e.returnCode) : i.onSuccess && i.onSuccess(e.returnCode), delete this._sentMessages[e.messageIdentifier]);
                                break;

                            case o.UNSUBACK:
                                (i = this._sentMessages[e.messageIdentifier]) && (i.timeOut && i.timeOut.cancel(), i.callback && i.callback(), delete this._sentMessages[e.messageIdentifier]);
                                break;

                            case o.PINGRESP:
                                this.sendPinger.reset();
                                break;

                            case o.DISCONNECT:
                                this._disconnected(s.INVALID_MQTT_MESSAGE_TYPE.code, u(s.INVALID_MQTT_MESSAGE_TYPE, [e.type]));

                                break;

                            default:
                                this._disconnected(s.INVALID_MQTT_MESSAGE_TYPE.code, u(s.INVALID_MQTT_MESSAGE_TYPE, [e.type]));

                        }
                    } catch (e) {
                        var b = "undefined" == e.hasOwnProperty("stack") ? e.stack.toString() : "No Error Stack Available";
                        return void this._disconnected(s.INTERNAL_ERROR.code, u(s.INTERNAL_ERROR, [e.message, b]));
                    }
                }, C.prototype._on_socket_error = function (e) {
                    this._reconnecting || this._disconnected(s.SOCKET_ERROR.code, u(s.SOCKET_ERROR, [e.data]));
                }, C.prototype._on_socket_close = function () {
                    this._reconnecting || this._disconnected(s.SOCKET_CLOSE.code, u(s.SOCKET_CLOSE));
                }, C.prototype._socket_send = function (e) {
                    if (1 == e.type) {
                        var t = this._traceMask(e, "password");

                        this._trace("Client._socket_send", t);
                    } else this._trace("Client._socket_send", e);

                    this.socket.send(e.encode()), this.sendPinger.reset();
                }, C.prototype._receivePublish = function (e) {
                    switch (e.payloadMessage.qos) {
                        case "undefined":
                        case 0:
                            this._receiveMessage(e);

                            break;

                        case 1:
                            var t = new h(o.PUBACK, {
                                messageIdentifier: e.messageIdentifier
                            });
                            this._schedule_message(t), this._receiveMessage(e);
                            break;

                        case 2:
                            this._receivedMessages[e.messageIdentifier] = e, this.store("Received:", e);
                            var n = new h(o.PUBREC, {
                                messageIdentifier: e.messageIdentifier
                            });

                            this._schedule_message(n);

                            break;

                        default:
                            throw Error("Invaild qos=" + e.payloadMessage.qos);
                    }
                }, C.prototype._receiveMessage = function (e) {
                    this.onMessageArrived && this.onMessageArrived(e.payloadMessage);
                }, C.prototype._connected = function (e, t) {
                    this.onConnected && this.onConnected(e, t);
                }, C.prototype._reconnect = function () {
                    this._trace("Client._reconnect"), this.connected || (this._reconnecting = !0, this.sendPinger.cancel(), this.receivePinger.cancel(), this._reconnectInterval < 128 && (this._reconnectInterval = 2 * this._reconnectInterval), this.connectOptions.uris ? (this.hostIndex = 0, this._doConnect(this.connectOptions.uris[0])) : this._doConnect(this.uri));
                }, C.prototype._disconnected = function (e, t) {
                    if (this._trace("Client._disconnected", e, t), void 0 !== e && this._reconnecting) this._reconnectTimeout = new w(this, this._reconnectInterval, this._reconnect);else if (this.sendPinger.cancel(), this.receivePinger.cancel(), this._connectTimeout && (this._connectTimeout.cancel(), this._connectTimeout = null), this._msg_queue = [], this._buffered_msg_queue = [], this._notify_msg_sent = {}, this.socket && (this.socket.onopen = null, this.socket.onmessage = null, this.socket.onerror = null, this.socket.onclose = null, 1 === this.socket.readyState && this.socket.close(), delete this.socket), this.connectOptions.uris && this.hostIndex < this.connectOptions.uris.length - 1) this.hostIndex++, this._doConnect(this.connectOptions.uris[this.hostIndex]);else if (void 0 === e && (e = s.OK.code, t = u(s.OK)), this.connected) {
                        if (this.connected = !1, this.onConnectionLost && this.onConnectionLost({
                            errorCode: e,
                            errorMessage: t,
                            reconnect: this.connectOptions.reconnect,
                            uri: this._wsuri
                        }), e !== s.OK.code && this.connectOptions.reconnect) return this._reconnectInterval = 1, void this._reconnect();
                    } else 4 === this.connectOptions.mqttVersion && !1 === this.connectOptions.mqttVersionExplicit ? (this._trace("Failed to connect V4, dropping back to V3"), this.connectOptions.mqttVersion = 3, this.connectOptions.uris ? (this.hostIndex = 0, this._doConnect(this.connectOptions.uris[0])) : this._doConnect(this.uri)) : this.connectOptions.onFailure && this.connectOptions.onFailure({
                        invocationContext: this.connectOptions.invocationContext,
                        errorCode: e,
                        errorMessage: t
                    });
                }, C.prototype._trace = function () {
                    if (this.traceFunction) {
                        var e = Array.prototype.slice.call(arguments);

                        for (var t in e) {
                            void 0 !== e[t] && e.splice(t, 1, JSON.stringify(e[t]));
                        }

                        var n = e.join("");
                        this.traceFunction({
                            severity: "Debug",
                            message: n
                        });
                    }

                    if (null !== this._traceBuffer) {
                        t = 0;

                        for (var o = arguments.length; t < o; t++) {
                            this._traceBuffer.length == this._MAX_TRACE_ENTRIES && this._traceBuffer.shift(), 0 === t ? this._traceBuffer.push(arguments[t]) : void 0 === arguments[t] ? this._traceBuffer.push(arguments[t]) : this._traceBuffer.push("  " + JSON.stringify(arguments[t]));
                        }
                    }
                }, C.prototype._traceMask = function (e, t) {
                    var n = {};

                    for (var o in e) {
                        e.hasOwnProperty(o) && (n[o] = o == t ? "******" : e[o]);
                    }

                    return n;
                };

                var S = function S(e) {
                    var t, n;
                    if (!("string" == typeof e || e instanceof ArrayBuffer || ArrayBuffer.isView(e) && !(e instanceof DataView))) throw u(s.INVALID_ARGUMENT, [e, "newPayload"]);
                    t = e;
                    var o = 0,
                        i = !1,
                        r = !1;
                    Object.defineProperties(this, {
                        payloadString: {
                            enumerable: !0,
                            get: function get() {
                                return "string" == typeof t ? t : _(t, 0, t.length);
                            }
                        },
                        payloadBytes: {
                            enumerable: !0,
                            get: function get() {
                                if ("string" == typeof t) {
                                    var e = new ArrayBuffer(v(t)),
                                        n = new Uint8Array(e);
                                    return b(t, n, 0), n;
                                }

                                return t;
                            }
                        },
                        destinationName: {
                            enumerable: !0,
                            get: function get() {
                                return n;
                            },
                            set: function set(e) {
                                if ("string" != typeof e) throw new Error(u(s.INVALID_ARGUMENT, [e, "newDestinationName"]));
                                n = e;
                            }
                        },
                        qos: {
                            enumerable: !0,
                            get: function get() {
                                return o;
                            },
                            set: function set(e) {
                                if (0 !== e && 1 !== e && 2 !== e) throw new Error("Invalid argument:" + e);
                                o = e;
                            }
                        },
                        retained: {
                            enumerable: !0,
                            get: function get() {
                                return i;
                            },
                            set: function set(e) {
                                if ("boolean" != typeof e) throw new Error(u(s.INVALID_ARGUMENT, [e, "newRetained"]));
                                i = e;
                            }
                        },
                        topic: {
                            enumerable: !0,
                            get: function get() {
                                return n;
                            },
                            set: function set(e) {
                                n = e;
                            }
                        },
                        duplicate: {
                            enumerable: !0,
                            get: function get() {
                                return r;
                            },
                            set: function set(e) {
                                r = e;
                            }
                        }
                    });
                };

                return {
                    Client: function Client(e, t, n, o) {
                        var r;
                        if ("string" != typeof e) throw new Error(u(s.INVALID_TYPE, [c(e), "host"]));

                        if (2 == arguments.length) {
                            o = t;
                            var a = (r = e).match(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/);
                            if (!a) throw new Error(u(s.INVALID_ARGUMENT, [e, "host"]));
                            e = a[4] || a[2], t = parseInt(a[7]), n = a[8];
                        } else {
                            if (3 == arguments.length && (o = n, n = "/mqtt"), "number" != typeof t || t < 0) throw new Error(u(s.INVALID_TYPE, [c(t), "port"]));
                            if ("string" != typeof n) throw new Error(u(s.INVALID_TYPE, [c(n), "path"]));
                            var l = -1 !== e.indexOf(":") && "[" !== e.slice(0, 1) && "]" !== e.slice(-1);
                            r = "ws://" + (l ? "[" + e + "]" : e) + ":" + t + n;
                        }

                        for (var f = 0, h = 0; h < o.length; h++) {
                            var p = o.charCodeAt(h);
                            55296 <= p && p <= 56319 && h++, f++;
                        }

                        if ("string" != typeof o || f > 65535) throw new Error(u(s.INVALID_ARGUMENT, [o, "clientId"]));
                        var d = new C(r, e, t, n, o);
                        Object.defineProperties(this, {
                            host: {
                                get: function get() {
                                    return e;
                                },
                                set: function set() {
                                    throw new Error(u(s.UNSUPPORTED_OPERATION));
                                }
                            },
                            port: {
                                get: function get() {
                                    return t;
                                },
                                set: function set() {
                                    throw new Error(u(s.UNSUPPORTED_OPERATION));
                                }
                            },
                            path: {
                                get: function get() {
                                    return n;
                                },
                                set: function set() {
                                    throw new Error(u(s.UNSUPPORTED_OPERATION));
                                }
                            },
                            uri: {
                                get: function get() {
                                    return r;
                                },
                                set: function set() {
                                    throw new Error(u(s.UNSUPPORTED_OPERATION));
                                }
                            },
                            clientId: {
                                get: function get() {
                                    return d.clientId;
                                },
                                set: function set() {
                                    throw new Error(u(s.UNSUPPORTED_OPERATION));
                                }
                            },
                            onConnected: {
                                get: function get() {
                                    return d.onConnected;
                                },
                                set: function set(e) {
                                    if ("function" != typeof e) throw new Error(u(s.INVALID_TYPE, [c(e), "onConnected"]));
                                    d.onConnected = e;
                                }
                            },
                            disconnectedPublishing: {
                                get: function get() {
                                    return d.disconnectedPublishing;
                                },
                                set: function set(e) {
                                    d.disconnectedPublishing = e;
                                }
                            },
                            disconnectedBufferSize: {
                                get: function get() {
                                    return d.disconnectedBufferSize;
                                },
                                set: function set(e) {
                                    d.disconnectedBufferSize = e;
                                }
                            },
                            onConnectionLost: {
                                get: function get() {
                                    return d.onConnectionLost;
                                },
                                set: function set(e) {
                                    if ("function" != typeof e) throw new Error(u(s.INVALID_TYPE, [c(e), "onConnectionLost"]));
                                    d.onConnectionLost = e;
                                }
                            },
                            onMessageDelivered: {
                                get: function get() {
                                    return d.onMessageDelivered;
                                },
                                set: function set(e) {
                                    if ("function" != typeof e) throw new Error(u(s.INVALID_TYPE, [c(e), "onMessageDelivered"]));
                                    d.onMessageDelivered = e;
                                }
                            },
                            onMessageArrived: {
                                get: function get() {
                                    return d.onMessageArrived;
                                },
                                set: function set(e) {
                                    if ("function" != typeof e) throw new Error(u(s.INVALID_TYPE, [c(e), "onMessageArrived"]));
                                    d.onMessageArrived = e;
                                }
                            },
                            trace: {
                                get: function get() {
                                    return d.traceFunction;
                                },
                                set: function set(e) {
                                    if ("function" != typeof e) throw new Error(u(s.INVALID_TYPE, [c(e), "onTrace"]));
                                    d.traceFunction = e;
                                }
                            }
                        }), this.connect = function (e) {
                            if (i(e = e || {}, {
                                timeout: "number",
                                userName: "string",
                                password: "string",
                                willMessage: "object",
                                keepAliveInterval: "number",
                                cleanSession: "boolean",
                                useSSL: "boolean",
                                invocationContext: "object",
                                onSuccess: "function",
                                onFailure: "function",
                                hosts: "object",
                                ports: "object",
                                reconnect: "boolean",
                                mqttVersion: "number",
                                mqttVersionExplicit: "boolean",
                                uris: "object"
                            }), void 0 === e.keepAliveInterval && (e.keepAliveInterval = 60), e.mqttVersion > 4 || e.mqttVersion < 3) throw new Error(u(s.INVALID_ARGUMENT, [e.mqttVersion, "connectOptions.mqttVersion"]));
                            if (void 0 === e.mqttVersion ? (e.mqttVersionExplicit = !1, e.mqttVersion = 4) : e.mqttVersionExplicit = !0, void 0 !== e.password && void 0 === e.userName) throw new Error(u(s.INVALID_ARGUMENT, [e.password, "connectOptions.password"]));

                            if (e.willMessage) {
                                if (!(e.willMessage instanceof S)) throw new Error(u(s.INVALID_TYPE, [e.willMessage, "connectOptions.willMessage"]));
                                if (e.willMessage.stringPayload = null, void 0 === e.willMessage.destinationName) throw new Error(u(s.INVALID_TYPE, [c(e.willMessage.destinationName), "connectOptions.willMessage.destinationName"]));
                            }

                            if (void 0 === e.cleanSession && (e.cleanSession = !0), e.hosts) {
                                if (!(e.hosts instanceof Array)) throw new Error(u(s.INVALID_ARGUMENT, [e.hosts, "connectOptions.hosts"]));
                                if (e.hosts.length < 1) throw new Error(u(s.INVALID_ARGUMENT, [e.hosts, "connectOptions.hosts"]));

                                for (var t = !1, o = 0; o < e.hosts.length; o++) {
                                    if ("string" != typeof e.hosts[o]) throw new Error(u(s.INVALID_TYPE, [c(e.hosts[o]), "connectOptions.hosts[" + o + "]"]));

                                    if (/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/.test(e.hosts[o])) {
                                        if (0 === o) t = !0;else if (!t) throw new Error(u(s.INVALID_ARGUMENT, [e.hosts[o], "connectOptions.hosts[" + o + "]"]));
                                    } else if (t) throw new Error(u(s.INVALID_ARGUMENT, [e.hosts[o], "connectOptions.hosts[" + o + "]"]));
                                }

                                if (t) e.uris = e.hosts;else {
                                    if (!e.ports) throw new Error(u(s.INVALID_ARGUMENT, [e.ports, "connectOptions.ports"]));
                                    if (!(e.ports instanceof Array)) throw new Error(u(s.INVALID_ARGUMENT, [e.ports, "connectOptions.ports"]));
                                    if (e.hosts.length !== e.ports.length) throw new Error(u(s.INVALID_ARGUMENT, [e.ports, "connectOptions.ports"]));

                                    for (e.uris = [], o = 0; o < e.hosts.length; o++) {
                                        if ("number" != typeof e.ports[o] || e.ports[o] < 0) throw new Error(u(s.INVALID_TYPE, [c(e.ports[o]), "connectOptions.ports[" + o + "]"]));
                                        var a = e.hosts[o],
                                            l = e.ports[o],
                                            f = -1 !== a.indexOf(":");
                                        r = "ws://" + (f ? "[" + a + "]" : a) + ":" + l + n, e.uris.push(r);
                                    }
                                }
                            }

                            d.connect(e);
                        }, this.subscribe = function (e, t) {
                            if ("string" != typeof e && e.constructor !== Array) throw new Error("Invalid argument:" + e);
                            if (i(t = t || {}, {
                                qos: "number",
                                invocationContext: "object",
                                onSuccess: "function",
                                onFailure: "function",
                                timeout: "number"
                            }), t.timeout && !t.onFailure) throw new Error("subscribeOptions.timeout specified with no onFailure callback.");
                            if (void 0 !== t.qos && 0 !== t.qos && 1 !== t.qos && 2 !== t.qos) throw new Error(u(s.INVALID_ARGUMENT, [t.qos, "subscribeOptions.qos"]));
                            d.subscribe(e, t);
                        }, this.unsubscribe = function (e, t) {
                            if ("string" != typeof e && e.constructor !== Array) throw new Error("Invalid argument:" + e);
                            if (i(t = t || {}, {
                                invocationContext: "object",
                                onSuccess: "function",
                                onFailure: "function",
                                timeout: "number"
                            }), t.timeout && !t.onFailure) throw new Error("unsubscribeOptions.timeout specified with no onFailure callback.");
                            d.unsubscribe(e, t);
                        }, this.send = function (e, t, n, o) {
                            var i;
                            if (0 === arguments.length) throw new Error("Invalid argument.length");

                            if (1 == arguments.length) {
                                if (!(e instanceof S) && "string" != typeof e) throw new Error("Invalid argument:" + c(e));
                                if (void 0 === (i = e).destinationName) throw new Error(u(s.INVALID_ARGUMENT, [i.destinationName, "Message.destinationName"]));
                                d.send(i);
                            } else (i = new S(t)).destinationName = e, arguments.length >= 3 && (i.qos = n), arguments.length >= 4 && (i.retained = o), d.send(i);
                        }, this.publish = function (e, t, n, o) {
                            var i;
                            if (0 === arguments.length) throw new Error("Invalid argument.length");

                            if (1 == arguments.length) {
                                if (!(e instanceof S) && "string" != typeof e) throw new Error("Invalid argument:" + c(e));
                                if (void 0 === (i = e).destinationName) throw new Error(u(s.INVALID_ARGUMENT, [i.destinationName, "Message.destinationName"]));
                                d.send(i);
                            } else (i = new S(t)).destinationName = e, arguments.length >= 3 && (i.qos = n), arguments.length >= 4 && (i.retained = o), d.send(i);
                        }, this.disconnect = function () {
                            d.disconnect();
                        }, this.getTraceLog = function () {
                            return d.getTraceLog();
                        }, this.startTrace = function () {
                            d.startTrace();
                        }, this.stopTrace = function () {
                            d.stopTrace();
                        }, this.isConnected = function () {
                            return d.connected;
                        };
                    },
                    Message: S
                };
            }(void 0 !== e ? e : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, "object" === c(t) && "object" === c(o) ? o.exports = s() : void 0 === (r = "function" == typeof (i = s) ? i.call(t, n, t, o) : i) || (o.exports = r);
    }).call(this, n(2), n(6)(e));
}, function (e, t, n) {
    "use strict";

    n.r(t), function (e) {
        n.d(t, "ChatSession", function () {
            return i;
        });
        n(5);
        var o = n(1);
        e.connect = e.connect || {}, connect.ChatSession = o.a;
        var i = o.a;
    }.call(this, n(2));
}, function (e, t) {
    !function (e) {
        var t = {};

        function n(o) {
            if (t[o]) return t[o].exports;
            var i = t[o] = {
                i: o,
                l: !1,
                exports: {}
            };
            return e[o].call(i.exports, i, i.exports, n), i.l = !0, i.exports;
        }

        n.m = e, n.c = t, n.d = function (e, t, o) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: o
            });
        }, n.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            });
        }, n.t = function (e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var o = Object.create(null);
            if (n.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e) for (var i in e) {
                n.d(o, i, function (t) {
                    return e[t];
                }.bind(null, i));
            }
            return o;
        }, n.n = function (e) {
            var t = e && e.__esModule ? function () {
                return e.default;
            } : function () {
                return e;
            };
            return n.d(t, "a", t), t;
        }, n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }, n.p = "", n(n.s = 2);
    }([function (e, t, n) {
        "use strict";

        var o = n(1);

        function i(e) {
            return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e;
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            })(e);
        }

        var r = {
            assertTrue: function assertTrue(e, t) {
                if (!e) throw new Error(t);
            },
            assertNotNull: function assertNotNull(e, t) {
                return r.assertTrue(null !== e && void 0 !== i(e), Object(o.sprintf)("%s must be provided", t || "A value")), e;
            },
            isString: function isString(e) {
                return "string" == typeof e;
            },
            assertIsNonEmptyString: function assertIsNonEmptyString(e, t) {
                if (!e || "string" != typeof e) throw new Error(t + " is not a non-empty string!");
            },
            assertIsList: function assertIsList(e, t) {
                if (!Array.isArray(e)) throw new Error(t + " is not an array");
            },
            assertIsEnum: function assertIsEnum(e, t, n) {
                var o;

                for (o = 0; o < t.length; o++) {
                    if (t[o] === e) return;
                }

                throw new Error(n + " passed is not valid. Allowed values are: " + t);
            },
            makeEnum: function makeEnum(e) {
                var t = {};
                return e.forEach(function (e) {
                    var n = e.replace(/\.?([a-z]+)_?/g, function (e, t) {
                        return t.toUpperCase() + "_";
                    }).replace(/_$/, "");
                    t[n] = e;
                }), t;
            },
            isFunction: function isFunction(e) {
                return !!(e && e.constructor && e.call && e.apply);
            },
            isObject: function isObject(e) {
                return !("object" !== i(e) || null === e);
            }
        };
        r.isString = function (e) {
            return "string" == typeof e;
        }, r.isNumber = function (e) {
            return "number" == typeof e;
        };
        var s = new RegExp("^(wss://)\\w*");
        r.validWSUrl = function (e) {
            return s.test(e);
        }, r.assertIsObject = function (e, t) {
            if (!r.isObject(e)) throw new Error(t + " is not an object!");
        };
        var c = r,
            a = "DEBUG",
            u = "aws/subscribe",
            l = "aws/heartbeat";

        function f(e) {
            return (f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e;
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            })(e);
        }

        function h(e) {
            return (h = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
        }

        function p(e, t) {
            return (p = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e;
            })(e, t);
        }

        function d(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }

        function g(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
            }
        }

        function y(e, t, n) {
            return t && g(e.prototype, t), n && g(e, n), e;
        }

        var v = function () {
                function e() {
                    d(this, e);
                }

                return y(e, [{
                    key: "debug",
                    value: function value(e) {}
                }, {
                    key: "info",
                    value: function value(e) {}
                }, {
                    key: "warn",
                    value: function value(e) {}
                }, {
                    key: "error",
                    value: function value(e) {}
                }]), e;
            }(),
            b = {
                DEBUG: 10,
                INFO: 20,
                WARN: 30,
                ERROR: 40
            },
            _ = function () {
                function e() {
                    d(this, e), this.updateLoggerConfig(), this.consoleLoggerWrapper = C();
                }

                return y(e, [{
                    key: "writeToClientLogger",
                    value: function value(e, t) {
                        if (this.hasClientLogger()) switch (e) {
                            case b.DEBUG:
                                return this._clientLogger.debug(t);

                            case b.INFO:
                                return this._clientLogger.info(t);

                            case b.WARN:
                                return this._clientLogger.warn(t);

                            case b.ERROR:
                                return this._clientLogger.error(t);
                        }
                    }
                }, {
                    key: "isLevelEnabled",
                    value: function value(e) {
                        return e >= this._level;
                    }
                }, {
                    key: "hasClientLogger",
                    value: function value() {
                        return null !== this._clientLogger;
                    }
                }, {
                    key: "getLogger",
                    value: function value(e) {
                        var t = e.prefix || "";
                        return this._logsDestination === a ? this.consoleLoggerWrapper : new w(t);
                    }
                }, {
                    key: "updateLoggerConfig",
                    value: function value(e) {
                        var t = e || {};
                        this._level = t.level || b.INFO, this._clientLogger = t.logger || null, this._logsDestination = "NULL", t.debug && (this._logsDestination = a), t.logger && (this._logsDestination = "CLIENT_LOGGER");
                    }
                }]), e;
            }(),
            m = function () {
                function e() {
                    d(this, e);
                }

                return y(e, [{
                    key: "debug",
                    value: function value() {}
                }, {
                    key: "info",
                    value: function value() {}
                }, {
                    key: "warn",
                    value: function value() {}
                }, {
                    key: "error",
                    value: function value() {}
                }]), e;
            }(),
            w = function (e) {
                function t(e) {
                    var n;
                    return d(this, t), (n = function (e, t) {
                        return !t || "object" !== f(t) && "function" != typeof t ? function (e) {
                            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return e;
                        }(e) : t;
                    }(this, h(t).call(this))).prefix = e || "", n;
                }

                return function (e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && p(e, t);
                }(t, m), y(t, [{
                    key: "debug",
                    value: function value() {
                        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
                            t[n] = arguments[n];
                        }

                        this._log(b.DEBUG, t);
                    }
                }, {
                    key: "info",
                    value: function value() {
                        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
                            t[n] = arguments[n];
                        }

                        this._log(b.INFO, t);
                    }
                }, {
                    key: "warn",
                    value: function value() {
                        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
                            t[n] = arguments[n];
                        }

                        this._log(b.WARN, t);
                    }
                }, {
                    key: "error",
                    value: function value() {
                        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
                            t[n] = arguments[n];
                        }

                        this._log(b.ERROR, t);
                    }
                }, {
                    key: "_shouldLog",
                    value: function value(e) {
                        return S.hasClientLogger() && S.isLevelEnabled(e);
                    }
                }, {
                    key: "_writeToClientLogger",
                    value: function value(e, t) {
                        S.writeToClientLogger(e, t);
                    }
                }, {
                    key: "_log",
                    value: function value(e, t) {
                        if (this._shouldLog(e)) {
                            var n = this._convertToSingleStatement(t);

                            this._writeToClientLogger(e, n);
                        }
                    }
                }, {
                    key: "_convertToSingleStatement",
                    value: function value(e) {
                        var t = "";
                        this.prefix && (t += this.prefix + " ");

                        for (var n = 0; n < e.length; n++) {
                            var o = e[n];
                            t += this._convertToString(o) + " ";
                        }

                        return t;
                    }
                }, {
                    key: "_convertToString",
                    value: function value(e) {
                        try {
                            if (!e) return "";
                            if (c.isString(e)) return e;

                            if (c.isObject(e) && c.isFunction(e.toString)) {
                                var t = e.toString();
                                if ("[object Object]" !== t) return t;
                            }

                            return JSON.stringify(e);
                        } catch (t) {
                            return console.error("Error while converting argument to string", e, t), "";
                        }
                    }
                }]), t;
            }(),
            C = function C() {
                var e = new m();
                return e.debug = console.debug, e.info = console.info, e.warn = console.warn, e.error = console.error, e;
            },
            S = new _();

        n.d(t, "a", function () {
            return E;
        });

        var k = function k() {
                var e = S.getLogger({}),
                    t = null,
                    n = {
                        reconnectWebSocket: !1,
                        websocketInitFailed: !1,
                        linearConnectAttempt: 0,
                        exponentialConnectAttempt: 0,
                        exponentialBackOffTime: 1,
                        exponentialTimeoutHandle: null,
                        lifeTimeTimeoutHandle: null
                    },
                    o = {
                        pendingResponse: !1,
                        intervalHandle: null
                    },
                    i = {
                        initFailure: new Set(),
                        getWebSocketTransport: null,
                        subscriptionUpdate: new Set(),
                        subscriptionFailure: new Set(),
                        topic: new Map(),
                        allMessage: new Set(),
                        connectionGain: new Set(),
                        connectionLost: new Set()
                    },
                    r = {
                        connConfig: null,
                        promiseHandle: null,
                        promiseCompleted: !1
                    },
                    s = {
                        subscribed: new Set(),
                        pending: new Set()
                    },
                    a = new Set([u, "aws/unsubscribe", l]),
                    f = navigator.onLine,
                    h = setInterval(function () {
                        f !== navigator.onLine && (f = navigator.onLine) && (!t || t.readyState > 1) && (e.info("Network online, Connecting to websocket"), I());
                    }, 250),
                    p = function p(e, t) {
                        e.forEach(function (e) {
                            e(t);
                        });
                    },
                    d = function d() {
                        if (o.pendingResponse) return e.warn("Heartbeat response not received"), clearInterval(o.intervalHandle), o.pendingResponse = !1, void w();
                        e.debug("Sending heartbeat"), t.send(k(l)), o.pendingResponse = !0;
                    },
                    g = function g() {
                        n.linearConnectAttempt = 0, n.exponentialConnectAttempt = 0, n.exponentialBackOffTime = 1, o.pendingResponse = !1, n.reconnectWebSocket = !1, clearTimeout(n.lifeTimeTimeoutHandle), clearInterval(o.intervalHandle), clearTimeout(n.exponentialTimeoutHandle);
                    },
                    y = function y() {
                        try {
                            if (e.info("WebSocket connection established!"), p(i.connectionGain), g(), s.subscribed.size > 0 || s.pending.size > 0) {
                                var c = Array.from(s.subscribed.values());
                                c = c.concat(Array.from(s.pending.values())), s.subscribed.clear(), t.send(k(u, {
                                    topics: c
                                }));
                            }

                            d(), o.intervalHandle = setInterval(d, 1e4), n.lifeTimeTimeoutHandle = setTimeout(function () {
                                e.debug("Starting scheduled WebSocket manager reconnect"), w();
                            }, 1e3 * r.connConfig.webSocketTransport.transportLifeTimeInSeconds);
                        } catch (t) {
                            e.error("Error after establishing web socket connection, error: ", t);
                        }
                    },
                    v = function v(t) {
                        n.linearConnectAttempt <= 1 && p(i.connectionLost), e.info("Socket connection is closed. event: ", t), n.reconnectWebSocket && T();
                    },
                    b = function b(t) {
                        e.error("WebSocketManager Error, error_event: ", t), w();
                    },
                    _ = function _(t) {
                        e.debug("Message received from webSocket server", t.data);
                        var n = JSON.parse(t.data);

                        switch (n.topic) {
                            case u:
                                "success" === n.content.status ? (n.content.topics.forEach(function (e) {
                                    s.subscribed.add(e), s.pending.delete(e);
                                }), p(i.subscriptionUpdate, n)) : p(i.subscriptionFailure, n);
                                break;

                            case l:
                                e.debug("Heartbeat response received"), o.pendingResponse = !1;
                                break;

                            default:
                                if (n.topic) {
                                    if (0 === i.allMessage.size && 0 === i.topic.size) return void e.warn("No registered callback listener for Topic: ", n);
                                    p(i.allMessage, n), i.topic.has(n.topic) && p(i.topic.get(n.topic), n);
                                } else n.message ? e.warn("WebSocketManager Message Error, error: ", n) : e.warn("Invalid incoming message, error: ", n);

                        }
                    },
                    m = function m(e) {
                        return !(!t || t.readyState === WebSocket.CLOSED || (t.close(1e3, e), 0));
                    },
                    w = function w() {
                        f ? (clearTimeout(n.lifeTimeTimeoutHandle), clearInterval(o.intervalHandle), n.linearConnectAttempt < 3 ? (n.linearConnectAttempt++, e.debug("Starting Consecutive WebSocket reconnect, Attempt : " + n.linearConnectAttempt), n.reconnectWebSocket = !0, I()) : n.exponentialConnectAttempt < 5 ? (n.exponentialConnectAttempt++, n.exponentialBackOffTime *= 2, e.debug("Starting Exponential WebSocket reconnect, Attempt : " + n.exponentialConnectAttempt + " with delay " + n.exponentialBackOffTime + " sec."), r.promiseCompleted = !1, r.connConfig = null, n.exponentialTimeoutHandle = setTimeout(function () {
                            n.reconnectWebSocket = !0, I();
                        }, 1e3 * n.exponentialBackOffTime)) : r.promiseCompleted && (e.error("Could not connect to WebSocket after several attempts"), C())) : m("Network Offline, Closing WebSocket Manager");
                    },
                    C = function C() {
                        g(), m("Terminating WebSocket Manager"), e.error("WebSocket Initialization failed"), n.websocketInitFailed = !0, clearInterval(h), p(i.initFailure);
                    },
                    k = function k(e, t) {
                        return JSON.stringify({
                            topic: e,
                            content: t
                        });
                    },
                    E = function E(t) {
                        return !!(c.isObject(t) && c.isObject(t.webSocketTransport) && c.isString(t.webSocketTransport.url) && c.validWSUrl(t.webSocketTransport.url) && c.isNumber(t.webSocketTransport.transportLifeTimeInSeconds) && t.webSocketTransport.transportLifeTimeInSeconds >= 3600) || (e.error("Invalid WebSocket Connection Configuration", t), !1);
                    },
                    I = function I() {
                        n.websocketInitFailed || (r.connConfig = null, r.promiseCompleted = !1, r.promiseHandle = i.getWebSocketTransport(), r.promiseHandle.then(function (t) {
                            r.promiseCompleted = !0, e.debug("Successfully fetched webSocket connection configuration"), E(t) ? (r.connConfig = t, f && (m("Restarting WebSocket Manager") || T())) : C();
                        }, function (t) {
                            r.promiseCompleted = !0, e.error("Failed to fetch webSocket connection configuration", t), w();
                        }));
                    },
                    T = function T() {
                        if (!n.websocketInitFailed) {
                            e.debug("Initializing Websocket Manager");

                            try {
                                E(r.connConfig) ? ((t = new WebSocket(r.connConfig.webSocketTransport.url)).addEventListener("open", y), t.addEventListener("message", _), t.addEventListener("error", b), t.addEventListener("close", v)) : r.promiseCompleted && C();
                            } catch (t) {
                                e.error("Error Initializing web-socket-manager", t), C();
                            }
                        }
                    };

                this.init = function (t) {
                    c.assertTrue(c.isFunction(t), "transportHandle must be a function"), null === i.getWebSocketTransport ? (i.getWebSocketTransport = t, I()) : e.warn("Web Socket Manager was already initialized");
                }, this.onInitFailure = function (e) {
                    return c.assertTrue(c.isFunction(e), "cb must be a function"), i.initFailure.add(e), n.websocketInitFailed && e(), function () {
                        return i.initFailure.delete(e);
                    };
                }, this.onConnectionGain = function (e) {
                    return c.assertTrue(c.isFunction(e), "cb must be a function"), i.connectionGain.add(e), t && t.readyState === WebSocket.OPEN && e(), function () {
                        return i.connectionGain.delete(e);
                    };
                }, this.onConnectionLost = function (e) {
                    return c.assertTrue(c.isFunction(e), "cb must be a function"), i.connectionLost.add(e), t && t.readyState === WebSocket.CLOSED && e(), function () {
                        return i.connectionLost.delete(e);
                    };
                }, this.onSubscriptionUpdate = function (e) {
                    return c.assertTrue(c.isFunction(e), "cb must be a function"), i.subscriptionUpdate.add(e), function () {
                        return i.subscriptionUpdate.delete(e);
                    };
                }, this.onSubscriptionFailure = function (e) {
                    return c.assertTrue(c.isFunction(e), "cb must be a function"), i.subscriptionFailure.add(e), function () {
                        return i.subscriptionFailure.delete(e);
                    };
                }, this.onMessage = function (e, t) {
                    return c.assertNotNull(e, "topicName"), c.assertTrue(c.isFunction(t), "cb must be a function"), i.topic.has(e) ? i.topic.get(e).add(t) : i.topic.set(e, new Set([t])), function () {
                        return i.topic.get(e).delete(t);
                    };
                }, this.onAllMessage = function (e) {
                    return c.assertTrue(c.isFunction(e), "cb must be a function"), i.allMessage.add(e), function () {
                        return i.allMessage.delete(e);
                    };
                }, this.subscribeTopics = function (e) {
                    c.assertNotNull(e, "topics"), c.assertIsList(e), e.forEach(function (e) {
                        s.pending.add(e);
                    }), t && t.readyState === WebSocket.OPEN && t.send(k(u, {
                        topics: e
                    }));
                }, this.sendMessage = function (n) {
                    if (c.assertIsObject(n, "payload"), void 0 === n.topic || a.has(n.topic)) e.warn("Cannot send message, Invalid topic", n);else {
                        try {
                            n = JSON.stringify(n);
                        } catch (t) {
                            return void e.warn("Error stringify message", n);
                        }

                        t && t.readyState === WebSocket.OPEN ? (e.debug("WebSocketManager sending message", n), t.send(n)) : e.warn("Cannot send message, web socket connection is not open");
                    }
                }, this.closeWebSocket = function () {
                    g(), clearInterval(h), m("User request to close WebSocket");
                };
            },
            E = {
                create: function create() {
                    return new k();
                },
                setGlobalConfig: function setGlobalConfig(e) {
                    var t = e.loggerConfig;
                    S.updateLoggerConfig(t);
                },
                LogLevel: b,
                Logger: v
            };
    }, function (e, t, n) {
        var o;
        !function () {
            "use strict";

            var i = {
                not_string: /[^s]/,
                not_bool: /[^t]/,
                not_type: /[^T]/,
                not_primitive: /[^v]/,
                number: /[diefg]/,
                numeric_arg: /[bcdiefguxX]/,
                json: /[j]/,
                not_json: /[^j]/,
                text: /^[^\x25]+/,
                modulo: /^\x25{2}/,
                placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
                key: /^([a-z_][a-z_\d]*)/i,
                key_access: /^\.([a-z_][a-z_\d]*)/i,
                index_access: /^\[(\d+)\]/,
                sign: /^[+-]/
            };

            function r(e) {
                return function (e, t) {
                    var n,
                        o,
                        s,
                        c,
                        a,
                        u,
                        l,
                        f,
                        h,
                        p = 1,
                        d = e.length,
                        g = "";

                    for (o = 0; o < d; o++) {
                        if ("string" == typeof e[o]) g += e[o];else if ("object" == typeof e[o]) {
                            if ((c = e[o]).keys) for (n = t[p], s = 0; s < c.keys.length; s++) {
                                if (null == n) throw new Error(r('[sprintf] Cannot access property "%s" of undefined value "%s"', c.keys[s], c.keys[s - 1]));
                                n = n[c.keys[s]];
                            } else n = c.param_no ? t[c.param_no] : t[p++];
                            if (i.not_type.test(c.type) && i.not_primitive.test(c.type) && n instanceof Function && (n = n()), i.numeric_arg.test(c.type) && "number" != typeof n && isNaN(n)) throw new TypeError(r("[sprintf] expecting number but found %T", n));

                            switch (i.number.test(c.type) && (f = n >= 0), c.type) {
                                case "b":
                                    n = parseInt(n, 10).toString(2);
                                    break;

                                case "c":
                                    n = String.fromCharCode(parseInt(n, 10));
                                    break;

                                case "d":
                                case "i":
                                    n = parseInt(n, 10);
                                    break;

                                case "j":
                                    n = JSON.stringify(n, null, c.width ? parseInt(c.width) : 0);
                                    break;

                                case "e":
                                    n = c.precision ? parseFloat(n).toExponential(c.precision) : parseFloat(n).toExponential();
                                    break;

                                case "f":
                                    n = c.precision ? parseFloat(n).toFixed(c.precision) : parseFloat(n);
                                    break;

                                case "g":
                                    n = c.precision ? String(Number(n.toPrecision(c.precision))) : parseFloat(n);
                                    break;

                                case "o":
                                    n = (parseInt(n, 10) >>> 0).toString(8);
                                    break;

                                case "s":
                                    n = String(n), n = c.precision ? n.substring(0, c.precision) : n;
                                    break;

                                case "t":
                                    n = String(!!n), n = c.precision ? n.substring(0, c.precision) : n;
                                    break;

                                case "T":
                                    n = Object.prototype.toString.call(n).slice(8, -1).toLowerCase(), n = c.precision ? n.substring(0, c.precision) : n;
                                    break;

                                case "u":
                                    n = parseInt(n, 10) >>> 0;
                                    break;

                                case "v":
                                    n = n.valueOf(), n = c.precision ? n.substring(0, c.precision) : n;
                                    break;

                                case "x":
                                    n = (parseInt(n, 10) >>> 0).toString(16);
                                    break;

                                case "X":
                                    n = (parseInt(n, 10) >>> 0).toString(16).toUpperCase();
                            }

                            i.json.test(c.type) ? g += n : (!i.number.test(c.type) || f && !c.sign ? h = "" : (h = f ? "+" : "-", n = n.toString().replace(i.sign, "")), u = c.pad_char ? "0" === c.pad_char ? "0" : c.pad_char.charAt(1) : " ", l = c.width - (h + n).length, a = c.width && l > 0 ? u.repeat(l) : "", g += c.align ? h + n + a : "0" === u ? h + a + n : a + h + n);
                        }
                    }

                    return g;
                }(function (e) {
                    if (c[e]) return c[e];

                    for (var t, n = e, o = [], r = 0; n;) {
                        if (null !== (t = i.text.exec(n))) o.push(t[0]);else if (null !== (t = i.modulo.exec(n))) o.push("%");else {
                            if (null === (t = i.placeholder.exec(n))) throw new SyntaxError("[sprintf] unexpected placeholder");

                            if (t[2]) {
                                r |= 1;
                                var s = [],
                                    a = t[2],
                                    u = [];
                                if (null === (u = i.key.exec(a))) throw new SyntaxError("[sprintf] failed to parse named argument key");

                                for (s.push(u[1]); "" !== (a = a.substring(u[0].length));) {
                                    if (null !== (u = i.key_access.exec(a))) s.push(u[1]);else {
                                        if (null === (u = i.index_access.exec(a))) throw new SyntaxError("[sprintf] failed to parse named argument key");
                                        s.push(u[1]);
                                    }
                                }

                                t[2] = s;
                            } else r |= 2;

                            if (3 === r) throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
                            o.push({
                                placeholder: t[0],
                                param_no: t[1],
                                keys: t[2],
                                sign: t[3],
                                pad_char: t[4],
                                align: t[5],
                                width: t[6],
                                precision: t[7],
                                type: t[8]
                            });
                        }
                        n = n.substring(t[0].length);
                    }

                    return c[e] = o;
                }(e), arguments);
            }

            function s(e, t) {
                return r.apply(null, [e].concat(t || []));
            }

            var c = Object.create(null);
            t.sprintf = r, t.vsprintf = s, "undefined" != typeof window && (window.sprintf = r, window.vsprintf = s, void 0 === (o = function () {
                return {
                    sprintf: r,
                    vsprintf: s
                };
            }.call(t, n, t, e)) || (e.exports = o));
        }();
    }, function (e, t, n) {
        "use strict";

        n.r(t), function (e) {
            n.d(t, "WebSocketManager", function () {
                return i;
            });
            var o = n(0);
            e.connect = e.connect || {}, connect.WebSocketManager = o.a;
            var i = o.a;
        }.call(this, n(3));
    }, function (e, t) {
        var n;

        n = function () {
            return this;
        }();

        try {
            n = n || new Function("return this")();
        } catch (e) {
            "object" == typeof window && (n = window);
        }

        e.exports = n;
    }]);
}, function (e, t) {
    e.exports = function (e) {
        return e.webpackPolyfill || (e.deprecate = function () {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
            enumerable: !0,
            get: function get() {
                return e.l;
            }
        }), Object.defineProperty(e, "id", {
            enumerable: !0,
            get: function get() {
                return e.i;
            }
        }), e.webpackPolyfill = 1), e;
    };
}]);