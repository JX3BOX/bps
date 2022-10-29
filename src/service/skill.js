// import { $node } from "@jx3box/jx3box-common/js/https";
// const $ = $node()

import axios from "axios";
import { __dataPath } from "@jx3box/jx3box-common/data/jx3box.json";
const $ = axios.create({
    // baseURL: 'http://localhost:7002/',
    baseURL: __dataPath,
});
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";

function getSkill(xf, client = 'std') {
    // return $.get("/bps/skill/" + xfmap[xf]["force"]).then((res) => {
    //     return res.data;
    // });
    if (client == 'std') {
        return $.get(`/bps/std/${xfmap[xf]["force"]}/skill.json`).then(res => res.data);
    } else {
        return $.get(`/bps/origin/${xf}/skill.json`).then(res => res.data);
    }

}

function getTalent(xf, client = 'std') {
    // return $.get("/bps/talent/" + xfmap[xf]["force"]).then((res) => {
    //     return res.data;
    // });
    if (client == 'std') {
        return $.get(`/bps/std/${xfmap[xf]["force"]}/talent.json`).then(res => res.data);
    } else {
        return $.get(`/bps/origin/${xf}/talent.json`).then(res => res.data);
    }
}

function getAll(xf) {
    return $.get("/bps/skill-talent/" + xfmap[xf]["force"]).then((res) => {
        return res.data;
    });
}

export { getSkill, getTalent, getAll };
