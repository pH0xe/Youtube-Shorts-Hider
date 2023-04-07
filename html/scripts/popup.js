
const registerEventListeners = () => {
  const options = document.querySelectorAll('.toggle');
  options.forEach(option => option.addEventListener('click', saveOptions));
};

const saveOptions = (e) => {
  const toggle = e.target;
  chrome.storage.sync.set({ [toggle.id]: toggle.checked }, () => { });
};

const restoreOptions = () => {
  chrome.storage.sync.get({
    'toggle-enable': false,
    'toggle-type': false,
  }, (items) => {
    document.getElementById('toggle-enable').checked = items['toggle-enable'];
    document.getElementById('toggle-type').checked = items['toggle-type'];
  });
};

registerEventListeners();
document.addEventListener('DOMContentLoaded', restoreOptions);