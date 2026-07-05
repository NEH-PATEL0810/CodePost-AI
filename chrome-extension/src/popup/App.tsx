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

export default function Popup() {
  // const { loading, status } = usePageStatus();
  const  {state,setState} = usePopupState();
  const tab = useCurrentTab();
  useExtraction(tab?.id,setState);

  const { state: genState, generate } = useGeneration();

  return (
<div className="w-[380px] min-h-[520px] bg-background flex flex-col">
  <Header />

  <main className="flex-1 p-4">
    <PopupRouter state={state} genState={genState} generate={generate} />
  </main>

  <Footer />
</div>
  );
}
