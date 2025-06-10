// Listens for the hotkey command
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'summarize-page') {
    // Get the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.id) return;

    // Ask content script to extract page text
    chrome.tabs.sendMessage(tab.id, { action: 'extract_text' }, async (response) => {
      if (!response || !response.text) {
        chrome.tabs.sendMessage(tab.id, { action: 'show_summary', summary: 'Could not extract page text.' });
        return;
      }

      // Get OpenAI API key from storage
      chrome.storage.sync.get(['openai_api_key'], async (result) => {
        const apiKey = result.openai_api_key;
        if (!apiKey) {
          chrome.tabs.sendMessage(tab.id, { action: 'show_summary', summary: 'OpenAI API key not set. Please set it in the extension options.' });
          return;
        }

        // Call OpenAI API to summarize
        try {
          const summary = await summarizeWithOpenAI(response.text, apiKey);
          chrome.tabs.sendMessage(tab.id, { action: 'show_summary', summary });
        } catch (e) {
          chrome.tabs.sendMessage(tab.id, { action: 'show_summary', summary: 'Error summarizing: ' + e.message });
        }
      });
    });
  }
});

// Function to call OpenAI API
async function summarizeWithOpenAI(text, apiKey) {
  const prompt = `Summarize the following web page content in a concise paragraph:\n\n${text}`;
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200
    })
  });
  if (!response.ok) throw new Error('OpenAI API error');
  const data = await response.json();
  return data.choices[0].message.content.trim();
} 