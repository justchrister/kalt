const puppeteer = require('puppeteer');

const artist = 'jean-michel-basquiat';
const url = 'https://www.artsy.net/artist/'+artist+'/auction-results';

const main = async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  const auctionResults = await page.evaluate(() => {
    const results = [] as any;
    const debugArray = [] as any;
    const items = document.querySelectorAll('div[data-test="auctionResults"] a');

    items.forEach(item => {
      const titleElement = item.querySelector('.Text-sc-18gcpao-0.bdhSqU') as HTMLElement;
      const mediumElement = item.querySelector('.Text-sc-18gcpao-0.caIGcn.igpgwE') as HTMLElement;
      const sizeElement = item.querySelectorAll('.Text-sc-18gcpao-0.caIGcn.igpgwE')[1] as HTMLElement; // 2nd occurrence
      const auctionDateAndHouseElement = item.querySelectorAll('.Text-sc-18gcpao-0.caIGcn.igpgwE')[2] as HTMLElement; // 3rd occurrence
      const priceElement = item.querySelector('.dcjXYX .gmskHr') as HTMLElement; // Updated selector for price
      const estimateElement = item.querySelector('.dcjXYX .ftUZSy.kFGRHf') as HTMLElement; // Updated selector for estimate

      const title = titleElement ? titleElement.innerText : null;
      const medium = mediumElement ? mediumElement.innerText : null;
      const size = sizeElement ? sizeElement.innerText : null;
      const auctionDateAndHouse = auctionDateAndHouseElement ? auctionDateAndHouseElement.innerText : null;
      const price = priceElement ? priceElement.innerText : null;
      const estimate = estimateElement ? estimateElement.innerText : null;

      if(!title && !medium && !size && !auctionDateAndHouse) {
        return
      } else {
        debugArray.push({ item })
        results.push({ title, medium, size, auctionDateAndHouse, price, estimate });
      }
    });

    return debugArray;
  });

  console.log(auctionResults);
  await browser.close();
};

main();