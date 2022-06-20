const DEFAULT_FLAGS = "gi";
const SPECIAL_CHARS = [
  "(",
  ")",
  ".",
  "^",
  "$",
  "[",
  "]",
  "?",
  "*",
  "+",
  ":",
  "{",
  "}",
];

/**
 * Find the first occurrence of 'A' or 'a' in text
 * @param {string} text
 * @returns Position first occurrence of 'A' in {text}
 */
export function getIndexFistA(text: string): number {
  return text.search(/A/i);
}
/**
 * Replaces the first occurrence of 'A' or 'a' in {text} for {replacement}
 * @param {string} text
 * @param {string} expression
 * @returns
 */
export function replaceFirstA(text: string, replacement: string): string {
  return text.replace(/A/i, replacement);
}
/**
 * Replaces all occurrences of empty space in {text} for {replacement}
 * @param {string} text
 * @param {string} expression
 * @returns
 */
export function replaceSpaces(text: string, replacement: string): string {
  return text.replace(/ /g, replacement);
}
/**
 * Tests if the {text} has or not numbers in it
 * @param {string} text
 * @returns boolean if exist some numeric character in {text}
 */
export function containNumbers(text: string): boolean {
  const regex = /[0-9]/;
  return regex.test(text);
}
/**
 * Find numeric characters in {text} and their position
 * @param {string} text
 * @returns List of each numeric character found and it's position
 */
export function findNumericCharacters(text: string): any[] {
  let result = [];
  const regex = /[0-9]/g;
  let occurrence;
  while ((occurrence = regex.exec(text))) {
    result.push(occurrence);
  }
  return result;
}
/**
 * Find numbers in {text} and their position
 * @param {string} text
 * @returns List of each numbers found and it's position
 */
export function findNumbers(text: string): any[] {
  let result = [];
  const regex = /([0-9])+/g;
  let occurrence;
  while ((occurrence = regex.exec(text)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (occurrence.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    result.push(occurrence);
  }
  return result;
}
/**
 * Match numbers in {text} (uses String.match)
 * @param {string} text
 * @returns List of each numeric character found
 */
export function matchNumbers(text) {
  const regex = /([0-9])+/g;
  //PS: O matchAll retorna os grupos (quando há)
  return text.match(regex);
}
/**
 * Search for {replaced} occurrences in {text} and replaces for {replacement}
 * For "dynamic" we mean that the construction of regular expression is made programmatically
 *
 * @param {string} text
 * @param {string} replaced
 * @param {string} replacement
 * @returns New version of text
 */
export function replaceDynamically(
  text: string,
  replaced: string,
  replacement: string
): string {
  let r = replaced;
  //special characters are replaced with escape
  for (const c of SPECIAL_CHARS) {
    r = r.replace(c, `\\${c}`);
  }
  try {
    return text.replace(new RegExp(r, DEFAULT_FLAGS), replacement);
  } catch (e) {
    throw new Error(`Invalid Regular Expression: ${r} - ${e.message}`);
  }
}
