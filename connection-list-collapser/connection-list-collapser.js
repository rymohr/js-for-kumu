function collapseConnectionList(connections) {
    function getUniquePropertyValues(objectArray, property) {
        return Array.from(
            new Set(
                objectArray.map(object => property)
            )
        );
    }

    function getElements(connections) {
        return Array.from(
            new Set(
                getUniquePropertyValues(connections, 'from')
                    .concat(getUniquePropertyValues(connections, 'to'))
            )
        );
    }

    let elements = getElements(connections);

    function createMatrix(elements, connections) {
        let matrix = [];

        elements.forEach((element, i, a) => {
            let obj = new Object();
            obj[''] = element;
            matrix.push(obj);


            a.forEach(e => {

            })
        });

        matrix.forEach(object => {
            elements.forEach
        });

        return matrix;
    }

    let matrix = createMatrix(elements, connections, matrix);

}

let data = [
    {
      "from": "A",
      "to": "C",
      "strength": 1
    },
    {
      "from": "C",
      "to": "A",
      "strength": 1
    },
    {
      "from": "D",
      "to": "A",
      "strength": 1
    }
];
