import { $helper, $cms } from "@jx3box/jx3box-common/js/https";
import qs from "qs";

function getCollections(params) {
    return $helper()({
        method: "GET",
        url: `/api/post/collections`,
        params: params,
    });
}

function getCollectionMenus() {
    return $helper()({
        method: "GET",
        url: `/api/post/collection/menus`,
    });
}

function removeCollection(collection_id) {
    return $helper()({
        method: "PUT",
        url: `/api/post/collection/remove`,
        data: qs.stringify({ id: collection_id }),
    });
}

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

// 获取技能百科
function getSkillWiki(type, params) {
    return $helper().get(`/api/wiki/posts/${type}`, {
        params
    });
}

function getMenuGroups(keys) {
    return $helper({ mute: true }).get(`/api/menu_groups`, {
        params: {
            names:keys
        },
    });
}

export { getCollection, getSkillGroups, getSkillGroup, getSkillWiki, getCollections, getCollectionMenus, removeCollection, getMenuGroups };
