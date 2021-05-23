import { $cms ,$helper} from "@jx3box/jx3box-common/js/https";

function getBread(key){
    return $helper().get(`/api/breadcrumb/${key}`).then((res) => {
        return res.data.data.breadcrumb.html
    })
}

function getUsers(ids) {
    return $cms().get(`/api/cms/user/list/info`, {
        params: {
            list: ids,
        },
    }).then((res) => {
        return res.data.data
    })
}

export { getUsers,getBread };
