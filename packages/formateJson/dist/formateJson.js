/*!
 * better-scroll / formateJson
 * (c) 2016-2021 ustbhuangyi
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.FormateJson = factory());
}(this, (function () { 'use strict';

  var FormateJson = /** @class */ (function () {
      function FormateJson() {
      }
      /**
       * @description 树循环方法
       * @private
       * @param {DeepJson[]} json
       * @param {Function} callback
       * @param {DeepNewKeyJson[]} [result=[]]
       * @return {*}  {DeepNewKeyJson[]}
       * @memberof FormateJson
       */
      FormateJson.prototype.deepJson = function (json, callback, result) {
          if (result === void 0) { result = []; }
          if (!json.length)
              return [];
          var len = json.length;
          for (var i = 0; i < len; i++) {
              var item = json[i];
              var resultItem = callback(item);
              result.push(resultItem);
              if (item.childArea.length) {
                  this.deepJson(item.childArea, callback, result);
              }
          }
          return result;
      };
      /**
       * @description 同步树的每一项的改变
       * @private
       * @param {DeepJson} jsonItem
       * @param {string[]} oldKey
       * @param {string[]} newKey
       * @return {*}  {({ [key: string]: string | { key: string }[] })}
       * @memberof FormateJson
       */
      FormateJson.prototype.synchronizeAttr = function (jsonItem, oldKey, newKey) {
          if (!jsonItem) {
              throw Error;
          }
          var result = {};
          var _loop_1 = function (key) {
              var item = jsonItem[key];
              var index = oldKey.findIndex(function (t) { return t === key; });
              if (index === -1) ;
              else {
                  result[newKey[index]] = item;
              }
          };
          for (var key in jsonItem) {
              _loop_1(key);
          }
          return result;
      };
      /**
       * @description 默认方法，返回指定格式的 树结构
       * @param {DeepJson[]} [json=[]]
       * @param {Options} [options={ target: 'addressTreePCD', oldKey: ['childArea', 'areaName', 'areaCode'], newKey: ['children', 'label', 'value'] }]
       * @return {*}  {DeepNewKeyJson[]}
       * @memberof FormateJson
       */
      FormateJson.prototype.init = function (json, options) {
          if (json === void 0) { json = []; }
          if (options === void 0) { options = { target: 'addressTreePCD', oldKey: ['childArea', 'areaName', 'areaCode'], newKey: ['children', 'label', 'value'] }; }
          if (!Array.isArray(json)) {
              throw Error('json is not array');
          }
          var target = options.target, oldKey = options.oldKey, newKey = options.newKey;
          var alias = target.charAt(0).toUpperCase() + target.slice(1);
          console.time();
          var result = this["handle" + alias](json, oldKey, newKey);
          console.timeEnd();
          return result;
      };
      /**
       * @description 指定格式，返回树结构
       * @param {DeepJson[]} json
       * @param {string[]} oldKey
       * @param {string[]} newKey
       * @param {Function} [customized=() => { }]
       * @return {*}  {DeepNewKeyJson[]}
       * @memberof FormateJson
       */
      FormateJson.prototype.handleAddressTreePCD = function (json, oldKey, newKey, customized) {
          var _this = this;
          if (!Array.isArray(json)) {
              throw Error('json is not array');
          }
          if (oldKey.length !== newKey.length) {
              console.log('旧的key 不等于 新的key');
              process.exit(0);
          }
          var result = this.deepJson(json, function (item) {
              var result = _this.synchronizeAttr(item, oldKey, newKey);
              return result;
          });
          return result;
      };
      FormateJson.selfName = 'formateJson';
      return FormateJson;
  }());

  return FormateJson;

})));
