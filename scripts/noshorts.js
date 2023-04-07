const thumbnail = 'ytd-thumbnail-overlay-time-status-renderer span[aria-label="Shorts"]'
const target = `
  ytd-rich-item-renderer:has(${thumbnail}),
  ytd-item-section-renderer:has(${thumbnail})
  `;

const hideAction = "display: none !important;";
const darkenAction = "opacity: 0.1 !important;";

const resetCss = () => {
  const style = document.getElementById('shorts-hider-style');
  if (style) {
    style.remove();
  }
};

const addCss = (css) => {
  resetCss();
  const style = document.createElement('style');
  style.id = 'shorts-hider-style';
  style.innerHTML = css;
  document.head.appendChild(style);
};

const isEnable = async () => {
  return (await chrome.storage.sync.get('toggle-enable'))['toggle-enable'];
}


const getType = async () => {
  const isType = (await chrome.storage.sync.get('toggle-type'))['toggle-type'];
  if (isType) {
    return 'hide';
  }
  return 'darken';
}

const main = async () => {
  if (await isEnable()) {
    const type = await getType();
    const action = type === 'hide' ? hideAction : darkenAction;

    addCss(`${target} {
              ${action}
            }`);
  } else {
    resetCss();
  }
}

chrome.storage.onChanged.addListener((changes, namespace) => main());
main();