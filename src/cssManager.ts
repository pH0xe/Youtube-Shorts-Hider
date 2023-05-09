import { Config } from './config';
import { TypeValue } from './enums/storageValue';

export class CssManager {
  private static _instance: CssManager;

  private _hideCss: string;

  private constructor() {
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

  private getDarkenCss(dimming: number): string {
    const opacity = 1 - dimming / 100;
    return Config.DEFAULT_DARKEN_CSS.replace('0', opacity.toString());
  }

  addAllCss(target: string, type: string, dimming: number) {
    this.resetCss();
    const style = document.createElement('style');
    style.id = Config.STYLE_ID;
    let action;
    if (type === TypeValue.DARKEN) {
      action = this.getDarkenCss(dimming);
    } else {
      action = this._hideCss;
    }
    style.innerHTML = `${target} { ${action} }`;
    document.head.appendChild(style);
  }
}
