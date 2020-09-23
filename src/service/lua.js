import axios from "axios";
import { __ossMirror } from "@jx3box/jx3box-common/js/jx3box.json";
const API = __ossMirror + "kungfu/";

function getMap() {
    return axios
        .get(API + "index.json")
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function getLua(path) {
    return axios.get(API + path + '?version=' + Date.now(),{
        headers: {'content-type': 'text/plain'},
    }).then((res) => {
        return res.data;
    })
    .catch((err) => {
        console.log(err);
    });
}

export { getMap, getLua };
