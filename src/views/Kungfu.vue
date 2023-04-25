<template>
    <AppLayout>
        <div class="v-collection" v-loading="loading">
            <el-tabs v-model="type" type="card" @tab-click="changeTab">
                <el-tab-pane :label="item.label" :name="item.key" v-for="(item, i) in types" :key="i">
                    <router-link
                        slot="label"
                        class="u-tab-icon"
                        :to="{ name: 'kungfu', query: { tab: item.key, subtype } }"
                    >
                        <i :class="item.icon"></i>
                        {{ item.label }}
                    </router-link>
                    <div class="m-collection-box">
                        <div class="m-collection-header" v-html="item.desc"></div>
                    </div>
                    <ul class="m-collection-list" v-if="data && data.length">
                        <li class="u-item" v-for="(item, j) in data" :key="j">
                            <a :href="getItemLink(item)" target="_blank">
                                <img class="u-icon" :src="iconLink(item.icon, client)" />
                                <span class="u-name">{{ item.name }}</span>
                                <span class="u-xf">
                                    ({{ getBelongTo(item) }})
                                </span>
                                <span class="u-desc">{{ item.desc }}</span>
                                <span class="u-remark">{{ item.content }}</span>
                            </a>
                        </li>
                    </ul>
                    <el-empty description="当前心法暂无此类技能" v-else :image-size="180"></el-empty>
                </el-tab-pane>
            </el-tabs>

            <!-- <div class="m-ladder-contributor">
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
            </div> -->
        </div></AppLayout
    >
</template>

<script>
import AppLayout from "@/layout/AppLayout.vue";
import { getUsers, getBread } from "@/service/ladder.js";
import { getLink, iconLink, showAvatar, authorLink } from "@jx3box/jx3box-common/js/utils";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import relation from "@jx3box/jx3box-data/data/xf/relation.json";

import {getSpecialGroup, getSpecialGroupSkill} from "@/service/skill";
import schoolMap from "@jx3box/jx3box-data/data/xf/schoolid.json";
import xfid from "@jx3box/jx3box-data/data/xf/xfid.json";
export default {
    name: "Collection",
    props: [],
    components: { AppLayout },
    data: function () {
        return {
            types: [],
            icons: {
                jianshang: "el-icon-sugar",
                diyu: "el-icon-dessert",
                wudi: "el-icon-ice-cream",
                kongzhi: "el-icon-hot-water",
                jiekong: "el-icon-cold-drink",
                qusan: "el-icon-watermelon",
                jianliao: "el-icon-grape",
                daduan: "el-icon-cherry",
                weiyi: "el-icon-apple",
                jixing: "el-icon-milk-tea",
                jiansu: "el-icon-lollipop",
                chaofeng: "el-icon-ice-cream-round",
                huifu: "el-icon-ice-drink",
            },
            type: "jianshang",
            authors: [],
            relation: relation["mount_relation"],

            data: [],
            loading: false,
        };
    },
    computed: {
        subtype: function () {
            return this.$route.query.subtype;
        },
        school: function () {
            return this.subtype === '通用' ? (this.subtype ? 0 : '') : xfmap[this.subtype]?.school;
        },
        mount: function () {
            return xfmap[this.subtype]?.id || 0;
        },
        client: function () {
            return this.$store.state.client;
        },
        contributors: function () {
            return this.$store.state.client == "std" ? "bps_collection_authors" : "bps_collection_authors_origin";
        },
    },
    watch: {
        type: function (val) {
            this.loadData();
        },
        subtype: function (val) {
            this.loadData();
        },
    },
    methods: {
        loadData: function () {
            this.loading = true;
            const params = {
                group: this.type,
                client: this.client,
            }
            if (this.school !== '') {
                params.school = this.school;
            }
            getSpecialGroupSkill(params).then((res) => {
                this.data = res.data.data.filter(item => item?.mount == this.mount || !item?.mount);
            }).finally(() => {
                this.loading = false;
            });
        },
        loadGroup() {
            getSpecialGroup().then(res => {
                this.types = res.data.data.map(item => {
                    return {
                        ...item,
                        icon: this.icons[item.name],
                        key: item.name
                    }
                }).filter(item => !['chuanci','chuantou','guanti'].includes(item.name));
            })
        },
        getItemLink: function (item) {
            return getLink(item.type || "skill", item.id);
        },
        changeTab: function (item) {
            this.$router.push({
                query: { tab: item.name, subtype: this.subtype },
            });
        },
        iconLink,
        getBelongTo({ school, mount }) {
            return mount ? xfid[mount] : schoolMap[school];
        }
    },
    filters: {
        showXfIcon: function (xf) {
            return xfmap[xf] && iconLink(xfmap[xf]["icon"], this.c);
        },
        authorLink,
        showAvatar,
    },
    mounted: function () {
        this.loadGroup();
        this.loadData();

        // 加载贡献名单
        // getBread(this.contributors).then((ids) => {
        //     if (!ids) return;
        //     getUsers(ids).then((data) => {
        //         this.authors = data || [];
        //     });
        // });

        // 初始化tab
        if (this.$route.query.tab) {
            this.type = this.$route.query.tab;
        }
    },
};
</script>

<style lang="less">
@import "../assets/css/collection.less";
</style>
