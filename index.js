const ytdl = require('ytdl-core');
var Stream = require('stream');

function downloadByteArray(bytes, outputFilename) {
    var a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([bytes], { type: 'application/octet-stream' }));
    a.download = outputFilename;
    document.body.appendChild(a)
    a.click();
    document.body.removeChild(a)
}

function download(url, options) {
    let result = new Uint8Array();
    let fileStream = new Stream();
    fileStream.writable = true;
    fileStream.write = function (data) {
        result = new Uint8Array([...result, ...data]);
    };

    fileStream.end = function (data) {
        console.log("End inner", data, result)
        downloadByteArray(result);
    }

    ytdl(url, options)
        .pipe(fileStream);
}

function onGetClicked() {
    const url = document.getElementById("url");
    download(url);
}






