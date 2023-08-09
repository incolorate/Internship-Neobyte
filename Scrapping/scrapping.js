import puppeteer from "puppeteer";
import mongoose from "mongoose";
import Ad from "./models/adSchema.js";

const getLatestAds = async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(
    "https://www.olx.ro/imobiliare/terenuri/oradea/?currency=EUR"
  );

  // // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  const acceptButton = await page.waitForSelector(
    "#onetrust-accept-btn-handler"
  );
  await acceptButton.click();
  // // Get the URLs of each card using page.evaluate
  await page.close();
  let finalUrls = [];
  for (let i = 2; i < 3; i++) {
    const cardPage = await browser.newPage();
    await cardPage.goto(
      `https://www.olx.ro/imobiliare/terenuri/oradea/?currency=EUR&page=${i}`
    );

    const cardUrls = await cardPage.evaluate(() => {
      const cardElements = document.querySelectorAll(`a[class="css-rc5s2u"]`);
      const urls = [];
      cardElements.forEach((card) => {
        urls.push(card.getAttribute("href"));
      });
      return urls;
    });
    finalUrls = [...finalUrls, ...cardUrls];
    await cardPage.close();
  }

  // Create an array to store the data

  // Loop through each URL and get the data
  for (let i = 0; i < finalUrls.length; i++) {
    if (!finalUrls[i].includes("https://")) continue;
    const cardPage = await browser.newPage();
    await cardPage.goto(finalUrls[i]);
    // Close popup (if any)

    const isPopUp = await cardPage.evaluate((query) => {
      const element = document.querySelector(query);
      return element ? element.textContent.trim() : null;
    }, "#onetrust-accept-btn-handler");

    if (isPopUp) {
      await cardPage.click("#onetrust-accept-btn-handler");
    }

    // Get the needed data
    const titleSelector = `h1[data-cy="adPageAdTitle"].css-1wnihf5.efcnut38`;

    const title = await cardPage.evaluate((query) => {
      const element = document.querySelector(query);
      return element ? element.textContent.trim() : null;
    }, titleSelector);

    const existingAd = await Ad.findOne({ title: { ro: title } });

    if (existingAd === null) {
      console.log("Already in db ");
      await cardPage.close();
      continue;
    }

    const priceSelector = `strong[aria-label="Preț"]`;
    const price = await cardPage.evaluate((query) => {
      const element = document.querySelector(query);
      return element ? element.textContent.trim() : null;
    }, priceSelector);

    const locationSelector = 'a[aria-label="Abordare"][href="#map"]';
    const location = await cardPage.evaluate((query) => {
      const element = document.querySelector(query);
      return element ? element.textContent.trim() : null;
    }, locationSelector);

    const descriptionSelector = 'div[data-cy="adPageAdDescription"]';
    const description = await cardPage.evaluate((query) => {
      const element = document.querySelector(query);
      return element ? element.textContent.trim() : null;
    }, descriptionSelector);

    const imageSelector =
      'div[aria-label="Go to Slide 1"] img.image-gallery-image';
    const image = await cardPage.evaluate((query) => {
      const imgElement = document.querySelector(query);
      return imgElement ? imgElement.src : null;
    }, imageSelector);

    const adData = {
      title: { ro: title },
      description: { ro: title },
      price,
      location,
      image,
    };

    try {
      Ad.create(adData);
      console.log(adData, "created");
    } catch (error) {
      console("Error occurred at", adData.title);
    }

    await cardPage.close();
  }
  await browser.close();
};

export default getLatestAds;
