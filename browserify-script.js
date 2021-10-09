const ytdl = require('ytdl-core');
var Stream = require('stream');

async function download(url, options) {
    videoInfo.videoDetails
    const filename = options.filename || (await ytdl.getInfo(url))?.videoDetails?.title || "download." + options.audioOnly ? "mp3" : "mp4";

    let result = new Uint8Array();
    let fileStream = new Stream();
    fileStream.writable = true;
    fileStream.write = function (data) {
        result = new Uint8Array([...result, ...data]);
    };

    fileStream.end = function (data) {
        downloadByteArray(result, filename);
    }

    ytdl(url, options)
        .pipe(fileStream);
}
module.exports.download = download;