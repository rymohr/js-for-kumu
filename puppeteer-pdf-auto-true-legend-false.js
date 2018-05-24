const puppeteer = require('puppeteer');

async function createPDF(url) {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto(url);

  await page.mouse.click(0, 0, {'delay': 10000});

  result = await page.evaluate(result => {
    Workflows.exportPDF({fontFamily: 'proxima nova', auto: true, legend: false});
    result ='success';
    return result;
  }, '');

  console.log(result);

  // await browser.close();
}

createPDF('https://kumu.io/AlexVipond/etis-040518#co-authors-vol1');
