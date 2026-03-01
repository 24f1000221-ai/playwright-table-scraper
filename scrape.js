const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const seeds = [78,79,80,81,82,83,84,85,86,87];
  let grandTotal = 0;

  for (let seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    console.log(`Visiting ${url}`);
    await page.goto(url);

    await page.waitForSelector("table");

    const numbers = await page.$$eval("table td", cells =>
      cells.map(cell => parseFloat(cell.innerText))
           .filter(num => !isNaN(num))
    );

    const pageSum = numbers.reduce((a,b) => a + b, 0);
    console.log(`Seed ${seed} sum = ${pageSum}`);

    grandTotal += pageSum;
  }

  console.log("==================================");
  console.log("FINAL TOTAL:", grandTotal);
  console.log("==================================");

  await browser.close();
})();