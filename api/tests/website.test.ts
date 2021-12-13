import {
  getSiteInfo,
  getSiteFile,
  getHead,
  getTitle,
  getDescription,
  getDomain,
  getUrl,
  validateLink,
  appendHTTPS,
  getImageSrc,
  getIconApple,
  getFaviconOrMaskIcon,
} from "../src/helpers/website";

describe("Check And Append HTTPS if necessary", () => {
  test("Check https://www.google.com/", () => {
    const input = "https://www.google.com/";
    const response = appendHTTPS(input);

    const desiredOutput = "https://www.google.com/";

    expect(response).toMatch(desiredOutput);
  });
  test("Check http://www.google.com/", () => {
    const input = "http://www.google.com/";
    const response = appendHTTPS(input);

    const desiredOutput = "https://www.google.com/";

    expect(response).toMatch(desiredOutput);
  });
  test("Check www.google.com/", () => {
    const input = "www.google.com/";
    const response = appendHTTPS(input);

    const desiredOutput = "https://www.google.com/";

    expect(response).toMatch(desiredOutput);
  });
  test("Check google.com/", () => {
    const input = "google.com/";
    const response = appendHTTPS(input);

    const desiredOutput = "https://google.com/";

    expect(response).toMatch(desiredOutput);
  });
  test("Check www.google.com/I-am-additional-info/than-this", () => {
    const input = "www.google.com/I-am-additional-info/than-this";
    const response = appendHTTPS(input);

    const desiredOutput =
      "https://www.google.com/I-am-additional-info/than-this";

    expect(response).toMatch(desiredOutput);
  });
});

describe("Validate Link", () => {
  test("Should validate https://www.google.com/", () => {
    const input = "https://www.google.com/";
    const response = validateLink(input);

    expect(response).toBeTruthy();
  });
  test("Should validate http://www.google.com/", () => {
    const input = "http://www.google.com/";
    const response = validateLink(input);

    expect(response).toBeTruthy();
  });
  test("Should validate https://www.google.com", () => {
    const input = "https://www.google.com";
    const response = validateLink(input);

    expect(response).toBeTruthy();
  });
  test("Should validate www.google.com", () => {
    const input = "www.google.com";
    const response = validateLink(input);

    expect(response).toBeTruthy();
  });
  test("Should validate google.com", () => {
    const input = "google.com";
    const response = validateLink(input);

    expect(response).toBeTruthy();
  });
  test("Should validate https://www.google.com/search=comida/another-thing/?q=hola", () => {
    const input = "https://www.google.com/search=comida/another-thing/?q=hola";
    const response = validateLink(input);

    expect(response).toBeTruthy();
  });
  test("Should validate http://google.co.uk", () => {
    const input = "http://google.co.uk";
    const response = validateLink(input);

    expect(response).toBeTruthy();
  });
  test("Should validate google.co.uk", () => {
    const input = "google.co.uk";
    const response = validateLink(input);

    expect(response).toBeTruthy();
  });
  test("Should not validate google", () => {
    const input = "google";
    const response = validateLink(input);

    expect(response).toBeFalsy();
  });
  test("Should not validate https://https://www.google.com/", () => {
    const input = "https://https://www.google.com/";
    const response = validateLink(input);

    expect(response).toBeFalsy();
  });
});

describe("Get Domain", () => {
  test("Get domain for a site for https://www.google.com/", () => {
    const input = "https://www.google.com/";
    const response = getDomain(input);

    const desiredOutput = "https://www.google.com/";

    expect(response).toMatch(desiredOutput);
  });
  test("Get domain for a site for http://www.google.com/", () => {
    const input = "http://www.google.com/";
    const response = getDomain(input);

    const desiredOutput = "https://www.google.com/";

    expect(response).toMatch(desiredOutput);
  });
  test("Get domain for a site for https://www.google.com", () => {
    const input = "https://www.google.com";
    const response = getDomain(input);

    const desiredOutput = "https://www.google.com/";

    expect(response).toMatch(desiredOutput);
  });
  test("Get domain for a site for www.google.com", () => {
    const input = "www.google.com";
    const response = getDomain(input);

    const desiredOutput = "https://www.google.com/";

    expect(response).toMatch(desiredOutput);
  });
  test("Get domain for a site for google.com", () => {
    const input = "google.com";
    const response = getDomain(input);

    const desiredOutput = "https://google.com/";

    expect(response).toMatch(desiredOutput);
  });
  test("Get domain for a site for https://www.google.com/search=comida/another-thing/?q=hola", () => {
    const input = "https://www.google.com/search=comida/another-thing/?q=hola";
    const response = getDomain(input);

    const desiredOutput = "https://www.google.com/";

    expect(response).toMatch(desiredOutput);
  });
});

describe("Get Url", () => {
  test("Get url for a site for https://www.google.com/", () => {
    const input = "https://www.google.com/";
    const response = getUrl(input);

    const desiredOutput = "https://www.google.com/";

    expect(response).toMatch(desiredOutput);
  });
  test("Get url for a site for https://www.google.com/docs", () => {
    const input = "http://www.google.com/docs";
    const response = getUrl(input);

    const desiredOutput = "https://www.google.com/docs";

    expect(response).toMatch(desiredOutput);
  });
  test("Get url for a site for https://www.google.com/docs/index.html", () => {
    const input = "https://www.google.com/docs/index.html";
    const response = getUrl(input);

    const desiredOutput = "https://www.google.com/docs/";

    expect(response).toMatch(desiredOutput);
  });
  test("Get url for a site for https://www.google.com/docs/index.html", () => {
    const input = "https://www.google.com/docs/index.html#place";
    const response = getUrl(input);

    const desiredOutput = "https://www.google.com/docs/";

    expect(response).toMatch(desiredOutput);
  });
});

describe("Get Head", () => {
  test("It sould retrieve head for a standard tag: <head> ... </head>", () => {
    const input =
      "<html>\n<head>\n<title>Mob</title>\n</head><body>\n<div></div>\n</body>\n</html>";
    const response = getHead(input);

    const desiredOutput = "<head>\n<title>Mob</title>\n";

    expect(response).toMatch(desiredOutput);
  });
  test("It sould retrieve head for a non standard tag: <head > ... </head>", () => {
    const input =
      "<html>\n<head >\n<title>Mob</title>\n</head><body>\n<div></div>\n</body>\n</html>";
    const response = getHead(input);

    const desiredOutput = "<head >\n<title>Mob</title>\n";

    expect(response).toMatch(desiredOutput);
  });
});

describe("Get Title", () => {
  test("It sould retrieve title for a standard tag: <title> ... </title>", () => {
    const input = "<head>\n<title>Mob</title>\n</head>";
    const response = getTitle(input);

    const desiredOutput = "Mob";

    expect(response).toMatch(desiredOutput);
  });
  test("It sould retrieve title for a non standard tag: <title [some attributes]> ... </title>", () => {
    const input =
      '<head >\n<title data-react-helmet="true">Learn to Code — For Free — Coding Courses for Busy People</title>\n</head>';
    const response = getTitle(input);

    const desiredOutput =
      "Learn to Code — For Free — Coding Courses for Busy People";

    expect(response).toMatch(desiredOutput);
  });
  test("It sould retrieve title for text with line breaks: <title> \n..\n. </title>", () => {
    const input =
      "<head >\n<title> \nLearn to Code — \nFor Free — Coding Courses \nfor Busy People</title>\n</head>";
    const response = getTitle(input);

    const desiredOutput =
      "Learn to Code — For Free — Coding Courses for Busy People";

    expect(response).toMatch(desiredOutput);
  });
});

describe("Get Description", () => {
  test('It sould retrieve description for a standard tag: <meta name="description" content="[some text]">', () => {
    const input =
      '<head>\n<meta name="description" content="Some description content">\n</head>';
    const response = getDescription(input);

    const desiredOutput = "Some description content";

    expect(response).toMatch(desiredOutput);
  });
  test('It sould retrieve description for a non standard tag with closing slash: <meta name="description" content="[some text]"/>', () => {
    const input =
      '<head>\n<meta name="description" content="Some description content"/>\n</head>';
    const response = getDescription(input);

    const desiredOutput = "Some description content";

    expect(response).toMatch(desiredOutput);
  });
  test('It sould retrieve description for a reverse tag: <meta content="[some text]" name="description"/>', () => {
    const input =
      '<head>\n<meta content="Some description content" name="description"/>\n</head>';
    const response = getDescription(input);

    const desiredOutput = "Some description content";

    expect(response).toMatch(desiredOutput);
  });
  test('It sould retrieve description for a tag with additional info: <meta data-react-helmet="true" content="[some text]" name="description"/>', () => {
    const input =
      '<head>\n<meta data-react-helmet="true" content="Some description content" name="description"/>\n</head>';
    const response = getDescription(input);

    const desiredOutput = "Some description content";

    expect(response).toMatch(desiredOutput);
  });
  test('It sould retrieve description for a tag with line jumps: <meta content="some text\\nand some more\\nline jumps" name="description"/>', () => {
    const input =
      '<head>\n<meta content="some text\nand some more\nline jumps" name="description"/>\n</head>';
    const response = getDescription(input);

    const desiredOutput = "some text and some more line jumps";

    expect(response).toMatch(desiredOutput);
  });
  test('It sould clean up a description with multiple spaces: <meta content="some   text\\n and some more \\nline   jumps" name="description"/>', () => {
    const input =
      '<head>\n<meta content="some   text\n and some more \nline   jumps" name="description"/>\n</head>';
    const response = getDescription(input);

    const desiredOutput = "some text and some more line jumps";

    expect(response).toMatch(desiredOutput);
  });
  test('It sould retrieve description for a tag with twitter before description: <meta content="[some text]" name="twitter:description"/>', () => {
    const input =
      '<head>\n<meta name="twitter:description" content="Some description content">\n</head>';
    const response = getDescription(input);

    const desiredOutput = "Some description content";

    expect(response).toMatch(desiredOutput);
  });
  test('It sould retrieve description for a tag where description is not between double quotes: <meta content="[some text]" name=description/>', () => {
    const input =
      '<head>\n<meta name=description content="Some description content">\n</head>';
    const response = getDescription(input);

    const desiredOutput = "Some description content";

    expect(response).toMatch(desiredOutput);
  });
});

describe("Get Image Src", () => {
  test('It sould retrieve image src for a standard tag: <meta property="image" content="[image src]">', () => {
    const input =
      '<head>\n<meta property="image" content="https://mysite.com/image.jpg">\n</head>';
    const link = "https://mysite.com/";
    const response = getImageSrc(input, link);

    const desiredOutput = "https://mysite.com/image.jpg";

    expect(response).toMatch(desiredOutput);
  });
  test('It sould retrieve image src for a reversed tag: <meta content="[image src]" property="image">', () => {
    const input =
      '<head>\n<meta content="https://mysite.com/image.jpg" property="image">\n</head>';
    const link = "https://mysite.com/";
    const response = getImageSrc(input, link);

    const desiredOutput = "https://mysite.com/image.jpg";

    expect(response).toMatch(desiredOutput);
  });
  test('It sould retrieve image src for a tag with text og image: <meta content="[image src]" property="og:image">', () => {
    const input =
      '<head>\n<meta content="https://mysite.com/image.jpg" property="og:image">\n</head>';
    const link = "https://mysite.com/";
    const response = getImageSrc(input, link);

    const desiredOutput = "https://mysite.com/image.jpg";

    expect(response).toMatch(desiredOutput);
  });
  test('It sould retrieve image src for a tag where property doesn\'t contain double quotes: <meta content="[image src]" property=image>', () => {
    const input =
      '<head>\n<meta content="https://mysite.com/image.jpg" property=image>\n</head>';
    const link = "https://mysite.com/";
    const response = getImageSrc(input, link);

    const desiredOutput = "https://mysite.com/image.jpg";

    expect(response).toMatch(desiredOutput);
  });
  test('It sould retrieve image src for relative path: <meta content="[image src]" property="image">', () => {
    const input =
      '<head>\n<meta content="/image.jpg" property="image">\n</head>';
    const link = "https://mysite.com/";
    const response = getImageSrc(input, link);

    const desiredOutput = "https://mysite.com/image.jpg";

    expect(response).toMatch(desiredOutput);
  });
});

describe("Get Apple Touch Icon Src", () => {
  test('It should retrieve apple touch src for a standard tag: <link rel="apple-touch-icon" sizes=[size] href="[icon src]"/>', () => {
    const input =
      '<head>\n<link rel="apple-touch-icon" sizes="76x76" href="https://mysite.com/apple-touch-icon-ipad-76x76.png"/>\n</head>';
    const link = "https://mysite.com/";
    const response = getIconApple(input, link);

    const desiredOutput = "https://mysite.com/apple-touch-icon-ipad-76x76.png";

    expect(response).toMatch(desiredOutput);
  });
  test('It should retrieve the largest apple touch src, each tag of the format: <link rel="apple-touch-icon" sizes=[size] href="[icon src]"/>', () => {
    const input =
      '<head>\n<link rel="apple-touch-icon" sizes="76x76" href="https://mysite.com/apple-touch-icon-ipad-76x76.png"/><link rel="apple-touch-icon" sizes="152x152" href="https://mysite.com/apple-touch-icon-ipad-152x152.png"/><link rel="apple-touch-icon" sizes="120x120" href="https://mysite.com/apple-touch-icon-ipad-120x120.png"/>\n</head>';
    const link = "https://mysite.com/";
    const response = getIconApple(input, link);

    const desiredOutput =
      "https://mysite.com/apple-touch-icon-ipad-152x152.png";

    expect(response).toMatch(desiredOutput);
  });
  test('It should retrieve apple touch src for a src without domain nor leading slash: <link rel="apple-touch-icon" sizes=[size] href="[icon src]"/>', () => {
    const input =
      '<head>\n<link rel="apple-touch-icon" sizes="76x76" href="apple-touch-icon-ipad-76x76.png"/>\n</head>';
    const link = "https://mysite.com/";
    const response = getIconApple(input, link);

    const desiredOutput = "https://mysite.com/apple-touch-icon-ipad-76x76.png";

    expect(response).toMatch(desiredOutput);
  });
});

describe("Get Favicon Src", () => {
  test('It should retrieve favicon src for a standard tag: <link rel="shortcut icon" href="/favicon.ico">', () => {
    const input =
      '<head>\n<link rel="shortcut icon" href="/favicon.ico">\n</head>';
    const link = "https://mysite.com/";
    const response = getFaviconOrMaskIcon(input, link);

    const desiredOutput = "https://mysite.com/favicon.ico";

    expect(response).toMatch(desiredOutput);
  });
  test('It should retrieve mask icon src for a standard tag: <link rel="mask-icon" href="[icon src]">', () => {
    const input = '<head>\n<link rel="mask-icon" href="img/icon.svg">\n</head>';
    const link = "https://mysite.com/docs/";
    const response = getFaviconOrMaskIcon(input, link);

    const desiredOutput = "https://mysite.com/docs/img/icon.svg";

    expect(response).toMatch(desiredOutput);
  });
});

describe("Get Site Info", () => {
  test("It should retrieve link information: Google", async () => {
    const link = "https://www.google.com/";
    const response = await getSiteInfo(link);

    const desiredOutput = {
      title: "Google",
      description:
        "Velkommen til Google S�k. Finn det du leter etter p� nettet p� et blunk.",
      image:
        "https://www.google.com/logos/doodles/2021/seasonal-holidays-2021-6753651837109324-2xa.gif",
    };

    if (response.type === "success") {
      expect(response.data).toMatchObject(desiredOutput);
    } else {
      fail(response.message);
    }
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

    if (response.type === "success") {
      expect(response.data).toMatchObject(desiredOutput);
    } else {
      fail(response.message);
    }
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

    if (response.type === "success") {
      expect(response.data).toMatchObject(desiredOutput);
    } else {
      fail(response.message);
    }
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

    if (response.type === "success") {
      expect(response.data).toMatchObject(desiredOutput);
    } else {
      fail(response.message);
    }
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

    if (response.type === "success") {
      expect(response.data).toMatchObject(desiredOutput);
    } else {
      fail(response.message);
    }
  });
  test("It should retrieve link information: TypeScript Handbook chapter", async () => {
    const link =
      "https://www.typescriptlang.org/docs/handbook/2/functions.html";
    const response = await getSiteInfo(link);

    const desiredOutput = {
      title: "TypeScript: Documentation - More on Functions",
      description: "Learn about how Functions work in TypeScript.",
      image:
        "https://www.typescriptlang.org/icons/icon-512x512.png?v=8944a05a8b601855de116c8a56d3b3ae",
    };

    if (response.type === "success") {
      expect(response.data).toMatchObject(desiredOutput);
    } else {
      fail(response.message);
    }
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

    if (response.type === "success") {
      expect(response.data).toMatchObject(desiredOutput);
    } else {
      fail(response.message);
    }
  });
  test("It should retrieve link information: TypeScript Handbook Narrowing", async () => {
    const link =
      "https://www.typescriptlang.org/docs/handbook/2/narrowing.html";
    const response = await getSiteInfo(link);

    const desiredOutput = {
      title: "TypeScript: Documentation - Narrowing",
      description:
        "Understand how TypeScript uses JavaScript knowledge to reduce the amount of type syntax in your projects.",
      image:
        "https://www.typescriptlang.org/icons/icon-512x512.png?v=8944a05a8b601855de116c8a56d3b3ae",
    };

    if (response.type === "success") {
      expect(response.data).toMatchObject(desiredOutput);
    } else {
      fail(response.message);
    }
  });
  test("It should retrieve link information: Average joe cycling", async () => {
    const link = "https://averagejoecyclist.com/";
    const response = await getSiteInfo(link);

    const desiredOutput = {
      title:
        "Average Joe Cyclist &bull; A Blog for Average People who LOVE to ride bikes!",
      description: "A Blog for Average People who LOVE to ride bikes!",
      image:
        "https://averagejoecyclist.com/wp-content/themes/magazine-pro/images/favicon.ico",
    };

    if (response.type === "success") {
      expect(response.data).toMatchObject(desiredOutput);
    } else {
      fail(response.message);
    }
  });
  test("It should retrieve link information: Cloud Convert", async () => {
    const link = "https://cloudconvert.com/png-to-webp";
    const response = await getSiteInfo(link);

    const desiredOutput = {
      title: "PNG to WEBP | CloudConvert",
      description:
        ">PNG to WEBP Converter - CloudConvert is a free &amp; fast online file conversion service.",
      image: "https://cloudconvert.com/images/logo_flat_32.png",
    };

    if (response.type === "success") {
      expect(response.data).toMatchObject(desiredOutput);
    } else {
      fail(response.message);
    }
  });
});

describe("Get site file", () => {
  test("It should save an html file for a site", async () => {
    const link =
      "https://www.dpreview.com/news/2896002236/ttartisan-unveils-lightweight-28mm-f5-6-prime-for-leica-m-mount-cameras";
    const fileName = "DpReviewArticle";
    const response = await getSiteFile(link, fileName);

    const desiredOutput = { type: "success" };

    if (response.type === "success") {
      expect(response).toMatchObject(desiredOutput);
    } else {
      fail(response.message);
    }
  });
});
