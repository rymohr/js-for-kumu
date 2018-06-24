const puppeteer = require ('puppeteer');
const fs = require ('fs');

async function blendColors(color1, color2, midpoints, returnMidpoint, colorName) {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('file:///Users/Alex/dev/js-for-kumu/color-blender/color-blender.html#' + color1 + ':' + color2 + ':' + midpoints + ':hex');

  let color = await page.evaluate((result, returnMidpoint) => {

    result += document.querySelector("#pal" + returnMidpoint).value;
    return result;

  }, '', returnMidpoint);

  await browser.close();

  let css = '.' + colorName + ' {\n  color: ' + color + ';\n}';

  fs.writeFile(colorName + '.css', css, (err) => {
    if (err) throw err;
    console.log('yay!');
  });
}

blendColors('#EF5753', '#FAAD63', 1, 1, 'red-orange-light');
