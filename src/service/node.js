import { $node } from "@jx3box/jx3box-common/js/https";
const $ = $node()

/* import axios from 'axios'
const $ = axios.create({
    baseURL: 'http://localhost:7002/',
}) */

function getRecipe(params) {
    return $.get("/bps/recipe", {
        params,
    });
}

export { getRecipe };
