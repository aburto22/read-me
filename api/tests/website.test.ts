import { getSiteInfo, getSiteFile } from "../src/helpers/website";

describe("Test website helpers", () => {
  test("It should retrieve link information: Google", async () => {
    const link = "https://www.google.com/";
    const response = await getSiteInfo(link);

    const desiredOutput = {
      title: "Google",
      description:
        "Velkommen til Google S�k. Finn det du leter etter p� nettet p� et blunk.",
      image: "something",
    };

    expect(response.data).toMatchObject(desiredOutput);
  });
  test("It should retrieve link information: freeCodeCamp", async () => {
    const link = "https://www.freecodecamp.org/";
    const response = await getSiteInfo(link);

    const desiredOutput = {
      title: "Learn to Code — For Free — Coding Courses for Busy People",
      description: "Learn to Code — For Free",
      image:
        "https://cdn.freecodecamp.org/platform/universal/fcc_meta_1920X1080-indigo.png",
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
      image:
        "https://1.img-dpreview.com/files/p/E~TS940x788~articles/8162395393/Nikon_Nissin.jpeg",
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
      image:
        "https://www.freecodecamp.org/news/content/images/2021/11/microfrontends.png",
    };

    expect(response.data).toMatchObject(desiredOutput);
  });
  test("It should retrieve link information: freeCodeCamp forum post", async () => {
    const link = "https://forum.freecodecamp.org/t/mf-doom-tribute-page/484757";
    const response = await getSiteInfo(link);

    const desiredOutput = {
      title: "MF DOOM Tribute Page - Project Feedback - The freeCodeCamp Forum",
      description: "Hi! Please check out my tribute page project:",
      image:
        "https://aws1.discourse-cdn.com/freecodecamp/original/3X/2/0/206c254cf9e405bcddf6caea7f882dca146dcd3c.png",
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
      image: "something",
    };

    expect(response.data).toMatchObject(desiredOutput);
  });
  test("It should retrieve link information: Jest using matchers", async () => {
    const link = "https://jestjs.io/docs/using-matchers";
    const response = await getSiteInfo(link);

    const desiredOutput = {
      title: "Using Matchers · Jest",
      description:
        "Jest uses &quot;matchers&quot; to let you test values in different ways. This document will introduce some commonly used matchers. For the full list, see the expect API doc.",
      image: "https://jestjs.io/img/opengraph.png",
    };

    expect(response.data).toMatchObject(desiredOutput);
  });
  test("It should retrieve link information: TypeScript Handbook Narrowing", async () => {
    const link =
      "https://www.typescriptlang.org/docs/handbook/2/narrowing.html";
    const response = await getSiteInfo(link);

    const desiredOutput = {
      title: "TypeScript: Documentation - Narrowing",
      description:
        "Understand how TypeScript uses JavaScript knowledge to reduce the amount of type syntax in your projects.",
      image: "something",
    };

    expect(response.data).toMatchObject(desiredOutput);
  });
  test("It should retrieve link information: Average joe cycling", async () => {
    const link = "https://averagejoecyclist.com/";
    const response = await getSiteInfo(link);

    const desiredOutput = {
      title:
        "Average Joe Cyclist &bull; A Blog for Average People who LOVE to ride bikes!",
      description: "A Blog for Average People who LOVE to ride bikes!",
      image: "something",
    };

    expect(response.data).toMatchObject(desiredOutput);
  });
});
