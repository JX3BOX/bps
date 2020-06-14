import axios from "axios";
import { __node } from "@jx3box/jx3box-common/js/jx3box.json";
const skill = __node + "bps/skill/";
const talent = __node + "bps/talent/";
const all = __node + "bps/";
import failCallback from '../utils/fail'
import xfmap from '@jx3box/jx3box-data/data/xf/xf.json'

function getSkill(xf,vm){
    return axios.get(skill + xfmap[xf]['force']).then((res) => {
        return res.data
    }).catch((err) => {
        failCallback(err,vm)
    })
}

function getTalent(xf,vm){
    return axios.get(talent + xfmap[xf]['force']).then((res) => {
        return res.data
    }).catch((err) => {
        failCallback(err,vm)
    })
}

function getAll(xf,vm){
    return axios.get(all + xfmap[xf]['force']).then((res) => {
        return res.data
    }).catch((err) => {
        failCallback(err,vm)
    })
}

export {getSkill,getTalent,getAll}