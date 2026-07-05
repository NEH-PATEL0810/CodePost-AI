import { Button } from "@/components/ui/button";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    cancelText?: string;
    actionText?: string;
    onAction: () => void;
}

export function AlertDialog({
    open,
    onOpenChange,
    title,
    description,
    cancelText = "Cancel",
    actionText = "Continue",
    onAction,
}: Props) {
    if (!open) return null;

    return (
        <>
            {/* Backdrop Overlay */}
            <div 
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
                onClick={() => onOpenChange(false)}
            />
            {/* Alert Content Box */}
            <div className="fixed left-[50%] top-[50%] z-50 grid w-[85%] max-w-sm translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-5 shadow-lg rounded-lg animate-in fade-in zoom-in-95 duration-200 text-foreground">
                <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                    <h2 className="text-base font-semibold leading-none tracking-tight">
                        {title}
                    </h2>
                    <p className="text-xs text-muted-foreground pt-1.5 leading-normal">
                        {description}
                    </p>
                </div>
                <div className="flex flex-row justify-end space-x-2 pt-2">
                    <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onOpenChange(false)}
                        className="text-xs font-semibold cursor-pointer"
                    >
                        {cancelText}
                    </Button>
                    <Button 
                        size="sm"
                        onClick={() => {
                            onOpenChange(false);
                            onAction();
                        }}
                        className="text-xs font-semibold cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                        {actionText}
                    </Button>
                </div>
            </div>
        </>
    );
}
