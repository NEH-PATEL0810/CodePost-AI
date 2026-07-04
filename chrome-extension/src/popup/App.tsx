// Root component for the chrome extension's UI
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { usePageStatus } from "./hooks/usePageStatus";
import Header from "./components/header";
import { Footer } from "./components/Footer";
import { LoadingCard } from "./components/LoadingCard";
import { usePopupState } from "./hooks/usePopupState";
import { useCurrentTab } from "./hooks/useCurrenttab";
import { PopupRouter } from "./components/PopupRouter";
import { useExtraction } from "./hooks/useExtraction";

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

  return (
    <>
      <Header />
      {/* <LoadingCard/> */}
      
       <PopupRouter state={state} />

      <Footer />
    </>
  );
}
