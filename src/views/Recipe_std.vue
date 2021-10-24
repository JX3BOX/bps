<template>
    <div class="m-recipe" v-loading="loading">
        <!-- 搜索 -->
        <div class="m-recipe-search">
            <el-input v-model="search" placeholder="请输入关键词..">
                <template slot="prepend">
                    <i class="el-icon-search"></i> 搜索
                </template>
                <template slot="append">
                    <i class="el-icon-position"></i>
                </template>
            </el-input>
        </div>
        <!-- 列表 -->
        <div class="m-recipe-list" v-if="data && data.length">
            <el-table :data="data" :default-sort="{prop:'name'}" size="small">
                <el-table-column
                    prop="skill_name"
                    label="技能名称"
                    width="120"
                    :filters="skills"
                    :filter-method="filterHandler"
                ></el-table-column>
                <el-table-column prop="name" label="秘籍名称" sortable width="300">
                    <template slot-scope="scope">
                        <a :href="scope.row.RecipeName | getItemLink" class="u-link">
                            <img :src="scope.row.recipe_info.IconID | iconLink" class="u-icon" />
                            <span
                                class="u-name"
                                :class="'isQuality-' + scope.row.recipe_extra.Quality"
                            >{{scope.row.RecipeName}}</span>
                        </a>
                    </template>
                </el-table-column>
                <el-table-column prop="Desc" label="秘籍描述">
                    <template slot-scope="scope">
                        <span class="u-desc">{{scope.row.recipe_info.Desc}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="exam_print" label="监本" width="100">
                    <template slot-scope="scope">
                        <template v-if="scope.row.recipe_info.ExamPrint">
                            <span class="u-points">
                                <img src="../assets/img/recipe/exam_points.png" alt />
                                {{scope.row.recipe_info.ExamPrint}}
                            </span>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column prop="op" label="更多" width="120">
                    <el-button plain size="mini" icon="el-icon-view">查看属性</el-button>
                </el-table-column>

                
            </el-table>
        </div>
    </div>
</template>

<script>
import { getRecipe } from "@/service/node.js";
import { mount_belong_school } from "@jx3box/jx3box-data/data/xf/relation.json";
import { iconLink, extractTextContent } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "RecipeStd",
    props: [],
    components: {},
    data: function () {
        return {
            search: "",
            raw: [],
            loading: false,
        };
    },
    computed: {
        mount_name: function () {
            return this.$route.query.subtype || "通用";
        },
        school_name: function () {
            if (this.mount_name == "通用") {
                return "江湖";
            } else {
                return mount_belong_school[this.mount_name];
            }
        },
        params: function () {
            return {
                school: this.school_name,
                search: this.search,
            };
        },
        skills: function () {
            let list = new Set();
            this.data.forEach((item) => {
                list.add(item.skill_name);
            });
            list = [...list];
            list = list.map((item) => {
                return { text: item, value: item };
            });
            return list;
        },
        data: function () {
            // 过滤废弃数据
            let clean_list = this.raw.filter((item) => {
                return item.recipe_info && item.recipe_extra && item.recipe_extra.Quality
            })
            // 补全技能名称与武功套路
            return clean_list.map((item) => {
                let re = /《(.*?)·(.*?)》/
                let name = item.RecipeName.match(re)
                item.skill_name = name && name[2]
                item.kungfu_name = name && name[1]
                return item
            })
        },
    },
    watch: {
        params: {
            deep: true,
            immediate: true,
            handler: function () {
                this.loadData();
            },
        },
    },
    methods: {
        // 加载秘籍
        loadData: function () {
            this.loading = true;
            getRecipe(this.params)
                .then((res) => {
                    this.raw = res.data;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        filterHandler(value, row, column) {
            return row["skill_name"] === value;
        },
    },
    filters: {
        iconLink,
        getItemLink: function (name) {
            return `/item/#/search/${name}?page=1`;
        },
    },
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
@import "../assets/css/recipe.less";
</style>