interface PluginCtor {
  pluginName: string
  new(auxiliary: any): any
}

interface PluginItem {
  name: string
  ctor: PluginCtor
}

export class AuxiliaryTool {
  static plugins: PluginItem[] = []
  use(ctor: PluginCtor) {
    const name = ctor.pluginName
    const installed = AuxiliaryTool.plugins.some(plugin => ctor === plugin.ctor)
    if (installed) return AuxiliaryTool
    if (!name) {
      console.log(`Plugin Class must specify plugin's name in static property by 'pluginName' field.`)
    }
  }
}