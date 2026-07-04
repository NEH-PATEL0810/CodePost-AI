export interface PlatformAdapter {
    query(
        selectors: string []
    ): Element | null;

    queryAll(
        selectors: string[]
    ): Element[];

    getText(
        selectors:string[]
    ):string;

    getTexts(
    selectors: string[]
    ):string[];

    exists(
        selectors:string[]
    ):boolean;


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

    getText(
        selectors: string[]
    ): string {

        return this
            .query(selectors)
            ?.textContent
            ?.trim() ?? "";

    }

    getTexts(
        selectors: string[]
    ): string[] {

        return this
            .queryAll(selectors)
            .map(el => el.textContent?.trim() ?? "")
            .filter(text => text.length > 0);

    }

    exists(
        selectors: string[]
    ): boolean {

        return this.query(selectors) !== null;

    }

}

export const leetcodeAdapter = new LeetCodeAdapter();
