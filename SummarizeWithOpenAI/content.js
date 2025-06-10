// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extract_text') {
    // Extract visible text from the page
    const text = extractVisibleText();
    sendResponse({ text });
    return true; // Indicates async response
  }
  if (request.action === 'show_summary') {
    // Display the summary as an overlay
    showSummaryOverlay(request.summary);
  }
});

// Function to extract visible text from the page
function extractVisibleText() {
  // Get all visible text nodes
  function getTextNodes(node) {
    let text = '';
    if (node.nodeType === Node.TEXT_NODE && node.parentNode.offsetParent !== null) {
      text += node.textContent + ' ';
    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE' && node.tagName !== 'NOSCRIPT') {
      for (let child of node.childNodes) {
        text += getTextNodes(child);
      }
    }
    return text;
  }
  return getTextNodes(document.body).replace(/\s+/g, ' ').trim();
}

// Function to display the summary overlay
function showSummaryOverlay(summary) {
  // Remove existing overlay if present
  const existing = document.getElementById('openai-summary-overlay');
  if (existing) existing.remove();

  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'openai-summary-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '20px';
  overlay.style.right = '20px';
  overlay.style.maxWidth = '400px';
  overlay.style.background = 'white';
  overlay.style.color = '#222';
  overlay.style.border = '2px solid #888';
  overlay.style.borderRadius = '8px';
  overlay.style.boxShadow = '0 2px 12px rgba(0,0,0,0.2)';
  overlay.style.padding = '20px';
  overlay.style.zIndex = '999999';
  overlay.style.fontSize = '16px';
  overlay.style.fontFamily = 'sans-serif';

  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '×';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '8px';
  closeBtn.style.right = '12px';
  closeBtn.style.background = 'transparent';
  closeBtn.style.border = 'none';
  closeBtn.style.fontSize = '20px';
  closeBtn.style.cursor = 'pointer';
  closeBtn.onclick = () => overlay.remove();

  // Summary text
  const summaryText = document.createElement('div');
  summaryText.textContent = summary;

  overlay.appendChild(closeBtn);
  overlay.appendChild(summaryText);
  document.body.appendChild(overlay);
} 