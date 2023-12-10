const puppeteer = require('puppeteer');

const artist = 'jean-michel-basquiat';
const urlFilters = '?hide_upcoming=false&allow_empty_created_dates=true&currency=&include_estimate_range=false&include_unknown_prices=true&allow_unspecified_sale_dates=true'
const url = 'https://www.artsy.net/artist/' + artist + '/auction-results' + urlFilters;

const main = async () => {
  const browser = await puppeteer.launch({ headless: false }); // Set headless to false for debugging
  const page = await browser.newPage();

  // authenticate
  await page.goto('https://www.artsy.net/login', { waitUntil: 'networkidle2' });
  await page.type('input[type="email"]', 'christer@ka.lt');
  await page.type('input[type="password"]', 'zW0b)E$bahTxu+Sx'); 
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  await page.goto(url, { waitUntil: 'networkidle2' });

  const maxPages = await page.evaluate(() => {
    const paginationLinks = Array.from(document.querySelectorAll('.Pagination__PageLink-sc-1r2jw01-0'));
    const lastPageLink = paginationLinks[paginationLinks.length - 1];
    return lastPageLink ? parseInt(lastPageLink.textContent, 10) : 1;
  });

  let results = [];
  for (let i = 0; i < maxPages; i++) {
    await page.goto(url, { waitUntil: 'networkidle2' });
  }

  const itemsHtml = await page.evaluate(() => {
    const items = document.querySelectorAll('div[data-test="auctionResults"] a');
    items.forEach((item, index) => {
      const titleElement = item.querySelector('.Text-sc-18gcpao-0.bdhSqU');
      const mediumElement = item.querySelector('.Text-sc-18gcpao-0.caIGcn.igpgwE');
      const sizeElement = item.querySelectorAll('.Text-sc-18gcpao-0.caIGcn.igpgwE')[1]; // 2nd occurrence
      const auctionDateAndHouseElement = item.querySelectorAll('.Text-sc-18gcpao-0.caIGcn.igpgwE')[2]; // 3rd occurrence
      const priceElement = item.querySelector('.dcjXYX .gmskHr'); // Updated selector for price
      const estimateElement = item.querySelector('.dcjXYX .ftUZSy.kFGRHf'); // Updated selector for estimate

      const title = titleElement ? titleElement.innerText : null;
      const medium = mediumElement ? mediumElement.innerText : null;
      const size = sizeElement ? sizeElement.innerText : null;
      const auctionDate = auctionDateAndHouseElement ? auctionDateAndHouseElement.innerText.split(' • ')[0] : null;
      const auctionHouse = auctionDateAndHouseElement ? auctionDateAndHouseElement.innerText.split(' • ')[1] : null;
      const price = priceElement ? priceElement.innerText : null;
      const estimate = estimateElement ? estimateElement.innerText : null;

      if(!title && !medium && !size) {
        return
      } else {
        results.push({ title, medium, size, auctionDate, auctionHouse, price, estimate });
      }
    });

  });

  console.log(itemsHtml);
  await browser.close();
};

main();