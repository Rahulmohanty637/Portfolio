!(function (n, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((n =
        "undefined" != typeof globalThis ? globalThis : n || self).LazyLoad =
        t());
})(this, function () {
  "use strict";
  function n() {
    return (
      (n =
        Object.assign ||
        function (n) {
          for (var t = 1; t < arguments.length; t++) {
            var e = arguments[t];
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (n[i] = e[i]);
          }
          return n;
        }),
      n.apply(this, arguments)
    );
  }
  var t = "undefined" != typeof window,
    e =
      (t && !("onscroll" in window)) ||
      ("undefined" != typeof navigator &&
        /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
    i = t && "IntersectionObserver" in window,
    o = t && "classList" in document.createElement("p"),
    a = t && window.devicePixelRatio > 1,
    r = {
      elements_selector: ".lazy",
      container: e || t ? document : null,
      threshold: 300,
      thresholds: null,
      data_src: "src",
      data_srcset: "srcset",
      data_sizes: "sizes",
      data_bg: "bg",
      data_bg_hidpi: "bg-hidpi",
      data_bg_multi: "bg-multi",
      data_bg_multi_hidpi: "bg-multi-hidpi",
      data_poster: "poster",
      class_applied: "applied",
      class_loading: "loading",
      class_loaded: "loaded",
      class_error: "error",
      class_entered: "entered",
      class_exited: "exited",
      unobserve_completed: !0,
      unobserve_entered: !1,
      cancel_on_exit: !0,
      callback_enter: null,
      callback_exit: null,
      callback_applied: null,
      callback_loading: null,
      callback_loaded: null,
      callback_error: null,
      callback_finish: null,
      callback_cancel: null,
      use_native: !1,
    },
    c = function (t) {
      return n({}, r, t);
    },
    u = function (n, t) {
      var e,
        i = "LazyLoad::Initialized",
        o = new n(t);
      try {
        e = new CustomEvent(i, { detail: { instance: o } });
      } catch (n) {
        (e = document.createEvent("CustomEvent")).initCustomEvent(i, !1, !1, {
          instance: o,
        });
      }
      window.dispatchEvent(e);
    },
    l = "src",
    s = "srcset",
    f = "sizes",
    d = "poster",
    _ = "llOriginalAttrs",
    g = "data",
    v = "loading",
    b = "loaded",
    p = "applied",
    h = "error",
    m = "native",
    E = "data-",
    I = "ll-status",
    y = function (n, t) {
      return n.getAttribute(E + t);
    },
    A = function (n) {
      return y(n, I);
    },
    k = function (n, t) {
      return (function (n, t, e) {
        var i = "data-ll-status";
        null !== e ? n.setAttribute(i, e) : n.removeAttribute(i);
      })(n, 0, t);
    },
    L = function (n) {
      return k(n, null);
    },
    w = function (n) {
      return null === A(n);
    },
    O = function (n) {
      return A(n) === m;
    },
    x = [v, b, p, h],
    C = function (n, t, e, i) {
      n && (void 0 === i ? (void 0 === e ? n(t) : n(t, e)) : n(t, e, i));
    },
    N = function (n, t) {
      o ? n.classList.add(t) : (n.className += (n.className ? " " : "") + t);
    },
    M = function (n, t) {
      o
        ? n.classList.remove(t)
        : (n.className = n.className
            .replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ")
            .replace(/^\s+/, "")
            .replace(/\s+$/, ""));
    },
    z = function (n) {
      return n.llTempImage;
    },
    T = function (n, t) {
      if (t) {
        var e = t._observer;
        e && e.unobserve(n);
      }
    },
    R = function (n, t) {
      n && (n.loadingCount += t);
    },
    G = function (n, t) {
      n && (n.toLoadCount = t);
    },
    D = function (n) {
      for (var t, e = [], i = 0; (t = n.children[i]); i += 1)
        "SOURCE" === t.tagName && e.push(t);
      return e;
    },
    V = function (n, t) {
      var e = n.parentNode;
      e && "PICTURE" === e.tagName && D(e).forEach(t);
    },
    F = function (n, t) {
      D(n).forEach(t);
    },
    j = [l],
    B = [l, d],
    J = [l, s, f],
    P = [g],
    S = function (n) {
      return !!n[_];
    },
    U = function (n) {
      return n[_];
    },
    $ = function (n) {
      return delete n[_];
    },
    q = function (n, t) {
      if (!S(n)) {
        var e = {};
        t.forEach(function (t) {
          e[t] = n.getAttribute(t);
        }),
          (n[_] = e);
      }
    },
    H = function (n, t) {
      if (S(n)) {
        var e = U(n);
        t.forEach(function (t) {
          !(function (n, t, e) {
            e ? n.setAttribute(t, e) : n.removeAttribute(t);
          })(n, t, e[t]);
        });
      }
    },
    K = function (n, t, e) {
      N(n, t.class_loading),
        k(n, v),
        e && (R(e, 1), C(t.callback_loading, n, e));
    },
    Q = function (n, t, e) {
      e && n.setAttribute(t, e);
    },
    W = function (n, t) {
      Q(n, f, y(n, t.data_sizes)),
        Q(n, s, y(n, t.data_srcset)),
        Q(n, l, y(n, t.data_src));
    },
    X = {
      IMG: function (n, t) {
        V(n, function (n) {
          q(n, J), W(n, t);
        }),
          q(n, J),
          W(n, t);
      },
      IFRAME: function (n, t) {
        q(n, j), Q(n, l, y(n, t.data_src));
      },
      VIDEO: function (n, t) {
        F(n, function (n) {
          q(n, j), Q(n, l, y(n, t.data_src));
        }),
          q(n, B),
          Q(n, d, y(n, t.data_poster)),
          Q(n, l, y(n, t.data_src)),
          n.load();
      },
      OBJECT: function (n, t) {
        q(n, P), Q(n, g, y(n, t.data_src));
      },
    },
    Y = ["IMG", "IFRAME", "VIDEO", "OBJECT"],
    Z = function (n, t) {
      !t ||
        (function (n) {
          return n.loadingCount > 0;
        })(t) ||
        (function (n) {
          return n.toLoadCount > 0;
        })(t) ||
        C(n.callback_finish, t);
    },
    nn = function (n, t, e) {
      n.addEventListener(t, e), (n.llEvLisnrs[t] = e);
    },
    tn = function (n, t, e) {
      n.removeEventListener(t, e);
    },
    en = function (n) {
      return !!n.llEvLisnrs;
    },
    on = function (n) {
      if (en(n)) {
        var t = n.llEvLisnrs;
        for (var e in t) {
          var i = t[e];
          tn(n, e, i);
        }
        delete n.llEvLisnrs;
      }
    },
    an = function (n, t, e) {
      !(function (n) {
        delete n.llTempImage;
      })(n),
        R(e, -1),
        (function (n) {
          n && (n.toLoadCount -= 1);
        })(e),
        M(n, t.class_loading),
        t.unobserve_completed && T(n, e);
    },
    rn = function (n, t, e) {
      var i = z(n) || n;
      en(i) ||
        (function (n, t, e) {
          en(n) || (n.llEvLisnrs = {});
          var i = "VIDEO" === n.tagName ? "loadeddata" : "load";
          nn(n, i, t), nn(n, "error", e);
        })(
          i,
          function (o) {
            !(function (n, t, e, i) {
              var o = O(t);
              an(t, e, i),
                N(t, e.class_loaded),
                k(t, b),
                C(e.callback_loaded, t, i),
                o || Z(e, i);
            })(0, n, t, e),
              on(i);
          },
          function (o) {
            !(function (n, t, e, i) {
              var o = O(t);
              an(t, e, i),
                N(t, e.class_error),
                k(t, h),
                C(e.callback_error, t, i),
                o || Z(e, i);
            })(0, n, t, e),
              on(i);
          }
        );
    },
    cn = function (n, t, e) {
      !(function (n) {
        n.llTempImage = document.createElement("IMG");
      })(n),
        rn(n, t, e),
        (function (n) {
          S(n) || (n[_] = { backgroundImage: n.style.backgroundImage });
        })(n),
        (function (n, t, e) {
          var i = y(n, t.data_bg),
            o = y(n, t.data_bg_hidpi),
            r = a && o ? o : i;
          r &&
            ((n.style.backgroundImage = 'url("'.concat(r, '")')),
            z(n).setAttribute(l, r),
            K(n, t, e));
        })(n, t, e),
        (function (n, t, e) {
          var i = y(n, t.data_bg_multi),
            o = y(n, t.data_bg_multi_hidpi),
            r = a && o ? o : i;
          r &&
            ((n.style.backgroundImage = r),
            (function (n, t, e) {
              N(n, t.class_applied),
                k(n, p),
                e &&
                  (t.unobserve_completed && T(n, t),
                  C(t.callback_applied, n, e));
            })(n, t, e));
        })(n, t, e);
    },
    un = function (n, t, e) {
      !(function (n) {
        return Y.indexOf(n.tagName) > -1;
      })(n)
        ? cn(n, t, e)
        : (function (n, t, e) {
            rn(n, t, e),
              (function (n, t, e) {
                var i = X[n.tagName];
                i && (i(n, t), K(n, t, e));
              })(n, t, e);
          })(n, t, e);
    },
    ln = function (n) {
      n.removeAttribute(l), n.removeAttribute(s), n.removeAttribute(f);
    },
    sn = function (n) {
      V(n, function (n) {
        H(n, J);
      }),
        H(n, J);
    },
    fn = {
      IMG: sn,
      IFRAME: function (n) {
        H(n, j);
      },
      VIDEO: function (n) {
        F(n, function (n) {
          H(n, j);
        }),
          H(n, B),
          n.load();
      },
      OBJECT: function (n) {
        H(n, P);
      },
    },
    dn = function (n, t) {
      (function (n) {
        var t = fn[n.tagName];
        t
          ? t(n)
          : (function (n) {
              if (S(n)) {
                var t = U(n);
                n.style.backgroundImage = t.backgroundImage;
              }
            })(n);
      })(n),
        (function (n, t) {
          w(n) ||
            O(n) ||
            (M(n, t.class_entered),
            M(n, t.class_exited),
            M(n, t.class_applied),
            M(n, t.class_loading),
            M(n, t.class_loaded),
            M(n, t.class_error));
        })(n, t),
        L(n),
        $(n);
    },
    _n = ["IMG", "IFRAME", "VIDEO"],
    gn = function (n) {
      return n.use_native && "loading" in HTMLImageElement.prototype;
    },
    vn = function (n, t, e) {
      n.forEach(function (n) {
        return (function (n) {
          return n.isIntersecting || n.intersectionRatio > 0;
        })(n)
          ? (function (n, t, e, i) {
              var o = (function (n) {
                return x.indexOf(A(n)) >= 0;
              })(n);
              k(n, "entered"),
                N(n, e.class_entered),
                M(n, e.class_exited),
                (function (n, t, e) {
                  t.unobserve_entered && T(n, e);
                })(n, e, i),
                C(e.callback_enter, n, t, i),
                o || un(n, e, i);
            })(n.target, n, t, e)
          : (function (n, t, e, i) {
              w(n) ||
                (N(n, e.class_exited),
                (function (n, t, e, i) {
                  e.cancel_on_exit &&
                    (function (n) {
                      return A(n) === v;
                    })(n) &&
                    "IMG" === n.tagName &&
                    (on(n),
                    (function (n) {
                      V(n, function (n) {
                        ln(n);
                      }),
                        ln(n);
                    })(n),
                    sn(n),
                    M(n, e.class_loading),
                    R(i, -1),
                    L(n),
                    C(e.callback_cancel, n, t, i));
                })(n, t, e, i),
                C(e.callback_exit, n, t, i));
            })(n.target, n, t, e);
      });
    },
    bn = function (n) {
      return Array.prototype.slice.call(n);
    },
    pn = function (n) {
      return n.container.querySelectorAll(n.elements_selector);
    },
    hn = function (n) {
      return (function (n) {
        return A(n) === h;
      })(n);
    },
    mn = function (n, t) {
      return (function (n) {
        return bn(n).filter(w);
      })(n || pn(t));
    },
    En = function (n, e) {
      var o = c(n);
      (this._settings = o),
        (this.loadingCount = 0),
        (function (n, t) {
          i &&
            !gn(n) &&
            (t._observer = new IntersectionObserver(
              function (e) {
                vn(e, n, t);
              },
              (function (n) {
                return {
                  root: n.container === document ? null : n.container,
                  rootMargin: n.thresholds || n.threshold + "px",
                };
              })(n)
            ));
        })(o, this),
        (function (n, e) {
          t &&
            window.addEventListener("online", function () {
              !(function (n, t) {
                var e;
                ((e = pn(n)), bn(e).filter(hn)).forEach(function (t) {
                  M(t, n.class_error), L(t);
                }),
                  t.update();
              })(n, e);
            });
        })(o, this),
        this.update(e);
    };
  return (
    (En.prototype = {
      update: function (n) {
        var t,
          o,
          a = this._settings,
          r = mn(n, a);
        G(this, r.length),
          !e && i
            ? gn(a)
              ? (function (n, t, e) {
                  n.forEach(function (n) {
                    -1 !== _n.indexOf(n.tagName) &&
                      (function (n, t, e) {
                        n.setAttribute("loading", "lazy"),
                          rn(n, t, e),
                          (function (n, t) {
                            var e = X[n.tagName];
                            e && e(n, t);
                          })(n, t),
                          k(n, m);
                      })(n, t, e);
                  }),
                    G(e, 0);
                })(r, a, this)
              : ((o = r),
                (function (n) {
                  n.disconnect();
                })((t = this._observer)),
                (function (n, t) {
                  t.forEach(function (t) {
                    n.observe(t);
                  });
                })(t, o))
            : this.loadAll(r);
      },
      destroy: function () {
        this._observer && this._observer.disconnect(),
          pn(this._settings).forEach(function (n) {
            $(n);
          }),
          delete this._observer,
          delete this._settings,
          delete this.loadingCount,
          delete this.toLoadCount;
      },
      loadAll: function (n) {
        var t = this,
          e = this._settings;
        mn(n, e).forEach(function (n) {
          T(n, t), un(n, e, t);
        });
      },
      restoreAll: function () {
        var n = this._settings;
        pn(n).forEach(function (t) {
          dn(t, n);
        });
      },
    }),
    (En.load = function (n, t) {
      var e = c(t);
      un(n, e);
    }),
    (En.resetStatus = function (n) {
      L(n);
    }),
    t &&
      (function (n, t) {
        if (t)
          if (t.length) for (var e, i = 0; (e = t[i]); i += 1) u(n, e);
          else u(n, t);
      })(En, window.lazyLoadOptions),
    En
  );
});
