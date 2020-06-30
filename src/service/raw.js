import axios from "axios";
import { __node } from "@jx3box/jx3box-common/js/jx3box.json";

// const API = __node + 'skill/school/' //TODO:
const API = "http://localhost:3001/skill/school/";

function getSchoolSkills(school,query) {
    return axios
        .get(API + school,{
            params : query
        })
        .catch((err) => {
            console.log(err);
        });
}

export { getSchoolSkills };
