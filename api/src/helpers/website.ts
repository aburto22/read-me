import axios from "axios";
import fs from "fs/promises";

interface IWebsiteResponse {
  error?: { message: string };
  data?: { title: string; description?: string; image?: string };
}

export const getHead = (site: string): string => {
  const regex = /<head>[\s\S]*?<\/head>/;

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
      data: { title, description, image },
    };
  } catch (err) {
    return {
      error: { message: (err as Error).message },
    };
  }
};

export const getSiteFile = async (link: string): Promise<string> => {
  try {
    const res = await axios.get<string>(link);

    const outputFile = "response.html";

    await fs.writeFile(`./tests/html/${outputFile}`, res.data);

    console.log(`${link} > ${outputFile}`);

    return "completed";
  } catch (err) {
    return "failed";
  }
};
