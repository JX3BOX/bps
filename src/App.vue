<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb
            name="职业专栏"
            slug="bps"
            root="/bps"
            :publishEnable="true"
            :adminEnable="true"
            :feedbackEnable="true"
            :crumbEnable="true"
        >
            <img slot="logo" svg-inline :src="getAppIcon('bps')" />
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav class="m-nav" />
        </LeftSidebar>
        <Main :withoutRight="withoutRight">
            <div class="m-main">
                <tabs />
                <router-view />
            </div>
            <RightSidebar>
                <Side class="m-extend" />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Info from "@/components/Info.vue";
import Nav from "@/components/list_nav.vue";
import Side from "@/components/list_side.vue";
import tabs from "@/components/tabs";
import { getAppIcon } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "App",
    props: [],
    data: function () {
        return {};
    },
    computed: {
        withoutRight : function (){
            return this.$store.state.client == 'origin' ? true : false
        }
    },
    methods: {getAppIcon},
    components: {
        Info,
        Nav,
        Side,
        tabs,
    },
};
</script>

<style lang="less">
@import "./assets/css/app.less";
@media screen and (max-width: @phone) {
    .c-crumb{
        .none;
    }
    .c-breadcrumb {
        .u-op {
            .none;
        }
    }
}
</style>
