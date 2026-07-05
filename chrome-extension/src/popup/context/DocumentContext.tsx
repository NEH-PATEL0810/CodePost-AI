import {
    createContext,
    useContext,
    useState,
} from "react";

import type {
    SolutionDocument,
} from "../types/document";

interface Context {

    document: SolutionDocument | null;

    setDocument: (
        doc: SolutionDocument
    ) => void;

    updateMarkdown: (
        markdown: string
    ) => void;

}

const DocumentContext =
    createContext<Context | null>(null);

export function DocumentProvider({

    children,

}: React.PropsWithChildren) {

    const [

        document,

        setDocument,

    ] = useState<SolutionDocument | null>(null);

    const updateMarkdown = (
        markdown: string
    ) => {
        setDocument((prev) => {
            if (!prev)
                return prev;
            return {
                ...prev,
                currentMarkdown: markdown,
                isEdited:
                    markdown !==
                    prev.originalMarkdown,
            };
        });
    };

    return (

        <DocumentContext.Provider

            value={{

                document,

                setDocument,

                updateMarkdown,

            }}

        >

            {children}

        </DocumentContext.Provider>

    );

}

export function useDocument() {

    const context = useContext(
        DocumentContext
    );

    if (!context)

        throw new Error(
            "DocumentProvider missing"
        );

    return context;

}
