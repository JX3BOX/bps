import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const Index = () => import("../views/Index.vue");
const Skill = () => import("../views/Skill.vue");
const Raw = () => import("../views/Raw.vue");
const Collection = () => import("../views/Collection.vue");
const Ladder = () => import("../views/Ladder.vue");
const Lua = () => import("../views/Lua.vue");
const Story = () => import("../views/Story.vue");
const Recipe = () => import("../views/Recipe.vue");
const Group = () => import("../views/Group.vue");
const Haste = () => import("../views/Haste.vue");
const Dps = () => import("../views/Dps.vue");

const routes = [
    { name: "index", path: "/", component: Index },
    { name: "skill", path: "/skill", component: Skill },
    { name: "raw", path: "/raw", component: Raw },
    { name: "collection", path: "/collection", component: Collection },
    { name: "ladder", path: "/ladder", component: Ladder },
    { name: "story", path: "/story", component: Story },
    { name: "lua", path: "/lua", component: Lua },
    { name: "recipe", path: "/recipe", component: Recipe },
    { name: "group", path: "/group", component: Group },
    { name: "haste", path: "/haste", component: Haste },
    { name: "dps", path: "/dps", component: Dps },
];

const router = new VueRouter({
    routes,
});

export default router;
