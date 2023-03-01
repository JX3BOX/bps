<template>
    <AppLayout>
        <div class="m-dps" v-loading="loading">
            <!-- 搜索 -->
            <div class="m-dps-search">
                <el-input v-model.trim.lazy="search" placeholder="请输入关键词..">
                    <template slot="prepend"> <i class="el-icon-search"></i> 搜索 </template>
                    <template slot="append">
                        <i class="el-icon-position"></i>
                    </template>
                </el-input>
            </div>
            <!-- 表格 -->
            <div class="m-dps-list">
                <el-table :data="list" empty-text="没有找到对应的DPS计算器，请重新搜索" @cell-click="openLink">
                    <el-table-column
                        label="心法"
                        :filters="options.mount_filters"
                        :filter-method="filterMatchValue"
                        column-key="mount"
                        :filter-multiple="true"
                    >
                        <template slot-scope="scope">
                            <div class="u-xf">
                                <img class="u-xf-icon" :src="showMountIcon(scope.row.mount)" /><span
                                    class="u-xf-name"
                                    >{{ showMountName(scope.row.mount) }}</span
                                >
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column label="名称" prop="name" sortable>
                        <template slot-scope="scope">
                            <span class="u-client" :class="'i-client-' + scope.row.client">{{
                                showClientLabel(scope.row.client)
                            }}</span>
                            <i class="u-star" v-if="scope.row.star">★ 编辑推荐</i>
                            <a class="u-name" :href="scope.row.url" target="_blank">{{ scope.row.name }}</a>
                        </template>
                    </el-table-column>

                    <el-table-column label="作者" prop="user" sortable>
                        <template slot-scope="scope" v-if="scope.row.user">
                            <a class="u-user" :href="authorLink(scope.row.user.ID)" target="_blank" @click.stop="">
                                <img class="u-img" :src="showAvatar(scope.row.user.user_avatar)" />
                                <span class="u-author">{{ scope.row.user.display_name }}</span>
                            </a>
                            <a
                                class="u-user"
                                :href="authorLink(contributor.ID)"
                                target="_blank"
                                @click.stop=""
                                v-for="contributor in scope.row.contributors"
                                :key="contributor.ID"
                            >
                                <img class="u-img" :src="showAvatar(contributor.user_avatar)" />
                                <span class="u-author">{{ contributor.display_name }}</span>
                            </a>
                        </template>
                    </el-table-column>

                    <el-table-column
                        label="计算器类型"
                        :filters="options.type_filters"
                        :filter-method="filterMatchValue"
                        :filter-multiple="true"
                        column-key="type"
                    >
                        <template slot-scope="scope">
                            <span class="u-type">
                                <img :src="getTypeIcon(scope.row.type)" :alt="scope.row.type" />
                                {{ showTypeLabel(scope.row.type) }}
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </AppLayout>
</template>

<script>
import AppLayout from "@/layout/AppLayout.vue";
import { getDpsList } from "@/service/helper.js";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import xfids from "@jx3box/jx3box-data/data/xf/xfid.json";
import { __imgPath, __Domain, __Origin } from "@jx3box/jx3box-common/data/jx3box";
import { showAvatar, authorLink, showMountIcon, showClientLabel } from "@jx3box/jx3box-common/js/utils";
import { map as each } from "lodash";
import types from "@/assets/data/dps_types.json";
export default {
    name: "Dps",
    components: { AppLayout },
    data: function () {
        return {
            loading: false, //加载状态

            search: "",

            options: {
                mount_filters: each(xfmap, (item, label) => {
                    return {
                        text: label,
                        value: item.id,
                    };
                }),
                client_filters: [
                    { value: "std", text: "重制" },
                    { value: "origin", text: "缘起" },
                    { value: "all", text: "双端" },
                ],
                type_filters: each(types, (label, key) => {
                    return { value: key, text: label };
                }),
            },

            list: [],
        };
    },
    computed: {
        //提交查询参数
        params: function () {
            return {
                name: this.search,
            };
        },
    },
    methods: {
        // 数据模块
        // ==========================
        // 获取数据
        getData() {
            this.loading = true;
            getDpsList(this.params)
                .then((res) => {
                    this.list = res?.data?.data || [];
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        // 过滤模块
        // ==========================
        filterMatchValue: function (value, row, column) {
            return value == row[column.columnKey];
        },

        // 分页模块
        // ==========================

        // 其它
        // ==========================
        showMountName: function (mount_id) {
            return xfids[mount_id];
        },
        openLink(row) {
            window.open(row.url);
        },
        showMountIcon,
        showAvatar,
        authorLink,
        showClientLabel,
        showTypeLabel: function (val) {
            return types[val];
        },
        getTypeIcon: function (val) {
            return require(`@/assets/img/dps/${val}.svg`);
        },
    },
    watch: {
        search(val) {
            this.getData();
        },
    },
    created: function () {
        this.getData();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/dps.less";
</style>