<template>
    <div class="v-ladder">
        <h3 class="m-ladder-header">
            <img class="u-icon" svg-inline src="../assets/img/side/rank.svg" />
            门派天梯榜 ·
            <el-select v-model="zlp" placeholder="请选择">
                <el-option
                    v-for="item in zlps"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
        </h3>
        <div class="m-ladder-desc">本榜单仅作参考，主要全流派在相同水平装备下以单体静止目标作为参考。</div>
        <div class="m-ladder-rank">
            <ul>
                <li v-for="(item, i) in data" :key="i">
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
import { getUsers, getBread } from "@/service/ladder.js";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import testdata from "@/assets/data/ladder.json";

export default {
    name: "Ladder",
    props: [],
    data: function () {
        return {
            xfmap,
            zlp: "jielu",
            zlps: [
                {
                    label: "结庐在江湖",
                    value: "jielu",
                },
            ],
            authors: [],
            // TODO:修改为线上接口
            data: testdata || [],
        };
    },
    computed: {},
    methods: {
        xfcolor: function (val) {
            return this.xfmap[val]["color"];
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
        // 加载贡献名单
        getBread("bps_ladder_authors").then((ids) => {
            getUsers(ids).then((data) => {
                this.authors = data || [];
            });
        });
    },
};
</script>

<style lang="less">
@import "../assets/css/ladder.less";
</style>
