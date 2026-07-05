import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function Header() {
    const [isDark, setIsDark] = useState(() => {
        return document.documentElement.classList.contains("dark");
    });

    const toggleTheme = () => {
        const nextDark = !isDark;
        setIsDark(nextDark);
        if (nextDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    // Keep state in sync with actual document class list
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains("dark"));
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });
        return () => observer.disconnect();
    }, []);

    return (
        <header className="border-b px-5 py-4 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold">
                    CodePost AI
                </h1>
                <p className="text-muted-foreground text-sm">
                    AI Documentation Assistant
                </p>
            </div>

            <button
                onClick={toggleTheme}
                className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Toggle theme"
            >
                {isDark ? (
                    <Sun className="h-5 w-5" />
                ) : (
                    <Moon className="h-5 w-5" />
                )}
            </button>
        </header>
    );
}