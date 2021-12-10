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
