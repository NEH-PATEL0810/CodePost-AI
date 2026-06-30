/**
 * Popup Component
 *
 * Root component for the Chrome extension popup UI.
 * Rendered when the user clicks the extension icon in the toolbar.
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePageStatus } from "./hooks/usePageStatus";
import Header from "./components/header";

function StatusSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-4 w-3/4 rounded-md bg-muted" />
      <div className="h-4 w-1/2 rounded-md bg-muted" />
    </div>
  );
}

export default function Popup() {
  const { loading, status } = usePageStatus();

  return (
    <>
      <Header />
      <div className="w-[360px] px-6 pb-6">
        <Card>
          <CardContent className="pt-4 space-y-4">
            {loading ? (
              <StatusSkeleton />
            ) : (
              <>
                <p className="text-sm font-medium">
                  {status.isProblem
                    ? "✅ Valid LeetCode Problem"
                    : status.isContest
                    ? "🏆 LeetCode Contest Page"
                    : status.isDiscuss
                    ? "💬 LeetCode Discuss Page"
                    : "❌ Not a supported page"}
                </p>
                {status.isProblem && (
                  <Button className="w-full">Generate Explanation</Button>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
