import { $cms } from "@jx3box/jx3box-common/js/https";

export function getDpsList(params) {
    return $cms().get(`/api/cms/bps/dps/registry`, { params: params });
}
export function addDpsRegistry(data) {
    return $cms().post("/api/cms/bps/dps/registry", data);
}
export function updateDpsRegistry(id, data){
    return $cms().put(`/api/cms/bps/dps/registry/${id}`, data);
}
