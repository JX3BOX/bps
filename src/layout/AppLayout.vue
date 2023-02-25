<template>
    <div>
        <Header></Header>
        <Breadcrumb
            name="职业专栏"
            slug="bps"
            root="/bps"
            :publishEnable="false"
            :adminEnable="false"
            :feedbackEnable="true"
            :crumbEnable="true"
        >
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav class="m-nav" />
        </LeftSidebar>
        <Main :withoutRight="true">
            <div class="m-main">
                <tabs />
                <slot></slot>
            </div>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Info from "@/components/list/Info.vue";
import Nav from "@/components/list/list_nav.vue";
import tabs from "@/components/tabs.vue";
export default {
    name: "App",
    props: [],
    data: function () {
        return {};
    },
    methods: {},
    components: {
        Info,
        Nav,
        tabs,
    },
};
</script>

<style lang="less">
@import "~@/assets/css/list.less";
</style>
