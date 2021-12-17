export const tagsStringToArr = (tagsStr: string): string[] => {
  const rgx = /[^-_A-Za-z0-9]/g;

  return tagsStr
    ? tagsStr
        .split(",")
        .map((tag) => tag.replace(rgx, "").trim())
        .filter((tag) => tag.length > 0)
    : [];
};

export const tagsArrToString = (tagsArr: string[]): string =>
  tagsArr.join(", ");

export const getTagsFromActiveLinks = (activeLinks: ILink[]): string[] =>
  activeLinks.reduce((arr: string[], link) => {
    const newArr = [...arr];
    link.tags.forEach((tag) => {
      if (!newArr.includes(tag)) {
        newArr.push(tag);
      }
    });
    return newArr;
  }, []);

export const isLinkTagInActiveTags = (
  activeTags: string[],
  linkTags: string[]
): boolean =>
  activeTags.length === 0 ||
  linkTags.findIndex((linkTag) => activeTags.includes(linkTag)) >= 0;
