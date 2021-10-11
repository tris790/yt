const ytcog = require('ytcog');

let fileStream;
const { fetch: origFetch } = global;
const PROXY_URL = "https://proxy.tris790.workers.dev/"
global.fetch = async (...args) => {
    let newArgs = [...args];
    newArgs[0] = PROXY_URL + newArgs[0];
    console.log("Proxying:", newArgs[0]);
    return await origFetch(...newArgs);
};
let session;

async function download(input, options) {
    if (!session) {
        session = new ytcog.Session();
        await session.fetch();
    }
    let id;
    const inputId = input.match(/watch\?v=(.{11})/);
    if (inputId) {
        id = inputId[1];
    } else {
        const search = new ytcog.Search(session, { query: input, order: "views" });
        await search.fetch();
        id = search.videos[0].id;

    }
    const filename = options.filename === "" ? "download" : options.filename;
    await ytcog.dl({ id, filename, videoQuality: options.quality });
}

module.exports.download = download;