export const tagsStringToArr = (tagsStr: string): string[] => {
  let sanitizedStr = tagsStr.replaceAll(/[^ A-Za-z0-9-_,()[\]]/g, "").trim();

  while (sanitizedStr.indexOf(",,") >= 0) {
    sanitizedStr = sanitizedStr.replace(",,", ",");
  }

  if (sanitizedStr[0] === ",") {
    sanitizedStr = sanitizedStr.slice(1);
  }

  if (sanitizedStr.slice(-1) === ",") {
    sanitizedStr = sanitizedStr.slice(0, -1);
  }

  let tagsArr: string[] = [];

  if (sanitizedStr !== "") {
    tagsArr = sanitizedStr.split(",").map((tag) => tag.trim());
  }

  return tagsArr;
};

export const tagsArrToString = (tagsArr: string[]): string =>
  tagsArr.join(", ");
