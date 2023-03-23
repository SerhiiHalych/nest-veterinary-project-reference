export const replaceWildcardCharacters = (str: string) =>
  str.trim().replace(/([%_])/g, `[$1]`);
