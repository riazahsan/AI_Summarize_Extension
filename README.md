# Summarize With OpenAI

A Chrome extension that lets you quickly summarize the current web page using OpenAI, triggered by a customizable hotkey.

## Features
- Summarize any web page with a single hotkey (default: Ctrl+Shift+Y / Cmd+Shift+Y)
- Uses OpenAI's GPT model for high-quality summaries
- Securely store your OpenAI API key in extension settings
- Customizable hotkey via Chrome's shortcuts page
- Clean, user-friendly summary popup overlay

## Installation

### Local Installation (for development/testing)
1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the extension folder.
5. Set your OpenAI API key in the extension options.
6. (Optional) Change the hotkey at `chrome://extensions/shortcuts`.

### Chrome Web Store (after publishing)
1. Visit the Chrome Web Store and search for "Summarize With OpenAI".
2. Click **Add to Chrome**.
3. Set your OpenAI API key in the extension options.
4. (Optional) Change the hotkey at `chrome://extensions/shortcuts`.

## Usage
- Navigate to any web page you want to summarize.
- Press the hotkey (default: Ctrl+Shift+Y or Cmd+Shift+Y).
- A summary will appear in a popup overlay on the page.

## Customization
- **Hotkey:** Go to `chrome://extensions/shortcuts` to set your preferred shortcut.
- **API Key:** Enter and save your OpenAI API key in the extension options page.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
MIT 
