import { $helper } from "@jx3box/jx3box-common/js/https";
function get_groups(type, params) {
    return $helper().get(`/api/groups/${type}`, {
        params: params,
    });
}

export { get_groups };