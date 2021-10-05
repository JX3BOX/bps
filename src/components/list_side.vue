<template>
    <div class="m-list-side">
        <!-- 群号 -->
        <RightSideMsg>
            <em>作者交流群</em> :
            <strong>
                <a href="https://jq.qq.com/?_wv=1027&k=mEl1e2hL">297985102</a>
            </strong>
        </RightSideMsg>
        <router-link class="u-link-rank" to="/ladder"><img src="../assets/img/rank.png" /></router-link>
        <!-- Q群 -->
        <h2 class="c-sidebar-right-title m-title">
            <img class="u-icon" svg-inline src="../assets/img/puzzle.svg" />
            <span class="u-text">各职业门派群</span>
            <a class="u-show-message" target="_blank" href="/tool/13659/">申请展示</a>
        </h2>
        <group />
    </div>
</template>

<script>

import ladder from "../assets/data/ladder.json";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import {
    __ossMirror,
    __imgPath,
    __ossRoot,
} from "@jx3box/jx3box-common/data/jx3box.json";
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
        group,
    },
};
</script>

<style scoped lang="less">
@import "../assets/css/side.less";
@import "../assets/css/list_side.less";
.u-link-rank{
    .db;
    .x;
    img{
        .r(3px);
    }
    .mt(10px);
}
</style>
