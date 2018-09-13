const fs = require('fs');

function averageIndegree(data, elementID, connectionToField, weightedIndegreeField, averageIndegreeFieldName) {
  function indegree(element, connections) {
    let indegree = connections.filter(connection => connection[connectionToField] === element[elementID])
  }

  data.elements = data.elements.map(element => {
    var thisIndegree = indegree(element, data.connections)
    element[averageIndegreeFieldName] = element[weightedIndegreeField]
  })


  return data
}
