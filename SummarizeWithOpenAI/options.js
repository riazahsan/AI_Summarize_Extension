// Get form elements
const form = document.getElementById('api-key-form');
const apiKeyInput = document.getElementById('api-key');
const statusDiv = document.getElementById('status');

// Load the saved API key when the page loads
chrome.storage.sync.get(['openai_api_key'], (result) => {
  if (result.openai_api_key) {
    apiKeyInput.value = result.openai_api_key;
  }
});

// Save the API key when the form is submitted
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const apiKey = apiKeyInput.value.trim();
  if (!apiKey) return;
  chrome.storage.sync.set({ openai_api_key: apiKey }, () => {
    statusDiv.textContent = 'API key saved!';
    setTimeout(() => statusDiv.textContent = '', 2000);
  });
});

// Hotkey customization section
const hotkeySpan = document.getElementById('current-hotkey');
const openShortcutsBtn = document.getElementById('open-shortcuts');

// Try to get the current hotkey (Chrome does not provide an API, so show the default)
const defaultHotkey = (navigator.platform.includes('Mac')) ? 'Command+Shift+Y' : 'Ctrl+Shift+Y';
hotkeySpan.textContent = defaultHotkey + ' (default)';

// Open the Chrome shortcuts page when the button is clicked
openShortcutsBtn.addEventListener('click', (e) => {
  e.preventDefault();
  // Open the Chrome shortcuts page in a new tab
  chrome.tabs.create({ url: 'chrome://extensions/shortcuts' });
}); 