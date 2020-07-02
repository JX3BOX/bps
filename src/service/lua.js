import axios from "axios";
import { __ossMirror } from "@jx3box/jx3box-common/js/jx3box.json";
const API = __ossMirror + "static/kungfu/";
const version = '200702'

function getMap() {
    return axios
        .get(API + "map.json")
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function getLua(path) {
    return axios.get(API + path + '?version=' + version,{
        headers: {'content-type': 'text/plain'},
    }).then((res) => {
        return res.data;
    })
    .catch((err) => {
        console.log(err);
    });
}

export { getMap, getLua };
