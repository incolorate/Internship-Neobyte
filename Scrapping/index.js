import puppeteer from "puppeteer";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://www.olx.ro/");

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Remove cookie consent pop-up
  const consentPopUp = await page.waitForSelector("#onetrust-consent-sdk");
  await consentPopUp.evaluate((el) => el.remove());

  // Select category
  //imobiliare
  const categorySelector = await page.waitForSelector(
    "#searchmain-container > div.maincategories > div > div:nth-child(2) > div:nth-child(3) > div > a"
  );

  await categorySelector.click();

  // Select subcategory
  // terenuri
  const subcategorySelector = await page.waitForSelector(
    "#bottom3 > ul > li:nth-child(6) > a"
  );
  await subcategorySelector.click();

  // Remove popup again
  const acceptButton = await page.waitForSelector(
    "#onetrust-accept-btn-handler"
  );
  await acceptButton.click();

  // Get the URLs of each card using page.evaluate
  const cardUrls = await page.evaluate(() => {
    const cardElements = document.querySelectorAll(`a[class="css-rc5s2u"]`);
    const urls = [];
    cardElements.forEach((card) => {
      urls.push(card.getAttribute("href"));
    });
    return urls;
  });

  await page.close();

  // Create an array to store the data
  const data = [];

  // Loop through each URL and get the data
  for (let i = 0; i < cardUrls.length; i++) {
    if (!cardUrls[i].includes("https://")) continue;
    const cardPage = await browser.newPage();
    await cardPage.goto(cardUrls[i]);
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

    const priceSelector = `strong[data-cy="adPageAdPrice"]`;
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

    const imageSelector = "img.image-gallery-image";
    const image = await cardPage.evaluate((query) => {
      const element = document.querySelector(query);
      return element ? element.textContent.trim() : null;
    }, imageSelector);

    data.push({ title, price, location, description, image });
    await cardPage.close();
  }
  console.log(data);
  page.screenshot({ path: "screenshot.png" });
})();
