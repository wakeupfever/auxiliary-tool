export interface Options {
    target: string;
    oldKey: string[];
    newKey: string[];
}
export declare type DeepJson = {
    areaName: string;
    areaCode: string;
    parentAreaCode: string;
    headChar: string;
    areaLevel: string;
    childArea: DeepJson[];
};
export declare type DeepNewKeyJson = {
    [key: string]: DeepNewKeyJson[];
};
export default class FormateJson {
    static selfName: string;
    /**
     * @description 树循环方法
     * @private
     * @param {DeepJson[]} json
     * @param {Function} callback
     * @param {DeepNewKeyJson[]} [result=[]]
     * @return {*}  {DeepNewKeyJson[]}
     * @memberof FormateJson
     */
    private deepJson;
    /**
     * @description 同步树的每一项的改变
     * @private
     * @param {DeepJson} jsonItem
     * @param {string[]} oldKey
     * @param {string[]} newKey
     * @return {*}  {({ [key: string]: string | { key: string }[] })}
     * @memberof FormateJson
     */
    private synchronizeAttr;
    /**
     * @description 默认方法，返回指定格式的 树结构
     * @param {DeepJson[]} [json=[]]
     * @param {Options} [options={ target: 'addressTreePCD', oldKey: ['childArea', 'areaName', 'areaCode'], newKey: ['children', 'label', 'value'] }]
     * @return {*}  {DeepNewKeyJson[]}
     * @memberof FormateJson
     */
    init(json?: DeepJson[], options?: Options): DeepNewKeyJson[];
    /**
     * @description 指定格式，返回树结构
     * @param {DeepJson[]} json
     * @param {string[]} oldKey
     * @param {string[]} newKey
     * @param {Function} [customized=() => { }]
     * @return {*}  {DeepNewKeyJson[]}
     * @memberof FormateJson
     */
    handleAddressTreePCD(json: DeepJson[], oldKey: string[], newKey: string[], customized?: Function): DeepNewKeyJson[];
}
