function downloadByteArray(bytes, outputFilename) {
    var a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([bytes], { type: 'application/octet-stream' }));
    a.download = outputFilename;
    document.body.appendChild(a)
    a.click();
    document.body.removeChild(a)
}

function onGetClicked() {
    const url = document.getElementById("url").value;
    const isAudioOnly = document.getElementById("audioOnly").checked;
    const filename = document.getElementById("filename").value;
    const quality = document.getElementById("quality").value;

    browserify.download(url, { isAudioOnly, filename, quality });
}

window.onunload = browserify.abortDownload;