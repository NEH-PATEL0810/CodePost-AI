/**
 * Extension Context Guard
 *
 * During development, @crxjs/vite-plugin injects an HMR client into content
 * scripts. When the extension is reloaded (via chrome://extensions), Chrome
 * invalidates the runtime context of any already-open tabs. The HMR client
 * then throws "Extension context invalidated" errors from its chrome.runtime
 * calls (connect, postMessage, etc.).
 *
 * This module installs a global error handler that catches those specific
 * errors and reloads the page instead — which re-injects a fresh content
 * script with a valid extension context.
 *
 * Only active in development mode (import.meta.env.DEV).
 */

export function installExtensionContextGuard(): void {
  if (!import.meta.env.DEV) return;

  const INVALIDATED_MSG = "Extension context invalidated";

  // Catch synchronous throws (e.g. from HMRPort.initPort)
  window.addEventListener("error", (event) => {
    if (event.error instanceof Error && event.error.message.includes(INVALIDATED_MSG)) {
      console.warn(
        "[CodePost AI] Extension context invalidated — reloading page to restore content script."
      );
      event.preventDefault(); // prevent it surfacing as an uncaught error
      location.reload();
    }
  });

  // Catch promise rejections (e.g. from async chrome.runtime calls)
  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    if (reason instanceof Error && reason.message.includes(INVALIDATED_MSG)) {
      console.warn(
        "[CodePost AI] Extension context invalidated (promise) — reloading page."
      );
      event.preventDefault();
      location.reload();
    }
  });
}
