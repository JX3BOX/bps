import { $helper, $cms } from "@jx3box/jx3box-common/js/https";
import qs from "qs";

function getCollections(params) {
    return $cms()({
        method: "GET",
        url: `/api/cms/post/collection`,
        params: params,
    });
}

function removeCollection(collection_id) {
    return $cms()({
        method: "DELETE",
        url: `/api/cms/post/collection/${collection_id}`,
    });
}

function getCollection($collection_id) {
    return $cms()({
        method: "GET",
        url: `/api/cms/post/collection/${$collection_id}`
    });
}

// 获取技能百科
function getSkillWiki(type, params) {
    return $helper().get(`/api/wiki/posts/${type}`, {
        params
    });
}

function getMenuGroups(keys) {
    return $cms({ mute: true }).get(`/api/cms/menu-group`, {
        params: {
            key: keys
        },
    });
}

// 公告
function getBread(key) {
    return $cms({ mute: true }).get(`/api/cms/breadcrumb/${key}`);
}


// 边栏文档
function getMenuGroup(name) {
    return $cms({ mute: true }).get(`/api/cms/menu-group/${name}`);
}

export { getCollection, getSkillWiki, getCollections, removeCollection, getMenuGroups, getMenuGroup, getBread };
