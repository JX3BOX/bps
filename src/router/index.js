import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

const routes = [
    { name: "index", path: "/", component: () => import("@/views/Index.vue") },
    { name: "post", path: "/:id(\\d+)", component: () => import("@/views/Single.vue") },

    { name: "skill", path: "/skill", component: () => import("@/views/Skill.vue") },

    { name: "collection", path: "/collection", component: () => import("@/views/Collection.vue") },
    { name: "recipe", path: "/recipe", component: () => import("@/views/Recipe.vue") },

    { name: "haste", path: "/haste", component: () => import("@/views/Haste.vue") },
    { name: "dps", path: "/dps", component: () => import("@/views/Dps.vue") },
    { name: "ladder", path: "/ladder", component: () => import("@/views/Ladder.vue") },

    { name: "raw", path: "/raw", component: () => import("@/views/Raw.vue") },
    { name: "lua", path: "/lua", component: () => import("@/views/Lua.vue") },

    // { name: "group", path: "/group", component: () => import("@/views/Group.vue") },
    // { name: "story", path: "/story", component: () => import("@/views/Story.vue") },
];

const router = new VueRouter({
    routes,
    mode: 'history',
    base: '/bps'
});

export default router;
