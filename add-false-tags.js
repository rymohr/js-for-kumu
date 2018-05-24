let elements, tags;

function elementContainsTag(element, tag) {
    return element.attributes.tags.findIndex(t => t === tag) !== -1;
}

function addFalseTags(elementsArray, uniqueTags) {
    return elements.map(element => {
        element.attributes.false_tags = [];

        if (element.attributes.tags === undefined) {
            element.attributes.false_tags = element.attributes.false_tags.concat(tags);
        } else {
            tags.forEach(tag => {
                if(!elementContainsTag(element, tag)) {
                    element.attributes.false_tags.push(tag);
                }
            });
        }

        return element;
    });
}

elements = addFalseTags(elements, tags);

elements;
