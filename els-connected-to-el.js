var searchFor = "Four Worlds International Institute";

var el = Elements.models.find(m => m.attrs.attributes.label === searchFor);

var conn = Connections.models.filter(c => c.attributes.from_id === el.id || c.attributes.to_id === el.id);

var connEls = conn.map(c => (c.attributes.from_id === el.id) ? c.attributes.to_id : c.attributes.from_id);

connElLabels = connEls.map(e => Elements.models.find(m => m.id === e).attrs.attributes.label)

var data = "Label,\n" + connElLabels.join(',\n');

data

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

downloadData(data, 'csv', 'connected-to-'+ searchFor.replace(/\s/g,'-').replace(/\./g, '').replace(/\//g,''));
