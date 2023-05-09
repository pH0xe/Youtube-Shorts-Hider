import { Config } from './config';
import { StorageKey } from './enums/storageKey';
import { StatusValue, TypeValue } from './enums/storageValue';

export class StorageManagement {
  private static async getKey(key: StorageKey): Promise<string> {
    return (await chrome.storage.sync.get(key))[key];
  }

  private static setKey(
    key: StorageKey,
    value: TypeValue | StatusValue | string
  ): void {
    chrome.storage.sync.set({ [key]: value });
  }

  private static removeKey(key: StorageKey): void {
    chrome.storage.sync.remove(key);
  }

  static async isEnable(): Promise<boolean> {
    return (await this.getKey(StorageKey.TOGGLE_ENABLE)) === StatusValue.ENABLE;
  }

  static async getType(): Promise<TypeValue> {
    const type = (await this.getKey(StorageKey.TOGGLE_TYPE)) as TypeValue;
    return type ? type : Config.DEFAULT_TYPE;
  }

  static async getCssSelector(): Promise<string> {
    const selector = await this.getKey(StorageKey.CSS_SELECTOR);
    return selector ? selector : Config.DEFAULT_CSS_SELECTOR;
  }

  static setEnable(toggle: HTMLInputElement): void {
    this.setKey(
      StorageKey.TOGGLE_ENABLE,
      toggle.checked ? StatusValue.ENABLE : StatusValue.DISABLE
    );
  }

  static setType(toggle: HTMLInputElement): void {
    this.setKey(
      StorageKey.TOGGLE_TYPE,
      toggle.checked ? TypeValue.HIDE : TypeValue.DARKEN
    );
  }

  static setCssSelector(selector: HTMLInputElement): void {
    if (!selector.value) {
      this.removeKey(StorageKey.CSS_SELECTOR);
      return;
    }
    this.setKey(StorageKey.CSS_SELECTOR, selector.value);
  }
}
