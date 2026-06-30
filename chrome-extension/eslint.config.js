import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: {
        // Standard browser globals (window, document, fetch, etc.)
        ...globals.browser,
        // Chrome Extension APIs (chrome.runtime, chrome.tabs, etc.)
        // Not included in globals.browser — must be added explicitly.
        ...globals.webextensions,
      },
    },
  },
])
