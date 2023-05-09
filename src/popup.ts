import { StorageKey } from './enums/storageKey';
import { TypeValue } from './enums/storageValue';
import { StorageManagement } from './storage';

const htmlElements = {
  dimmingLevelElements: {
    container: null as HTMLElement | null,
    input: null as HTMLInputElement | null,
    display: null as HTMLElement | null
  },
  toggleElements: {
    enable: null as HTMLInputElement | null,
    type: null as HTMLInputElement | null
  }
};

const queryElements = () => {
  htmlElements.dimmingLevelElements.container = document.getElementById(
    'dimming-level-container'
  );
  htmlElements.dimmingLevelElements.input = document.getElementById(
    StorageKey.DIMMING_LEVEL
  ) as HTMLInputElement;
  htmlElements.dimmingLevelElements.display =
    document.getElementById('dimming-value');

  htmlElements.toggleElements.enable = document.getElementById(
    StorageKey.TOGGLE_ENABLE
  ) as HTMLInputElement;

  htmlElements.toggleElements.type = document.getElementById(
    StorageKey.TOGGLE_TYPE
  ) as HTMLInputElement;
};

const registerEventListeners = () => {
  htmlElements.toggleElements.enable?.addEventListener('click', saveOptions);

  htmlElements.toggleElements.type?.addEventListener('click', saveOptions);

  htmlElements.dimmingLevelElements.input?.addEventListener(
    'input',
    onDimmingLevelChange
  );
  htmlElements.dimmingLevelElements.input?.addEventListener(
    'change',
    saveOptions
  );
};

const saveOptions = (event: Event) => {
  const target = event.target as HTMLInputElement;

  switch (target.id) {
    case StorageKey.TOGGLE_ENABLE:
      StorageManagement.setEnable(target);
      return true;
    case StorageKey.TOGGLE_TYPE:
      StorageManagement.setType(target);
      toggleDimmingLevel(target);
      return true;
    case StorageKey.DIMMING_LEVEL:
      StorageManagement.setDimmingLevel(target);
    default:
      return false;
  }
};

const restoreOptions = () => {
  StorageManagement.isEnable().then((value) => {
    if (htmlElements.toggleElements.enable)
      htmlElements.toggleElements.enable.checked = value;
  });

  StorageManagement.getType().then((value) => {
    if (htmlElements.toggleElements.type)
      htmlElements.toggleElements.type.checked = value === TypeValue.HIDE;
    if (value === TypeValue.HIDE) hideDimmingLevel();
  });

  StorageManagement.getDimmingLevel().then((value) => {
    if (htmlElements.dimmingLevelElements.input)
      htmlElements.dimmingLevelElements.input.value = value.toString();
    if (htmlElements.dimmingLevelElements.display)
      htmlElements.dimmingLevelElements.display.innerText = value.toString();
  });
};

const onDimmingLevelChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const dimmingLevelDisplay = htmlElements.dimmingLevelElements.display;
  if (dimmingLevelDisplay)
    dimmingLevelDisplay.innerText = target.valueAsNumber.toString() + '%';
};

const hideDimmingLevel = () => {
  const dimmingLevelInput = htmlElements.dimmingLevelElements.container;
  if (dimmingLevelInput) dimmingLevelInput.style.display = 'none';
};

const toggleDimmingLevel = (target: HTMLInputElement) => {
  const dimmingLevelInput = htmlElements.dimmingLevelElements.container;
  if (!dimmingLevelInput) return;
  if (target.checked) {
    dimmingLevelInput.style.display = 'none';
    return;
  }
  dimmingLevelInput.style.display = 'block';
};

const init = () => {
  queryElements();
  registerEventListeners();
  restoreOptions();
};

document.addEventListener('DOMContentLoaded', init);
