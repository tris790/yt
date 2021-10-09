function downloadByteArray(bytes, outputFilename) {
    var a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([bytes], { type: 'application/octet-stream' }));
    a.download = outputFilename;
    document.body.appendChild(a)
    a.click();
    document.body.removeChild(a)
}

function onGetClicked() {
    const url = document.getElementById("url");
    browserify.download(url);
}