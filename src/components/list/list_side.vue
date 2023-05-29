<template>
    <div class="m-list-side">
        <!-- 群号 -->
        <RightSideMsg>
            <em>作者交流群</em> :
            <strong @click="onQQClick" class="u-link" title="点击复制">
                <a>{{ qq }}</a>
            </strong>
        </RightSideMsg>
        <!-- 门派天梯 -->
        <mini-ladder></mini-ladder>

        <!-- 其他链接 -->
        <div class="m-side-links">
            <h3 class="m-side-title" style="border-bottom: none">
                <div class="u-title">
                    <img class="u-icon" svg-inline src="@/assets/img/side/docs.svg" />
                    推荐小册
                </div>
            </h3>
            <el-collapse class="u-groups" v-model="activeDocGroup">
                <el-collapse-item :title="list.label" :name="list.name" v-for="list in data" :key="list.name">
                    <div class="u-docs">
                        <a v-for="(item, i) in list.menus" :key="i" class="u-doc" :href="item.link" target="_blank">
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
    components: {
        miniLadder,
    },
    props: [],
    data: function () {
        return {
            ladder,
            xfmap,

            activeDocGroup: [],
            data: [],
            qq: "297985102",
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
        loadData: function (client) {
            getMenuGroups([`${client}_bps_newbie`, `${client}_bps_senior`, `${client}_bps_professor`]).then((res) => {
                this.data = res.data.data.data || {};
            });
        },
        onQQClick() {
            navigator.clipboard.writeText(this.qq).then(() => {
                this.$notify({
                    title: "复制成功",
                    message: "内容：" + this.qq,
                    type: "success",
                });
            })
        }
    },
    filters: {
        xficon: function (val) {
            return __imgPath + "image/xf/" + xfmap[val]["id"] + ".png";
        },
    },
    watch: {
        client: {
            immediate: true,
            handler: function (client = 'std') {
                if (client) {
                    this.loadData(client);
                }
            },
        },
    },
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/side.less";
</style>
