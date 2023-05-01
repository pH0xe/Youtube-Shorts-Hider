import { CssManager } from './cssManager';
import { StorageManagement } from './storage';

const onStorageChange = async (
  changes: { [key: string]: chrome.storage.StorageChange },
  areaName: string
) => {
  if (await StorageManagement.isEnable()) {
    const type = await StorageManagement.getType();
    const target = await StorageManagement.getCssSelector();
    CssManager.getInstance().addCss(target, type);
  } else {
    CssManager.getInstance().resetCss();
  }
};

const init = async () => {
  if (await StorageManagement.isEnable()) {
    const type = await StorageManagement.getType();
    const target = await StorageManagement.getCssSelector();
    CssManager.getInstance().addCss(target, type);
  }
};

chrome.storage.onChanged.addListener(onStorageChange);
init();
