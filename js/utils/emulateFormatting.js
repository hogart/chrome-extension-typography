export function emulateFormatting(text, char) {
    return /*' ' + char + */text.split('').join(char) + char;
}

export const formatting = {
    strikethrough: '\u0336',
    underline: '\u035f',
    doubleUnderline: '\u0347',
};