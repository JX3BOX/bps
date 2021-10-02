import { $node } from "@jx3box/jx3box-common/js/https";

function getRecipe(params) {
    return $node().get("/bps/cheat", {
        params,
    });
}

export { getRecipe };
