// Root component for the chrome extension's UI
// import { usePageStatus } from "./hooks/usePageStatus";
import Header from "./components/header";
import { Footer } from "./components/Footer";
import { usePopupState } from "./hooks/usePopupState";
import { useCurrentTab } from "./hooks/useCurrenttab";
import { PopupRouter } from "./components/PopupRouter";
import { useExtraction } from "./hooks/useExtraction";
import { useGeneration } from "./hooks/useGeneration";

// function StatusSkeleton() {
//   return (
//     <div className="animate-pulse space-y-3">
//       <div className="h-4 w-3/4 rounded-md bg-muted" />
//       <div className="h-4 w-1/2 rounded-md bg-muted" />
//     </div>
//   );
// }

import React, { useEffect } from "react";

export default function Popup() {
  // const { loading, status } = usePageStatus();
  const  {state,setState} = usePopupState();
  const tab = useCurrentTab();
  useExtraction(tab?.id,setState);

  const { state: genState, generate } = useGeneration();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // If there is a manual override, use it. Otherwise, use system settings.
    if (savedTheme) {
      applyTheme(savedTheme === "dark");
    } else {
      applyTheme(mediaQuery.matches);
    }

    // Listen for changes
    const listener = (e: MediaQueryListEvent) => {
      // Only transition with system if user hasn't toggled a manual override
      if (!localStorage.getItem("theme")) {
        applyTheme(e.matches);
      }
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return (
<div className="w-full h-full bg-background flex flex-col text-foreground transition-colors duration-200">
  <Header />

  <main className="flex-1 p-4">
    <PopupRouter state={state} genState={genState} generate={generate} />
  </main>

  <Footer />
</div>
  );
}
