import { $lua } from "@jx3box/jx3box-common/js/https";

function getMap(client) {
    return $lua({ mute: true })
        .get("/api/lua/bps/index.json", {
            params: {
                client: client,
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function getLua(client, path) {
    let _root = "/api/lua/bps/";
    let _path = encodeURIComponent(path);

    // TEST
    // _path = encodeURIComponent('七秀/10层剑舞加攻击.lua')    //重制
    // _path = encodeURIComponent('七秀/七秀_七诀剑气.lua')    //缘起

    let url = _root + _path;
    return $lua()
        .get(url, {
            headers: { "content-type": "text/plain" },
            params: {
                client: client,
            },
        })
        .catch((err) => {
            console.log(err);
        });
}

export { getMap, getLua };
