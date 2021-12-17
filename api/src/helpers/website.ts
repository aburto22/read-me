import axios from "axios";
import fs from "fs/promises";

interface IWebsiteError {
  type: "error";
  message: string;
}

interface IWebsiteSuccess {
  type: "success";
  data: { [key: string]: string };
}

type IWebsiteResponse = IWebsiteError | IWebsiteSuccess;

export const cleanText = (text: string): string => {
  let cleanedText = text.replaceAll("\n", " ").trim();

  while (cleanedText.indexOf("  ") >= 0) {
    cleanedText = cleanedText.replace("  ", " ");
  }

  return cleanedText;
};

export const appendHTTPS = (link: string): string => {
  let domain = link;
  if (link.indexOf("http://") === 0) {
    domain = link.replace("http://", "https://");
  } else if (link.indexOf("https://") !== 0) {
    domain = `https://${link}`;
  }

  return domain;
};

export const getDomain = (link: string): string => {
  const httpsLink = appendHTTPS(link);

  const regex = /^https:\/\/(?:www.)?.+?\..+?\//;

  const linkMatch = `${httpsLink}/`.match(regex);

  if (!linkMatch) {
    return "";
  }

  return linkMatch[0];
};

export const getUrl = (link: string): string => {
  const newLink = appendHTTPS(link);

  const linkSplit = newLink.split("/");

  const urlSplit = linkSplit.filter((val, i) => {
    if (i < 3) {
      return true;
    }

    return !val.includes(".");
  });

  const url = urlSplit.join("/");

  return url.slice(-1) === "/" ? url : `${url}/`;
};

export const validateLink = (link: string): boolean => {
  const domain = getDomain(link.toLowerCase());
  return /^https:\/\/[a-z0-9-]+\.[a-z0-9-.]+\/$/.test(domain);
};

export const getHead = (site: string): string => {
  const regex = /<head\s*>[\s\S]*?<\/head>/i;

  const match = site.match(regex);

  if (!match) {
    return "";
  }

  return match[0];
};

export const getTitle = (site: string): string => {
  const head = getHead(site);

  const titleTextRegex = /<title[^<>]*>([^<>]*)<\/title>/i;

  const titleTextMatch = head.match(titleTextRegex);

  if (!titleTextMatch) {
    return "";
  }

  return cleanText(titleTextMatch[1]);
};

export const getDescription = (site: string): string => {
  const head = getHead(site);

  const regexDescriptionTag =
    /<meta[^<>]+(?:name|property)="?(?:[a-z]+:)?description"?[^\0]*?(?<!=")>/gi;

  const descriptionTagMatch = head.match(regexDescriptionTag);

  if (!descriptionTagMatch) {
    return "";
  }

  const longestMatch = descriptionTagMatch.reduce(
    (preferred, str) => (str.length > preferred.length ? str : preferred),
    ""
  );

  const descriptionTextRegex = /content="([^"]+?)"/i;

  const descriptionTextMatch = longestMatch.match(descriptionTextRegex);

  if (!descriptionTextMatch) {
    return "";
  }

  return cleanText(descriptionTextMatch[1]);
};

export const getImageSrc = (site: string, link = ""): string => {
  const head = getHead(site);

  const regexImageTag = /<meta[^<>]*?property="?(?:[a-z]+:)?image"?[^<>]*?>/i;

  const imageTagMatch = head.match(regexImageTag);

  if (!imageTagMatch) {
    return "";
  }

  const imageTag = imageTagMatch[0];

  const regexImageSrc = /content="(.*?)"/i;

  const imageSrcMatch = imageTag.match(regexImageSrc);

  if (!imageSrcMatch) {
    return "";
  }

  const imageSrc = imageSrcMatch[1];

  if (/^http/.test(imageSrc)) {
    return imageSrc;
  }

  if (imageSrc[0] === "/") {
    const domain = getDomain(link);
    return domain.slice(0, -1) + imageSrc;
  }

  const url = getUrl(link);
  return url + imageSrc;
};

export const getIconApple = (site: string, link = ""): string => {
  const head = getHead(site);

  const regexIconTag = /<link[^<>]*?rel="apple-touch-icon"[^<>]*?>/gi;

  const iconTagMatches = head.match(regexIconTag);

  if (!iconTagMatches) {
    return "";
  }

  const regexIconSize = /sizes="(\d+)x\d+"/i;

  const iconTagMatchesWithSizes = iconTagMatches.map((iconTag) => {
    const sizeMatch = iconTag.match(regexIconSize);

    return {
      iconTag,
      size: sizeMatch ? Number(sizeMatch[1]) : 0,
    };
  });

  iconTagMatchesWithSizes.sort((a, b) => b.size - a.size);

  const largestSizeIconTag = iconTagMatchesWithSizes[0].iconTag;

  const regexIconSrc = /href="(.*?)"/;

  const iconSrcMatch = largestSizeIconTag.match(regexIconSrc);

  if (!iconSrcMatch) {
    return "";
  }

  const iconSrc = iconSrcMatch[1];

  if (/^http/.test(iconSrc)) {
    return iconSrc;
  }

  if (iconSrc[0] === "/") {
    const domain = getDomain(link);
    return domain.slice(0, -1) + iconSrc;
  }

  const url = getUrl(link);
  return url + iconSrc;
};

export const getFaviconOrMaskIcon = (site: string, link = ""): string => {
  const head = getHead(site);

  const regexFaviconTag = /<link[^<>]*?rel="[-a-z ]*icon"?[^<>]*?>/i;

  const faviconTagMatch = head.match(regexFaviconTag);

  if (!faviconTagMatch) {
    return "";
  }

  const faviconTag = faviconTagMatch[0];

  const regexFaviconSrc = /href="(.*?)"/i;

  const faviconSrcMatch = faviconTag.match(regexFaviconSrc);

  if (!faviconSrcMatch) {
    return "";
  }

  const faviconSrc = faviconSrcMatch[1];

  if (/^http/.test(faviconSrc)) {
    return faviconSrc;
  }

  if (faviconSrc[0] === "/") {
    const domain = getDomain(link);
    return domain.slice(0, -1) + faviconSrc;
  }

  const url = getUrl(link);
  return url + faviconSrc;
};

export const getSiteInfo = async (link: string): Promise<IWebsiteResponse> => {
  try {
    const res = await axios.get<string>(link);

    const title = getTitle(res.data);
    const description = getDescription(res.data);
    let image = getImageSrc(res.data, link);

    if (image === "") {
      image = getIconApple(res.data, link);
    }

    if (image === "") {
      image = getFaviconOrMaskIcon(res.data, link);
    }

    return {
      type: "success",
      data: { title, description, image },
    };
  } catch (err) {
    return {
      type: "error",
      message: (err as Error).message,
    };
  }
};

export const getSiteFile = async (
  link: string,
  fileName: string
): Promise<IWebsiteResponse> => {
  try {
    const res = await axios.get<string>(link);

    await fs.writeFile(
      `${__dirname}/../../tests/html/${fileName}.html`,
      res.data
    );

    return { type: "success", data: { message: "File saved." } };
  } catch (err) {
    return { type: "error", message: (err as Error).message };
  }
};
