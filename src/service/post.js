import { $cms } from "@jx3box/jx3box-common/js/https";

function getMyPost(params) {
    return $cms().get("/api/cms/posts/my", {
        params: params,
    });
}

function getPosts(params) {
    return $cms().get("/api/cms/posts/bps", {
        params,
    });
}
function getPost(id) {
    return $cms().get(`/api/cms/post/${id}`);
}

function getMyPostCount() {
    return $cms().get("/api/cms/posts/user/my/count");
}

// 获取技改
function getChangelog(params) {
    return $cms().get(`/api/cms/pve/skill/changelog`, {
        params,
    });
}

// 获取关联文章
function getPostMeta(params) {
    return $cms().get(`/api/cms/post/meta`, {
        params,
    });
}

export { getPosts, getPost, getMyPostCount, getMyPost, getChangelog, getPostMeta};
