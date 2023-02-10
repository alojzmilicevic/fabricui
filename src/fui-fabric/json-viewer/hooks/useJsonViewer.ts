import { generateBracketPairs, Token, tokenizeJson } from '../jsonTokenizer';
import { useMemo, useState } from 'react';
import { useTheme } from '@emotion/react';
import { createCustomTheme, Themes } from '../theme';
import { JsonViewerProps } from '../JsonViewer';

export const DEFAULT_NUM_VALUE = -1;

/**
 * Checks if the current row is hidden or the first row of a hidden object/array
 * @param currentRow - the row to check
 * @param collapsed - a boolean array representing which rows are collapsed
 * @param bracketPairs - a number array where every position represents the matching closing or opening arrays index
 * or -1 if there is no matching open/close.
 *
 * @returns {Object} isHidden - if this is true the current row should be hidden.
 */
export function isRowHeaderOrHidden(currentRow: number, collapsed: boolean[], bracketPairs: number[]): boolean {
    let isHidden = false;

    // We don't need to check more than the current row
    for (let i = 0; i <= currentRow; i++) {
        // <= because we want to check the current row as well
        const collapsedRow = collapsed[i];

        if (collapsedRow) {
            // check if this row is in the collapsed range
            const end = bracketPairs[i];

            if (currentRow > i && currentRow <= end) {
                // if this row is in the collapsed range
                isHidden = true;
                break;
            }
        }
    }
    return isHidden;
}

function useJsonViewer({ json, themeType = Themes.AtomOneDark, tabSize = 4 }: JsonViewerProps) {
    const jsonString: string = useMemo(() => JSON.stringify(json, null, tabSize), []);
    const parsedData: Token[][] = useMemo(() => tokenizeJson(jsonString), []);
    const bracketPairs: number[] = useMemo(() => generateBracketPairs(jsonString), []);

    const [selected, setSelected] = useState(DEFAULT_NUM_VALUE);
    const [collapsed, setCollapsed] = useState<boolean[]>(new Array(bracketPairs.length).fill(false));
    const theme = useTheme();

    const customTheme = createCustomTheme(themeType, theme);

    const isRowHidden = (currentRow: number) => isRowHeaderOrHidden(currentRow, collapsed, bracketPairs);
    const isCollapsed = (currentRow: number) => collapsed[currentRow];
    const isCollapsible = (currentRow: number) => bracketPairs[currentRow] !== DEFAULT_NUM_VALUE;
    const onCollapseRow = (rowToCollapse: number) => {
        const tmp = [...collapsed];
        tmp[rowToCollapse] = !tmp[rowToCollapse];
        setCollapsed(tmp);
    };

    return {
        parsedData,
        selected,
        setSelected,
        customTheme,
        isRowHidden,
        isCollapsed,
        onCollapseRow,
        isCollapsible,
    };
}

export { useJsonViewer };
