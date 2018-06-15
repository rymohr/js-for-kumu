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

  return csv;
}
