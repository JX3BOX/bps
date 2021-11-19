<template>
    <div class="m-archive" v-loading="loading">
        <listbox
            :data="data"
            :total="total"
            :pages="pages"
            :per="per"
            :page="page"
            @appendPage="appendPage"
            @changePage="changePage"
        >
            <!-- 搜索 -->
            <div class="m-archive-search" slot="search-before">
                <a :href="publish_link" class="u-publish el-button el-button--primary">+ 发布作品</a>
                <el-input placeholder="请输入搜索内容" v-model="search" class="input-with-select">
                    <span slot="prepend">关键词</span>
                    <!-- <el-select
                        v-model="searchType"
                        slot="prepend"
                        placeholder="请选择"
                        @change="loadPosts"
                    >
                        <el-option label="标题" value="title"></el-option>
                        <el-option label="作者" value="authorname"></el-option>
                    </el-select>-->
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <template slot="filter">
                <!-- 版本过滤 -->
                <clientBy @filter="filter" :type="client"></clientBy>
                <!-- 角标过滤 -->
                <markBy @filter="filter"></markBy>
                <!-- 资料片 -->
                <!-- <zlpBy @filter="filter" :client="client"></zlpBy> -->
                <!-- 排序过滤 -->
                <orderBy @filter="filter"></orderBy>
            </template>
            <!-- 列表 -->
            <div class="m-archive-list" v-if="data.length">
                <ul class="u-list">
                    <li class="u-item" v-for="(item, i) in data" :key="i">
                        <!-- Banner -->
                        <a class="u-banner" :href="item.ID | postLink" :target="target">
                            <img :src="showBanner(item)" />
                        </a>

                        <h2 class="u-post" :class="{ isSticky: item.sticky }">
                            <img
                                class="u-icon"
                                :src="item.post_subtype | xficon"
                                :alt="item.post_subtype"
                                :title="item.post_subtype"
                            />

                            <!-- 标题文字 -->
                            <a
                                class="u-title"
                                :style="item.color | isHighlight"
                                :href="item.ID | postLink"
                                :target="target"
                            >{{ item.post_title || "无标题" }}</a>

                            <!-- 角标 -->
                            <span class="u-marks" v-if="item.mark && item.mark.length">
                                <i
                                    v-for="mark in item.mark"
                                    class="u-mark"
                                    :key="mark"
                                >{{ mark | showMark }}</i>
                            </span>
                        </h2>

                        <!-- 字段 -->
                        <div class="u-content">
                            <div class="u-metalist u-zlp" v-if="item.post_meta">
                                <strong>版本</strong>
                                <em>{{ item.zlp || item.post_meta.zlp || "全部" }}</em>
                            </div>
                            <div class="u-metalist u-pvmode" v-if="item.post_meta">
                                <strong>方向</strong>
                                <em>
                                    {{
                                    (item.tags && item.tags.join(',')) || item.post_meta.pvmode || "全部"
                                    }}
                                </em>
                            </div>
                        </div>

                        <!-- 作者 -->
                        <div class="u-misc">
                            <img
                                class="u-author-avatar"
                                :src="item.author_info.user_avatar | showAvatar"
                                :alt="item.author_info.display_name"
                            />
                            <a
                                class="u-author-name"
                                :href="item.post_author | authorLink"
                                target="_blank"
                            >{{ item.author_info.display_name }}</a>
                            <span class="u-date">
                                Updated on
                                <time
                                    v-if="order == 'update'"
                                >{{item.post_modified | dateFormat}}</time>
                                <time v-else>{{item.post_date | dateFormat}}</time>
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </listbox>
    </div>
</template>

<script>
import listbox from "@jx3box/jx3box-page/src/cms-list.vue";
import { cms as mark_map } from "@jx3box/jx3box-common/data/mark.json";
import _ from "lodash";
import { getPosts } from "../service/post";
import dateFormat from "../utils/dateFormat";
import {
    __ossMirror,
    __imgPath,
    __ossRoot,
} from "@jx3box/jx3box-common/data/jx3box";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import {
    showAvatar,
    authorLink,
    showBanner,
    publishLink,
    buildTarget,
    getAppType,
} from "@jx3box/jx3box-common/js/utils";
// import zlps from '@/assets/data/zlp.json'
// import zlps from "@jx3box/jx3box-common/data/zlps.json";
// const _zlps = {};
// zlps.forEach((item) => {
//     _zlps[item] = item;
// });
export default {
    name: "list",
    props: [],
    data: function () {
        return {
            loading: false, //加载状态

            data: [], //数据列表
            page: 1, //当前页数
            total: 1, //总条目数
            pages: 1, //总页数
            per: 15, //每页条目
            appendMode: false, //追加模式

            search: "",

            order: "update", //排序模式
            mark: "", //筛选模式
            pvmode: "",
            zlp: "",
            client: this.$store.state.client, //版本选择

            // zlps: _zlps,
            pvmodes: { pve: "PVE", pvp: "PVP", pvx: "PVX" },
            marks: mark_map,
        };
    },
    computed: {
        subtype: function () {
            return this.$store.state.subtype || this.$route.query.subtype;
        },
        resetParams: function () {
            return [
                this.subtype,
                this.search,
                this.mark,
                this.client,
                this.zlp,
            ];
        },
        params: function () {
            let params = {
                per: this.per,
                page: ~~this.page || 1,
            };
            let optionalParams = [
                "subtype",
                "search",
                "mark",
                "client",
                "zlp",
                "order",
            ];
            optionalParams.forEach((item) => {
                if (this[item]) {
                    params[item] = this[item];
                }
            });
            if (this.subtype) {
                params.sticky = 1;
            }
            return params;
        },
        target: function () {
            return buildTarget();
        },
        publish_link: function (val) {
            return publishLink("bps");
        },
    },
    methods: {
        loadPosts: function (i = 1, append = false) {
            this.loading = true;
            getPosts(this.params, this)
                .then((res) => {
                    if (this.appendMode) {
                        this.data = this.data.concat(res.data.data.list);
                    } else {
                        this.data = res.data.data.list;
                    }
                    this.total = res.data.data.total;
                    this.pages = res.data.data.pages;
                })
                .finally(() => {
                    this.appendMode = false;
                    this.loading = false;
                });
        },
        changePage: function (i) {
            this.appendMode = false;
            this.page = i;
            window.scrollTo(0, 0);
        },
        appendPage: function (i) {
            this.appendMode = true;
            this.page = i;
        },
        filter: function (o) {
            this.appendMode = false;
            this[o["type"]] = o["val"];
        },
        showBanner: function (item) {
            let banner = item.post_banner;
            return banner
                ? showBanner(item.post_banner)
                : this.showDefaultBanner(item.post_subtype);
        },
        showDefaultBanner: function (subtype) {
            let img_name = (subtype && xfmap[subtype]?.['id']) || 0;
            return __imgPath + "image/bps_thumbnail/" + img_name + ".png";
        },
    },
    filters: {
        dateFormat: function (val) {
            return dateFormat(new Date(val));
        },
        showAvatar: function (val) {
            return showAvatar(val);
        },
        authorLink: function (val) {
            return authorLink(val);
        },
        postLink: function (val) {
            return location.origin + "/bps/" + val;
        },
        isHighlight: function (val) {
            return val ? `color:${val};font-weight:600;` : "";
        },
        showMark: function (val) {
            return mark_map[val];
        },
        xficon: function (val) {
            if (!val || val == "其它") val = "通用";
            let xf_id = xfmap[val] && xfmap[val]["id"];
            return __imgPath + "image/xf/" + xf_id + ".png";
        },
    },
    watch: {
        subtype: function () {
            this.search = "";
        },
        resetParams: function () {
            this.page = 1;
        },
        client: function () {
            this.zlp = "";
        },
        params: {
            deep: true,
            immediate: true,
            handler: function () {
                this.loadPosts();
            },
        },
        "$route.query.page": function (val) {
            this.page = ~~val;
        },
    },
    created: function () {
        this.page = ~~this.$route.query.page || 1;
    },
    components: {
        listbox,
    },
};
</script>

<style lang="less">
@import "../assets/css/list.less";
</style>
