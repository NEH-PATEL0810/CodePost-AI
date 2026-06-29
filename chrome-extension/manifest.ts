import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: "CodePost AI",
  description: "Generate professional leetcode Solution explainations using AI",
  version: "0.1.0",
  icons: {
    "16": "src/assets/icons/icon16.png",
    "32": "src/assets/icons/icon32.png",
    "48": "src/assets/icons/icon48.png",
    "128": "src/assets/icons/icon128.png",
  },
  action: {
    default_popup: "src/popup/popup.html",
    default_icon: {
      "16": "src/assets/icons/icon16.png",
      "32": "src/assets/icons/icon32.png",
      "48": "src/assets/icons/icon48.png",
      "128": "src/assets/icons/icon128.png",
    },
    default_title: "CodePost AI",
  },
  background: {
    service_worker: "src/background/background.ts",
    type: "module",
  },
  content_scripts: [
    {
      matches: ["https://leetcode.com/*"],
      js: ["src/content/content.ts"],
    },
  ],
  permissions: ["storage", "activeTab", "tabs","scripting"],
  host_permissions: ["https://leetcode.com/*","https://localhost:8000/*"],
});
