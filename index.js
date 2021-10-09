const ytdl = require('ytdl-core');
var Stream = require('stream');

var fileStream = new Stream();
fileStream.writable = true;
let result = new Uint8Array();

function download(bytes) {
    var a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([bytes], { type: 'application/octet-stream' }));
    a.download = "video.mp4";
    document.body.appendChild(a)
    a.click();
    document.body.removeChild(a)
}

fileStream.write = function (data) {
    result = new Uint8Array([...result, ...data]);
};

fileStream.end = function (data) {
    console.log("End inner", data, result)
    download(result);
}

fileStream.on("close", () => console.log("Close", result))
fileStream.on("end", () => console.log("End", result))
fileStream.on("finish", () => console.log("Finish", result))

ytdl('https://www.youtube.com/watch?v=0QZdEdkTHW8')
    .pipe(fileStream);

