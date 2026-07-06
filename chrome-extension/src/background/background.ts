/**
 * Background Service Worker
 *
 * Runs as a persistent service worker in the extension context.
 * Handles events, manages state, and coordinates between
 * content scripts and the popup.
 *
 * Responsibilities:
 *  - Respond to lifecycle events (install, update).
 *  - Route messages between popup and content scripts as needed.
 */

import { MessageType } from "@/types/messages";

// Set storage access level so that content scripts can access chrome.storage.session
if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.session && chrome.storage.session.setAccessLevel) {
  chrome.storage.session.setAccessLevel({
    accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS"
  }).catch((err) => console.error("[Background] Error setting session access level:", err));
}

// Listen for extension installation or update
chrome.runtime.onInstalled.addListener((details) => {
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.session && chrome.storage.session.setAccessLevel) {
    chrome.storage.session.setAccessLevel({
      accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS"
    }).catch((err) => console.error("[Background] Error setting session access level in onInstalled:", err));
  }

  if (details.reason === "install") {
    console.log("[CodePost AI] Extension installed successfully.");
  } else if (details.reason === "update") {
    console.log(
      `[CodePost AI] Extension updated to version ${chrome.runtime.getManifest().version}`
    );
  }
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("[CodePost AI] Message received:", message, "from:", sender);

  switch (message.type) {
    case MessageType.PING:
      sendResponse({ status: "ok", source: "background" });
      break;

    default:
      sendResponse({ status: "unknown_message_type" });
  }

  // Return true to keep the channel open for async responses.
  return true;
});
