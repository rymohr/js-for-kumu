function createBlueprint(elementsArray, connectionsArray) {
    let blueprint = JSON.parse(
        "{\"elements\":" + JSON.stringify(elementsArray) + ",\"connections\":" + JSON.stringify(connectionsArray) + "}"
        );
    return JSON.stringify(blueprint, null, 2);
}
