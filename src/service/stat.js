import { $next } from "@jx3box/jx3box-common/js/axios";

function getStat(id) {
    return $next
        .get('api/post/' + id + "/stat")
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function postStat(id) {
    return $next.get('api/post/' + id + "/summary", {
        params: {
            type: 'bps',
            actions: "views",
        },
    });
}

export { getStat, postStat };
