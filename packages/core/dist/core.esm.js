/*!
 * better-scroll / core
 * (c) 2016-2021 ustbhuangyi
 * Released under the MIT License.
 */
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

export { AuxiliaryTool };
