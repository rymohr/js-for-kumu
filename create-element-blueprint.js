function createElementBlueprint(elementsArray) {
    let elementBlueprint = JSON.parse(
        "{\"elements\":" + JSON.stringify(elementsArray) + "}"
        );
    return JSON.stringify(elementBlueprint, null, 2);
}
