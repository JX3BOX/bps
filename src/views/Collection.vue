<template>
    <AppLayout>
        <div class="m-collection">
            <List v-if="mode == 'list'"/>
            <Single v-else/>
        </div>
    </AppLayout>
</template>

<script>
import AppLayout from "@/layout/AppLayout.vue";
import List from "@/components/collection/collection_list.vue";
import Single from "@/components/collection/collection_single.vue";
export default {
    name: "Collection",
    props: [],
    components: {
        List,
        Single,
        AppLayout,
    },
    data: function () {
        return {};
    },
    computed: {
        mode: function () {
            return this.$route?.params.id ? "single" : "list";
        },
    },
    watch: {},
    methods: {},
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/app.less";
@import "../assets/css/collection/collection.less";
</style>
