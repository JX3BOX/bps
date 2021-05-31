import { $helper } from "@jx3box/jx3box-common/js/https";

function getCollection($collection_id, params = {}) {
    return $helper()({
        method: "GET",
        url: `/api/post/collection/${$collection_id}`,
        params: params,
    });
}

function getSkillGroups(keys) {
    return $helper().get(`/api/skill_groups`, {
        params: {
            keys,
        },
    });
}

export { getCollection,getSkillGroups };
