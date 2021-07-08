<template>
    <div class="v-ladder">
        <div class="m-ladder-header">
            <h3 class="m-ladder-title">
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
            <div class="m-ladder-desc">本榜单仅作参考，以无团队增益下对单体静止114目标伤害作为参考。</div>
            <div class="m-ladder-filter">
                <el-radio-group class="u-filter-rank" v-model="filter" size="medium">
                    <el-radio-button label="全部"></el-radio-button>
                    <el-radio-button label="只显示最低"></el-radio-button>
                    <el-radio-button label="只显示最高"></el-radio-button>
                </el-radio-group>
                <el-select class="u-filter-school" v-model="school" placeholder="只看门派">
                    <el-option
                        v-for="(school_name,school_id) in schoolmap"
                        :key="school_id"
                        :label="~~school_id ? school_name : '全部'"
                        :value="school_id"
                    >
                        <img :src="school_id | showSchoolIcon" class="u-school-icon" />
                        <span class="u-school-name">{{~~school_id ? school_name : '全部'}}</span>
                        <!-- <span class="u-school-name">{{school_name}}</span> -->
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="m-ladder-rank" v-loading="loading">
            <ul>
                <li v-for="(item, i) in data" :key="i" v-show="isVisible(item)">
                    <el-popover
                        v-if="item.remark"
                        placement="bottom-start"
                        :title="item.xf"
                        width="500"
                        trigger="hover"
                        :content="item.remark"
                        popper-class="m-ladder-pop"
                    >
                        <div
                            slot="reference"
                            class="u-item"
                            :style="{
                            width: getRate(item.dps),
                            backgroundColor: xfcolor(item.xf),
                        }"
                        >
                            <img :src="item.xf | xficon" class="u-pic" />
                            <template v-if="!!item.link">
                                <a class="u-text" :href="item.link" target="_blank">
                                    {{ item.xf }}
                                    <span
                                        class="u-desc"
                                        v-if="item.label"
                                    >&lt;{{item.label}}&gt;</span>
                                </a>
                            </template>
                            <template v-else>
                                <span class="u-text">
                                    {{ item.xf }}
                                    <span
                                        class="u-desc"
                                        v-if="item.label"
                                    >&lt;{{item.label}}&gt;</span>
                                </span>
                            </template>
                            <span class="u-dps">{{item.dps}}</span>
                        </div>
                    </el-popover>
                    <div
                        v-else
                        class="u-item"
                        :style="{
                            width: getRate(item.dps),
                            backgroundColor: xfcolor(item.xf),
                        }"
                    >
                        <img :src="item.xf | xficon" class="u-pic" />
                        <template v-if="!!item.link">
                            <a class="u-text" :href="item.link" target="_blank">
                                {{ item.xf }}
                                <span
                                    class="u-desc"
                                    v-if="item.label"
                                >&lt;{{item.label}}&gt;</span>
                            </a>
                        </template>
                        <template v-else>
                            <span class="u-text">
                                {{ item.xf }}
                                <span
                                    class="u-desc"
                                    v-if="item.label"
                                >&lt;{{item.label}}&gt;</span>
                            </span>
                        </template>
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
import schoolmap from "@jx3box/jx3box-data/data/xf/schoolid.json";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import zlps from "@/assets/data/ladder.json";
export default {
    name: "Ladder",
    props: [],
    data: function () {
        return {
            // 版本
            zlp: zlps[0]["value"] || "",
            zlps,

            // 排行
            xfmap,
            data: [],

            // 过滤
            filter: "全部",
            school: "",
            schoolmap,

            // 杂项
            authors: [],
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
            return xfmap[val] && xfmap[val]["color"];
        },
        getRate: function (val) {
            return ((val / this.maxBase) * 100).toFixed(2) + "%";
        },
        isVisible: function (item) {
            // rank可视过滤
            let filter_visible = true;
            if (this.filter == "只显示最低") {
                filter_visible = !~~item.icon;
            } else if (this.filter == "只显示最高") {
                filter_visible = item.icon == 4;
            }

            // 门派可视过滤
            let school_visible = true;
            if (~~this.school) {
                school_visible = item.school == this.school;
            } else {
                school_visible = true;
            }

            return filter_visible && school_visible;
        },
        loadRank: function () {
            this.loading = true;
            getRank(this.zlp)
                .then((data) => {
                    this.data = data;
                    this.$forceUpdate();
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
            if (xfmap[val]) {
                return __imgPath + "image/xf/" + xfmap[val]["id"] + ".png";
            } else {
                return "";
            }
        },
        showSchoolIcon: function (val) {
            return __imgPath + "image/school/" + val + ".png";
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

.u-school-icon {
    .size(24px);
    .y;
    .mr(5px);
}
.u-school-name {
    .fz(14px);
}
</style>
