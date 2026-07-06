export class ShareButtonClicker {
    click(button: HTMLButtonElement) {
        console.log("Opening Post Solution page.");
        button.focus();
        
        // Dispatch a real MouseEvent click to ensure React state handlers are triggered
        const clickEvent = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true
        });
        button.dispatchEvent(clickEvent);
    }
}
