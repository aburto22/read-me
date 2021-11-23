import { getSiteFile, getSiteInfo } from "../src/helpers/website";

const url = process.argv[2] || "";
const fileName = process.argv[3] || "fileSite";

getSiteFile(url, fileName)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

getSiteInfo(url).then((res) => console.log(res));
