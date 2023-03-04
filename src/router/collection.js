import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

const routes = [
    { name: "collection", path: "/", component: () => import("@/views/Collection.vue") },
    { name: "collection-single", path: "/:id?", component: () => import('@/components/collection/collection_single.vue') },
];

const router = new VueRouter({
    routes,
    mode: 'history',
    base: '/collection'
});

export default router;
