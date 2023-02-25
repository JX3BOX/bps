<template>
    <AppLayout>
        <div class="v-collection">
            <el-tabs v-model="type" type="card" @tab-click="changeTab">
                <el-tab-pane :label="item.label" :name="item.key" v-for="(item, i) in types" :key="i">
                    <router-link
                        slot="label"
                        class="u-tab-icon"
                        :to="{ name: 'collection', query: { tab: item.key, subtype } }"
                    >
                        <i :class="item.icon"></i>
                        {{ item.label }}
                    </router-link>
                    <div class="m-collection-box">
                        <div class="m-collection-header" v-html="desc || item.desc"></div>
                    </div>
                    <ul class="m-collection-list" v-if="origin && data[item.key].length">
                        <li class="u-item" v-for="(item, j) in data[item.key]" :key="j" v-show="filterSchool(item)">
                            <a :href="getItemLink(item)" target="_blank">
                                <img class="u-icon" :src="iconLink(item.icon, c)" />
                                <span class="u-name">{{ item.label }}</span>
                                <span class="u-xf">
                                    <!-- <img :src="item.meta_2 | showXfIcon" :alt="item.meta_2" /> -->
                                    ({{ item.meta_2 }})
                                </span>
                                <span class="u-desc">{{ item.meta_3 }}</span>
                                <span class="u-remark">{{ item.meta_4 }}</span>
                            </a>
                        </li>
                    </ul>
                </el-tab-pane>
            </el-tabs>

            <div class="m-ladder-contributor">
                <div class="u-label">❤️ 感谢以下人员的贡献</div>
                <div class="u-list" v-if="authors && authors.length">
                    <a
                        class="u-author"
                        target="_blank"
                        :href="item.ID | authorLink"
                        v-for="(item, i) in authors"
                        :key="i"
                    >
                        <img :src="item.user_avatar | showAvatar" :alt="item.display_name" />
                        {{ item.display_name }}
                    </a>
                </div>
            </div>
        </div></AppLayout
    >
</template>

<script>
import AppLayout from "@/layout/AppLayout.vue";
import { getSkillGroups } from "@/service/helper.js";
import { getUsers, getBread } from "@/service/ladder.js";
import { getLink, iconLink, showAvatar, authorLink } from "@jx3box/jx3box-common/js/utils";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import relation from "@jx3box/jx3box-data/data/xf/relation.json";
export default {
    name: "Collection",
    props: [],
    components: { AppLayout },
    data: function () {
        return {
            types: [
                {
                    label: "减伤",
                    desc: "包含减伤、化解等，穿透技能将无视部分此类技能效果。同时减伤具有优先级，优先级高的减伤会覆盖优先级低的减伤，相同优先级则后附加的覆盖先前存在的。如果已经存在高优先级的减伤，则低优先级的减伤不会被附加上去。",
                    key: "jianshang",
                    icon: "el-icon-sugar",
                },
                {
                    label: "抵御",
                    desc: "包含闪避、格挡、招架等，部分技能将无视此效果。",
                    key: "diyu",
                    icon: "el-icon-dessert",
                },
                {
                    label: "无敌",
                    desc: "包含无敌、免死、假死、隐身等，部分穿刺技能将无视此类技能。",
                    key: "wudi",
                    icon: "el-icon-ice-cream",
                },
                {
                    label: "控制",
                    desc: "包含锁足、定身、眩晕、击倒、击退、击飞、缴械、魅惑、昏睡、拉拽等。",
                    key: "kongzhi",
                    icon: "el-icon-hot-water",
                },
                {
                    label: "解控",
                    desc: "包含解控、免控等。",
                    key: "jiekong",
                    icon: "el-icon-cold-drink",
                },
                {
                    label: "驱散",
                    desc: "包含单体或群体驱散。",
                    key: "qusan",
                    icon: "el-icon-watermelon",
                },
                {
                    label: "减疗",
                    desc: "减疗后通过贯体治疗技能将更容易治愈目标。",
                    key: "jianliao",
                    icon: "el-icon-grape",
                },
                {
                    label: "打断",
                    desc: "包含打断、打退等。",
                    key: "daduan",
                    icon: "el-icon-cherry",
                },
                {
                    label: "位移",
                    desc: "包含位移、轻功等。",
                    key: "weiyi",
                    icon: "el-icon-apple",
                },
                {
                    label: "疾行",
                    desc: "包含加速等。",
                    key: "jixing",
                    icon: "el-icon-milk-tea",
                },
                {
                    label: "滞行",
                    desc: "包含减速、封轻功等。",
                    key: "jiansu",
                    icon: "el-icon-lollipop",
                },
                {
                    label: "嘲讽",
                    desc: "大部分技能为坦克心法独有，少量门派与宠物也有仇恨技能，强仇后将固定攻击该目标。",
                    key: "chaofeng",
                    icon: "el-icon-ice-cream-round",
                },
                {
                    label: "回内",
                    desc: "回复蓝量。",
                    key: "huifu",
                    icon: "el-icon-ice-drink",
                },
            ],
            type: "jianshang",
            data: {},
            origin: "",
            xfmap,
            authors: [],
            relation: relation["mount_relation"],
        };
    },
    computed: {
        key_list: function () {
            let list = [];
            this.types.forEach((item) => {
                list.push(item.key);
            });
            return list;
        },
        keys: function () {
            return this.key_list.join(",");
        },
        subtype: function () {
            return this.$route.query.subtype;
        },
        desc: function () {
            return this.origin && this.origin[this.type] && this.origin[this.type]["description"];
        },
        c: function () {
            return this.$store.state.client;
        },
        client: function () {
            return this.$store.state.client == "std" ? 1 : 2;
        },
        contributors: function () {
            return this.$store.state.client == "std" ? "bps_collection_authors" : "bps_collection_authors_origin";
        },
    },
    methods: {
        loadData: function () {
            this.loading = true;
            getSkillGroups(this.keys, this.client)
                .then((res) => {
                    let data = res.data.data.data;
                    this.origin = data;
                    for (let key in data) {
                        this.data[key] = (data[key] && data[key]["items"]) || [];
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        getItemLink: function (item) {
            return getLink(item.key || "skill", item.id);
        },
        filterSchool: function (item) {
            if (!this.subtype || this.subtype == "通用") {
                return true;
            } else {
                return this.relation[this.subtype]?.includes(item.meta_2);
            }
        },
        changeTab: function (item) {
            this.$router.push({
                query: { tab: item.name, subtype: this.subtype },
            });
        },
        iconLink,
    },
    filters: {
        showXfIcon: function (xf) {
            return xfmap[xf] && iconLink(xfmap[xf]["icon"], this.c);
        },
        authorLink,
        showAvatar,
    },
    mounted: function () {
        this.loadData();

        // 加载贡献名单
        getBread(this.contributors).then((ids) => {
            if (!ids) return;
            getUsers(ids).then((data) => {
                this.authors = data || [];
            });
        });

        // 初始化tab
        if (this.$route.query.tab) {
            this.type = this.$route.query.tab;
        }
    },
};
</script>

<style scoped lang="less">
@import "../assets/css/collection.less";
</style>
