import { $cms, $helper } from "@jx3box/jx3box-common/js/https";

function getBread(key) {
    return $helper()
        .get(`/api/breadcrumb/${key}`)
        .then((res) => {
            return res.data.data.breadcrumb.html;
        });
}

function getUsers(ids) {
    return $cms()
        .get(`/api/cms/user/list/info`, {
            params: {
                list: ids,
            },
        })
        .then((res) => {
            return res.data.data;
        });
}

function getRank(key, client) {
    return $helper({
        headers: {
            "JX3-Client-Type": client,
        },
    })
        .get(`/api/dps_group/${key}`)
        .then((res) => {
            return res.data.data.group.items;
        });
}

export { getUsers, getBread, getRank };
