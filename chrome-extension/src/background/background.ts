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

// Listen for extension installation or update
chrome.runtime.onInstalled.addListener((details) => {
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
