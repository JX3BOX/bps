<template>
    <div class="m-list-side">
        <!-- 群号 -->
        <RightSideMsg>
            <em>签约作者交流群</em> :
            <strong>
                <a href="https://jq.qq.com/?_wv=1027&k=CAiizina" v-if="client == 'origin'">590349918</a>
                <a href="https://jq.qq.com/?_wv=1027&k=t1uvYnW1" v-else>297985102</a>
            </strong>
        </RightSideMsg>
        <group />

        <!-- 排行榜 -->
        <!-- <div class="m-side-rank">
            <h3 class="c-sidebar-right-title">
                <img
                    class="u-icon"
                    svg-inline
                    src="../assets/img/side/rank.svg"
                />
                职业天梯榜
                <span class="u-tip">结庐在江湖</span>
            </h3>
            <div class="m-bps-ladder-mini">
                <ul>
                    <li v-for="(item, i) in ladder" :key="i">
                        <span
                            class="u-item"
                            :style="{
                                width: item.max + '%',
                                backgroundColor: xfcolor(item.name),
                            }"
                        >
                            <img :src="item.name | xficon" class="u-pic" />
                            <span class="u-text">{{ item.name }}</span>
                        </span>
                    </li>
                </ul>
            </div>
            <router-link class="m-bps-ladder-more" to="/ladder">仅作参考 · 榜单来源</router-link>
        </div>-->

        <!-- 其他链接 -->
        <!-- <div class="m-side-links">
            <h3 class="c-sidebar-right-title">
                <img
                    class="u-icon"
                    svg-inline
                    src="../assets/img/side/puzzle.svg"
                />
                相关链接
            </h3>
            <div class="c-sidebar-right-list">
                <a class="u-item" href="https://www.j3pz.com/tools/haste/" target="_blank">急速阈值查询</a>
                <a class="u-item" href="https://www.j3pz.com/" target="_blank">配装模拟器</a>
                <a class="u-item" href="http://minamistudio.online/jx3simulator/index.html" target="_blank">DPS模拟器</a>
            </div>
        </div>-->

        <!-- <Github_REPO REPO="fb" coder="8"></Github_REPO> -->
    </div>
</template>

<script>
import group from "@/components/group.vue";
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

<style lang="less">
@import "../assets/css/side.less";
@import "../assets/css/list_side.less";
</style>
