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

export { getCollection, getSkillWiki, getCollections, getCollectionMenus, removeCollection, getMenuGroups, getMenuGroup, getBread };
