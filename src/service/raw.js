import { $node } from "@jx3box/jx3box-common/js/https";
// const __node = "http://localhost:7002/";
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

function getSkills(params) {
    return $node().get("/skills", {
        params: params
    });
}

function getSkill(id) {
    return $node().get(`/skill/id/${id}`);
}

export { getSkills, getSkill };
