function onGetClicked() {
    const url = document.getElementById("url").value;
    const filename = document.getElementById("filename").value;
    const quality = document.getElementById("quality").value;

    browserify.download(url, { filename, quality });
}

window.onunload = browserify.abortDownload;