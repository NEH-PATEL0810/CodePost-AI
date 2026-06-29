/**
 * Content Script
 *
 * Injected into web pages matching the patterns defined in manifest.ts.
 * Has access to the page DOM but runs in an isolated world.
 * Communicates with the background service worker via chrome.runtime messaging.
 */

console.log("[CodePost AI] Content script loaded.");

// Listen for messages from the background service worker or popup
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  switch (message.type) {
    case "GET_PAGE_INFO":
      sendResponse({
        url: window.location.href,
        title: document.title,
      });
      break;

    default:
      sendResponse({ status: "unknown_message_type" });
  }

  return true;
});

export {};
