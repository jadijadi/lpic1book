!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t()
    : "function" == typeof define && define.amd
    ? define(t)
    : t();
})(0, function () {
  "use strict";
  var e =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          },
    t = function (e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    },
    n = (function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    })(),
    r = function (e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t));
    },
    o = function (e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    };
  !(function (t, n) {
    var r = t.document,
      o = t.Object,
      l = (function (e) {
        var t,
          n,
          r,
          l,
          i = /^[A-Z]+[a-z]/,
          a = function (e, t) {
            (t = t.toLowerCase()) in u ||
              ((u[e] = (u[e] || []).concat(t)),
              (u[t] = u[t.toUpperCase()] = e));
          },
          u = (o.create || o)(null),
          c = {};
        for (n in e)
          for (l in e[n])
            for (r = e[n][l], u[l] = r, t = 0; t < r.length; t++)
              u[r[t].toLowerCase()] = u[r[t].toUpperCase()] = l;
        return (
          (c.get = function (e) {
            return "string" == typeof e
              ? u[e] || (i.test(e) ? [] : "")
              : (function (e) {
                  var t,
                    n = [];
                  for (t in u) e.test(t) && n.push(t);
                  return n;
                })(e);
          }),
          (c.set = function (e, t) {
            return i.test(e) ? a(e, t) : a(t, e), c;
          }),
          c
        );
      })({
        collections: {
          HTMLAllCollection: ["all"],
          HTMLCollection: ["forms"],
          HTMLFormControlsCollection: ["elements"],
          HTMLOptionsCollection: ["options"],
        },
        elements: {
          Element: ["element"],
          HTMLAnchorElement: ["a"],
          HTMLAppletElement: ["applet"],
          HTMLAreaElement: ["area"],
          HTMLAttachmentElement: ["attachment"],
          HTMLAudioElement: ["audio"],
          HTMLBRElement: ["br"],
          HTMLBaseElement: ["base"],
          HTMLBodyElement: ["body"],
          HTMLButtonElement: ["button"],
          HTMLCanvasElement: ["canvas"],
          HTMLContentElement: ["content"],
          HTMLDListElement: ["dl"],
          HTMLDataElement: ["data"],
          HTMLDataListElement: ["datalist"],
          HTMLDetailsElement: ["details"],
          HTMLDialogElement: ["dialog"],
          HTMLDirectoryElement: ["dir"],
          HTMLDivElement: ["div"],
          HTMLDocument: ["document"],
          HTMLElement: [
            "element",
            "abbr",
            "address",
            "article",
            "aside",
            "b",
            "bdi",
            "bdo",
            "cite",
            "code",
            "command",
            "dd",
            "dfn",
            "dt",
            "em",
            "figcaption",
            "figure",
            "footer",
            "header",
            "i",
            "kbd",
            "mark",
            "nav",
            "noscript",
            "rp",
            "rt",
            "ruby",
            "s",
            "samp",
            "section",
            "small",
            "strong",
            "sub",
            "summary",
            "sup",
            "u",
            "var",
            "wbr",
          ],
          HTMLEmbedElement: ["embed"],
          HTMLFieldSetElement: ["fieldset"],
          HTMLFontElement: ["font"],
          HTMLFormElement: ["form"],
          HTMLFrameElement: ["frame"],
          HTMLFrameSetElement: ["frameset"],
          HTMLHRElement: ["hr"],
          HTMLHeadElement: ["head"],
          HTMLHeadingElement: ["h1", "h2", "h3", "h4", "h5", "h6"],
          HTMLHtmlElement: ["html"],
          HTMLIFrameElement: ["iframe"],
          HTMLImageElement: ["img"],
          HTMLInputElement: ["input"],
          HTMLKeygenElement: ["keygen"],
          HTMLLIElement: ["li"],
          HTMLLabelElement: ["label"],
          HTMLLegendElement: ["legend"],
          HTMLLinkElement: ["link"],
          HTMLMapElement: ["map"],
          HTMLMarqueeElement: ["marquee"],
          HTMLMediaElement: ["media"],
          HTMLMenuElement: ["menu"],
          HTMLMenuItemElement: ["menuitem"],
          HTMLMetaElement: ["meta"],
          HTMLMeterElement: ["meter"],
          HTMLModElement: ["del", "ins"],
          HTMLOListElement: ["ol"],
          HTMLObjectElement: ["object"],
          HTMLOptGroupElement: ["optgroup"],
          HTMLOptionElement: ["option"],
          HTMLOutputElement: ["output"],
          HTMLParagraphElement: ["p"],
          HTMLParamElement: ["param"],
          HTMLPictureElement: ["picture"],
          HTMLPreElement: ["pre"],
          HTMLProgressElement: ["progress"],
          HTMLQuoteElement: ["blockquote", "q", "quote"],
          HTMLScriptElement: ["script"],
          HTMLSelectElement: ["select"],
          HTMLShadowElement: ["shadow"],
          HTMLSlotElement: ["slot"],
          HTMLSourceElement: ["source"],
          HTMLSpanElement: ["span"],
          HTMLStyleElement: ["style"],
          HTMLTableCaptionElement: ["caption"],
          HTMLTableCellElement: ["td", "th"],
          HTMLTableColElement: ["col", "colgroup"],
          HTMLTableElement: ["table"],
          HTMLTableRowElement: ["tr"],
          HTMLTableSectionElement: ["thead", "tbody", "tfoot"],
          HTMLTemplateElement: ["template"],
          HTMLTextAreaElement: ["textarea"],
          HTMLTimeElement: ["time"],
          HTMLTitleElement: ["title"],
          HTMLTrackElement: ["track"],
          HTMLUListElement: ["ul"],
          HTMLUnknownElement: ["unknown", "vhgroupv", "vkeygen"],
          HTMLVideoElement: ["video"],
        },
        nodes: {
          Attr: ["node"],
          Audio: ["audio"],
          CDATASection: ["node"],
          CharacterData: ["node"],
          Comment: ["#comment"],
          Document: ["#document"],
          DocumentFragment: ["#document-fragment"],
          DocumentType: ["node"],
          HTMLDocument: ["#document"],
          Image: ["img"],
          Option: ["option"],
          ProcessingInstruction: ["node"],
          ShadowRoot: ["#shadow-root"],
          Text: ["#text"],
          XMLDocument: ["xml"],
        },
      });
    "object" !== (void 0 === n ? "undefined" : e(n)) &&
      (n = {
        type: n || "auto",
      });
    var i,
      a,
      u,
      c,
      s,
      m,
      f,
      p,
      d,
      h = "registerElement",
      L = "__" + h + ((1e5 * t.Math.random()) >> 0),
      C = "addEventListener",
      v = "attached",
      T = "Callback",
      M = "detached",
      E = "extends",
      b = "attributeChanged" + T,
      g = v + T,
      y = "connected" + T,
      H = "disconnected" + T,
      w = "created" + T,
      A = M + T,
      O = "ADDITION",
      _ = "REMOVAL",
      N = "DOMAttrModified",
      S = "DOMContentLoaded",
      D = "DOMSubtreeModified",
      k = "<",
      I = "=",
      P = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,
      F = [
        "ANNOTATION-XML",
        "COLOR-PROFILE",
        "FONT-FACE",
        "FONT-FACE-SRC",
        "FONT-FACE-URI",
        "FONT-FACE-FORMAT",
        "FONT-FACE-NAME",
        "MISSING-GLYPH",
      ],
      R = [],
      x = [],
      V = "",
      z = r.documentElement,
      U =
        R.indexOf ||
        function (e) {
          for (var t = this.length; t-- && this[t] !== e; );
          return t;
        },
      j = o.prototype,
      q = j.hasOwnProperty,
      B = j.isPrototypeOf,
      Z = o.defineProperty,
      G = [],
      K = o.getOwnPropertyDescriptor,
      X = o.getOwnPropertyNames,
      J = o.getPrototypeOf,
      Q = o.setPrototypeOf,
      W = !!o.__proto__,
      Y = "__dreCEv1",
      $ = t.customElements,
      ee =
        !/^force/.test(n.type) && !!($ && $.define && $.get && $.whenDefined),
      te = o.create || o,
      ne =
        t.Map ||
        function () {
          var e,
            t = [],
            n = [];
          return {
            get: function (e) {
              return n[U.call(t, e)];
            },
            set: function (r, o) {
              (e = U.call(t, r)) < 0 ? (n[t.push(r) - 1] = o) : (n[e] = o);
            },
          };
        },
      re =
        t.Promise ||
        function (e) {
          var t = [],
            n = !1,
            r = {
              catch: function () {
                return r;
              },
              then: function (e) {
                return t.push(e), n && setTimeout(o, 1), r;
              },
            };

          function o(e) {
            for (n = !0; t.length; ) t.shift()(e);
          }
          return e(o), r;
        },
      oe = !1,
      le = te(null),
      ie = te(null),
      ae = new ne(),
      ue = function (e) {
        return e.toLowerCase();
      },
      ce =
        o.create ||
        function e(t) {
          return t ? ((e.prototype = t), new e()) : this;
        },
      se =
        Q ||
        (W
          ? function (e, t) {
              return (e.__proto__ = t), e;
            }
          : X && K
          ? (function () {
              function e(e, t) {
                for (var n, r = X(t), o = 0, l = r.length; o < l; o++)
                  (n = r[o]), q.call(e, n) || Z(e, n, K(t, n));
              }
              return function (t, n) {
                do {
                  e(t, n);
                } while ((n = J(n)) && !B.call(n, t));
                return t;
              };
            })()
          : function (e, t) {
              for (var n in t) e[n] = t[n];
              return e;
            }),
      me = t.MutationObserver || t.WebKitMutationObserver,
      fe = (t.HTMLElement || t.Element || t.Node).prototype,
      pe = !B.call(fe, z),
      de = pe
        ? function (e, t, n) {
            return (e[t] = n.value), e;
          }
        : Z,
      he = pe
        ? function (e) {
            return 1 === e.nodeType;
          }
        : function (e) {
            return B.call(fe, e);
          },
      Le = pe && [],
      Ce = fe.attachShadow,
      ve = fe.cloneNode,
      Te = fe.dispatchEvent,
      Me = fe.getAttribute,
      Ee = fe.hasAttribute,
      be = fe.removeAttribute,
      ge = fe.setAttribute,
      ye = r.createElement,
      He = ye,
      we = me && {
        attributes: !0,
        characterData: !0,
        attributeOldValue: !0,
      },
      Ae =
        me ||
        function (e) {
          (De = !1), z.removeEventListener(N, Ae);
        },
      Oe = 0,
      _e = h in r && !/^force-all/.test(n.type),
      Ne = !0,
      Se = !1,
      De = !0,
      ke = !0,
      Ie = !0;

    function Pe() {
      var e = i.splice(0, i.length);
      for (Oe = 0; e.length; ) e.shift().call(null, e.shift());
    }

    function Fe(e, t) {
      for (var n = 0, r = e.length; n < r; n++) Ge(e[n], t);
    }

    function Re(e) {
      return function (t) {
        he(t) && (Ge(t, e), V.length && Fe(t.querySelectorAll(V), e));
      };
    }

    function xe(e) {
      var t = Me.call(e, "is"),
        n = e.nodeName.toUpperCase(),
        r = U.call(R, t ? I + t.toUpperCase() : k + n);
      return t && -1 < r && !Ve(n, t) ? -1 : r;
    }

    function Ve(e, t) {
      return -1 < V.indexOf(e + '[is="' + t + '"]');
    }

    function ze(e) {
      var t = e.currentTarget,
        n = e.attrChange,
        r = e.attrName,
        o = e.target,
        l = e[O] || 2,
        i = e[_] || 3;
      !Ie ||
        (o && o !== t) ||
        !t[b] ||
        "style" === r ||
        (e.prevValue === e.newValue &&
          ("" !== e.newValue || (n !== l && n !== i))) ||
        t[b](r, n === l ? null : e.prevValue, n === i ? null : e.newValue);
    }

    function Ue(e) {
      var t = Re(e);
      return function (e) {
        i.push(t, e.target), Oe && clearTimeout(Oe), (Oe = setTimeout(Pe, 1));
      };
    }

    function je(e) {
      ke && ((ke = !1), e.currentTarget.removeEventListener(S, je)),
        V.length &&
          Fe((e.target || r).querySelectorAll(V), e.detail === M ? M : v),
        pe &&
          (function () {
            for (var e, t = 0, n = Le.length; t < n; t++)
              (e = Le[t]), z.contains(e) || (n--, Le.splice(t--, 1), Ge(e, M));
          })();
    }

    function qe(e, t) {
      ge.call(this, e, t),
        a.call(this, {
          target: this,
        });
    }

    function Be(e, t) {
      se(e, t),
        s
          ? s.observe(e, we)
          : (De && ((e.setAttribute = qe), (e[L] = c(e)), e[C](D, a)),
            e[C](N, ze)),
        e[w] && Ie && ((e.created = !0), e[w](), (e.created = !1));
    }

    function Ze(e) {
      throw new Error("A " + e + " type is already registered");
    }

    function Ge(e, t) {
      var n,
        r,
        o = xe(e);
      -1 < o &&
        (f(e, x[o]),
        (o = 0),
        t !== v || e[v]
          ? t !== M ||
            e[M] ||
            ((e[v] = !1), (e[M] = !0), (r = "disconnected"), (o = 1))
          : ((e[M] = !1),
            (e[v] = !0),
            (r = "connected"),
            (o = 1),
            pe && U.call(Le, e) < 0 && Le.push(e)),
        o && (n = e[t + T] || e[r + T]) && n.call(e));
    }

    function Ke() {}

    function Xe(e, t, n) {
      var o = (n && n[E]) || "",
        l = t.prototype,
        i = ce(l),
        a = t.observedAttributes || G,
        u = {
          prototype: i,
        };
      de(i, w, {
        value: function () {
          if (oe) oe = !1;
          else if (!this[Y]) {
            (this[Y] = !0), new t(this), l[w] && l[w].call(this);
            var e = le[ae.get(t)];
            (!ee || e.create.length > 1) && We(this);
          }
        },
      }),
        de(i, b, {
          value: function (e) {
            -1 < U.call(a, e) && l[b].apply(this, arguments);
          },
        }),
        l[y] &&
          de(i, g, {
            value: l[y],
          }),
        l[H] &&
          de(i, A, {
            value: l[H],
          }),
        o && (u[E] = o),
        (e = e.toUpperCase()),
        (le[e] = {
          constructor: t,
          create: o ? [o, ue(e)] : [e],
        }),
        ae.set(t, e),
        r[h](e.toLowerCase(), u),
        Ye(e),
        ie[e].r();
    }

    function Je(e) {
      var t = le[e.toUpperCase()];
      return t && t.constructor;
    }

    function Qe(e) {
      return "string" == typeof e ? e : (e && e.is) || "";
    }

    function We(e) {
      for (var t, n = e[b], r = n ? e.attributes : G, o = r.length; o--; )
        (t = r[o]),
          n.call(e, t.name || t.nodeName, null, t.value || t.nodeValue);
    }

    function Ye(e) {
      return (
        (e = e.toUpperCase()) in ie ||
          ((ie[e] = {}),
          (ie[e].p = new re(function (t) {
            ie[e].r = t;
          }))),
        ie[e].p
      );
    }

    function $e() {
      $ && delete t.customElements,
        Z(t, "customElements", {
          configurable: !0,
          value: new Ke(),
        }),
        Z(t, "CustomElementRegistry", {
          configurable: !0,
          value: Ke,
        });
      for (
        var e = function (e) {
            var n = t[e];
            if (n) {
              (t[e] = function (e) {
                var t, o;
                return (
                  e || (e = this),
                  e[Y] ||
                    ((oe = !0),
                    (t = le[ae.get(e.constructor)]),
                    ((e = (o = ee && 1 === t.create.length)
                      ? Reflect.construct(n, G, t.constructor)
                      : r.createElement.apply(r, t.create))[Y] = !0),
                    (oe = !1),
                    o || We(e)),
                  e
                );
              }),
                (t[e].prototype = n.prototype);
              try {
                n.prototype.constructor = t[e];
              } catch (r) {
                Z(n, Y, {
                  value: t[e],
                });
              }
            }
          },
          n = l.get(/^HTML[A-Z]*[a-z]/),
          o = n.length;
        o--;
        e(n[o])
      );
      (r.createElement = function (e, t) {
        var n = Qe(t);
        return n ? He.call(this, e, ue(n)) : He.call(this, e);
      }),
        _e || ((Se = !0), r[h](""));
    }
    if (
      (me &&
        (((d = r.createElement("div")).innerHTML = "<div><div></div></div>"),
        new me(function (e, t) {
          if (
            e[0] &&
            "childList" == e[0].type &&
            !e[0].removedNodes[0].childNodes.length
          ) {
            var n = (d = K(fe, "innerHTML")) && d.set;
            n &&
              Z(fe, "innerHTML", {
                set: function (e) {
                  for (; this.lastChild; ) this.removeChild(this.lastChild);
                  n.call(this, e);
                },
              });
          }
          t.disconnect(), (d = null);
        }).observe(d, {
          childList: !0,
          subtree: !0,
        }),
        (d.innerHTML = "")),
      _e ||
        (Q || W
          ? ((f = function (e, t) {
              B.call(t, e) || Be(e, t);
            }),
            (p = Be))
          : (p = f = function (e, t) {
              e[L] || ((e[L] = o(!0)), Be(e, t));
            }),
        pe
          ? ((De = !1),
            (function () {
              var e = K(fe, C),
                t = e.value,
                n = function (e) {
                  var t = new CustomEvent(N, {
                    bubbles: !0,
                  });
                  (t.attrName = e),
                    (t.prevValue = Me.call(this, e)),
                    (t.newValue = null),
                    (t[_] = t.attrChange = 2),
                    be.call(this, e),
                    Te.call(this, t);
                },
                r = function (e, t) {
                  var n = Ee.call(this, e),
                    r = n && Me.call(this, e),
                    o = new CustomEvent(N, {
                      bubbles: !0,
                    });
                  ge.call(this, e, t),
                    (o.attrName = e),
                    (o.prevValue = n ? r : null),
                    (o.newValue = t),
                    n
                      ? (o.MODIFICATION = o.attrChange = 1)
                      : (o[O] = o.attrChange = 0),
                    Te.call(this, o);
                },
                o = function (e) {
                  var t,
                    n = e.currentTarget,
                    r = n[L],
                    o = e.propertyName;
                  r.hasOwnProperty(o) &&
                    ((r = r[o]),
                    ((t = new CustomEvent(N, {
                      bubbles: !0,
                    })).attrName = r.name),
                    (t.prevValue = r.value || null),
                    (t.newValue = r.value = n[o] || null),
                    null == t.prevValue
                      ? (t[O] = t.attrChange = 0)
                      : (t.MODIFICATION = t.attrChange = 1),
                    Te.call(n, t));
                };
              (e.value = function (e, l, i) {
                e === N &&
                  this[b] &&
                  this.setAttribute !== r &&
                  ((this[L] = {
                    className: {
                      name: "class",
                      value: this.className,
                    },
                  }),
                  (this.setAttribute = r),
                  (this.removeAttribute = n),
                  t.call(this, "propertychange", o)),
                  t.call(this, e, l, i);
              }),
                Z(fe, C, e);
            })())
          : me ||
            (z[C](N, Ae),
            z.setAttribute(L, 1),
            z.removeAttribute(L),
            De &&
              ((a = function (e) {
                var t, n, r;
                if (this === e.target) {
                  for (r in ((t = this[L]), (this[L] = n = c(this)), n)) {
                    if (!(r in t)) return u(0, this, r, t[r], n[r], O);
                    if (n[r] !== t[r])
                      return u(1, this, r, t[r], n[r], "MODIFICATION");
                  }
                  for (r in t)
                    if (!(r in n)) return u(2, this, r, t[r], n[r], _);
                }
              }),
              (u = function (e, t, n, r, o, l) {
                var i = {
                  attrChange: e,
                  currentTarget: t,
                  attrName: n,
                  prevValue: r,
                  newValue: o,
                };
                (i[l] = e), ze(i);
              }),
              (c = function (e) {
                for (
                  var t, n, r = {}, o = e.attributes, l = 0, i = o.length;
                  l < i;
                  l++
                )
                  "setAttribute" !== (n = (t = o[l]).name) && (r[n] = t.value);
                return r;
              }))),
        (r[h] = function (e, t) {
          if (
            ((n = e.toUpperCase()),
            Ne &&
              ((Ne = !1),
              me
                ? ((s = (function (e, t) {
                    function n(e, t) {
                      for (var n = 0, r = e.length; n < r; t(e[n++]));
                    }
                    return new me(function (r) {
                      for (var o, l, i, a = 0, u = r.length; a < u; a++)
                        "childList" === (o = r[a]).type
                          ? (n(o.addedNodes, e), n(o.removedNodes, t))
                          : ((l = o.target),
                            Ie &&
                              l[b] &&
                              "style" !== o.attributeName &&
                              (i = Me.call(l, o.attributeName)) !==
                                o.oldValue &&
                              l[b](o.attributeName, o.oldValue, i));
                    });
                  })(Re(v), Re(M))),
                  (m = function (e) {
                    return (
                      s.observe(e, {
                        childList: !0,
                        subtree: !0,
                      }),
                      e
                    );
                  })(r),
                  Ce &&
                    (fe.attachShadow = function () {
                      return m(Ce.apply(this, arguments));
                    }))
                : ((i = []),
                  r[C]("DOMNodeInserted", Ue(v)),
                  r[C]("DOMNodeRemoved", Ue(M))),
              r[C](S, je),
              r[C]("readystatechange", je),
              (fe.cloneNode = function (e) {
                var t = ve.call(this, !!e),
                  n = xe(t);
                return (
                  -1 < n && p(t, x[n]),
                  e &&
                    V.length &&
                    (function (e) {
                      for (var t, n = 0, r = e.length; n < r; n++)
                        (t = e[n]), p(t, x[xe(t)]);
                    })(t.querySelectorAll(V)),
                  t
                );
              })),
            Se)
          )
            return (Se = !1);
          if (
            (-2 < U.call(R, I + n) + U.call(R, k + n) && Ze(e),
            !P.test(n) || -1 < U.call(F, n))
          )
            throw new Error("The type " + e + " is invalid");
          var n,
            o,
            l = function () {
              return u ? r.createElement(c, n) : r.createElement(c);
            },
            a = t || j,
            u = q.call(a, E),
            c = u ? t[E].toUpperCase() : n;
          return (
            u && -1 < U.call(R, k + c) && Ze(c),
            (o = R.push((u ? I : k) + n) - 1),
            (V = V.concat(
              V.length ? "," : "",
              u ? c + '[is="' + e.toLowerCase() + '"]' : c
            )),
            (l.prototype = x[o] = q.call(a, "prototype")
              ? a.prototype
              : ce(fe)),
            V.length && Fe(r.querySelectorAll(V), v),
            l
          );
        }),
        (r.createElement = He = function (e, t) {
          var n = Qe(t),
            o = n ? ye.call(r, e, ue(n)) : ye.call(r, e),
            l = "" + e,
            i = U.call(R, (n ? I : k) + (n || l).toUpperCase()),
            a = -1 < i;
          return (
            n &&
              (o.setAttribute("is", (n = n.toLowerCase())),
              a && (a = Ve(l.toUpperCase(), n))),
            (Ie = !r.createElement.innerHTMLHelper),
            a && p(o, x[i]),
            o
          );
        })),
      (Ke.prototype = {
        constructor: Ke,
        define: ee
          ? function (e, t, n) {
              if (n) Xe(e, t, n);
              else {
                var r = e.toUpperCase();
                (le[r] = {
                  constructor: t,
                  create: [r],
                }),
                  ae.set(t, r),
                  $.define(e, t);
              }
            }
          : Xe,
        get: ee
          ? function (e) {
              return $.get(e) || Je(e);
            }
          : Je,
        whenDefined: ee
          ? function (e) {
              return re.race([$.whenDefined(e), Ye(e)]);
            }
          : Ye,
      }),
      !$ || /^force/.test(n.type))
    )
      $e();
    else if (!n.noBuiltIn)
      try {
        !(function (e, n, o) {
          if (
            ((n[E] = "a"),
            ((e.prototype = ce(HTMLAnchorElement.prototype)).constructor = e),
            t.customElements.define(o, e, n),
            Me.call(
              r.createElement("a", {
                is: o,
              }),
              "is"
            ) !== o ||
              (ee && Me.call(new e(), "is") !== o))
          )
            throw n;
        })(
          function e() {
            return Reflect.construct(HTMLAnchorElement, [], e);
          },
          {},
          "document-register-element-a"
        );
      } catch (e) {
        $e();
      }
    if (!n.noBuiltIn)
      try {
        ye.call(r, "a", "a");
      } catch (e) {
        ue = function (e) {
          return {
            is: e.toLowerCase(),
          };
        };
      }
  })(window);
  var l = function (e) {
      return e.toLocaleString("en");
    },
    i = (function (e) {
      function l(e) {
        var n;
        return (
          t(this, l),
          ((n = o(
            this,
            (l.__proto__ || Object.getPrototypeOf(l)).call(this, e)
          )),
          (e = n)).init(),
          o(n, e)
        );
      }
      return (
        r(l, e),
        n(l, [
          {
            key: "init",
            value: function () {},
          },
        ]),
        l
      );
    })(HTMLElement),
    a = (function (e) {
      function a() {
        return (
          t(this, a),
          o(
            this,
            (a.__proto__ || Object.getPrototypeOf(a)).apply(this, arguments)
          )
        );
      }
      return (
        r(a, i),
        n(
          a,
          [
            {
              key: "connectedCallback",
              value: function () {
                var e = this;
                if (!this._connected) {
                  var t;
                  this.classList.add("loading"),
                    (this.style.display = "block"),
                    (this.innerHTML =
                      '\n      <div class="style-root">\n        <div class="shockwave"></div>\n        <div class="count-container">\n          <div class="count"></div>\n        </div>\n        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">\n          <g class="flat">\n            <path d="M57.0443547 6.86206897C57.6058817 6.46227795 57.7389459 5.67962382 57.3416215 5.11431557 56.9442971 4.54900731 56.1672933 4.41483804 55.6055588 4.81504702L52.4950525 7.030721C51.9335255 7.43051202 51.8004613 8.21316614 52.1977857 8.7784744 52.4404567 9.12371996 52.8251182 9.30825496 53.2153846 9.30825496 53.4640757 9.30825496 53.7152578 9.23343783 53.9338485 9.07753396L57.0443547 6.86206897zM48.8035059 6.1414838C48.94778 6.19623824 49.0959982 6.22215256 49.2415177 6.22215256 49.7455426 6.22215256 50.2198824 5.91201672 50.4075424 5.40898642L51.7485642 1.81818182C51.9906124 1.17011494 51.664906.447021944 51.0209664.203343783 50.3772345-.0405433647 49.6587706.287774295 49.4167224.93584117L48.0757006 4.52664577C47.83386 5.17471264 48.1595664 5.89780564 48.8035059 6.1414838zM58.5931726 11.6219436C58.5846615 11.6219436 58.5761504 11.6219436 58.5674317 11.6219436L54.7579749 11.6541275C54.0702341 11.6681296 53.5240687 12.1985371 53.5379772 12.8909091 53.551678 13.5745037 54.1065621 14.1297806 54.7828855 14.1297806 54.7913966 14.1297806 54.7999077 14.1297806 54.8086265 14.1297806L58.6180833 14.0643678C59.305824 14.0501567 59.8519894 13.4934169 59.838081 12.8010449 59.8243801 12.1174504 59.269496 11.6219436 58.5931726 11.6219436z"/>\n            <path d="M37.1910045 6.68944619C37.7313574 6.14566353 38.4431784 5.8737722 39.155207 5.8737722 39.967916 5.8737722 40.7808327 6.22800418 41.3380002 6.93667712 42.2214969 8.06039707 42.0666359 9.69111808 41.0600392 10.7042842L39.777765 11.9949843C39.5801407 12.1276907 39.3877061 12.2695925 39.2075193 12.430303 39.0619998 11.5985371 38.7167801 10.7954023 38.1668781 10.0961338 37.4907623 9.23636364 36.588375 8.62424242 35.5772114 8.31410658L37.1910045 6.68944619zM28.5289586 3.66394984C29.0691039 3.12016719 29.7811325 2.84827586 30.4931611 2.84827586 31.3060777 2.84848485 32.1187868 3.20271682 32.6759543 3.91138976 33.559451 5.03510972 33.40459 6.66562173 32.3979933 7.67878788L17.6760235 22.3467085 17.6276554 20.6499478C17.6149925 19.014629 16.8595779 17.554441 15.6854573 16.5945664L28.5289586 3.66394984zM.624996757 36.9889537C.491717597 36.554099.508245877 35.7327064.906400646 35.2666667L3.45579518 32.2829676C3.45662553 32.2819923 4.33763118 25.8376176 6.09881213 12.9498433 6.09881213 11.4271682 7.33624726 10.1814002 8.84873717 10.1814002 10.3612271 10.1814002 11.5988698 11.4271682 11.5988698 12.9498433L11.6704878 15.4649948C9.18191673 15.8089864 7.24428555 17.9170324 7.14921001 20.492581L4.62804751 38.9475444 3.8946373 39.8060606C3.04504924 39.4926018 2.3776139 39.1458968 1.89233128 38.7659456 1.16440735 38.1960189.758275917 37.4238085.624996757 36.9889537z"/>\n            <path d="M49.6070811,36.8942529 L42.4182909,44.1316614 C36.2784454,50.3128527 29.8604313,55.2743992 24.2225349,56.5113898 C24.0512744,56.5492163 23.8901857,56.6217346 23.7511014,56.7293626 L20.5013032,59.2417973 C20.2908084,59.4045977 20.1673015,59.6181154 19.5026647,59.6181154 C18.8380279,59.6181154 13.0160695,55.8303982 10.3595306,53.2846814 C7.96626306,50.9912532 3.77432047,43.9549368 4.44453927,43.0079415 L6.99372621,40.0244514 C6.99469496,40.0233368 7.87570061,33.578962 9.63674317,20.6913271 C9.63674317,19.168652 10.8743859,17.922675 12.3868758,17.922675 C13.8993657,17.922675 15.1368008,19.168652 15.1368008,20.6913271 L15.2667512,25.2522466 C15.2883404,26.0100313 15.907577,26.5034483 16.5519317,26.5034483 C16.8662207,26.5034483 17.1867374,26.3857889 17.4464306,26.1245559 L32.0670972,11.4054336 C32.6074501,10.861442 33.3190635,10.5897597 34.0312997,10.5897597 C34.8440088,10.5897597 35.6569254,10.9439916 36.214093,11.6526646 C37.0975897,12.7763845 36.942521,14.4071055 35.9359243,15.4202717 L25.8641449,25.5598746 C25.3412294,26.0865204 25.3412294,26.9398119 25.8641449,27.4660397 C26.1288202,27.7324974 26.4757006,27.8658307 26.822581,27.8658307 C27.1694614,27.8658307 27.5165494,27.7324974 27.7810172,27.4660397 L40.7291431,14.43093 C41.2692884,13.8869383 41.9811094,13.615256 42.6933456,13.615256 C43.5060547,13.615465 44.3189713,13.969697 44.8761389,14.6783699 C45.7596356,15.8018809 45.6045669,17.4326019 44.5979702,18.445768 L31.7106677,31.4198537 C31.1806943,31.953605 31.1806943,32.8183908 31.7106677,33.3521421 C31.9718141,33.615047 32.31392,33.7464995 32.656441,33.7464995 C32.9985469,33.7464995 33.3408603,33.615047 33.6020067,33.3521421 L43.7346096,23.1515152 C44.2749625,22.6075235 44.9867835,22.3358412 45.6988121,22.3358412 C46.5115212,22.3358412 47.3244378,22.6900731 47.8816054,23.3989551 C48.7651021,24.522466 48.6100334,26.153187 47.6034367,27.1663532 L37.5667397,37.2708464 C37.0245185,37.8165099 37.0245185,38.7017764 37.5667397,39.2474399 C37.8334909,39.5161964 38.161896,39.6422153 38.4900934,39.6422153 C38.8184984,39.6422153 39.1469035,39.5161964 39.3972552,39.2639498 L45.6195133,32.999791 C46.1802099,32.4353187 46.93085,32.1368861 47.678999,32.1368861 C48.2741552,32.1368861 48.8676508,32.3258098 49.361919,32.7197492 C50.682182,33.7717868 50.7639719,35.7297806 49.6070811,36.8942529 Z"/>\n          </g>\n          <g class="outline">\n            <path d="M57.1428763 6.63333333C57.6856856 6.24686869 57.8143144 5.49030303 57.4302341 4.94383838 57.0461538 4.39737374 56.2950502 4.26767677 55.7520401 4.65454545L52.7452174 6.79636364C52.202408 7.18282828 52.0737793 7.93939394 52.4578595 8.48585859 52.6924415 8.81959596 53.0642809 8.9979798 53.4415385 8.9979798 53.6819398 8.9979798 53.9247492 8.92565657 54.1360535 8.77494949L57.1428763 6.63333333zM49.1767224 5.93676768C49.3161873 5.98969697 49.4594649 6.01474747 49.6001338 6.01474747 50.0873579 6.01474747 50.5458863 5.71494949 50.727291 5.22868687L52.023612 1.75757576C52.257592 1.13111111 51.9427425.432121212 51.3202676.196565657 50.6979933-.0391919192 50.0034783.278181818 49.7694983.904646465L48.4731773 4.37575758C48.239398 5.00222222 48.5542475 5.70121212 49.1767224 5.93676768zM58.6400669 11.2345455C58.6318395 11.2345455 58.623612 11.2345455 58.6151839 11.2345455L54.932709 11.2656566C54.267893 11.2791919 53.7399331 11.7919192 53.7533779 12.4612121 53.7666221 13.1220202 54.30301 13.6587879 54.9567893 13.6587879 54.9650167 13.6587879 54.9732441 13.6587879 54.9816722 13.6587879L58.6641472 13.5955556C59.3289632 13.5818182 59.8569231 13.0436364 59.8434783 12.3743434 59.8302341 11.7135354 59.2938462 11.2345455 58.6400669 11.2345455zM51.2107023 29.7280808C50.5940468 29.2365657 49.8640134 28.9020202 49.0922408 28.7448485 49.1432107 28.6519192 49.1907692 28.5573737 49.2357191 28.4614141L49.7189298 27.9749495C51.5799331 26.1012121 51.7753846 23.1519192 50.1732441 21.1141414 49.4169231 20.1523232 48.3670234 19.5131313 47.2009365 19.2745455 47.284214 19.120202 47.3580602 18.9624242 47.4250836 18.8022222 48.6925084 16.9539394 48.6718395 14.469899 47.2681605 12.6844444 46.5116388 11.7220202 45.4613378 11.0808081 44.2946488 10.8426263 45.2578595 9.05959596 45.1348495 6.83737374 43.8481605 5.20121212 42.8753177 3.96383838 41.4182609 3.25393939 39.8502341 3.25393939 38.5946488 3.25393939 37.4101003 3.70565657 36.480602 4.53272727 36.3399331 3.72888889 36.0064214 2.95252525 35.4748495 2.27636364 34.501806 1.0389899 33.0447492.329292929 31.4767224.329090909 30.1141806.329090909 28.8351171.861414141 27.8753177 1.82767677L15.6666221 14.1185859 15.6200669 12.4781818C15.5985953 9.68424242 13.3340468 7.41777778 10.5537793 7.41777778 7.8238796 7.41777778 5.59143813 9.60262626 5.49110368 12.3264646L3.05377926 30.1660606 1.05050167 32.510303C-.150100334 33.9157576.751318148 36.4103164 1.05050167 37.002855 1.3496852 37.5953936 1.66593319 37.9666982 2.51271962 38.8651283 2.8050341 39.1752704 3.3712736 39.6680391 4.21143813 40.3434343 3.2935786 41.7335354 4.72327715 47.298456 9.51045561 52.4226263 15.4436869 58.7735254 20.1888963 59.9262626 21.1316388 59.9262626 21.9056187 59.9262626 22.6703679 59.6646465 23.2846154 59.189899L26.2031438 56.9337374C29.0107023 56.2660606 32.1060201 54.7492929 35.4086288 52.4226263 38.2924415 50.3907071 41.4210702 47.6832323 44.7070234 44.3749495L51.656388 37.3787879C52.681204 36.3470707 53.220602 34.9165657 53.1363211 33.4541414 53.0520401 31.9941414 52.350301 30.6361616 51.2107023 29.7280808zM37.9513043 6.46646465C38.4736455 5.94080808 39.1617391 5.6779798 39.8500334 5.6779798 40.6356522 5.6779798 41.4214716 6.02040404 41.9600669 6.70545455 42.8141137 7.79171717 42.6644147 9.36808081 41.6913712 10.3474747L40.4518395 11.5951515C40.2608027 11.7234343 40.0747826 11.8606061 39.900602 12.0159596 39.7599331 11.2119192 39.4262207 10.4355556 38.8946488 9.75959596 38.2410702 8.92848485 37.3687625 8.33676768 36.3913043 8.0369697L37.9513043 6.46646465zM29.5779933 3.54181818C30.1001338 3.01616162 30.7884281 2.75333333 31.4767224 2.75333333 32.2625418 2.75353535 33.0481605 3.0959596 33.5867559 3.7810101 34.4408027 4.86727273 34.2911037 6.44343434 33.3180602 7.42282828L19.0868227 21.6018182 19.0400669 19.9616162C19.0278261 18.3808081 18.297592 16.9692929 17.1626087 16.0414141L29.5779933 3.54181818zM2.60416353 35.7559886C2.47532701 35.335629 2.49130435 34.5416162 2.87618729 34.0911111L5.34060201 31.2068687C5.34140468 31.2059259 6.19304348 24.9763636 7.89551839 12.5181818 7.89551839 11.0462626 9.09170569 9.8420202 10.5537793 9.8420202 12.0158528 9.8420202 13.2122408 11.0462626 13.2122408 12.5181818L13.2814716 14.9494949C10.8758528 15.2820202 9.00280936 17.319798 8.91090301 19.8094949L6.47377926 37.6492929 5.76481605 38.4791919C4.9435476 38.1761817 4.2983601 37.8410335 3.82925357 37.4737474 3.12559377 36.9228183 2.73300005 36.1763482 2.60416353 35.7559886zM49.9535117 35.6644444L43.0043478 42.6606061C37.0691639 48.6357576 30.8650836 53.4319192 25.4151171 54.6276768 25.2495652 54.6642424 25.0938462 54.7343434 24.959398 54.8383838L21.8179264 57.2670707C21.6144482 57.4244444 21.4950582 57.6308449 20.8525759 57.6308449 20.2100936 57.6308449 14.5822005 53.9693849 12.0142129 51.5085254 9.70072096 49.2915447 5.64850979 42.4897722 6.29638796 41.5743434L8.76060201 38.690303C8.76153846 38.6892256 9.61317726 32.4596633 11.3155184 20.0016162 11.3155184 18.529697 12.5119064 17.3252525 13.9739799 17.3252525 15.4360535 17.3252525 16.6322408 18.529697 16.6322408 20.0016162L16.7578595 24.4105051C16.7787291 25.1430303 17.3773244 25.62 18.0002007 25.62 18.3040134 25.62 18.6138462 25.5062626 18.8648829 25.2537374L32.998194 11.0252525C33.5205351 10.4993939 34.2084281 10.2367677 34.8969231 10.2367677 35.6825418 10.2367677 36.4683612 10.5791919 37.0069565 11.2642424 37.8610033 12.3505051 37.7111037 13.9268687 36.7380602 14.9062626L27.0020067 24.7078788C26.4965217 25.2169697 26.4965217 26.0418182 27.0020067 26.5505051 27.2578595 26.8080808 27.5931773 26.9369697 27.928495 26.9369697 28.2638127 26.9369697 28.5993311 26.8080808 28.8549833 26.5505051L41.371505 13.949899C41.8936455 13.4240404 42.5817391 13.1614141 43.2702341 13.1614141 44.0558528 13.1616162 44.8416722 13.5040404 45.3802676 14.1890909 46.2343144 15.2751515 46.0844147 16.8515152 45.1113712 17.8309091L32.6536455 30.3725253C32.1413378 30.8884848 32.1413378 31.7244444 32.6536455 32.240404 32.906087 32.4945455 33.2367893 32.6216162 33.567893 32.6216162 33.8985953 32.6216162 34.2294983 32.4945455 34.4819398 32.240404L44.2767893 22.379798C44.7991304 21.8539394 45.4872241 21.5913131 46.1755184 21.5913131 46.9611371 21.5913131 47.7469565 21.9337374 48.2855518 22.6189899 49.1395987 23.7050505 48.989699 25.2814141 48.0166555 26.2608081L38.3145151 36.0284848C37.7903679 36.5559596 37.7903679 37.4117172 38.3145151 37.9391919 38.5723746 38.1989899 38.8898328 38.3208081 39.2070903 38.3208081 39.5245485 38.3208081 39.8420067 38.1989899 40.0840134 37.9551515L46.0988629 31.899798C46.6408696 31.3541414 47.3664883 31.0656566 48.089699 31.0656566 48.6650167 31.0656566 49.2387291 31.2482828 49.7165217 31.6290909 50.9927759 32.6460606 51.0718395 34.5387879 49.9535117 35.6644444z"/>\n          </g>\n        </svg>\n        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 20 20">\n          <g class="sparkle">\n          ' +
                      ((t = 5), new Array(t).fill(void 0))
                        .map(function (e) {
                          return '<g><circle cx="0" cy="0" r="1"/></g>';
                        })
                        .join("") +
                      "\n          </g>\n        </svg>\n      </div>\n      "),
                    (this._styleRootElement = this.querySelector(
                      ".style-root"
                    )),
                    (this._countElement = this.querySelector(".count")),
                    this._updateRootColor(),
                    (this._totalClaps = 0);
                  var n,
                    r,
                    o,
                    i,
                    a,
                    u = void 0;
                  (this._initialClapCount = new Promise(function (e) {
                    return (u = e);
                  })),
                    (this._bufferedClaps = 0),
                    (this._updateClaps =
                      ((n = function () {
                        if (e._totalClaps < 10) {
                          var t = Math.min(
                            e._bufferedClaps,
                            10 - e._totalClaps
                          );
                          (n = e.api),
                            (r = t),
                            (o = e.url),
                            fetch(
                              n + "/update-claps" + (o ? "?url=" + o : ""),
                              {
                                method: "POST",
                                headers: {
                                  "Content-Type": "text/plain",
                                },
                                body: JSON.stringify(r + ",3.3.0"),
                              }
                            ).then(function (e) {
                              return e.text();
                            }),
                            (e._totalClaps += t),
                            (e._bufferedClaps = 0);
                        }
                        var n, r, o;
                      }),
                      (r = 2e3),
                      (o = null),
                      function () {
                        var e = this,
                          t = arguments;
                        clearTimeout(o),
                          (o = setTimeout(function () {
                            return n.apply(e, t);
                          }, r));
                      })),
                    this.addEventListener("mousedown", function (t) {
                      if (
                        0 === t.button &&
                        (e.classList.add("clapped"),
                        !e.classList.contains("clap-limit-exceeded"))
                      ) {
                        var n,
                          r,
                          o =
                            Number(e._countElement.innerHTML.replace(",", "")) +
                            1;
                        e.dispatchEvent(
                          new CustomEvent("clapped", {
                            bubbles: !0,
                            detail: {
                              clapCount: o,
                            },
                          })
                        ),
                          (r = "clap"),
                          (n = e).classList.remove(r),
                          setTimeout(function () {
                            n.classList.add(r);
                          }, 100),
                          setTimeout(function () {
                            n.classList.remove(r);
                          }, 1e3),
                          e._bufferedClaps++,
                          e._updateClaps(),
                          setTimeout(function () {
                            e._countElement.innerHTML = l(o);
                          }, 250),
                          e.multiclap
                            ? e._bufferedClaps + e._totalClaps >= 10 &&
                              e.classList.add("clap-limit-exceeded")
                            : e.classList.add("clap-limit-exceeded");
                      }
                    }),
                    ((i = this.api),
                    (a = this.url),
                    fetch(i + "/get-claps" + (a ? "?url=" + a : ""), {
                      headers: {
                        "Content-Type": "text/plain",
                      },
                    }).then(function (e) {
                      return e.text();
                    })).then(function (t) {
                      e.classList.remove("loading");
                      var n = Number(t);
                      u(n), n > 0 && (e._countElement.innerHTML = l(n));
                    }),
                    (this._connected = !0);
                }
              },
            },
            {
              key: "attributeChangedCallback",
              value: function (e, t, n) {
                this._updateRootColor();
              },
            },
            {
              key: "_updateRootColor",
              value: function () {
                if (this._styleRootElement) {
                  var e = this.getAttribute("color") || "green",
                    t = this._styleRootElement.style;
                  (t.fill = e), (t.stroke = e), (t.color = e);
                }
              },
            },
            {
              key: "initialClapCount",
              get: function () {
                return this._initialClapCount;
              },
            },
            {
              key: "color",
              get: function () {
                return this.getAttribute("color");
              },
              set: function (e) {
                e
                  ? this.setAttribute("color", e)
                  : this.removeAttribute("color"),
                  this._updateRootColor();
              },
            },
            {
              key: "api",
              set: function (e) {
                e ? this.setAttribute("api", e) : this.removeAttribute("api");
              },
              get: function () {
                return (
                  this.getAttribute("api") || "https://api.applause-button.com"
                );
              },
            },
            {
              key: "url",
              set: function (e) {
                e ? this.setAttribute("url", e) : this.removeAttribute("url"),
                  this._updateRootColor();
              },
              get: function () {
                return this.getAttribute("url");
              },
            },
            {
              key: "multiclap",
              get: function () {
                return "true" === this.getAttribute("multiclap");
              },
              set: function (e) {
                e
                  ? this.setAttribute("multiclap", e ? "true" : "false")
                  : this.removeAttribute("multiclap");
              },
            },
          ],
          [
            {
              key: "observedAttributes",
              get: function () {
                return ["color"];
              },
            },
          ]
        ),
        a
      );
    })();
  customElements.define("applause-button", a);
});
