import Vue from "vue";
import VueRouter from "vue-router";

const Index = () => import("../views/Index.vue");
const Skill = () => import("../views/Skill.vue");
const Raw = () => import("../views/Raw.vue");
const Collection = () => import("../views/Collection.vue");
const Ladder = () => import("../views/Ladder.vue");
const Lua = () => import("../views/Lua.vue");
const Story = () => import("../views/Story.vue");

Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", component: Index },
    { name: "skill", path: "/skill", component: Skill },
    { name: "raw", path: "/raw", component: Raw },
    { name: "collection", path: "/collection", component: Collection },
    { name: "ladder", path: "/ladder", component: Ladder },
    { name: "story", path: "/story", component: Story },
    { name: "lua", path: "/lua", component: Lua },
];

const router = new VueRouter({
    routes,
});

export default router;
