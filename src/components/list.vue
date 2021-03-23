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
                <a
                    :href="publish_link"
                    class="u-publish el-button el-button--primary"
                >
                    + 发布作品
                </a>
                <el-input
                    placeholder="请输入搜索内容"
                    v-model="search"
                    class="input-with-select"
                >
                    <span slot="prepend">关键词</span>
                    <!-- <el-select
                        v-model="searchType"
                        slot="prepend"
                        placeholder="请选择"
                        @change="loadPosts"
                    >
                        <el-option label="标题" value="title"></el-option>
                        <el-option label="作者" value="authorname"></el-option>
                    </el-select> -->
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <template slot="filter">
                <!-- 版本过滤 -->
                <clientBy @filter="filter" :type="client"></clientBy>
                <menuBy
                    @filter="filter"
                    :data="zlps"
                    type="zlp"
                    placeholder="资料片"
                ></menuBy>
                <markBy
                    @filter="filter"
                    mode="menu"
                    placeholder="精选"
                ></markBy>
                <!-- pvmode -->
                <tagBy @filter="filter" :data="pvmodes" type="pvmode"></tagBy>
                <!-- 排序过滤 -->
                <orderBy @filter="filter"></orderBy>
            </template>
            <!-- 列表 -->
            <div class="m-archive-list" v-if="data.length">
                <ul class="u-list">
                    <li class="u-item" v-for="(item, i) in data" :key="i">
                        <!-- Banner -->
                        <a
                            class="u-banner"
                            :href="item.post.ID | postLink"
                            :target="target"
                            ><img :src="showBanner(item)"
                        /></a>

                        <h2
                            class="u-post"
                            :class="{ isSticky: item.post.sticky }"
                        >
                            <img
                                class="u-icon"
                                :src="item.post.post_subtype | xficon"
                                :alt="item.post.post_subtype"
                                :title="item.post.post_subtype"
                            />

                            <!-- 标题文字 -->
                            <a
                                class="u-title"
                                :style="item.post.color | isHighlight"
                                :href="item.post.ID | postLink"
                                :target="target"
                                >{{ item.post.post_title || "无标题" }}</a
                            >

                            <!-- 角标 -->
                            <span
                                class="u-marks"
                                v-if="item.post.mark && item.post.mark.length"
                            >
                                <i
                                    v-for="mark in item.post.mark"
                                    class="u-mark"
                                    :key="mark"
                                    >{{ mark | showMark }}</i
                                >
                            </span>
                        </h2>

                        <!-- 字段 -->
                        <div class="u-content">
                            <div
                                class="u-metalist u-zlp"
                                v-if="item.post.post_meta"
                            >
                                <strong>版本</strong>
                                <em>{{ item.post.post_meta.zlp || "全部" }}</em>
                            </div>
                            <div
                                class="u-metalist u-pvmode"
                                v-if="item.post.post_meta"
                            >
                                <strong>方向</strong>
                                <em>{{
                                    item.post.post_meta.pvmode || "全部"
                                }}</em>
                            </div>
                        </div>

                        <!-- 作者 -->
                        <div class="u-misc">
                            <img
                                class="u-author-avatar"
                                :src="item.author.avatar | showAvatar"
                                :alt="item.author.name"
                            />
                            <a
                                class="u-author-name"
                                :href="item.author.uid | authorLink"
                                target="_blank"
                                >{{ item.author.name }}</a
                            >
                            <span class="u-date">
                                Updated on
                                <time>{{
                                    item.post.post_modified | dateFormat
                                }}</time>
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
import { mount as mountmap } from "@jx3box/jx3box-data/data/xf/school.json";
// import zlps from '@/assets/data/zlp.json'
import zlps from "@jx3box/jx3box-common/data/zlps.json";
const _zlps = {};
zlps.forEach((item) => {
    _zlps[item] = item;
});
export default {
    name: "list",
    props: [],
    data: function() {
        return {
            loading: false, //加载状态

            data: [], //数据列表
            page: 1, //当前页数
            total: 1, //总条目数
            pages: 1, //总页数
            per: 15, //每页条目
            appendMode: false, //追加模式

            search: "",
            searchType: "title",

            order: "", //排序模式
            mark: "", //筛选模式
            pvmode: "",
            zlp: "",
            client: "",

            zlps: _zlps,
            pvmodes: { pve: "PVE", pvp: "PVP", pvx: "PVX" },
            marks: mark_map,
        };
    },
    computed: {
        subtype: function() {
            return this.$store.state.subtype;
        },
        params: function() {
            let params = {
                per: this.per,
                subtype: this.subtype,
                page: ~~this.page || 1,
            };
            if (this.search) {
                params.search = this.search;
            }
            if (this.order) {
                params.order = this.order;
            }
            if (this.mark) {
                params.mark = this.mark;
            }
            if (this.zlp) {
                params.meta_1 = this.zlp;
            }
            if (this.pvmode) {
                params.meta_2 = this.pvmode;
            }
            if (this.client) {
                params.client = this.client;
            }
            return params;
        },
        target: function() {
            return buildTarget();
        },
        publish_link: function(val) {
            return publishLink("bps");
        },
    },
    methods: {
        loadPosts: function(i = 1, append = false) {
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
                    this.loading = false;
                });
        },
        changePage: function(i) {
            this.appendMode = false;
            this.page = i;
            window.scrollTo(0, 0);
        },
        appendPage: function(i) {
            this.appendMode = true;
            this.page = i;
        },
        filter: function(o) {
            this.appendMode = false;
            this[o["type"]] = o["val"];
        },
        showBanner: function(item) {
            let banner = item.post.post_banner;
            return banner
                ? showBanner(item.post.post_banner)
                : this.showDefaultBanner(item.post.post_subtype);
        },
        showDefaultBanner: function(subtype) {
            let img_name = (subtype && mountmap[subtype]) || 0;
            return __imgPath + "image/bps_thumbnail/" + img_name + ".png";
        },
    },
    filters: {
        dateFormat: function(val) {
            return dateFormat(new Date(val));
        },
        showAvatar: function(val) {
            return showAvatar(val);
        },
        authorLink: function(val) {
            return authorLink(val);
        },
        postLink: function(val) {
            // return "./?pid=" + val;
            return location.origin + "/" + getAppType() + "/" + val;
        },
        isHighlight: function(val) {
            return val ? `color:${val};font-weight:600;` : "";
        },
        showMark: function(val) {
            return mark_map[val];
        },
        xficon: function(val) {
            if (!val || val == "其它") val = "通用";
            let xf_id = xfmap[val] && xfmap[val]["id"];
            return __imgPath + "image/xf/" + xf_id + ".png";
        },
    },
    watch: {
        params: {
            deep: true,
            handler: function() {
                this.loadPosts();
            },
        },
        "$route.query.page": function(val) {
            this.page = ~~val;
        },
    },
    created: function() {
        this.page = ~~this.$route.query.page || 1;
        let query = new URLSearchParams(location.search);
        let client = (this.$route && this.$route.query.client) || query.get("client");
        if(client){
            this.client = client
        }else{
            this.client = 'std'
        }
    },
    components: {
        listbox,
    },
};
</script>

<style lang="less">
@import "../assets/css/list.less";
</style>
