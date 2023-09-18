<template>
    <div>
        <Header></Header>
        <Breadcrumb
            name="剑三小册"
            slug="collection"
            root="/collection"
            :publishEnable="true"
            :adminEnable="false"
            :feedbackEnable="true"
            :crumbEnable="true"
        >
            <template #op-prepend>
                <el-button
                    class="c-admin-button u-admin"
                    type="primary"
                    icon="el-icon-setting"
                    @click="onAdminClick"
                    v-if="isEditor"
                >管理</el-button>
            </template>
        </Breadcrumb>
        <LeftSidebar :uid="user_id">
            <Nav :id="id" class="m-nav" />
        </LeftSidebar>
        <Main :withoutRight="!hasRight">
            <slot></slot>
            <RightSidebar>
                <Side :id="id" class="m-extend" />
            </RightSidebar>
            <Footer></Footer>
        </Main>

        <CollectionAdmin v-model="showDrawer" />
    </div>
</template>

<script>
import Nav from "@/components/single/single_nav.vue";
import Side from "@/components/single/single_side.vue";
import { getAppIcon, getAppID } from "@jx3box/jx3box-common/js/utils";
import CollectionAdmin from "@/components/collection/collection_admin.vue";
import User from "@jx3box/jx3box-common/js/user";

export default {
    name: "CollectionLayout",
    props: {
        hasRight: {
            type: Boolean,
            default: true,
        },
    },
    data: function () {
        return {
            id: getAppID(),

            showDrawer: false,
        };
    },
    computed: {
        user_id: function () {
            return this.$store.state.user_id;
        },
        isEditor: function () {
            return User.isEditor();
        },
    },
    methods: {
        onAdminClick() {
            this.showDrawer = true;
        },
    },
    components: {
        Nav,
        Side,
        CollectionAdmin,
    },
};
</script>

<style lang="less">
@import "~@/assets/css/list.less";
</style>
