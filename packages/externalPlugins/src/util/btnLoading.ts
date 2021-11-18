export default class BtnLoading {
  public el: HTMLButtonElement

  /**
   * @deprecated 创建按钮加载元素 支持传入
   * @memberof BtnLoading
   */
  manualCreateLoadingDom () {
    this.el.disabled = true
  }
}