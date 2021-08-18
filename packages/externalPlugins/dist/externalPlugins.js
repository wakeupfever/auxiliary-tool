/*!
 * better-scroll / externalPlugins
 * (c) 2016-2021 ustbhuangyi
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ExternalPlugins = factory());
}(this, (function () { 'use strict';

	var ExternalPlugins = /** @class */ (function () {
	    function ExternalPlugins() {
	    }
	    ExternalPlugins.selfName = 'externalPlugins';
	    return ExternalPlugins;
	}());

	return ExternalPlugins;

})));
