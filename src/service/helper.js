import { $helper, $cms } from "@jx3box/jx3box-common/js/https";

function getCollection($collection_id, params = {}) {
    return $helper()({
        method: "GET",
        url: `/api/post/collection/${$collection_id}`,
        params: params,
    });
}

function getSkillGroups(keys, client) {
    return $helper({
        headers: {
            "JX3-Client-Type": client,
        },
    }).get(`/api/skill_groups`, {
        params: {
            keys,
        },
    });
}

function getSkillGroup(key) {
    return $helper().get(`/api/skill_group/${key}`);
}

function getDpsList(params) {
    return $cms().get(`/api/cms/dps_registry`, { params: params });
}

// 获取技能百科
function getSkillWiki(type, params) {
    return $helper().get(`/api/wiki/posts/${type}`, {
        params
    });
}

export { getCollection, getSkillGroups, getSkillGroup, getDpsList, getSkillWiki };
