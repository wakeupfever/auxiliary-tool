interface PluginCtor {
    selfPluginName: string;
    new (auxiliary: any): any;
}
interface PluginItem {
    name: string;
    ctor: PluginCtor;
}
export declare class AuxiliaryTool {
    static plugins: PluginItem[];
    use(ctor: PluginCtor): typeof AuxiliaryTool;
}
export {};
