<template>
    <ListLayout>
        <div class="m-archive-box" v-loading="loading">
            <!-- 搜索 -->
            <div class="m-archive-search" slot="search-before">
                <a :href="publish_link" class="u-publish el-button el-button--primary">+ 发布作品</a>
                <el-input placeholder="请输入搜索内容" v-model.trim.lazy="search" clearable @clear="onSearch" @keydown.native.enter="onSearch">
                    <span slot="prepend">
                        <template v-if="client=='std' && isPhone">
                            <el-select v-model="stdClient">
                                <el-option label="电脑" value="std"></el-option>
                                <el-option label="手机" value="wujie"></el-option>
                            </el-select>
                        </template>
                        <template v-else>
                            <i class="el-icon-search"></i> <span class="u-search">关键词</span>
                        </template>
                    </span>
                    <el-button slot="append" icon="el-icon-position" class="u-btn" @click="onSearch"></el-button>
                </el-input>
            </div>

            <!-- 筛选 -->
            <div class="m-archive-filter">
                <div class="m-filter--left">
                    <!-- 版本过滤 -->
                    <clientBy @filter="filterImperceptibly" :type="client" :showWujie="true"></clientBy>

                    <!-- 类型过滤 -->
                    <markBy @filter="filterMeta" :marks="pv_types" type="tag" placeholder="类型"></markBy>

                    <!-- 角标过滤 -->
                    <markBy @filter="filterMeta"></markBy>
                    <!-- 资料片过滤 -->
                    <zlpBy @filter="filterMeta" type="zlp" :client="client"></zlpBy>
                    <!-- 主题过滤 -->
                    <topicBy v-model="topic" :topics="topics" />
                </div>
                <div class="m-filter--right">
                    <!-- 排序过滤 -->
                    <orderBy @filter="filterMeta"></orderBy>
                </div>
            </div>

            <!-- 推荐 -->
            <!-- <rec-table v-if="!search && !subtype" /> -->

            <!-- 列表 -->
            <div class="m-archive-list" v-if="data && data.length">
                <ul class="u-list">
                    <list-item v-for="(item) in data" :key="item.ID" :item="item" :order="order" caller="bps_index_click" />
                </ul>
            </div>

            <!-- 空 -->
            <el-alert v-else class="m-archive-null" title="没有找到相关条目" type="info" center show-icon></el-alert>

            <!-- 下一页 -->
            <el-button
                class="m-archive-more"
                v-show="hasNextPage"
                type="primary"
                @click="appendPage"
                :loading="loading"
                icon="el-icon-arrow-down"
                >加载更多</el-button
            >

            <!-- 分页 -->
            <el-pagination
                class="m-archive-pages"
                background
                layout="total, prev, pager, next, jumper"
                :hide-on-single-page="true"
                :page-size="per"
                :total="total"
                :current-page.sync="page"
                @current-change="changePage"
            ></el-pagination>
        </div>

        <design-task v-model="showDesignTask" :post="currentPost"></design-task>
    </ListLayout>
</template>
<script>
import ListLayout from "@/layout/ListLayout.vue";
import listItem from "@/components/list/list_item.vue";
// import recTable from "@/components/list/rec_table.vue";
import User from "@jx3box/jx3box-common/js/user";
import bus from "@/utils/bus";

import { appKey } from "@/../setting.json";
import { publishLink } from "@jx3box/jx3box-common/js/utils";
import { getPosts } from "@/service/post";
import post_topics from "@jx3box/jx3box-common/data/post_topics.json";
import { reportNow } from "@jx3box/jx3box-common/js/reporter";
import {getDesignLog} from "@/service/design";
import DesignTask from "@jx3box/jx3box-common-ui/src/bread/DesignTask.vue";
export default {
    name: "Index",
    props: [],
    data: function () {
        return {
            loading: false, //加载状态
            data: [], //数据列表

            page: 1, //当前页数
            per: 10, //每页条目
            total: 1, //总条目数
            pages: 1, //总页数
            number_queries: ["per", "page"],

            subtype: "", //子类别
            order: "update", //排序模式
            mark: "", //筛选模式
            client: this.$store.state.client, //版本选择
            search: "", //搜索字串
            zlp: "", //资料片
            tag: "", //标签
            topic: "", // 主题

            pv_types: {
                "PVE": "PVE",
                "PVP": "PVP",
            },

            currentPost: null,
            showDesignTask: false,

            stdClient: "std",
        };
    },
    computed: {
        // 发布按钮链接
        publish_link: function () {
            return publishLink(appKey);
        },
        // 是否显示加载更多
        hasNextPage: function () {
            return this.pages > 1 && this.page < this.total;
        },
        // 请求关联参数
        query: function () {
            return {
                subtype: this.subtype,
                order: this.order,
                mark: this.mark,
                client: this.client == 'std' ? this.stdClient : this.client,
                zlp: this.zlp,
                tag: this.tag,
                topic: this.topic,
            };
        },
        // 分页相关参数
        pg_queries: function () {
            return {
                page: this.page,
                per: this.per,
            };
        },
        // 重置页码参数
        reset_queries: function () {
            return [this.subtype];
        },
        topics: function ({ tag }) {
            if (tag === 'PVE') {
                return post_topics['bps_pve']
            }
            if (tag === 'PVP') {
                return post_topics['bps_pvp']
            }
            return [...new Set([...post_topics['bps_pve'], ...post_topics['bps_pvp']])]
        },
        isPhone: function () {
            return window.innerWidth < 768;
        },
    },
    methods: {
        reporterLink: function (val) {
            const prefix = this.client === 'std' ? 'www' : 'origin'
            return`${prefix}:/${appKey}/` + val;
        },
        onSearch() {
            if (this.page !== 1) {
                this.page = 1;
                return;
            }
            this.loadData();
        },
        // 构建最终请求参数
        buildQuery: function (appendMode) {
            if (appendMode) {
                this.page += 1;
            }
            let _query = {
                per: this.per,
                page: this.page,
            };

            for (let key in this.query) {
                if (this.query[key] !== undefined && this.query[key] !== "" && this.query[key] !== null) {
                    if (key == "search") {
                        _query.search = this.query.search.trim();
                    } else {
                        _query[key] = this.query[key];
                    }
                }
            }
            // 当指定子类别时启用置顶
            if (_query.subtype) {
                _query.sticky = 1;
            }

            if (this.search) {
                _query.search = this.search.trim();
            }

            return _query;
        },
        // 加载数据
        loadData: function (appendMode = false) {
            let query = this.buildQuery(appendMode);
            console.log("[cms-list]", "<loading data>", query);

            this.loading = true;
            return getPosts(query)
                .then(async (res) => {
                    if (appendMode) {
                        this.data = this.data.concat(res.data?.data?.list);
                    } else {
                        this.data = res.data?.data?.list;
                    }
                    this.total = res.data?.data?.total;
                    this.pages = res.data?.data?.pages;

                    reportNow({
                        caller: 'bps_index_load',
                        data: {
                            aggregate: res.data?.data?.list.map(item => this.reporterLink(item.ID)),
                        }
                    });

                    if (User.hasPermission('push_banner') && !this.isPhone) {
                        const ids = this.data.map(item => item.ID);
                        const logs = await getDesignLog({ source_type: 'bps', ids: ids.join(',') }).then(res => res.data.data);

                        this.data = this.data.map(item => {
                            const log = logs.find(log => log.source_id == item.ID) || null;
                            this.$set(item, 'log', log);
                            return item;
                        });
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        // 路由绑定
        replaceRoute: function (extend) {
            return this.$router
                .push({ name: this.$route.name, query: Object.assign({}, this.$route.query, extend) })
                .then(() => {
                    window.scrollTo(0, 0);
                })
                .catch((err) => {});
        },
        // 条件过滤
        filterMeta: function (o) {
            this.replaceRoute({ [o["type"]]: o["val"], page: 1 });
        },
        // 条件过滤（不附加路由）
        filterImperceptibly: function (o) {
            this[o["type"]] = o["val"];
        },
        // 翻页加载
        changePage: function (i) {
            this.loadData();
            this.replaceRoute({ page: i });
        },
        // 追加加载
        appendPage: function () {
            this.loadData(true);
        },
        onTagInput: function (val) {
            this.tag = val;
            this.replaceRoute({ tag: val, page: 1 });
        },
    },
    watch: {
        // 加载路由参数
        "$route.query": {
            deep: true,
            immediate: true,
            handler: function (query) {
                if (Object.keys(query).length) {
                    console.log("[cms-list]", "<route query change>", query);
                    for (let key in query) {
                        // for:element分页组件兼容性问题
                        if (this.number_queries.includes(key)) {
                            this[key] = ~~query[key];
                        } else {
                            this[key] = query[key];
                        }
                    }
                }
            },
        },
        // 重置分页参数
        reset_queries: {
            deep: true,
            handler: function () {
                console.log("[cms-list]", "<reset page>");
                this.page = 1;
            },
        },
        // 监听请求参数
        query: {
            deep: true,
            immediate: true,
            handler: function (query) {
                console.log("[cms-list]", "<request query change>", query);
                this.loadData();
            },
        },
    },
    mounted: function () {
        bus.on("design-task", (post) => {
            this.currentPost = post;
            this.showDesignTask = true;
        });

        this.stdClient = this.isPhone ? 'wujie' : 'std';
    },
    components: {
        listItem,
        ListLayout,
        // recTable,
        DesignTask,
    },
};
</script>

<style lang="less">
@import "~@/assets/css/list.less";
</style>
