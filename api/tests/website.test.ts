import { getSiteInfo, getSiteFile } from "../src/helpers/website";

describe("Test website helpers", () => {
  test("It should retrieve link information: www.google.com", async () => {
    const linkFccForumPost =
      "https://forum.freecodecamp.org/t/mf-doom-tribute-page/484757";
    const linkFccNews =
      "https://www.freecodecamp.org/news/learn-all-about-micro-frontends/";
    const linkDpReview =
      "https://www.dpreview.com/news/8162395393/nikon-partners-with-nissin-profoto-for-future-collaboration-on-speedlights-studio-lighting-gear";
    const freeCodeCamp = "https://www.freecodecamp.org/";
    const google = "https://www.google.com/";
    const response = await getSiteInfo(linkFccNews);

    console.log("response: ", response);

    expect(response).toMatch("success");
  });
});
