let blends = [
  {
    "name": "red-orange",
    "shades": [
      {
        "shade": "lightest",
        "hex": "#FEF0EB"
      },
      {
        "shade": "lighter",
        "hex": "#FBC3B0"
      },
      {
        "shade": "light",
        "hex": "#F5825B"
      },
      {
        "shade": "base",
        "hex": "#ED6737"
      },
      {
        "shade": "dark",
        "hex": "#D54A1D"
      },
      {
        "shade": "darker",
        "hex": "#622B1C"
      },
      {
        "shade": "darkest",
        "hex": "#411C11"
      }
    ]
  },
  {
    "name": "orange-yellow",
    "shades": [
      {
        "shade": "lightest",
        "hex": "#FEF8EB"
      },
      {
        "shade": "lighter",
        "hex": "#FEE9BC"
      },
      {
        "shade": "light",
        "hex": "#FDD073"
      },
      {
        "shade": "base",
        "hex": "#FBC345"
      },
      {
        "shade": "dark",
        "hex": "#E8A322"
      },
      {
        "shade": "darker",
        "hex": "#65451E"
      },
      {
        "shade": "darkest",
        "hex": "#462F14"
      }
    ]
  },
  {
    "name": "yellow-green",
    "shades": [
      {
        "shade": "lightest",
        "hex": "#F0FCEC"
      },
      {
        "shade": "lighter",
        "hex": "#D1F7C1"
      },
      {
        "shade": "light",
        "hex": "#A8E686"
      },
      {
        "shade": "base",
        "hex": "#9CD75E"
      },
      {
        "shade": "dark",
        "hex": "#89B73D"
      },
      {
        "shade": "darker",
        "hex": "#414B27"
      },
      {
        "shade": "darkest",
        "hex": "#2A3219"
      }
    ]
  },
  {
    "name": "green-teal",
    "shades": [
      {
        "shade": "lightest",
        "hex": "#E6FEF5"
      },
      {
        "shade": "lighter",
        "hex": "#A1F3D6"
      },
      {
        "shade": "light",
        "hex": "#5BD7AA"
      },
      {
        "shade": "base",
        "hex": "#43C194"
      },
      {
        "shade": "dark",
        "hex": "#2CA379"
      },
      {
        "shade": "darker",
        "hex": "#1D4C40"
      },
      {
        "shade": "darkest",
        "hex": "#0E3129"
      }
    ]
  },
  {
    "name": "teal-blue",
    "shades": [
      {
        "shade": "lightest",
        "hex": "#ECFCFF"
      },
      {
        "shade": "lighter",
        "hex": "#AEE7F4"
      },
      {
        "shade": "light",
        "hex": "#68C4DB"
      },
      {
        "shade": "base",
        "hex": "#41A8C9"
      },
      {
        "shade": "dark",
        "hex": "#3091AD"
      },
      {
        "shade": "darker",
        "hex": "#1E4755"
      },
      {
        "shade": "darkest",
        "hex": "#102E36"
      }
    ]
  },
  {
    "name": "blue-indigo",
    "shades": [
      {
        "shade": "lightest",
        "hex": "#EBF0FF"
      },
      {
        "shade": "lighter",
        "hex": "#B7CBFD"
      },
      {
        "shade": "light",
        "hex": "#729CE1"
      },
      {
        "shade": "base",
        "hex": "#4D82D5"
      },
      {
        "shade": "dark",
        "hex": "#3F6DB8"
      },
      {
        "shade": "darker",
        "hex": "#263A5D"
      },
      {
        "shade": "darkest",
        "hex": "#162339"
      }
    ]
  },
  {
    "name": "indigo-purple",
    "shades": [
      {
        "shade": "lightest",
        "hex": "#EDEAFF"
      },
      {
        "shade": "lighter",
        "hex": "#C4B9FE"
      },
      {
        "shade": "light",
        "hex": "#9080E0"
      },
      {
        "shade": "base",
        "hex": "#7D6BD8"
      },
      {
        "shade": "dark",
        "hex": "#6856C1"
      },
      {
        "shade": "darker",
        "hex": "#34315F"
      },
      {
        "shade": "darkest",
        "hex": "#1D1B3A"
      }
    ]
  },
  {
    "name": "purple-pink",
    "shades": [
      {
        "shade": "lightest",
        "hex": "#F9EBF7"
      },
      {
        "shade": "lighter",
        "hex": "#EBBBE3"
      },
      {
        "shade": "light",
        "hex": "#D17CC9"
      },
      {
        "shade": "base",
        "hex": "#C667BF"
      },
      {
        "shade": "dark",
        "hex": "#B24EAB"
      },
      {
        "shade": "darker",
        "hex": "#54264F"
      },
      {
        "shade": "darkest",
        "hex": "#331531"
      }
    ]
  },
  {
    "name": "pink-red",
    "shades": [
      {
        "hex": "#FEEBED"
      },
      {
        "hex": "#FCB4BA"
      },
      {
        "hex": "#F56B7E"
      },
      {
        "hex": "#ED5165"
      },
      {
        "hex": "#DC3950"
      },
      {
        "hex": "#691E2C"
      },
      {
        "hex": "#401019"
      }
    ]
  }
];

let parent = document.querySelectorAll('.flex.flex-wrap.-mx-4')[1];

let colorNodes = parent.querySelectorAll('.w-full.px-4.mb-8');

colorNodes.forEach((node, index, array) => {
  console.log(blends[index].name, blends[index].shades[3]);
  let newContainer = document.createElement('div');
  newContainer.classList.add('w-full', 'md:w-1/2', 'lg:w-1/3', 'px-4', 'mb-8');

  if(index < array.length - 1) {
    parent.insertBefore(newContainer, array[index + 1]);
  } else {
    parent.appendChild(newContainer);
  }

  let newColor = document.createElement('div');
  newColor.classList.add('rounded', 'overflow-hidden');
  newContainer.appendChild(newColor);

  let newTitle = document.createElement('div');
  newTitle.classList.add('text-white', 'px-6', 'py-4', 'text-sm', 'font-semibold', 'relative', 'shadow', 'z-10');
  newColor.appendChild(newTitle);
  newTitle.style['background-color'] = blends[index].shades[3].hex;

  let newName = document.createElement('div');
  newName.classList.add('uppercase', 'mb-6');
  newName.textContent = blends[index].name;
  newTitle.appendChild(newName);

  let newBase = document.createElement('div');
  newBase.classList.add('flex', 'justify-between');
  newTitle.appendChild(newBase);

  let newBaseName = document.createElement('span');
  newBaseName.textContent = "Base";
  newBase.appendChild(newBaseName);

  let newBaseHex = document.createElement('span');
  newBaseHex.classList.add('font-normal', 'opacity-75');
  newBaseHex.textContent = blends[index].shades[3].hex;
  newBase.appendChild(newBaseHex);

  for(i = 0; i < 2; i++) {
    let newShade = document.createElement('div');
    newShade.classList.add('px-6', 'py-3', 'text-sm', 'font-semibold', 'flex', 'justify-between');
    newColor.appendChild(newShade);
    newShade.style['background-color'] = blends[index].shades[i].hex;
    newShade.style.color = blends[index].shades[blends[index].shades.length - 1].hex;

      let newShadeName = document.createElement('span');
      newShadeName.textContent = blends[index].shades[i].shade;
      newShade.appendChild(newShadeName);

      let newShadeHex = document.createElement('span');
      newShadeHex.classList.add('font-normal', 'opacity-75');
      newShadeHex.textContent = blends[index].shades[i].hex;
      newShade.appendChild(newShadeHex);
  }

  for(i = 2; i < blends[index].shades.length; i++) {
    let newShade = document.createElement('div');
    newShade.classList.add('text-white', 'px-6', 'py-3', 'text-sm', 'font-semibold', 'flex', 'justify-between');
    newColor.appendChild(newShade);
    newShade.style['background-color'] = blends[index].shades[i].hex;

      let newShadeName = document.createElement('span');
      newShadeName.textContent = blends[index].shades[i].shade;
      newShade.appendChild(newShadeName);

      let newShadeHex = document.createElement('span');
      newShadeHex.classList.add('font-normal', 'opacity-75');
      newShadeHex.textContent = blends[index].shades[i].hex;
      newShade.appendChild(newShadeHex);
  }
});
