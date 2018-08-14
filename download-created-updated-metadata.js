var elements = Elements.models.map(m => {
  var obj = new Object();

  Object.assign(obj, m.attrs.attributes);

  obj.created_at = m.attributes.created_at;
  obj.updated_at = m.attributes.updated_at;

  return obj;
})

function createElementBlueprint(elementsArray) {
    let elementBlueprint = JSON.parse(
        "{\"elements\":" + JSON.stringify(elementsArray) + "}"
        );
    return JSON.stringify(elementBlueprint, null, 2);
}

elements = createElementBlueprint(elements);

function downloadData(data, format, filename) {
    data = 'text/' + format + ';charset=utf-8,' + encodeURIComponent(data);
    let link = document.createElement("a"),
        url = 'data:' + data;

    link.setAttribute("href", url);
    link.setAttribute("download", filename + '.' + format);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

downloadData(elements, 'json', 'data')
