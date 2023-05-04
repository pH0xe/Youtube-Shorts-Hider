import { StorageKey } from './enums/storageKey';
import { StorageValue } from './enums/storageValue';
import { StorageManagement } from './storage';

const registerEventListeners = () => {
  const options = document.querySelectorAll('.toggle');
  options.forEach((option) => {
    if (option instanceof HTMLInputElement)
      option.addEventListener('click', saveOptions);
  });

  const dimmingLevel = document.getElementById(
    'dimming-level'
  ) as HTMLInputElement;
  dimmingLevel.addEventListener('input', onDimmingLevelChange);
};

const saveOptions = (event: Event) => {
  const target = event.target as HTMLInputElement;

  switch (target.id) {
    case StorageKey.TOGGLE_ENABLE:
      StorageManagement.setEnable(target);
      return true;
    case StorageKey.TOGGLE_TYPE:
      StorageManagement.setType(target);
      return true;
    default:
      return false;
  }
};

const restoreOptions = () => {
  const enable = document.getElementById(
    StorageKey.TOGGLE_ENABLE
  ) as HTMLInputElement;
  const type = document.getElementById(
    StorageKey.TOGGLE_TYPE
  ) as HTMLInputElement;

  const dimmingLevelInput = document.getElementById(
    'dimming-level'
  ) as HTMLInputElement;
  const dimmingLevelDisplay = document.getElementById('dimming-value');

  StorageManagement.isEnable().then((value) => {
    enable.checked = value;
  });

  StorageManagement.getType().then((value) => {
    type.checked = value === StorageValue.HIDE;
  });
};

const onDimmingLevelChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const dimmingLevelDisplay = document.getElementById('dimming-value');
  if (dimmingLevelDisplay)
    dimmingLevelDisplay.innerText =
      target.valueAsNumber.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      }) + '%';
};

const init = () => {
  registerEventListeners();
  restoreOptions();
};

document.addEventListener('DOMContentLoaded', init);
