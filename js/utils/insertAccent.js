export function insertAccent(textContext) {
    return textContext.text.substring(0, textContext.cursorPosition) + `\u0301` + textContext.text.substring(textContext.cursorPosition);
}