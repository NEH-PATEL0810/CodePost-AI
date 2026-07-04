export interface PlatformAdapter {
    query(
        selectors: string []
    ): Element | null;

    queryAll(
        selectors: string[]
    ): Element[];
}

class LeetCodeAdapter
    implements PlatformAdapter {

    query(
        selectors: string[]
    ): Element | null {

        for (const selector of selectors) {

            const element =
                document.querySelector(selector);

            if (element)
                return element;

        }

        return null;

    }

    queryAll(
        selectors: string[]
    ): Element[] {

        for (const selector of selectors) {

            const elements =
                document.querySelectorAll(selector);

            if (elements.length)
                return [...elements];

        }

        return [];

    }

}

export const leetcodeAdapter = new LeetCodeAdapter();
