<template>
    <div>
        <Header></Header>
        <Breadcrumb
            name="职业专栏"
            slug="bps"
            root="/bps"
            :publishEnable="true"
            :adminEnable="true"
            :feedbackEnable="true"
            :crumbEnable="true"
            :adminMarks="{}"
        >
            <template #op-prepend>
                <!-- <AdminDirectMessage :user-id="user_id" :sourceId="String(post.ID)" :sourceType="post.post_type"></AdminDirectMessage> -->
                <AdminDrop :post="post" :user-id="user_id" />
            </template>
            <template #title>
                <span>
                    {{ title }}
                </span>
            </template>
        </Breadcrumb>
        <LeftSidebar :uid="user_id">
            <Nav :id="id" class="m-nav" />
        </LeftSidebar>
        <Main :withoutRight="!hasRight">
            <slot></slot>
            <RightSidebar :show-toggle="true">
                <Side :id="id" class="m-extend" />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Nav from "@/components/single/single_nav.vue";
import Side from "@/components/single/single_side.vue";
import { getAppIcon, getAppID } from "@jx3box/jx3box-common/js/utils";
import AdminDrop from "@jx3box/jx3box-common-ui/src/bread/AdminDrop.vue"
export default {
    name: "SingleLayout",
    props: {
        hasRight: {
            type: Boolean,
            default: true,
        },
    },
    data: function () {
        return {
            id: getAppID(),
        };
    },
    computed: {
        user_id: function () {
            return this.$store.state.user_id;
        },
        post: function (){
            return this.$store.state.post;
        },
        title() {
            return this.post.post_title || document.title;
        }
    },
    methods: {},
    components: {
        Nav,
        Side,
        AdminDrop
    },
};
</script>

<style lang="less">
@import "~@/assets/css/list.less";
</style>
