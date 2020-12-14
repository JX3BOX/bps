import {$ as $http} from "./axios";
import {__helperUrl} from "@jx3box/jx3box-common/js/jx3box.json";

function get_groups(type, params) {
    return $http.get(`${__helperUrl}api/groups/${type}`, {
        headers: {Accept: "application/prs.helper.v2+json"},
        params: params,
    });
}

export {get_groups};

