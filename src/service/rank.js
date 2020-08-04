import axios from "axios";
const version = "同筑山水居";

const rank = "https://j3dps.com/api/rank/mountRank";
function getRank(xf, boss) {
    return axios.get(rank, {
        params: {
            mountName: xf,
            bossName: boss,
            dataVersion: version,
        },
    });
}

const ladder = "https://j3dps.com/api/rank/statisticsRank";
function getLadder() {
    return axios.get(ladder, {
        params: {
            bossNames: "周贽,厌夜,迟驻,白某,安小逢",
        },
    });
}

export { getRank, getLadder };
