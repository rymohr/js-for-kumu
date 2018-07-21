const fs = require('fs');

function selectColors(colors, colorNames, shadeNames) {
  let tailwindColors = JSON.parse(
    fs.readFileSync('tailwind.json', 'utf8')
  );
  let tailwindBlends = JSON.parse(
    fs.readFileSync('tailwind-blends.json', 'utf8')
  );

  let functionalColors = ['primary', 'secondary'];

  function switchColorNames(colorNames, color, index) {
    switch (colorNames) {
      case 'literal':
        return color;
        break;
      case 'functional':
        return functionalColors[index];
        break;
    }
  }

  let numericShades = {
    'lightest': 100,
    'lighter': 200,
    'light': 300,
    'base': 400,
    'dark': 500,
    'darker': 600,
    'darkest': 700
  }

  function switchShadeNames(shadeNames, shades) {

  }

  let allColors = tailwindColors.concat(tailwindBlends);

  let scheme = colors.map((color, index) => {
    let obj = new Object();

    let shades = allColors.find(c => c.name === color).shades;

    color = switchColorNames(colorNames, color, index);

    switch (shadeNames) {
      case 'literal':
        shades.forEach(shade => {
          if(shade.name === "base") {
            obj[color] = shade.hex;
          } else if(shade.name !== "black" && shade.name !== "white") {
            obj[color + '-' + shade.name] = shade.hex;
          }
        });
        break;
      case 'numeric':
        shades.forEach(shade => {
          if(shade.name === "base") {
            obj[color] = shade.hex;
          } else if(shade.name !== "black" && shade.name !== "white") {
            obj[color + '-' + numericShades[shade.name]] = shade.hex;
          }
        });
        break;
    }

    console.log(obj);

    return obj;
  });

  fs.writeFile(
    './schemes/' + colors.join('-') + '-' + colorNames + '-' + shadeNames + '.json',
    JSON.stringify(scheme, null, 2),
    (err) => { if(err) throw err; console.log('fly'); }
  );
}

let colors = ['teal', 'indigo'];

/*
 * Literal color names - blue, red, yellow, etc.
 * Functional color names - primary, secondary
 */
let colorNames = 'functional';

/*
 * Literal shade names - lightest, lighter, light, etc.
 * Numeric shade names - 100, 200, 300, etc.
 */
let shadeNames = 'numeric';

selectColors(colors, colorNames, shadeNames);
