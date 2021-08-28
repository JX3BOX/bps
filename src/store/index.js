import Vue from "vue";
import Vuex from "vuex";
import { getAppID } from "@jx3box/jx3box-common/js/utils";

Vue.use(Vuex);

let store = {
    state: {
        // client
        client: location.href.includes("origin") ? "origin" : "std",
        subtype : '',
        // post
        id: getAppID(),
        user_id: 0,
        post: "",

        // collections
        collectionInfo: ''
    },
    mutations: {
        switchClient: function(state, val) {
            state.client = val || "std";
        },
        SET_COLLECTION: function (state, val) {
            state.collectionInfo = val
        }
    },
    getters: {},
    actions: {},
    modules: {},
};

export default new Vuex.Store(store);
