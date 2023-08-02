import puppeteer from "puppeteer";
import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost", // Replace with your MySQL host
  user: "root", // Replace with your MySQL username
  password: "password", // Replace with your MySQL password
  database: "laravelreact", // Replace with your MySQL database name
  connectionLimit: 10, // Set the maximum number of connections in the pool
});

async function checkIfEntryExists(title) {
  try {
    const query = "SELECT COUNT(*) AS count FROM olx_data WHERE title = ?";
    const [rows] = await pool.promise().query(query, [title]);
    const count = rows[0].count;
    return count > 0;
  } catch (err) {
    console.log("Error while checking entry:", err);
    return false;
  }
}

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

    const titleExists = await checkIfEntryExists(title);
    if (titleExists) {
      console.log(
        "Entry with the same title already exists. Skipping insertion."
      );
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

    console.log(image);
    const adData = { title, description, price, location, image };
    data.push(adData);

    try {
      // Execute the INSERT query using the MySQL pool
      const result = await pool
        .promise()
        .query("INSERT INTO olx_data SET ?", adData);

      console.log("Inserted row ID:", result[0].insertId);
    } catch (err) {
      console.log(err);
    }

    await cardPage.close();
  }
  pool.end();
  await browser.close();
})();
