export async function getCurrentTab(){
const tabs= await chrome.tabs.query({
    active:true,
    currentWindow:true,
});

return tabs[0];
}

// The service will contain active tab,message sending,Storage,Runtime helpers

