export const sanitizeUrl = (url: string): string =>
  url.replace(/[^-A-Za-z0-9+&@#/%?=~_|!:,.;()]/g, "");

export const sanitizeTags = (tags: string[]): string[] => {
  const rgx = /[^-_A-Za-z0-9]/g;
  return tags
    .map((tag) => tag.replace(rgx, ""))
    .filter((tag) => tag.length > 0);
};
