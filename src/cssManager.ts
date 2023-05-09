import { Config } from './config';
import { TypeValue } from './enums/storageValue';

export class CssManager {
  private static _instance: CssManager;

  private _darkenCss: string;
  private _hideCss: string;

  private constructor() {
    this._darkenCss = Config.DEFAULT_DARKEN_CSS;
    this._hideCss = Config.DEFAULT_HIDE_CSS;
  }

  public static getInstance(): CssManager {
    if (!CssManager._instance) {
      CssManager._instance = new CssManager();
    }
    return CssManager._instance;
  }

  resetCss() {
    const style = document.getElementById(Config.STYLE_ID);
    if (style) {
      style.remove();
    }
  }

  addCss(target: string, type: string) {
    this.resetCss();
    const style = document.createElement('style');
    style.id = Config.STYLE_ID;
    const action = type === TypeValue.DARKEN ? this._darkenCss : this._hideCss;
    style.innerHTML = `${target} { ${action} }`;
    document.head.appendChild(style);
  }
}
