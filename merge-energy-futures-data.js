var fs = require('fs');

function mergeEnergyFuturesData(inputFile, outputFileName, outputFileExtension) {
  let data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

  let keys = Object.keys(data[0]).slice(1);
  keys = Array.from(
    new Set(
      keys.map(key => {
        key = key.slice(0, key.length - 1);
        return key;
      })
    )
  );

  let nums = {
    'No connection': 0,
    'Informal conversations':	1,
    'Worked together on an energy system project (e.g. research, prototype, pilot)': 2,
    'Shared information, resources and networks': 3
  }

  data = data.map(obj => {
    keys.forEach((key,i,a) => {
      let vals = [];
      vals.push(
        nums[obj[key + '1']],
        nums[obj[key + '2']],
        nums[obj[key + '3']],
        nums[obj[key + '4']]
      )
      vals = vals.map(val => (val === undefined) ? 0 : val);
      obj[key] = Math.max(...vals);

      delete obj[key + '1'];
      delete obj[key + '2'];
      delete obj[key + '3'];
      delete obj[key + '4'];
    });

    return obj;
  });

  function createCSV(objectArray) {
    let csv = '';

    let keys = Object.keys(objectArray[0]);
    csv += keys.join(",") + '\n';

    objectArray.forEach(obj => {
      keys.forEach(key => {
        csv += obj[key] + ',';
      });
      csv = csv.slice(0, csv.length - 1) + '\n';
    });

    return csv.slice(0, csv.length - 1);
  }

  fs.writeFile(outputFileName + '.' + outputFileExtension, createCSV(data), (err) => {
    if (err) throw err;
    console.log('yay');
  });
}

mergeEnergyFuturesData('energy-futures-raw-after.json', 'energy-futures-after', 'csv');
