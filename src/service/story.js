import axios from "axios";
import { __node } from "@jx3box/jx3box-common/js/jx3box.json";

const API = __node + "bps/story/";

function getStory(type,id) {
    return axios.get(API + type + "/" + id).catch((err) => {
        console.log(err);
    });
}

export { getStory };
