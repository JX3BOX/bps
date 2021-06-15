<template>
    <div class="v-ladder">
        <h3 class="m-ladder-header">
            <span class="u-title">
                <img class="u-icon" svg-inline src="../assets/img/side/rank.svg" /> 门派天梯榜
                <span class="u-dot">·</span>
            </span>
            <el-select v-model="zlp" placeholder="请选择">
                <el-option
                    v-for="item in zlps"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
        </h3>
        <div class="m-ladder-desc">本榜单仅作参考，以平民毕业装对单体静止目标伤害作为参考。</div>
        <div class="m-ladder-rank" v-loading="loading">
            <ul>
                <li v-for="(item, i) in data" :key="i">
                    <el-tooltip
                        effect="dark"
                        :content="item.remark"
                        placement="top-start"
                        v-if="item.remark"
                    >
                        <div
                            class="u-item"
                            :style="{
                            width: getRate(item.dps),
                            backgroundColor: xfcolor(item.xf),
                        }"
                        >
                            <img :src="item.xf | xficon" class="u-pic" />
                            <span class="u-text">
                                {{ item.xf }}
                                <span
                                    class="u-desc"
                                    v-if="item.xf"
                                >&lt;{{item.label}}&gt;</span>
                            </span>
                            <span class="u-dps">{{item.dps}}</span>
                        </div>
                    </el-tooltip>
                    <div
                        v-else
                        class="u-item"
                        :style="{
                            width: getRate(item.dps),
                            backgroundColor: xfcolor(item.xf),
                        }"
                    >
                        <img :src="item.xf | xficon" class="u-pic" />
                        <span class="u-text">
                            {{ item.xf }}
                            <span
                                class="u-desc"
                                v-if="item.xf"
                            >&lt;{{item.label}}&gt;</span>
                        </span>
                        <span class="u-dps">{{item.dps}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="m-ladder-contributor">
            <div class="u-label">❤️ 感谢以下人员的贡献</div>
            <div class="u-list" v-if="authors && authors.length">
                <a
                    class="u-author"
                    target="_blank"
                    :href="item.ID | authorLink"
                    v-for="(item,i) in authors"
                    :key="i"
                >
                    <img :src="item.user_avatar | showAvatar" :alt="item.display_name" />
                    {{item.display_name}}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { authorLink, showAvatar } from "@jx3box/jx3box-common/js/utils";
import { getUsers, getBread, getRank } from "@/service/ladder.js";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import zlps from "@/assets/data/ladder.json";

export default {
    name: "Ladder",
    props: [],
    data: function () {
        return {
            xfmap,
            zlp: zlps[0]["value"] || "",
            zlps,
            authors: [],
            data: [],
            loading: false,
        };
    },
    computed: {
        maxBase: function () {
            let arr = [];
            this.data.forEach((item) => {
                arr.push(item.dps);
            });
            return ~~Math.max(...arr);
        },
    },
    methods: {
        xfcolor: function (val) {
            return xfmap[val]["color"];
        },
        getRate: function (val) {
            return ((val / this.maxBase) * 100).toFixed(2) + "%";
        },
        loadRank: function () {
            this.loading = true;
            getRank(this.zlp)
                .then((data) => {
                    this.data = data;
                    this.$forceUpdate()
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        loadContributors: function () {
            getBread("bps_ladder_authors").then((ids) => {
                getUsers(ids).then((data) => {
                    this.authors = data || [];
                });
            });
        },
        init: function () {
            this.loadContributors();
        },
    },
    filters: {
        authorLink,
        showAvatar,
        xficon: function (val) {
            return __imgPath + "image/xf/" + xfmap[val]["id"] + ".png";
        },
    },
    mounted: function () {
        this.init();
    },
    watch: {
        zlp: {
            immediate: true,
            handler: function () {
                this.loadRank();
            },
        },
    },
};
</script>

<style lang="less">
@import "../assets/css/ladder.less";
</style>
