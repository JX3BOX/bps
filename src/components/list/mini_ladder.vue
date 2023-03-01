<template>
    <div class="m-bps-ladder-mini">
        <h3 class="m-ladder-title">
            <span class="u-title">
                <img class="u-icon" svg-inline src="@/assets/img/side/rank.svg" /> 天梯榜
                <!-- <span class="u-dot">·</span> -->
            </span>
            <span class="u-more" @click="viewRank">查看更多<i class="el-icon-d-arrow-right"></i></span>
            <!-- <el-select v-model="zlp" placeholder="请选择" size="medium">
                <el-option v-for="item in zlps" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select> -->
        </h3>

        <div class="m-ladder-rank" v-loading="loading">
            <ul>
                <li v-for="(item, i) in rank" :key="i">
                    <div
                        class="u-item"
                        :style="{
                            width: getRate(item.dps),
                            backgroundColor: xfcolor(item.xf),
                        }"
                        :title="item.label"
                    >
                        <img :src="showMountIcon(xfmap[item.xf]['id'])" class="u-pic" />
                        <span class="u-text">
                            {{ item.xf }}
                            <!-- <span class="u-desc" v-if="item.label">&lt;{{ item.label }}&gt;</span> -->
                        </span>
                        <span class="u-dps">{{ item.dps }}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import zlps from "@/assets/data/ladder.json";
import { authorLink, showAvatar, showSchoolIcon, showMountIcon } from "@jx3box/jx3box-common/js/utils";
import { getRank } from "@/service/ladder.js";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import { colors_by_mount_name } from "@jx3box/jx3box-data/data/xf/colors.json";
export default {
    name: "MiniLadder",
    data() {
        return {
            zlp: "",
            // 排行
            xfmap,
            data: [],

            loading: false
        };
    },
    computed: {
        c: function () {
            return this.$store.state.client;
        },
        zlps: function () {
            return zlps[this.c] || [];
        },
        rank: function () {
            let data = this.data;
            data.sort((a, b) => {
                return ~~b.dps - ~~a.dps;
            });
            return data;
        },
    },
    mounted() {
        this.zlp = zlps[this.c][0]["value"];
        this.loadRank();
    },
    methods: {
        xfcolor: function (val) {
            return colors_by_mount_name[val];
        },
        getRate: function (val) {
            return ((val / this.maxBase) * 100).toFixed(2) + "%";
        },
        viewRank() {
            this.$router.push({ name: "Ladder" });
        },
        loadRank: function () {
            if (!this.zlp) return;

            this.loading = true;
            getRank(this.zlp, this.client)
                .then((data) => {
                    this.data = data;
                    this.$forceUpdate();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        authorLink,
        showAvatar,
        showSchoolIcon,
        showMountIcon,
    },
};
</script>

<style lang="less">
@import "~@/assets/css/ladder.less";
</style>
