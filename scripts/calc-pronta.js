"use strict";
var _typeof =
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
      ? function (e) {
          return typeof e;
        }
      : function (e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol
            ? "symbol"
            : typeof e;
        },
  YZ = YZ || {};
if (((YZ.Widget = YZ.Widget || {}), "undefined" == typeof YZ.Widget.isLoaded)) {
  YZ.Widget.isLoaded = !0;
  var YZ = YZ || {};
  (YZ.Config = YZ.Config || {}),
    (YZ.Config.AssetUrl = "//widget.yazio.com"),
    (YZ.Config.TranslationsUrl = YZ.Config.AssetUrl + "/translations/"),
    (YZ.Config.DataUrl = YZ.Config.AssetUrl + "/data/"),
    (YZ.Config.StylesUrl = YZ.Config.AssetUrl + "/styles/main.css");
  var YZ = YZ || {};
  (YZ.Util = YZ.Util || {}),
    (YZ.Util.isNumeric = function (e) {
      return !isNaN(parseFloat(e)) && isFinite(e);
    }),
    (YZ.Util.hasClass = function (e, a) {
      return (" " + e.className + " ").indexOf(" " + a + " ") > -1;
    }),
    (YZ.Util.roundWithIncrement = function (e, a, t) {
      return Math.ceil((e - t) / a) * a + t;
    }),
    (YZ.Util.toggleVisibility = function (e) {
      YZ.Util.hasClass(e, "yz-hide")
        ? (e.className = e.className.replace(" yz-hide", " yz-show"))
        : YZ.Util.hasClass(e, "yz-show")
        ? (e.className = e.className.replace(" yz-show", " yz-hide"))
        : (e.className += " yz-show");
    }),
    (YZ.Util.insertAfter = function (e, a) {
      a.parentNode.insertBefore(e, a.nextSibling);
    }),
    (YZ.Util.camelCase = function (e) {
      return e.replace(/^-ms-/, "ms-").replace(/-([a-z])/g, function (e, a) {
        return a.toUpperCase();
      });
    }),
    (YZ.Util.getDataAttributes = function (e) {
      for (var a = e.attributes, t = a.length, n = {}; t--; )
        if (a[t]) {
          var i = a[t].name;
          if (0 === i.indexOf("data-")) {
            var l = YZ.Util.camelCase(i.slice(5));
            n[l] = e.getAttribute(i);
          }
        }
      return n;
    }),
    (YZ.Util.substituteVariables = function (e, a, t, n) {
      var i = e.match(new RegExp(a + "\\s*[\\w\\.]+\\s*" + t, "g"));
      if (null !== i) {
        i = i.map(function (e) {
          return e.match(/[\w\.]+/)[0];
        });
        for (var l = 0; l < i.length; l++) {
          var r = n[i[l]];
          r || (r = a + i[l] + t),
            (e = e.replace(
              new RegExp(a + "\\s*" + i[l] + "\\s*" + t, "gi"),
              r
            ));
        }
      }
      return e;
    }),
    (YZ.Util.pendingXdrRequests = []),
    (YZ.Util.removePendingXdr = function (e) {
      var a = YZ.Util.pendingXdrRequests.indexOf(e);
      a >= 0 && YZ.Util.pendingXdrRequests.splice(a, 1);
    }),
    (YZ.Util.ajax = function (e) {
      if ("XDomainRequest" in window && null !== window.XDomainRequest) {
        var a = new XDomainRequest();
        a.open(e.type.toLowerCase(), e.url),
          (a.onload = function () {
            var t = JSON.parse(a.responseText);
            YZ.Util.removePendingXdr(a), e.callback(t);
          }),
          (a.onprogress = function () {}),
          (a.ontimeout = function () {}),
          (a.onerror = function () {
            YZ.Util.removePendingXdr(a);
          }),
          a.send(),
          YZ.Util.pendingXdrRequests.push(a);
      } else {
        var t = new XMLHttpRequest();
        (t.onreadystatechange = function () {
          if (4 === t.readyState && 200 === t.status) {
            var a = JSON.parse(t.responseText);
            e.callback(a);
          }
        }),
          t.open(e.type, e.url, e.async),
          t.send();
      }
    }),
    !(function (e, a) {
      window[e] = a();
    })("YZdomready", function () {
      var e,
        a = [],
        t =
          "object" ===
            ("undefined" == typeof document
              ? "undefined"
              : _typeof(document)) && document,
        n = t && t.documentElement.doScroll,
        i = "DOMContentLoaded",
        l = t && (n ? /^loaded|^c/ : /^loaded|^i|^c/).test(t.readyState);
      return (
        !l &&
          t &&
          t.addEventListener(
            i,
            (e = function () {
              for (t.removeEventListener(i, e), l = 1; (e = a.shift()); ) e();
            })
          ),
        function (e) {
          l ? setTimeout(e, 0) : a.push(e);
        }
      );
    });
  var YZ = YZ || {};
  (YZ.Service = YZ.Service || {}),
    (YZ.Service.IntlService = (function () {
      function e(e, a) {
        return n[a] && n[a][e] ? n[a][e] : e;
      }

      function a(e, a) {
        return YZ.Util.substituteVariables(e, "{{", "}}", n[a]);
      }

      function t(e, a) {
        n.hasOwnProperty(e)
          ? a()
          : YZ.Util.ajax({
              url: YZ.Config.TranslationsUrl + e + ".json",
              async: !0,
              type: "GET",
              callback: function (t) {
                (n[e] = t), a();
              },
            });
      }
      var n = {};
      return {
        parseAndTranslate: a,
        translate: e,
        loadTranslations: t,
      };
    })());
  var YZ = YZ || {};
  (YZ.Component = YZ.Component || {}),
    (YZ.Component.Age = function (e, a) {
      function t() {
        return parseFloat(l.value.replace(",", "."));
      }

      function n(t) {
        var n = YZ.Service.IntlService.parseAndTranslate(
            '<div class="yz-separator-line"><div class="yz-separator-icon">' +
              e +
              '</div></div><p class="yz-calc-step-title">{{ calculator.general.label.age }}</p><div class="yz-calc-step-action"><div class="yz-calc-step-form-group"><input class="yz-calc-text-input" placeholder="21" maxlength="3" name="yz-calc-age-input"><label for="yz-calc-age-input" class="yz-calc-input-label">{{ calculator.general.label.years }}</label></div></div>',
            a.settings.language
          ),
          i = document.createElement("div");
        (i.className = "yz-calc-step"),
          (i.innerHTML = n),
          (l = i.getElementsByTagName("input")[0]),
          t.appendChild(i);
      }

      function i() {
        return YZ.Util.isNumeric(t())
          ? ((l.className = l.className.replace(" yz-has-error", "")),
            (r = !1),
            !0)
          : (r || (l.className += " yz-has-error"), (r = !0), !1);
      }
      var l = null,
        r = !1;
      return {
        getValue: t,
        renderInitialDom: n,
        isValid: i,
      };
    });
  var YZ = YZ || {};
  (YZ.Component = YZ.Component || {}),
    (YZ.Component.Alert = function () {
      function e(e, a, t, l) {
        var r = YZ.Service.IntlService.parseAndTranslate(
          '<button class="yz-close">&times;</button>{{ ' + a + " }}",
          l
        );
        (i = document.createElement("div")),
          (i.className = "yz-calc-alert " + t),
          (i.innerHTML = r),
          YZ.Util.insertAfter(i, e),
          n();
      }

      function a() {
        i.style.setProperty("display", "block", "important");
      }

      function t() {
        i.style.setProperty("display", "none", "important");
      }

      function n() {
        var e = i.getElementsByClassName("yz-close")[0];
        e.addEventListener("click", t);
      }
      var i = null;
      return {
        renderInitialDom: e,
        show: a,
        hide: t,
      };
    });
  var YZ = YZ || {};
  (YZ.Component = YZ.Component || {}),
    (YZ.Component.DailyActivity = function (e, a) {
      function t() {
        return s;
      }

      function n(t) {
        var n =
          '<div class="yz-separator-line"><div class="yz-separator-icon">' +
          e +
          '</div></div><p class="yz-calc-step-title">{{ calculator.daily_need.label.activity }}</p><div class="yz-calc-step-action">';
        (n += i(
          1.4,
          "system.images.url.activity_lightly_active",
          "calculator.daily_need.label.lightly_active",
          "calculator.daily_need.label.lightly_active_description"
        )),
          (n += i(
            1.6,
            "system.images.url.activity_moderately_active",
            "calculator.daily_need.label.moderately_active",
            "calculator.daily_need.label.moderately_active_description"
          )),
          (n += i(
            1.8,
            "system.images.url.activity_active",
            "calculator.daily_need.label.active",
            "calculator.daily_need.label.active_description"
          )),
          (n += i(
            2,
            "system.images.url.activity_very_active",
            "calculator.daily_need.label.very_active",
            "calculator.daily_need.label.very_active_description"
          )),
          (n += '<div class="yz-clearfix"></div></div>'),
          (n = YZ.Service.IntlService.parseAndTranslate(
            n,
            a.settings.language
          )),
          (o = document.createElement("div")),
          (o.className = "yz-clearfix yz-calc-step-full-width"),
          (o.innerHTML = n),
          t.parentNode.appendChild(o),
          (u = o.querySelector(".yz-calc-step-action")),
          l();
      }

      function i(e, a, t, n) {
        var i =
          '<div class="yz-daily-activity-item" data-pal="' +
          e +
          '"><div class="yz-daily-activity-item-image-wrapper"><img src="https://images.yazio.com/{{' +
          a +
          '}}?w=60&amp;h=60&amp;cf&amp;q=90" alt="{{' +
          t +
          '}}" title="{{' +
          t +
          '}}" class="yz-daily-activity-item-image" width="60" height="60"><span class="yz-icon-ok yz-daily-activity-item-icon"></span></div><div class="yz-table"><div class="yz-table-cell"><p class="yz-daily-activity-item-title">{{' +
          t +
          '}}</p><p class="yz-daily-activity-item-description">{{' +
          n +
          "}}</p></div></div></div>";
        return i;
      }

      function l() {
        for (
          var e = o.querySelectorAll(".yz-daily-activity-item"), a = 0;
          a < e.length;
          a++
        )
          e[a].addEventListener("click", r);
      }

      function r() {
        if (!YZ.Util.hasClass(this, "yz-active")) {
          for (
            var e = o.querySelectorAll(".yz-active"), a = 0;
            a < e.length;
            a++
          )
            e[a].className = e[a].className.replace(" yz-active", "");
          (this.className += " yz-active"),
            (s = parseFloat(this.getAttribute("data-pal")));
        }
      }

      function c() {
        return YZ.Util.isNumeric(t())
          ? ((u.className = u.className.replace(" yz-has-error", "")),
            (d = !1),
            !0)
          : (d || (u.className += " yz-has-error"), (d = !0), !1);
      }
      var o = null,
        s = null,
        u = null,
        d = !1;
      return {
        getValue: t,
        renderInitialDom: n,
        isValid: c,
      };
    });
  var YZ = YZ || {};
  (YZ.Component = YZ.Component || {}),
    (YZ.Component.Duration = function (e, a) {
      function t() {
        return parseFloat(l.value.replace(",", "."));
      }

      function n(t) {
        var n = YZ.Service.IntlService.parseAndTranslate(
            '<div class="yz-separator-line"><div class="yz-separator-icon">' +
              e +
              '</div></div><p class="yz-calc-step-title">{{ calculator.calories_burned.label.duration }}</p><div class="yz-calc-step-action"><div class="yz-calc-step-form-group"><input class="yz-calc-text-input" placeholder="30" maxlength="3" name="yz-calc-weight-input"><label for="yz-calc-weight-input" class="yz-calc-input-label">{{ calculator.calories_burned.label.minutes }}</label></div></div>',
            a.settings.language
          ),
          i = document.createElement("div");
        (i.className = "yz-calc-step"),
          (i.innerHTML = n),
          (l = i.getElementsByTagName("input")[0]),
          t.appendChild(i);
      }

      function i() {
        return YZ.Util.isNumeric(t())
          ? ((l.className = l.className.replace(" yz-has-error", "")),
            (r = !1),
            !0)
          : (r || (l.className += " yz-has-error"), (r = !0), !1);
      }
      var l = null,
        r = !1;
      return {
        getValue: t,
        renderInitialDom: n,
        isValid: i,
      };
    });
  var YZ = YZ || {};
  (YZ.Component = YZ.Component || {}),
    (YZ.Component.Gender = function (e, a) {
      function t() {
        for (var e = 0; e < c.length; e++) if (c[e].checked) return c[e].value;
        return null;
      }

      function n(t) {
        var n = YZ.Service.IntlService.parseAndTranslate(
            '<div class="yz-separator-line"><div class="yz-separator-icon">' +
              e +
              '</div></div><p class="yz-calc-step-title">{{ calculator.general.label.gender }}</p><div class="yz-calc-step-action"><div class="yz-calc-step-gender"><input type="radio" class="yz-calc-step-gender-input yz-male" id="' +
              r +
              '-male" name="' +
              r +
              '" value="m"><label class="yz-calc-step-gender-label" for="' +
              r +
              '-male" title="{{ calculator.general.label.male }}"><span class="yz-icon-male"></span></label></div><div class="yz-calc-step-gender"><input type="radio" class="yz-calc-step-gender-input yz-female" id="' +
              r +
              '-female" name="' +
              r +
              '" value="f"><label class="yz-calc-step-gender-label" for="' +
              r +
              '-female" title="{{ calculator.general.label.female }}"><span class="yz-icon-female"></span></label></div></div>',
            a.settings.language
          ),
          l = document.createElement("div");
        (l.className = "yz-calc-step"), (l.innerHTML = n), t.appendChild(l);
        var s = l.getElementsByTagName("input");
        (c[0] = s[0]),
          (c[1] = s[1]),
          (o = l.getElementsByClassName("yz-calc-step-action")[0]);
        for (
          var u = o.querySelectorAll(".yz-calc-step-gender-label"), d = 0;
          d < u.length;
          d++
        )
          u[d].addEventListener("click", i);
      }

      function i(e) {
        var a = this.getAttribute("for"),
          t = document.getElementById(a);
        t.checked = !0;
      }

      function l() {
        return t()
          ? ((o.className = o.className.replace(" yz-has-error", "")),
            (s = !1),
            !0)
          : (s || (o.className += " yz-has-error"), (s = !0), !1);
      }
      var r = "yz-calc-step-gender-" + a.settings.calculatorLabel,
        c = [],
        o = null,
        s = !1;
      return {
        getValue: t,
        renderInitialDom: n,
        isValid: l,
      };
    });
  var YZ = YZ || {};
  (YZ.Component = YZ.Component || {}),
    (YZ.Component.Height = function (e, a) {
      function t() {
        var e = 0;
        if ("cm" === a.settings.heightUnit)
          e = parseFloat(l[0].value.replace(",", "."));
        else {
          var t = parseFloat(l[0].value.replace(",", ".")),
            n = parseFloat(l[1].value.replace(",", "."));
          e = t / 0.0328 + n / 0.3937;
        }
        return e;
      }

      function n(t) {
        var n = "";
        n =
          "cm" === a.settings.heightUnit
            ? YZ.Service.IntlService.parseAndTranslate(
                '<div class="yz-separator-line"><div class="yz-separator-icon">' +
                  e +
                  '</div></div><p class="yz-calc-step-title">{{ calculator.general.label.height }}</p><div class="yz-calc-step-action"><div class="yz-calc-step-form-group" data-input-unit="' +
                  a.settings.heightUnit +
                  '"><input class="yz-calc-text-input yz-text-left" placeholder="170" maxlength="3" name="yz-calc-height-input"><label for="yz-calc-height-input" class="yz-calc-input-label">{{ calculator.general.label.height_simple }}</label></div></div>',
                a.settings.language
              )
            : YZ.Service.IntlService.parseAndTranslate(
                '<div class="yz-separator-line"><div class="yz-separator-icon">' +
                  e +
                  '</div></div><p class="yz-calc-step-title">{{ calculator.general.label.height }}</p><div class="yz-calc-step-action"><div class="yz-calc-step-form-group" data-input-unit="ft"><input class="yz-calc-text-input yz-text-left yz-calc-text-input-small" placeholder="5" maxlength="1" name="yz-calc-height-input"></div><span class="yz-calc-height-separator">/</span><div class="yz-calc-step-form-group" data-input-unit="in"><input class="yz-calc-text-input yz-text-left yz-calc-text-input-small" placeholder="7" maxlength="2" name="yz-calc-height-input"></div><div><label for="yz-calc-height-input" class="yz-calc-input-label">{{ calculator.general.label.height_simple }}</label></div></div>',
                a.settings.language
              );
        var i = document.createElement("div");
        (i.className = "yz-calc-step"), (i.innerHTML = n);
        var r = i.getElementsByTagName("input");
        "cm" === a.settings.heightUnit
          ? (l[0] = r[0])
          : ((l[0] = r[0]), (l[1] = r[1])),
          t.appendChild(i);
      }

      function i() {
        var e = 0;
        if (YZ.Util.isNumeric(t())) {
          for (e = 0; e < l.length; e++)
            l[e].className = l[e].className.replace(" yz-has-error", "");
          return (r = !1), !0;
        }
        if (!r)
          for (e = 0; e < l.length; e++) l[e].className += " yz-has-error";
        return (r = !0), !1;
      }
      var l = [],
        r = !1;
      return {
        getValue: t,
        renderInitialDom: n,
        isValid: i,
      };
    });
  var YZ = YZ || {};
  (YZ.Component = YZ.Component || {}),
    (YZ.Component.SportsAutocomplete = function (e, a) {
      function t() {
        return parseFloat(o.value);
      }

      function n() {
        return s;
      }

      function i(t) {
        l(function () {
          for (var n = "", i = "", l = 0; l < d.allSports.length; l++)
            n +=
              '<option value="' +
              d.allSports[l].pal +
              '">' +
              d.allSports[l].name +
              "</option>";
          for (l = 0; l < d.topSports.length; l++)
            i +=
              '<option value="' +
              d.topSports[l].pal +
              '">' +
              d.topSports[l].name +
              "</option>";
          var c = YZ.Service.IntlService.parseAndTranslate(
              '<div class="yz-separator-line"><div class="yz-separator-icon">' +
                e +
                '</div></div><p class="yz-calc-step-title">{{ calculator.calories_burned.label.enter_exercise }}</p><div class="yz-calc-step-action"><div class="yz-calc-select-group"><select class="yz-calc-select-input"><optgroup label="Beliebteste AktiviÃ¤ten">' +
                i +
                '</optgroup><optgroup label="Alle AktiviÃ¤ten">' +
                n +
                '</optgroup></select><span class="yz-icon-down yz-calc-select-icon"></span></div></div>',
              a.settings.language
            ),
            u = document.createElement("div");
          (u.className = "yz-calc-step-full-width"),
            (u.innerHTML = c),
            (o = u.getElementsByTagName("select")[0]),
            t.parentNode.insertBefore(u, t),
            r(),
            (s = d.topSports[0].name);
        });
      }

      function l(e) {
        YZ.Util.ajax({
          url: YZ.Config.DataUrl + "sports-" + a.settings.language + ".json",
          async: !0,
          type: "GET",
          callback: function (a) {
            (d = a), e();
          },
        });
      }

      function r() {
        o.addEventListener("change", function () {
          s = this.options[this.selectedIndex].innerHTML;
        });
      }

      function c() {
        return YZ.Util.isNumeric(t())
          ? ((o.className = o.className.replace(" yz-has-error", "")),
            (u = !1),
            !0)
          : (u || (o.className += " yz-has-error"), (u = !0), !1);
      }
      var o = null,
        s = "",
        u = !1,
        d = [];
      return {
        getValue: t,
        renderInitialDom: i,
        isValid: c,
        getActivity: n,
      };
    });
  var YZ = YZ || {};
  (YZ.Component = YZ.Component || {}),
    (YZ.Component.Weight = function (e, a) {
      function t() {
        var e = parseFloat(r.value.replace(",", "."));
        return e / n();
      }

      function n() {
        return "kg" === a.settings.weightUnit ? 1 : 2.2046;
      }

      function i(t) {
        var n = "kg" === a.settings.weightUnit ? "69" : "152",
          i = YZ.Service.IntlService.parseAndTranslate(
            '<div class="yz-separator-line"><div class="yz-separator-icon">' +
              e +
              '</div></div><p class="yz-calc-step-title">{{ calculator.general.label.weight }}</p><div class="yz-calc-step-action"><div class="yz-calc-step-form-group" id="yz-calc-step-form-group-weight" data-input-unit="' +
              a.settings.weightUnit +
              '"><input class="yz-calc-text-input yz-text-left" placeholder="' +
              n +
              '" maxlength="4" name="yz-calc-weight-input"><label for="yz-calc-weight-input" class="yz-calc-input-label">{{ calculator.general.label.weight_simple }}</label></div></div>',
            a.settings.language
          ),
          l = document.createElement("div");
        (l.className = "yz-calc-step"),
          (l.innerHTML = i),
          (r = l.getElementsByTagName("input")[0]),
          t.appendChild(l);
      }

      function l() {
        return YZ.Util.isNumeric(t())
          ? ((r.className = r.className.replace(" yz-has-error", "")),
            (c = !1),
            !0)
          : (c || (r.className += " yz-has-error"), (c = !0), !1);
      }
      var r = null,
        c = !1;
      return {
        getValue: t,
        renderInitialDom: i,
        isValid: l,
        getFactor: n,
      };
    });
  var YZ = YZ || {};
  (YZ.Calculator = YZ.Calculator || {}),
    (YZ.Calculator.Base = function (e) {
      function a() {
        if (u && d) throw Error("Calculator already initialized.");
        YZ.Service.IntlService.loadTranslations(
          e.settings.language,
          function () {
            for (var a = 0; a < e.components.length; a++)
              s[e.components[a]] = new YZ.Component[e.components[a]](a + 1, e);
            t(), n(), i();
          }
        );
      }

      function t() {
        var a = document.getElementsByTagName("head")[0],
          t = document.getElementById("yz-custom-styles");
        t && t.parentNode.removeChild(t), (y = document.createElement("style"));
        var n =
          " \n                    .yz-widget {\n                        color: ##textColor## !important;\n                    }\n                    .yz-widget .yz-section-calculator {\n                        background-color: ##backgroundColor## !important;\n                    }\n                    .yz-widget .yz-separator-icon {\n                        border-color: ##backgroundColor## !important; \n                        background-color: ##primaryColor## !important;\n                        color: ##alternateTextColor## !important;\n                    }\n                    .yz-widget .yz-calc-submit, .yz-widget .yz-calc-submit:active {\n                        background-color: ##secondaryColor## !important;\n                        color: ##alternateTextColor## !important;\n                    }\n                    .yz-widget .yz-result-wrapper {\n                        background-color: ##primaryColor## !important;\n                        color: ##alternateTextColor## !important;\n                    }\n                    .yz-widget .yz-calc-text-input {\n                        background-color: ##alternateBackgroundColor## !important;\n                    }\n                    .yz-widget .yz-calc-select-input {\n                        background-color: ##alternateBackgroundColor## !important;\n                    }\n                    .yz-widget .yz-calc-text-input:focus {\n                        border-color: ##primaryColor## !important;\n                        box-shadow: inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px ##primaryColor## !important;\n                    }\n                    .yz-widget .yz-daily-activity-item-icon {\n                        background-color: ##primaryColor## !important;\n                    }\n                    .yz-widget .yz-alert-info {\n                        background-color: ##primaryColor## !important;\n                        color: ##alternateTextColor## !important;\n                    }\n                    .yz-widget .yz-alert-info .yz-close,\n                    .yz-widget .yz-alert-info .yz-close:active,\n                    .yz-widget .yz-alert-info .yz-close:hover,\n                    .yz-widget .yz-alert-info .yz-close:focus {\n                        color: ##alternateTextColor## !important;\n                        background: none !important;\n                    }\n                    .yz-widget .yz-copyright a,\n                    .yz-widget .yz-copyright a:visited,\n                    .yz-widget .yz-copyright a:active,\n                    .yz-widget .yz-copyright a:hover,\n                    .yz-widget .yz-copyright a:focus  {\n                          color: ##primaryColor## !important;\n                          display: inline!important;\n                          visibility: visible!important;\n                          opacity: 1!important;\n                          clip: auto!important;\n                          position: relative!important;\n                          top: auto!important;\n                          bottom: auto!important;\n                          left: auto!important;\n                          right: auto!important;\n                    }\n                    .yz-widget .yz-copyright {\n                        position: absolute!important;\n                        bottom: 0!important;\n                        right: 0!important;\n                        left: auto!important;\n                        top: auto!important;\n                        display: block!important;\n                        visibility: visible!important;\n                        opacity: 1!important;\n                        clip: auto!important;\n                    }\n                ";
        (n = YZ.Util.substituteVariables(n, "##", "##", e.settings)),
          (y.type = "text/css"),
          (y.id = "yz-custom-styles"),
          y.appendChild(document.createTextNode(n)),
          a.appendChild(y);
      }

      function n() {
        var a = document.createElement("section");
        (a.className = "yz-section-calculator"),
          (g = document.createElement("section")),
          (g.className = "yz-section-result yz-hide"),
          (g.innerHTML = YZ.Service.IntlService.parseAndTranslate(
            '\n                    <p class="yz-paragraph yz-result-title">{{ calculator.general.headline.result }}</p>\n                    <div class="yz-separator-line">\n                        <div class="yz-separator-icon"><span class="yz-icon-calculator"></span></div>\n                    </div>\n                ',
            e.settings.language
          ));
        var t = document.createElement("p");
        (t.className = "yz-calc-instruction yz-paragraph"),
          (t.innerHTML = YZ.Service.IntlService.translate(
            "calculator.general.headline.enter_data",
            e.settings.language
          )),
          (d = document.createElement("button")),
          (d.className = "yz-calc-submit"),
          (d.innerHTML = YZ.Service.IntlService.translate(
            "calculator." + e.settings.calculatorType + ".button.calculate",
            e.settings.language
          ));
        var n = document.createElement("div");
        (n.className = "yz-clearfix"), a.appendChild(t), a.appendChild(n);
        for (var i in s)
          "function" == typeof s[i].renderInitialDom &&
            s[i].renderInitialDom(n);
        a.appendChild(d),
          u.appendChild(a),
          u.appendChild(g),
          (p = new YZ.Component.Alert()),
          p.renderInitialDom(
            a,
            "calculator.general.message.need_input",
            "yz-alert-info",
            e.settings.language
          ),
          (m = new YZ.Component.Alert()),
          m.renderInitialDom(
            a,
            "calculator.general.message.complete_form",
            "yz-alert-warning",
            e.settings.language
          ),
          m.hide();
      }

      function i() {
        d.addEventListener("click", l),
          document.addEventListener(
            "keypress",
            function (e) {
              "13" == e.keyCode && l();
            },
            !1
          );
      }

      function l() {
        c()
          ? (e.calculateCallback(), p.hide(), m.hide())
          : (p.hide(), m.show());
      }

      function r(e) {
        return s[e];
      }

      function c() {
        var e = !0;
        for (var a in s)
          "function" != typeof s[a].isValid || s[a].isValid() || (e = !1);
        return e;
      }

      function o() {
        return g;
      }
      var s = {},
        u = e.widgetElement,
        d = null,
        g = null,
        p = null,
        m = null,
        y = null;
      return {
        init: a,
        getComponent: r,
        getResultSection: o,
      };
    });
  var YZ = YZ || {};
  (YZ.Calculator = YZ.Calculator || {}),
    (YZ.Calculator.Bmi = function (e, a) {
      function t() {
        var e = l.getComponent("Height").getValue(),
          a = l.getComponent("Weight").getValue(),
          t = l.getComponent("Weight").getFactor(),
          n = l.getComponent("Age").getValue(),
          c = l.getComponent("Gender").getValue();
        (e /= 100),
          (r.bmi = Math.round((a / (e * e)) * 10) / 10),
          24 > n
            ? ((r.idealBmiRangeBegin = 19), (r.idealBmiRangeEnd = 24))
            : 34 > n
            ? ((r.idealBmiRangeBegin = 20), (r.idealBmiRangeEnd = 25))
            : 44 > n
            ? ((r.idealBmiRangeBegin = 21), (r.idealBmiRangeEnd = 26))
            : 54 > n
            ? ((r.idealBmiRangeBegin = 22), (r.idealBmiRangeEnd = 27))
            : 64 > n
            ? ((r.idealBmiRangeBegin = 23), (r.idealBmiRangeEnd = 28))
            : ((r.idealBmiRangeBegin = 24), (r.idealBmiRangeEnd = 29)),
          "f" === c && ((r.idealBmiRangeBegin -= 1), (r.idealBmiRangeEnd -= 1)),
          (r.idealWeightRangeBegin =
            Math.round(r.idealBmiRangeBegin * e * e * t * 10) / 10),
          (r.idealWeightRangeEnd =
            Math.round(r.idealBmiRangeEnd * e * e * t * 10) / 10),
          (r.currentWeight = Math.round(10 * a * t) / 10),
          i();
      }

      function n() {
        return l.init();
      }

      function i() {
        if (c) for (; c.firstChild; ) c.removeChild(c.firstChild);
        else
          (c = document.createElement("div")),
            (c.className = "yz-result-wrapper");
        "lbs" === a.weightUnit
          ? (r.weightUnit = YZ.Service.IntlService.translate(
              "system.general.unit.lb",
              a.language
            ))
          : (r.weightUnit = YZ.Service.IntlService.translate(
              "system.general.unit.kg",
              a.language
            )),
          r.bmi < r.idealBmiRangeBegin
            ? (r.weightCategory = YZ.Service.IntlService.translate(
                "calculator.general.label.underweight",
                a.language
              ))
            : r.bmi > r.idealBmiRangeEnd
            ? (r.weightCategory = YZ.Service.IntlService.translate(
                "calculator.general.label.overweight",
                a.language
              ))
            : (r.weightCategory = YZ.Service.IntlService.translate(
                "calculator.general.label.healthy",
                a.language
              ));
        var e = l.getResultSection(),
          t =
            '\n                    <div class="yz-bmi-result-part">\n                        <p class="yz-paragraph" id="yz-bmi-result"><strong>{{ calculator.bmi.label.personal_bmi }}: </strong>##bmi## (##weightCategory##)</p>\n                        <p class="yz-paragraph"><strong>{{ landingpage.webmaster.label.addoncalculator1 }}: </strong>##idealBmiRangeBegin## - ##idealBmiRangeEnd## ({{ calculator.general.label.healthy }})</p>\n                        <div class="yz-clearfix"></div>\n                    </div>\n                    <div class="yz-bmi-result-part">\n                        <p class="yz-paragraph"><strong>{{ calculator.bmi.label.current_weight }}: </strong>##currentWeight## ##weightUnit##</p>\n                        <p class="yz-paragraph"><strong>{{ landingpage.webmaster.label.addoncalculator2 }}: </strong>##idealWeightRangeBegin## ##weightUnit## - ##idealWeightRangeEnd## ##weightUnit##</p>\n                        <div class="yz-clearfix"></div>\n                    </div>\n                ';
        (t = YZ.Service.IntlService.parseAndTranslate(t, a.language)),
          (t = YZ.Util.substituteVariables(t, "##", "##", r)),
          (c.innerHTML = t),
          e.appendChild(c),
          (e.className = e.className.replace(" yz-hide", " yz-show"));
      }
      var l = new YZ.Calculator.Base({
          settings: a,
          widgetElement: e,
          calculateCallback: t,
          components: ["Gender", "Age", "Height", "Weight"],
        }),
        r = {
          bmi: 0,
          idealBmiRangeBegin: 0,
          idealBmiRangeEnd: 0,
          currentWeight: 0,
          idealWeightRangeBegin: 0,
          idealWeightRangeEnd: 0,
          weightUnit: a.weightUnit,
        },
        c = null;
      return {
        init: n,
      };
    });
  var YZ = YZ || {};
  (YZ.Calculator = YZ.Calculator || {}),
    (YZ.Calculator.CalorieIntake = function (e, a) {
      function t() {
        var e = l.getComponent("Height").getValue(),
          a = l.getComponent("Weight").getValue(),
          t = l.getComponent("Age").getValue(),
          n = l.getComponent("Gender").getValue(),
          c = l.getComponent("DailyActivity").getValue(),
          o = "f" === n ? -161 : 5,
          s = 10 * a + 6.25 * e - 5 * t + o,
          u = 16 * c,
          d = 7.6,
          g = (u + d) / 24,
          p = YZ.Util.roundWithIncrement(g * s, 10, 0),
          m = 0.5,
          y = 0.1 * a,
          v = a - (a - y),
          h = a - (a + y),
          f = (750 * v) / (v / -m),
          z = (750 * h) / (h / m),
          b = p + f,
          Y = p + z;
        (b = s > b ? s : b),
          (r.caloriesMaintainMin = p - 100),
          (r.caloriesMaintainMax = p + 100),
          (r.caloriesGainMin = Y - 100),
          (r.caloriesGainMax = Y + 100),
          (r.caloriesLooseMin = b),
          (r.caloriesLooseMax = b + 100),
          i();
      }

      function n() {
        l.init();
      }

      function i(e) {
        if (c) for (; c.firstChild; ) c.removeChild(c.firstChild);
        else
          (c = document.createElement("div")),
            (c.className = "yz-result-wrapper");
        var t = l.getResultSection(),
          n =
            '\n                <div class="yz-calorieintake-result-part">\n                    <p class="yz-paragraph"><strong>{{ calculator.daily_need.label.lose_weight }}: </strong> ##caloriesLooseMin## {{ calculator.daily_need.label.to }} ##caloriesLooseMax## kcal ({{ calculator.daily_need.label.calories_per_day }})</p>\n                    <p class="yz-paragraph yz-italic">{{ calculator.daily_need.content.lose_weight }}</p>\n                </div>\n                <div class="yz-calorieintake-result-part">\n                    <p class="yz-paragraph"><strong>{{ calculator.daily_need.label.maintain_weight }}: </strong> ##caloriesMaintainMin## {{ calculator.daily_need.label.to }} ##caloriesMaintainMax## kcal ({{ calculator.daily_need.label.calories_per_day }})</p>\n                    <p class="yz-paragraph yz-italic">{{ calculator.daily_need.content.maintain_weight }}</p>\n                </div>\n                <div class="yz-calorieintake-result-part">\n                    <p class="yz-paragraph"><strong>{{ calculator.daily_need.label.gain_weight }}: </strong> ##caloriesGainMin## {{ calculator.daily_need.label.to }} ##caloriesGainMax## kcal ({{ calculator.daily_need.label.calories_per_day }})</p>\n                    <p class="yz-paragraph yz-italic">{{ calculator.daily_need.content.gain_weight }}</p>\n                </div>\n            ';
        (n = YZ.Service.IntlService.parseAndTranslate(n, a.language)),
          (n = YZ.Util.substituteVariables(n, "##", "##", r)),
          (c.innerHTML = n),
          t.appendChild(c),
          (t.className = t.className.replace(" yz-hide", " yz-show"));
      }
      var l = new YZ.Calculator.Base({
          settings: a,
          widgetElement: e,
          calculateCallback: t,
          components: ["Gender", "Age", "Height", "Weight", "DailyActivity"],
        }),
        r = {
          caloriesMaintainMin: 0,
          caloriesMaintainMax: 0,
          caloriesGainMin: 0,
          caloriesGainMax: 0,
          caloriesLooseMin: 0,
          caloriesLooseMax: 0,
        },
        c = null;
      return {
        init: n,
      };
    });
  var YZ = YZ || {};
  (YZ.Calculator = YZ.Calculator || {}),
    (YZ.Calculator.CaloriesBurned = function (e, a) {
      function t() {
        var e = l.getComponent("Weight").getValue(),
          a = l.getComponent("Age").getValue(),
          t = l.getComponent("Duration").getValue(),
          n = l.getComponent("SportsAutocomplete").getValue(),
          c = l.getComponent("Gender").getValue(),
          o = 170,
          s = "f" === c ? -161 : 5,
          u = 10 * e + 6.25 * o - 5 * a + s;
        (r.calories = Math.round((t * u * n) / 1440)),
          (r.kilojoule = Math.round(4.1868 * r.calories)),
          (r.minWalking = Math.round((r.calories / (3.5 * u)) * 1400)),
          (r.minJogging = Math.round((r.calories / (11 * u)) * 1400)),
          (r.minSwimming = Math.round((r.calories / (6 * u)) * 1400)),
          (r.minCycling = Math.round((r.calories / (4 * u)) * 1400)),
          (r.activity = l.getComponent("SportsAutocomplete").getActivity()),
          (r.duration = t),
          i();
      }

      function n() {
        l.init();
      }

      function i() {
        if (c) for (; c.firstChild; ) c.removeChild(c.firstChild);
        else
          (c = document.createElement("div")),
            (c.className = "yz-result-wrapper");
        var e = YZ.Service.IntlService.translate(
            "calculator.calories_burned.label.result",
            a.language
          ),
          t = YZ.Service.IntlService.translate(
            "calculator.calories_burned.label.you_burned",
            a.language
          );
        (r.current = t
          .replace("%1$s", "<strong>" + r.calories + "</strong>")
          .replace("%2$s", "<strong>" + r.kilojoule + "</strong>")),
          (r.walking = e
            .replace("%1$s", r.calories)
            .replace("%2$s", r.minWalking)),
          (r.jogging = e
            .replace("%1$s", r.calories)
            .replace("%2$s", r.minJogging)),
          (r.swimming = e
            .replace("%1$s", r.calories)
            .replace("%2$s", r.minSwimming)),
          (r.cycling = e
            .replace("%1$s", r.calories)
            .replace("%2$s", r.minCycling));
        var n =
          '\n                    <div class="yz-caloriesburned-part">\n                        <p class="yz-paragraph"><strong>##activity##</strong> -  ##duration## {{ calculator.calories_burned.label.minutes }}</p>\n                        <p class="yz-paragraph">##current##</p>\n                    </div>\n                    <div class="yz-caloriesburned-part">\n                        <p class="yz-paragraph"><strong>{{ calculator.calories_burned.label.other_exercises_same_amount }}</strong></p>\n                        <div class="yz-other-sports">\n                            <p class="yz-paragraph"><strong>{{ activities.sport.label.walking }}: </strong>##walking##</p>\n                            <p class="yz-paragraph"><strong>{{ activities.sport.label.running7mph }}: </strong>##jogging##</p>\n                            <p class="yz-paragraph"><strong>{{ activities.sport.label.crawl }}: </strong>##swimming##</p>\n                            <p class="yz-paragraph"><strong>{{ activities.sport.label.cyclingpleasure }}: </strong>##cycling##</p>\n                            <div class="yz-clearfix"></div>\n                        </div>\n                    </div>\n    \n                ';
        (n = YZ.Service.IntlService.parseAndTranslate(n, a.language)),
          (n = YZ.Util.substituteVariables(n, "##", "##", r)),
          (c.innerHTML = n);
        var i = l.getResultSection();
        i.appendChild(c),
          (i.className = i.className.replace(" yz-hide", " yz-show"));
      }
      var l = new YZ.Calculator.Base({
          settings: a,
          widgetElement: e,
          calculateCallback: t,
          components: [
            "SportsAutocomplete",
            "Duration",
            "Gender",
            "Age",
            "Weight",
          ],
        }),
        r = {
          calories: 0,
          kilojoule: 0,
          duration: 0,
          minWalking: 0,
          minJogging: 0,
          minSwimming: 0,
          minCycling: 0,
          activity: "",
        },
        c = null;
      return {
        init: n,
      };
    });
  var YZ = YZ || {};
  (YZ.Calculator = YZ.Calculator || {}),
    (YZ.Calculator.Idealweight = function (e, a) {
      function t() {
        var e = l.getComponent("Height").getValue(),
          t = l.getComponent("Age").getValue(),
          n = l.getComponent("Gender").getValue(),
          c = "lbs" === a.weightUnit ? 2.2046 : 1;
        e /= 100;
        var o = 0,
          s = 0;
        24 > t
          ? ((o = 19), (s = 24))
          : 34 > t
          ? ((o = 20), (s = 25))
          : 44 > t
          ? ((o = 21), (s = 26))
          : 54 > t
          ? ((o = 22), (s = 27))
          : 64 > t
          ? ((o = 23), (s = 28))
          : ((o = 24), (s = 29)),
          "f" === n && ((o -= 1), (s -= 1)),
          (r.idealWeightRangeBegin = Math.round(o * e * e * c * 10) / 10),
          (r.idealWeightRangeEnd = Math.round(s * e * e * c * 10) / 10),
          i();
      }

      function n() {
        l.init();
      }

      function i() {
        if (c) for (; c.firstChild; ) c.removeChild(c.firstChild);
        else
          (c = document.createElement("div")),
            (c.className = "yz-result-wrapper");
        "lbs" === a.weightUnit
          ? (r.weightUnit = YZ.Service.IntlService.translate(
              "system.general.unit.lb",
              a.language
            ))
          : (r.weightUnit = YZ.Service.IntlService.translate(
              "system.general.unit.kg",
              a.language
            ));
        var e = l.getResultSection(),
          t =
            '\n                <p class="yz-paragraph"><strong>{{ landingpage.webmaster.label.addoncalculator2 }}: </strong>##idealWeightRangeBegin## ##weightUnit## - ##idealWeightRangeEnd## ##weightUnit## ({{ calculator.general.label.healthy }})</p>\n            ';
        (t = YZ.Service.IntlService.parseAndTranslate(t, a.language)),
          (t = YZ.Util.substituteVariables(t, "##", "##", r)),
          (c.innerHTML = t),
          e.appendChild(c),
          (e.className = e.className.replace(" yz-hide", " yz-show"));
      }
      var l = new YZ.Calculator.Base({
          settings: a,
          widgetElement: e,
          calculateCallback: t,
          components: ["Gender", "Age", "Height"],
        }),
        r = {
          idealWeightRangeBegin: 0,
          idealWeightRangeEnd: 0,
          weightUnit: a.weightUnit,
        },
        c = null;
      return {
        init: n,
      };
    });
  var YZ = YZ || {};
  (YZ.Service = YZ.Service || {}),
    (YZ.Service.WidgetManager = (function () {
      function e() {
        if (((u = document.getElementsByClassName(o)), !u))
          throw Error("Could not find any widget tags.");
      }

      function a() {
        for (var e = 0; e < u.length; e++) {
          var a = u[e];
          var n = i(a);
          switch (
            ((n.calculatorLabel = n.calculatorType + e), n.calculatorType)
          ) {
            case "bmi":
              d[e] = new YZ.Calculator.Bmi(a, n);
              break;
            case "daily_need":
              d[e] = new YZ.Calculator.CalorieIntake(a, n);
              break;
            case "calories_burned":
              d[e] = new YZ.Calculator.CaloriesBurned(a, n);
              break;
            case "ideal_weight":
              d[e] = new YZ.Calculator.Idealweight(a, n);
              break;
            default:
              throw Error(
                "Calculator type does not exist. Use either of (bmi, daily_need, calories_burned, ideal_weight)."
              );
          }
          d[e].init();
        }
      }

      function i(e) {
        var a = YZ.Util.getDataAttributes(e);
        if (!a.calculatorType)
          throw Error(
            "Calculator type is not specified. Add it as data attribute."
          );
        if (((a.language = a.language || "en"), -1 === s.indexOf(a.language)))
          throw Error("Specified language is not available.");
        return (
          (a.weightUnit = "kg"),
          (a.heightUnit = "cm"),
          a.unitSystem &&
            ("metric" === a.unitSystem
              ? ((a.weightUnit = "kg"), (a.heightUnit = "cm"))
              : ((a.weightUnit = "lbs"), (a.heightUnit = "ft-in"))),
          a
        );
      }

      function l() {
        var e = document.getElementsByTagName("head")[0],
          a = document.createElement("link");
        (a.rel = "stylesheet"),
          (a.type = "text/css"),
          (a.href = YZ.Config.StylesUrl),
          (a.media = "all"),
          e.appendChild(a);
      }

      function r() {
        if (u) {
          for (var e = 0; e < u.length; e++)
            for (var a = u[e]; a.firstChild; ) a.removeChild(a.firstChild);
          (d = []), (u = null);
        }
      }

      function c() {
        try {
          l(), e(), a();
        } catch (t) {
          console.log(t);
        }
      }
      var o = "yz-widget",
        s = ["en", "de", "es", "pt", "it", "fr"],
        u = null,
        d = [];
      return {
        init: c,
        reset: r,
      };
    })()),
    YZdomready(function () {
      YZ.Service.WidgetManager.init();
    });
}
