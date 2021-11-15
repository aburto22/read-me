import { getSiteInfo, getSiteFile } from "../src/helpers/website";

describe("Test website helpers", () => {
  test("It should retrieve link information: Google", async () => {
    const link = "https://www.google.com/";
    const response = await getSiteInfo(link);

    const desiredOutput = {
      title: "Google",
      description:
        "Velkommen til Google S�k. Finn det du leter etter p� nettet p� et blunk.",
    };

    expect(response.data).toMatchObject(desiredOutput);
  });
  test("It should retrieve link information: freeCodeCamp", async () => {
    const link = "https://www.freecodecamp.org/";
    const response = await getSiteInfo(link);

    const desiredOutput = {
      title: "Learn to Code — For Free — Coding Courses for Busy People",
      description: "Learn to Code — For Free",
    };

    expect(response.data).toMatchObject(desiredOutput);
  });
  test("It should retrieve link information: Article DpReview", async () => {
    const link =
      "https://www.dpreview.com/news/8162395393/nikon-partners-with-nissin-profoto-for-future-collaboration-on-speedlights-studio-lighting-gear";
    const response = await getSiteInfo(link);

    const desiredOutput = {
      title:
        "Nikon partners with Nissin, Profoto for future collaboration on speedlights, studio lighting gear: Digital Photography Review",
      description:
        "Nikon doesn&#39;t specifically mention any future products, but does state the collaboration with Nissin and Profoto will &#39;increase reliable options for Nikon camera users, expanding possibilities for imaging expression&#39;",
    };

    expect(response.data).toMatchObject(desiredOutput);
  });
  test("It should retrieve link information: freeCodeCamp news", async () => {
    const link =
      "https://www.freecodecamp.org/news/learn-all-about-micro-frontends/";
    const response = await getSiteInfo(link);

    const desiredOutput = {
      title: "Learn all about Micro-Frontends",
      description:
        "Micro-frontends let you build a website or web app as a composition of features that you can create and work on separately. We just published a course on the freeCodeCamp.org YouTube channel that will teach you all about micro-frontends. Jack Herrington created this course. Jack has worked as a",
    };

    expect(response.data).toMatchObject(desiredOutput);
  });
  test("It should retrieve link information: freeCodeCamp forum post", async () => {
    const link = "https://forum.freecodecamp.org/t/mf-doom-tribute-page/484757";
    const response = await getSiteInfo(link);

    const desiredOutput = {
      title: "MF DOOM Tribute Page - Project Feedback - The freeCodeCamp Forum",
      description: "Hi! Please check out my tribute page project:",
    };

    expect(response.data).toMatchObject(desiredOutput);
  });
  test("It should retrieve link information: TypeScript Handbook chapter", async () => {
    const link =
      "https://www.typescriptlang.org/docs/handbook/2/functions.html";
    const response = await getSiteInfo(link);

    const desiredOutput = {
      title: "TypeScript: Documentation - More on Functions",
      description: "Learn about how Functions work in TypeScript.",
    };

    expect(response.data).toMatchObject(desiredOutput);
  });
});
