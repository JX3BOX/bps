<template>
    <div class="m-collection-box" v-loading="loading">
        <!-- 搜索 -->
        <div class="m-archive-search m-collection-search">
            <a :href="publish_link" class="u-publish el-button el-button--primary">+ 创建小册</a>
            <el-input placeholder="请输入搜索内容" v-model.trim.lazy="search" class="input-with-select" clearable @clear="onSearch" @keydown.native.enter="onSearch">
                <template #prepend> <i class="el-icon-search"></i> 搜索 </template>
                <template #append>
                    <el-button icon="el-icon-position" class="u-btn" @click="onSearch"></el-button>
                </template>
            </el-input>
        </div>
        <!-- 列表 -->
        <div class="m-collection-list" v-if="data && data.length">
            <div v-for="(item, i) in data" :key="i">
                <collection-item :data="item" />
            </div>
        </div>
        <!-- 空 -->
        <el-alert class="m-collection-null" v-else title="没有找到相关条目" type="info" show-icon></el-alert>
        <!-- 分页 -->
        <el-pagination
            class="m-collection-pagination"
            background
            :page-size="per"
            :hide-on-single-page="true"
            :current-page.sync="page"
            layout="total, prev, pager, next, jumper"
            :total="total"
            @current-change="skipTop"
        ></el-pagination>
    </div>
</template>

<script>
import { publishLink } from "@jx3box/jx3box-common/js/utils";
import collection_item from "./collection_item.vue";
import { getCollections } from "@/service/helper.js";
export default {
    name: "CollectionList",
    props: [],
    components: {
        "collection-item": collection_item,
    },
    data: function () {
        return {
            loading: false, //加载状态

            data: [], //数据列表
            page: 1, //当前页数
            total: 1, //总条目数
            pages: 1, //总页数
            per: 10, //每页条目
            search: "",
        };
    },
    computed: {
        // 发布按钮链接
        publish_link: function () {
            return publishLink("collection");
        },
        params: function () {
            return {
                page: this.page,
                limit: this.per,
            };
        },
    },
    methods: {
        skipTop: function () {
            window.scrollTo(0, 0);
        },
        loadData: function () {
            this.loading = true;
            const params = {
                ...this.params,
                keyword: this.search,
            }
            getCollections(params)
                .then((res) => {
                    this.data = res?.data?.data?.data;
                    this.total = res?.data?.data?.total;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        onSearch() {
            if (this.page !== 1) {
                this.page = 1;
                return
            }
            this.loadData();
        }
    },
    watch: {
        params: {
            immediate: true,
            deep: true,
            handler: function () {
                this.loadData();
            },
        },
    },
};
</script>
