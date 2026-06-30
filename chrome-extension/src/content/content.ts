/**
 * Content Script
 *
 * Injected into web pages matching the patterns defined in manifest.ts.
 * Has access to the page DOM but runs in an isolated world.
 * Communicates with the background service worker via chrome.runtime messaging.
 */

import {
  isContestPage,
  isDiscussPage,
  isProblemPage,
} from "@/utils/leetcode.ts";

console.log("[CodePost AI] Content script loaded.");


function getPageStatus(){
  const url = window.location.href;

  return{
    isProblem: isProblemPage(url),
    isContest: isContestPage(url),
    isDiscuss: isDiscussPage(url),
    url,
  };
}

chrome.runtime.onMessage.addListener((message,_,sendResponse) => {
  if(message.type === "CHECK_PAGE"){
    sendResponse(getPageStatus());
  }
  return true;
});
// Listen for messages from the background service worker or popup
// chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
//   switch (message.type) {
//     case "GET_PAGE_INFO":
//       sendResponse({
//         url: window.location.href,
//         title: document.title,
//       });
//       break;

//     default:
//       sendResponse({ status: "unknown_message_type" });
//   }

//   return true;
// });

// export {};


