import axios from "axios";
// import { __node } from "@jx3box/jx3box-common/data/jx3box.json";
const __node = "http://localhost:7002/";
// const API = __node + 'skill/school/'
// function getSchoolSkills(school,query) {
//     return axios
//         .get(API + school,{
//             params : query
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }

function getSkills(ids) {
    return axios
        .get(__node + 'skills',{
            params : {
                ids
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

export { getSkills };
