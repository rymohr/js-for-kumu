function createBlueprint(elements, connections) {
    let blueprint = JSON.parse(
        "{\"elements\":" + JSON.stringify(elements) + ",\"connections\":" + JSON.stringify(connections) + "}"
        );
    return JSON.stringify(blueprint, null, 2);
}

function restoreElementAndConnections(elementLabel, elementType) {
  var el = Elements.models.find(model => {
    return (
      model.attrs.attributes.label === elementLabel &&
      model.attrs.attributes['element type'] === elementType
    );
  });

  var conns = Connections.models
    .filter(model => model.attributes.from_id === el.attributes._id || model.attributes.to_id === el.attributes._id)
    .map((conn, i, a) => {
      var obj = new Object();
      obj.from = conn.from.attrs.attributes.label;
      obj.to = conn.to.attrs.attributes.label;

      var keys = Array.from(
        new Set(
          a.reduce((acc, c) => {
            return acc.concat(
              Object.keys(c.attrs.attributes)
            );
          }, [])
        )
      );

      keys.forEach(key => {
        obj[key] = conn.attrs.attributes[key];
      });

      return obj;
    });

    el = [el.attrs.attributes];

    return createBlueprint(el, conns);
}

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

var elementLabel = 'Substance Abuse';
var elementType = 'Point of Inflection';

downloadData(
  restoreElementAndConnections(elementLabel, elementType),
  'json',
  'restore ' + elementLabel + ' and connections'
)
