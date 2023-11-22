import { $cms } from "@jx3box/jx3box-common/js/https";

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

function getDpsGroup(params){
    return $cms().get(`/api/cms/bps/dps/ladder`,{
        params
    })
}

function getRank(key) {
    return $cms().get(`/api/cms/bps/dps/ladder/${key}`);
}

export { getUsers, getRank, getDpsGroup };
