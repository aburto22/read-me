import axios from "axios";
import fs from "fs/promises";

interface IWebsiteResponse {
  error?: { message: string };
  data?: { title: string; description?: string };
}

export const getTitle = (site: string): string => {
  const regex = /<title.*>(.*)<\/title>/;

  const match = site.match(regex);

  if (!match) {
    return "";
  }

  return match[1];
};

export const getDescription = (site: string): string => {
  const regex = /<meta.*?name="[og:]?description".*?>/;

  const match = site.match(regex);

  if (!match) {
    return "";
  }

  const regex1 = /content="(.*)"/;

  const match1 = match[0].match(regex1);

  if (!match1) {
    return "";
  }

  return match1[1];
};

export const getSiteInfo = async (link: string): Promise<IWebsiteResponse> => {
  try {
    const res = await axios.get<string>(link);

    let title = getTitle(res.data);
    let description = getDescription(res.data);

    if (title.length > 40) {
      title = `${title.slice(0, 40)}...`;
    }

    if (description.length > 40) {
      description = `${description.slice(0, 40)}...`;
    }

    return {
      data: { title, description },
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
