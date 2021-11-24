interface PluginCtor {
  selfPluginName: string
  new(auxiliary: any): any
}

interface PluginItem {
  name: string
  ctor: PluginCtor
}

export class AuxiliaryTool {
  static plugins: PluginItem[] = []
  
  static use(ctor: PluginCtor) {
    const name = ctor.selfPluginName
    const installed = AuxiliaryTool.plugins.some(plugin => ctor === plugin.ctor)
    if (installed) return AuxiliaryTool
    if (!name) {
      console.log(`Plugin Class must specify plugin's name in static property by 'selfPluginName' field.`)
    }
    AuxiliaryTool.plugins.push({
      name: ctor.selfPluginName,
      ctor
    })
    return AuxiliaryTool
  }
}

export function createAuxiliaryTool(): AuxiliaryTool {
  const at = new AuxiliaryTool()
  return at
}

createAuxiliaryTool.use = AuxiliaryTool.use
createAuxiliaryTool.plugins = AuxiliaryTool.plugins

export const ATool = createAuxiliaryTool

