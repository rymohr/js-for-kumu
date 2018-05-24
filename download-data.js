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
