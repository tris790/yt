const ytdl = require('ytdl-core');
var Stream = require('stream');

async function download(url, options) {
    const videoTitle = (await ytdl.getInfo(url))?.videoDetails?.title;
    let filename = "download." + (options.audioOnly === true ? "mp3" : "mp4");
    if (options.filename !== null && options.filename !== '') {
        filename = options.filename
    } else if (videoTitle !== null && videoTitle !== '') {
        filename = options.filename;
    }
    console.log("UserSpecifiedFilename", options.filename, "VideoTitle:", videoTitle, "FinalFilename:", filename)
    if (options.audioOnly) {
        options.filter = (format) => format.hasVideo === false && format.hasAudio === true
    }

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