/**
 * Popup Component
 *
 * Root component for the Chrome extension popup UI.
 * Rendered when the user clicks the extension icon in the toolbar.
 */
import { Button } from "@/components/ui/button";


export default function Popup() {
  return (
    <div className="w-[360px] h-[520px] bg-slate-950 text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          CodePost AI
        </h1>
        <p className="text-slate-400 mt-2">
          Generate professional explanations for leetcode problems
        </p>
        <Button className="w-full mt-8">
          Generate
        </Button>
      </div>
    </div>
  );
}
