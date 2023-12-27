<template>
    <div>
        <Header></Header>
        <Breadcrumb
            name="职业专栏"
            slug="bps"
            root="/bps"
            :publishEnable="true"
            :adminEnable="false"
            :feedbackEnable="true"
            :crumbEnable="true"
        >
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav class="m-nav" />
        </LeftSidebar>
        <Main :withoutRight="false">
            <div class="m-main">
                <tabs />
                <slot></slot>
            </div>
            <RightSidebar class="m-bps-right-side" :show-toggle="true">
                <Side class="m-extend" />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Info from "@/components/list/Info.vue";
import Nav from "@/components/list/list_nav.vue";
import Side from "@/components/list/list_side.vue";
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
        Side,
        tabs,
    },
};
</script>

<style lang="less">
.m-bps-right-side {
    .c-sidebar-right-inner {
        background-color: #fff !important;
    }
}
@import "~@/assets/css/list.less";
</style>
