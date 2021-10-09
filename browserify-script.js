const ytdl = require('ytdl-core');
var Stream = require('stream');

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
module.exports.download = download;