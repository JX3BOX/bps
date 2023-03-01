<template>
    <div class="m-list-side">
        <!-- 群号 -->
        <RightSideMsg>
            <em>作者交流群</em> :
            <strong>
                <a href="https://jq.qq.com/?_wv=1027&k=mEl1e2hL">297985102</a>
            </strong>
        </RightSideMsg>
        <!-- 门派天梯 -->
        <mini-ladder></mini-ladder>
    </div>
</template>

<script>
import ladder from "@/assets/data/ladder.json";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import { __ossMirror, __imgPath, __ossRoot } from "@jx3box/jx3box-common/data/jx3box.json";

import miniLadder from "./mini_ladder.vue";
export default {
    name: "list_side",
    props: [],
    data: function () {
        return {
            ladder,
            xfmap,
        };
    },
    computed: {
        client: function () {
            return this.$store.state.client;
        },
    },
    methods: {
        xfcolor: function (val) {
            return this.xfmap[val]["color"];
        },
    },
    filters: {
        xficon: function (val) {
            return __imgPath + "image/xf/" + xfmap[val]["id"] + ".png";
        },
    },
    mounted: function () {},
    components: {
        miniLadder
    },
};
</script>

<style lang="less">
@import "~@/assets/css/side.less";
</style>
