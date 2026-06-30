export async function getCurrentTab(): Promise<chrome.tabs.Tab | undefined> {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  return tabs[0];
}

// The service will contain active tab,message sending,Storage,Runtime helpers

