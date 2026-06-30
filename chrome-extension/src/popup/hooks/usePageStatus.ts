import { useEffect, useState } from "react";
import { getCurrentTab } from "@/services/chrome.services.ts";
import {
  isContestPage,
  isDiscussPage,
  isProblemPage,
} from "@/utils/leetcode.ts";
import type { PageStatusResponse } from "@/types/messages.ts";

type PageStatusState =
  | { loading: true; status: null }
  | { loading: false; status: PageStatusResponse };

/**
 * Resolves the current tab's page status directly from its URL.
 *
 * Previously this sent a chrome.tabs.sendMessage round-trip to the content
 * script, which introduced a visible lag (3 async hops: mount → tabs.query →
 * message IPC → response). Since the tab URL is already available from
 * chrome.tabs.query, we compute the same result locally in one hop.
 */
export function usePageStatus(): PageStatusState {
  const [state, setState] = useState<PageStatusState>({
    loading: true,
    status: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function checkPage() {
      const tab = await getCurrentTab();
      if (cancelled) return;

      const url = tab?.url ?? "";

      setState({
        loading: false,
        status: {
          isProblem: isProblemPage(url),
          isContest: isContestPage(url),
          isDiscuss: isDiscussPage(url),
          url,
        },
      });
    }

    checkPage();
    return () => { cancelled = true; };
  }, []);

  return state;
}