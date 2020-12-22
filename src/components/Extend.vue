<template>
    <div class="m-extend">
        <single_side v-if="mode == 'single'" />
        <template v-else>
            <!-- 群号 -->
            <RightSideMsg>
                <em>签约作者交流群</em> :
                <strong
                    ><a href="https://jq.qq.com/?_wv=1027&k=bRftczVN"
                        >978285140</a
                    ></strong
                >
            </RightSideMsg>
            <group />
            <list_side />
        </template>
    </div>
</template>

<script>
import list_side from "@/components/list_side.vue";
import single_side from "@/components/single_side.vue";
import group from "@/components/group.vue";

export default {
    name: "Extend",
    props: [],
    data: function() {
        return {};
    },
    computed: {
        mode: function() {
            return this.$store.state.mode;
        },
    },
    methods: {},
    mounted: function() {},
    components: {
        list_side,
        single_side,
        group,
    },
};
</script>

<style lang="less">
@import "../assets/css/side.less";
</style>
