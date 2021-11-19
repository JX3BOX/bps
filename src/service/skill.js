// import { $node } from "@jx3box/jx3box-common/js/https";
// const $ = $node()

import axios from 'axios'
const $ = axios.create({
    baseURL: 'http://localhost:7002/',
})

import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";

function getSkill(xf, vm) {
    return $.get("/bps/skill/" + xfmap[xf]["force"]).then((res) => {
        return res.data;
    });
}

function getTalent(xf, vm) {
    return $.get("/bps/talent/" + xfmap[xf]["force"]).then((res) => {
        return res.data;
    });
}

function getAll(xf, vm) {
    return $.get("/bps/skill-talent/" + xfmap[xf]["force"]).then((res) => {
        return res.data;
    });
}

export { getSkill, getTalent, getAll };
