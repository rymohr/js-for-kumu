const fs = require('fs');

function averageIndegreeWeights(data, elementIDField, connectionToField, connectionWeightField, averageIndegreeWeightFieldName) {
  function calculateAverageIndegreeWeight(element, connections) {
    let incomingConnections = connections
      .filter(connection => connection[connectionToField] === element[elementIDField]);

    let totalIndegreeWeight = incomingConnections
      .reduce((acc, connection) => {
        return acc + connection[connectionWeightField];
      }, 0);

    let averageIndegreeWeight / totalIndegreeWeight / incomingConnections.length

    return averageIndegreeWeight;
  }

  data.elements.forEach(element => {
    element[averageIndegreeWeightFieldName] = calculateAverageIndegreeWeight(element);
  });

  return data.elements;
}

let q = 'q1';

let data = JSON.parse(
  fs.readFileSync(`./${q}.json`)
);

let elementIDField = 'label';
let connectionToField = 'to label';
let connectionWeightField = 'weight';
let averageIndegreeWeightFieldName = `${q} average indegree weight`;

let elements = averageIndegreeWeights(data, elementIDField, connectionToField, connectionWeightField, averageIndegreeWeightFieldName)

fs.writeFile(`${q}-average-indegree-weights.json`, JSON.stringify(elements, null, 2), (err) => {
  if (err) throw err;
  console.log('yay!');
});
