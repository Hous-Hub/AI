/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ThemeManager = /*#__PURE__*/function () {
  function ThemeManager() {
    _classCallCheck(this, ThemeManager);
    this.themes = {
      "Styl 1": "styles/style1.css",
      "Styl 2": "styles/style2.css",
      "Styl 3": "styles/style3.css",
      "Styl 4": "styles/style4.css"
    };
    this.currentTheme = "Styl 1";
    this.renderLinks();
  }
  return _createClass(ThemeManager, [{
    key: "changeTheme",
    value: function changeTheme(themeName) {
      var linkElement = document.getElementById("theme-link");
      linkElement.href = this.themes[themeName];
      this.currentTheme = themeName;
    }
  }, {
    key: "renderLinks",
    value: function renderLinks() {
      var _this = this;
      var container = document.getElementById("style-switcher");
      container.innerHTML = "";
      var _loop = function _loop(theme) {
        var btn = document.createElement("button");
        btn.textContent = theme;
        btn.onclick = function () {
          return _this.changeTheme(theme);
        };
        container.appendChild(btn);
      };
      for (var theme in this.themes) {
        _loop(theme);
      }
    }
  }]);
}();
document.addEventListener("DOMContentLoaded", function () {
  return new ThemeManager();
});
/******/ })()
;