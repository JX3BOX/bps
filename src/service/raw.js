import { $node, axios } from "@jx3box/jx3box-common/js/https";
import { __ossRoot, __cdn } from "@jx3box/jx3box-common/data/jx3box.json";

const $oss = axios.create({
    baseURL: __ossRoot,
});
const $cdn = axios.create({
    baseURL: __cdn,
});

function getSkills(params) {
    return $node().get("/skills", {
        params: params,
    });
}

function getSkill(id) {
    return $node().get(`/skill/id/${id}`);
}

async function getTalents(client = "std") {
    let res = await $cdn.get(`/data/qixue/${client}/talents.json`);
    return res.data;
}

async function getTalent2List(params) {
    return $node().get("/api/node/talent-origin/list", {
        params: params,
    });
}

async function getTalents2(version) {
    return $node().get(`/api/node/talent-origin/${version}`);
}

export { getSkills, getSkill, getTalents, getTalents2, getTalent2List };
