/**
 * Popup Component
 *
 * Root component for the Chrome extension popup UI.
 * Rendered when the user clicks the extension icon in the toolbar.
 */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePageStatus } from "./hooks/usePageStatus";
import Header from "./components/header";

export default function Popup() {
  const status = usePageStatus();
  if(!status)
    return (
    <div className="p-6">
      Loading...
    </div>
  ); 
{/* <Header /> */}

  return (
    <>
      <Header />
      <div className="w-[360px] p-6">
        <Card className="p-4">
          <h2 className="font-bold">
            CodePost AI
          </h2>
          <p className="mt-4">
            {status.isProblem
             ? "✅Valid LeetCode Problem"
             : "❌Not a supported page"
            }
          </p>
        </Card>
      </div>
    </>
  );
}
