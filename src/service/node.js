import { $node } from "@jx3box/jx3box-common/js/https";

function getCheat(params) {
    return $node().get("/bps/cheat", {
        params,
    });
}

function getRecipe(params) {
    return $node().get("/bps/recipe", {
        params,
    });
}

export { getRecipe, getCheat };
