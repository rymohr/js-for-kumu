var people = Elements.models.filter(model => model.attrs.attributes['element type'] === 'Person')
    .map(model => model.attrs.attributes.label)
    .sort();

var orgs = Elements.models.filter(model => model.attrs.attributes['element type'] === 'Organization')
    .map(model => model.attrs.attributes.label)
    .sort();

var peopleAndOrgs = people.concat(orgs);

var optionEls = peopleAndOrgs;

var options = optionEls.map(label => 'option {\n  selector: element[\"label\"=\"' + label + '\"];\n  label: \"' + label + '\";\n}')
    .join('\n\n');

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

downloadData(options, 'txt', 'options');
