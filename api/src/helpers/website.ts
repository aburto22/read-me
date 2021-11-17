import axios from "axios";
import fs from "fs/promises";

interface IWebsiteResponse {
  error?: { message: string };
  data?: { [key: string]: string };
}

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
  const newLink = appendHTTPS(link);

  const regex = /^https:\/\/(?:www.)?.+?\..+?\//;

  const match = `${newLink}/`.match(regex);

  if (!match) {
    return "";
  }

  return match[0];
};

export const validateLink = (link: string): boolean => {
  const domain = getDomain(link.toLowerCase());
  return /^https:\/\/[a-z0-9-]+\.[a-z0-9-.]+\/$/.test(domain);
};

export const getHead = (site: string): string => {
  const regex = /<head\s*>[\s\S]*?<\/head>/;

  const match = site.match(regex);

  if (!match) {
    return "";
  }

  return match[0];
};

export const getTitle = (site: string): string => {
  const head = getHead(site);

  const regex = /<title[^<>]*>(.*)<\/title>/;

  const match = head.match(regex);

  if (!match) {
    return "";
  }

  return match[1];
};

export const getDescription = (site: string): string => {
  const head = getHead(site);

  const regex = /<meta[^<>]*?name="(?:og:)?description"[^<>]*?>/;

  const match = head.match(regex);

  if (!match) {
    return "";
  }

  const regex1 = /content="(.*?)"/;

  const match1 = match[0].match(regex1);

  if (!match1) {
    return "";
  }

  return match1[1];
};

export const getImageSrc = (site: string): string => {
  const head = getHead(site);

  const regex = /<meta[^<>]*?property="(?:og:)?image"[^<>]*?>/;

  const match = head.match(regex);

  if (!match) {
    return "";
  }

  const regex1 = /content="(.*?)"/;

  const match1 = match[0].match(regex1);

  if (!match1) {
    return "";
  }

  return match1[1];
};

export const getSiteInfo = async (link: string): Promise<IWebsiteResponse> => {
  try {
    const res = await axios.get<string>(link);

    const title = getTitle(res.data);
    const description = getDescription(res.data);
    const image = getImageSrc(res.data);

    return {
      data: { title, description, image, success: "success" },
    };
  } catch (err) {
    return {
      error: { message: (err as Error).message },
    };
  }
};

export const getSiteFile = async (
  link: string,
  fileName: string
): Promise<IWebsiteResponse> => {
  try {
    const res = await axios.get<string>(link);

    await fs.writeFile(`./tests/html/${fileName}.html`, res.data);

    console.log(`${link} > ${fileName}.html`);

    return { data: { success: "success" } };
  } catch (err) {
    return { error: { message: (err as Error).message } };
  }
};
