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

        <!-- 其他链接 -->
        <div class="m-side-links">
            <h3 class="m-side-title" style="border-bottom: none;">
                <div class="u-title">
                    <img class="u-icon" svg-inline src="@/assets/img/side/docs.svg" />
                    推荐文档
                </div>
            </h3>
            <el-collapse class="u-groups" v-model="activeDocGroup">
                <el-collapse-item title="萌新指南" name="bps_newbie">
                    <div class="u-docs">
                        <a v-for="(item, i) in bps_newbie" :key="i" class="u-doc" :href="item.link" target="_blank">
                            <i class="el-icon-collection"></i>
                            {{ item.label }}
                        </a>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="进阶指南" name="bps_senior">
                    <div class="u-docs">
                        <a v-for="(item, i) in bps_senior" :key="i" class="u-doc" :href="item.link" target="_blank">
                            <i class="el-icon-collection"></i>
                            {{ item.label }}
                        </a>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="高阶指南" name="bps_professor">
                    <div class="u-docs">
                        <a v-for="(item, i) in bps_professor" :key="i" class="u-doc" :href="item.link" target="_blank">
                            <i class="el-icon-collection"></i>
                            {{ item.label }}
                        </a>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
import ladder from "@/assets/data/ladder.json";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import { __ossMirror, __imgPath, __ossRoot } from "@jx3box/jx3box-common/data/jx3box.json";
import { getMenuGroups } from "@/service/helper.js";

import miniLadder from "./mini_ladder.vue";
export default {
    name: "list_side",
    props: [],
    data: function () {
        return {
            ladder,
            xfmap,

            activeDocGroup: [],
            bps_newbie: [],
            bps_senior: [],
            bps_professor: [],
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
    mounted: function () {
        getMenuGroups(["bps_newbie", "bps_senior", "bps_professor"]).then((res) => {
            let data = res.data.data.data || {};
            for (let key in data) {
                this[key] = data[key]["menus"];
            }
        });
    },
    components: {
        miniLadder
    },
};
</script>

<style lang="less">
@import "~@/assets/css/side.less";
</style>
