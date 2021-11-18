/*!
 * better-scroll / auxiliary-tool
 * (c) 2016-2021 ustbhuangyi
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.AuxiliaryTool = factory());
}(this, (function () { 'use strict';

  var AuxiliaryTool = /** @class */ (function () {
      function AuxiliaryTool() {
      }
      AuxiliaryTool.selfName = 'auxiliaryTool';
      return AuxiliaryTool;
  }());

  return AuxiliaryTool;

})));
