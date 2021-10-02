import { $node } from "@jx3box/jx3box-common/js/https";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";

function getSkill(xf, vm) {
    return $node().get("/bps/skill/" + xfmap[xf]["force"]).then((res) => {
        return res.data;
    });
}

function getTalent(xf, vm) {
    return $node().get("/bps/talent/" + xfmap[xf]["force"]).then((res) => {
        return res.data;
    });
}

function getAll(xf, vm) {
    return $node().get("/bps/skill-talent/" + xfmap[xf]["force"]).then((res) => {
        return res.data;
    });
}

export { getSkill, getTalent, getAll };
