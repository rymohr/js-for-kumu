const puppeteer = require ('puppeteer');
const fs = require ('fs');

async function blendTailwind(tailwind) {
  let browser = await puppeteer.launch({headless: false});

  let blends = [];

  for(i = 0; i < tailwind.length; i++) {
    if (i < tailwind.length - 1) {
      let name = tailwind[i].name + '-' + tailwind[i + 1].name;
      let shades = [];

      for(j = 0; j < tailwind[i].shades.length; j++) {
        let page = await browser.newPage();

        await page.goto('file:///Users/Alex/dev/js-for-kumu/color-blender/color-blender.html#' + tailwind[i].shades[j].hex + ':' + tailwind[i + 1].shades[j].hex + ':1:hex');

        let hex = await page.evaluate(result => {
          return document.querySelector("#pal1").value;
        }, '');

        shades.push({
          "shade": tailwind[i].shades[j].shade,
          "hex": hex
        });

        console.log(name + '-' + tailwind[i].shades[j].shade);

        await page.close();
      }
      blends.push({
        "name": name,
        "shades": shades
      });
    } else {
      let name = tailwind[i].name + '-' + tailwind[0].name;
      let shades = [];

      for(j = 0; j < tailwind[i].shades.length; j++) {
        let page = await browser.newPage();

        await page.goto('file:///Users/Alex/dev/js-for-kumu/color-blender/color-blender.html#' + tailwind[i].shades[j].hex + ':' + tailwind[0].shades[j].hex + ':1:hex');

        let hex = await page.evaluate(result => {
          return document.querySelector("#pal1").value;
        }, '');

        shades.push({
          "shade": tailwind[i].shades.shade,
          "hex": hex
        });

        console.log(name + '-' + tailwind[i].shades.shade);

        await page.close();
      }
      blends.push({
        "name": name,
        "shades": shades
      });
    }
  }

  await browser.close();

  fs.writeFile('tailwind-blends.json', JSON.stringify(blends, null, 2), (err) => {
    if (err) throw err;
    console.log('yay!');
  });
}

let tailwind = [
  {
    "name": "grey",
    "shades": [
      {
        "shade": "white",
        "hex": "#FFFFFF"
      },
      {
        "shade": "lightest",
        "hex": "#F8FAFC"
      },
      {
        "shade": "lighter",
        "hex": "#F1F5F8"
      },
      {
        "shade": "light",
        "hex": "#DAE1E7"
      },
      {
        "shade": "base",
        "hex": "#B8C2CC"
      },
      {
        "shade": "dark",
        "hex": "#8795A1"
      },
      {
        "shade": "darker",
        "hex": "#606F7B"
      },
      {
        "shade": "darkest",
        "hex": "#3D4852"
      },
      {
        "shade": "black",
        "hex": "#22292F"
      }
    ]
  },
  {
    "name": "red",
    "shades": [
      {
        "shade": "lightest",
        "hex": "#FCEBEA"
      },
      {
        "shade": "lighter",
        "hex": "#F9ACAA"
      },
      {
        "shade": "light",
        "hex": "#EF5753"
      },
      {
        "shade": "base",
        "hex": "#E3342F"
      },
      {
        "shade": "dark",
        "hex": "#CC1F1A"
      },
      {
        "shade": "darker",
        "hex": "#621B18"
      },
      {
        "shade": "darkest",
        "hex": "#3B0D0C"
      }
    ]
  },
  {
    "name": "orange",
    "shades": [
      {
        "shade": "lightest",
        "hex": "#FFF5EB"
      },
      {
        "shade": "lighter",
        "hex": "#FCD9B6"
      },
      {
        "shade": "light",
        "hex": "#FAAD63"
      },
      {
        "shade": "base",
        "hex": "#F6993F"
      },
      {
        "shade": "dark",
        "hex": "#DE751F"
      },
      {
        "shade": "darker",
        "hex": "#613B1F"
      },
      {
        "shade": "darkest",
        "hex": "#462A16"
      }
    ]
  },
  {
    "name": "yellow",
    "shades": [
      {
        "shade": "lightest",
        "hex": "#FCFBEB"
      },
      {
        "shade": "lighter",
        "hex": "#FFF9C2"
      },
      {
        "shade": "light",
        "hex": "#FFF382"
      },
      {
        "shade": "base",
        "hex": "#FFED4A"
      },
      {
        "shade": "dark",
        "hex": "#F2D024"
      },
      {
        "shade": "darker",
        "hex": "#684F1D"
      },
      {
        "shade": "darkest",
        "hex": "#453411"
      }
    ]
  },
  {
    "name": "green",
    "shades": [
      {
        "shade": "lightest",
        "hex": "#E3FCEC"
      },
      {
        "shade": "lighter",
        "hex": "#A2F5BF"
      },
      {
        "shade": "light",
        "hex": "#51D88A"
      },
      {
        "shade": "base",
        "hex": "#38C172"
      },
      {
        "shade": "dark",
        "hex": "#1F9D55"
      },
      {
        "shade": "darker",
        "hex": "#1A4731"
      },
      {
        "shade": "darkest",
        "hex": "#0F2F21"
      }
    ]
  },
  {
    "name": "teal",
    "shades": [
      {
        "shade": "lightest",
        "hex": "#E8FFFE"
      },
      {
        "shade": "lighter",
        "hex": "#A0F0ED"
      },
      {
        "shade": "light",
        "hex": "#64D5CA"
      },
      {
        "shade": "base",
        "hex": "#4DC0B5"
      },
      {
        "shade": "dark",
        "hex": "#38A89D"
      },
      {
        "shade": "darker",
        "hex": "#20504F"
      },
      {
        "shade": "darkest",
        "hex": "#0D3331"
      }
    ]
  },
  {
    "name": "blue",
    "shades": [
      {
        "shade": "lightest",
        "hex": "#EFF8FF"
      },
      {
        "shade": "lighter",
        "hex": "#BCDEFA"
      },
      {
        "shade": "light",
        "hex": "#6CB2EB"
      },
      {
        "shade": "base",
        "hex": "#3490DC"
      },
      {
        "shade": "dark",
        "hex": "#2779BD"
      },
      {
        "shade": "darker",
        "hex": "#1C3D5A"
      },
      {
        "shade": "darkest",
        "hex": "#12283A"
      }
    ]
  },
  {
    "name": "indigo",
    "shades": [
      {
        "shade": "lightest",
        "hex": "#E6E8FF"
      },
      {
        "shade": "lighter",
        "hex": "#B2B7FF"
      },
      {
        "shade": "light",
        "hex": "#7886D7"
      },
      {
        "shade": "base",
        "hex": "#6574CD"
      },
      {
        "shade": "dark",
        "hex": "#5661B3"
      },
      {
        "shade": "darker",
        "hex": "#2F365F"
      },
      {
        "shade": "darkest",
        "hex": "#191E38"
      }
    ]
  },
  {
    "name": "purple",
    "shades": [
      {
        "shade": "lightest",
        "hex": "#F3EBFF"
      },
      {
        "shade": "lighter",
        "hex": "#D6BBFC"
      },
      {
        "shade": "light",
        "hex": "#A779E9"
      },
      {
        "shade": "base",
        "hex": "#9561E2"
      },
      {
        "shade": "dark",
        "hex": "#794ACF"
      },
      {
        "shade": "darker",
        "hex": "#382B5F"
      },
      {
        "shade": "darkest",
        "hex": "#21183C"
      }
    ]
  },
  {
    "name": "pink",
    "shades": [
      {
        "shade": "lightest",
        "hex": "#FFEBEF"
      },
      {
        "shade": "lighter",
        "hex": "#FFBBCA"
      },
      {
        "shade": "light",
        "hex": "#FA7EA8"
      },
      {
        "shade": "base",
        "hex": "#F66D9B"
      },
      {
        "shade": "dark",
        "hex": "#EB5286"
      },
      {
        "shade": "darker",
        "hex": "#6F213F"
      },
      {
        "shade": "darkest",
        "hex": "#451225"
      }
    ]
  }
]


blendTailwind(tailwind.slice(1));
