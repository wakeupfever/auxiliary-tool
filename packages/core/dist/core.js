/*!
 * better-scroll / core
 * (c) 2016-2021 ustbhuangyi
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['Auxiliary-Tool'] = {}));
}(this, (function (exports) { 'use strict';

  var AuxiliaryTool = /** @class */ (function () {
      function AuxiliaryTool() {
      }
      AuxiliaryTool.prototype.use = function () {
      };
      return AuxiliaryTool;
  }());

  exports.AuxiliaryTool = AuxiliaryTool;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
if(typeof window !== "undefined" && window.BScroll) { 
  window.BScroll = window.BScroll.default;
}
