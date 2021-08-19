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
      AuxiliaryTool.prototype.use = function (ctor) {
          var name = ctor.selfPluginName;
          var installed = AuxiliaryTool.plugins.some(function (plugin) { return ctor === plugin.ctor; });
          if (installed)
              return AuxiliaryTool;
          if (!name) {
              console.log("Plugin Class must specify plugin's name in static property by 'selfPluginName' field.");
          }
          AuxiliaryTool.plugins.push({
              name: ctor.selfPluginName,
              ctor: ctor
          });
          return AuxiliaryTool;
      };
      AuxiliaryTool.plugins = [];
      return AuxiliaryTool;
  }());

  exports.AuxiliaryTool = AuxiliaryTool;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
if(typeof window !== "undefined" && window.BScroll) { 
  window.BScroll = window.BScroll.default;
}
