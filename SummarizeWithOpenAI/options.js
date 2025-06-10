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