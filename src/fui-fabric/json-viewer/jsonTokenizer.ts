import { DEFAULT_NUM_VALUE } from "./hooks/useJsonViewer";

export type TokenType =
    | "object-open"
    | "object-close"
    | "array-open"
    | "array-close"
    | "boolean"
    | "number"
    | "string"
    | "variable"
    | "key-value-separator"
    | "white-space"
    | "line-ending-comma";

export type JSONValue = string | number | boolean | JSONObject | JSONArray;

interface JSONObject {
    [x: string]: JSONValue;
}

type JSONArray = Array<JSONValue>;


export enum TokenTypes {
    objectOpen = "object-open",
    objectClose = "object-close",
    arrayOpen = "array-open",
    arrayClose = "array-close",
    boolean = "boolean",
    number = "number",
    string = "string",
    variable = "variable",
    keyValueSeparator = "key-value-separator",
    whiteSpace = "white-space",
    lineEndingComma = "line-ending-comma",
}

const NO_VARIABLE = "NO_VARIABLE";

export type Token = {
    value: string;
    type: TokenType;
};

export function isNum(val: string) {
    return /^\d+$/.test(val);
}

/**
 * Takes a string (value) and if it is a bracket returns the opposite bracket;
 * @param value:
 * */
export const getOppositeOrDefault: (value: string) => string = (value: string) => {
    if (value === "{") return "},";
    if (value === "}") return "{";
    if (value === "[") return "],";
    if (value === "]") return "[";
    return "";
};

/**
 * Checks if a given token is an array open or close character < [ ] { } >
 * @param token
 * @return boolean
 * */
export function isBracket(token: TokenType) {
    return token === "array-open" || token === "array-close" || token === "object-close" || token === "object-open";
}

/**
 * @param jsonString - the json data represented as a string
 * @returns Token[][] - An array of tokens for every line in the json
 * */
export function tokenizeJson(jsonString: string): Token[][] {
    const lines: string[] = jsonString.split("\n");
    const result: Token[][] = [];

    lines.forEach((line: string, i: number) => {
        const whiteSpaceCount = line.search(/\S/);
        const whiteSpaces = line.substring(0, whiteSpaceCount);
        const lineWithoutWhitespace = line.trim();
        const isLastLine = i === lines.length - 1;

        const variableName = getVariableName(lineWithoutWhitespace);
        const rightSideToken = getRightSideToken(lineWithoutWhitespace);
        const tokens = buildTokenResult(variableName, rightSideToken, whiteSpaces, isLastLine);

        result.push(tokens);
    });

    return result;
}

/**
 *
 * @param variableName the left side of the colon or NO_VARIABLE if there is no colon
 * @param token the right side of the colon or the whole line if there is no colon
 * @param whiteSpace the whitespace at the beginning of the line
 * @param isLastLine if the line is the last line in the json
 * @returns
 */
function buildTokenResult(variableName: string, token: Token, whiteSpace: string, isLastLine: boolean): Token[] {
    const tokens: Token[] = [];

    tokens.push({ value: whiteSpace, type: TokenTypes.whiteSpace });

    if (variableName !== NO_VARIABLE) {
        tokens.push({ value: variableName, type: TokenTypes.variable });
        tokens.push({ value: ": ", type: TokenTypes.keyValueSeparator });
    }

    tokens.push(token);

    if (token.type !== TokenTypes.objectOpen && token.type !== TokenTypes.arrayOpen && !isLastLine) {
        tokens.push({ value: ",", type: TokenTypes.lineEndingComma });
    }

    return tokens;
}

/**
 *
 * @param line current json line without whitespace
 * @returns the right side of the colon in json or the whole line if there is no colon
 */
function getRightSideToken(line: string): Token {
    let value = line.substring(line.indexOf(":") + 1).trim();
    let type = TokenTypes.string;

    if (value.endsWith(",")) {
        value = value.substring(0, value.length - 1);
    }
    switch (value) {
        case "{":
            type = TokenTypes.objectOpen;
            break;
        case "}":
            type = TokenTypes.objectClose;
            break;
        case "[":
            type = TokenTypes.arrayOpen;
            break;
        case "]":
            type = TokenTypes.arrayClose;
            break;
        case "true":
        case "True":
        case "False":
        case "false":
            type = TokenTypes.boolean;
            break;
    }

    if (isNum(value)) {
        type = TokenTypes.number;
    }

    return { value, type };
}

/**
 * @param line current json line without whitespace
 * @returns the left side of the colon, or NO_VARIABLE if there is no colon
 */
function getVariableName(line: string): string {
    const re = /[^"]+(?=":)/g;
    const raw = re.exec(line);
    return raw ? raw[0] : NO_VARIABLE;
}

/**
 * @param jsonString - the json data represented as a string
 * @returns all bracket and square bracket positions in the json
 */
export function generateBracketPairs(jsonString: string) {
    const stack: number[] = [];
    const data: number[] = [];
    let row = 0;

    let insideString = false;

    for (let i = 0; i < jsonString.length; i++) {
        const curChar = jsonString[i];

        if ((curChar === "{" || curChar === "[") && !insideString) {
            stack.push(row);
        } else if ((curChar === "}" || curChar === "]") && !insideString) {
            const start = stack.pop() as number;
            data[start] = row;
        } else if (curChar === "\n") {
            row++;
            data[row] = DEFAULT_NUM_VALUE;
        } else if (curChar === '"') {
            insideString = !insideString;
        }
    }

    return data;
}
