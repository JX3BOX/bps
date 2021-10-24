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
                <!-- <el-table-column prop="school_name" label="门派" width="50"></el-table-column> -->
                <el-table-column
                    prop="skill_name"
                    label="技能名称"
                    width="120"
                    :filters="skills"
                    :filter-method="filterHandler"
                ></el-table-column>
                <el-table-column prop="name" label="秘籍名称" sortable>
                    <template slot-scope="scope">
                        <a :href="scope.row.name | getItemLink" class="u-link">
                            <img :src="scope.row.icon | iconLink" class="u-icon" />
                            <span
                                class="u-name"
                                :class="'isQuality-' + scope.row.quality"
                            >{{scope.row.name}}</span>
                        </a>
                    </template>
                </el-table-column>
                <el-table-column prop="Desc" label="秘籍描述">
                    <template slot-scope="scope">
                        <span class="u-desc">{{scope.row.Desc | filterDesc}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="tasks" label="任务来源">
                    <template slot-scope="scope">
                        <span class="u-tasks" v-if="scope.row.tasks && scope.row.tasks.length">
                            <a
                                class="u-task"
                                :href="item.name | getQuestLink"
                                v-for="(item,i) in scope.row.tasks"
                                :key="i"
                                target="_blank"
                            >[{{item.name}}]</a>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="books" label="书籍来源">
                    <template slot-scope="scope">
                        <span class="u-books" v-if="scope.row.books && scope.row.books.length">
                            <a
                                class="u-book"
                                :href="item.name | getItemLink"
                                v-for="(item,i) in scope.row.books"
                                :key="i"
                                target="_blank"
                            >《{{item.name}}》</a>
                        </span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="doodad_template_id" label="碑铭来源">
                    <template slot-scope="scope">
                        <span class="u-doodads" v-if="scope.row.doodad_template_id && scope.row.doodad_template_id.length">
                            <a
                                class="u-book"
                                :href="item.name | getItemLink"
                                v-for="(item,i) in scope.row.doodad_template_id"
                                :key="i"
                                target="_blank"
                            >《{{item.name}}》</a>
                        </span>
                    </template>
                </el-table-column>-->
                <el-table-column prop="exam_print" label="监本" width="100">
                    <template slot-scope="scope">
                        <template v-if="scope.row.exam_print">
                            <span class="u-points">
                                <img src="../assets/img/recipe/exam_points.png" alt />
                                {{scope.row.exam_print}}
                            </span>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { getCheat } from "@/service/node.js";
import { mount_belong_school } from "@jx3box/jx3box-data/data/xf/relation.json";
import { iconLink, extractTextContent } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "RecipeOrigin",
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
                return "通用";
            } else {
                return mount_belong_school[this.mount_name];
            }
        },
        params: function () {
            return {
                school_name: this.school_name,
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
            return this.raw.filter((item) => {
                return item.category != "技能书";
            });
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
            getCheat(this.params)
                .then((res) => {
                    this.raw = res.data;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        // doodadTemplateIdData(row, column, cellValue, index) {
        //     let arr = [];
        //     if (row.doodad_template_id == null) {
        //         return;
        //     }
        //     row.doodad_template_id.forEach((item, index) => {
        //         if (index > 2) {
        //             return;
        //         }
        //         arr.push(item.name);
        //     });
        //     return arr.join(",");
        // },
        filterHandler(value, row, column) {
            return row["skill_name"] === value;
        },
    },
    filters: {
        iconLink,
        getItemLink: function (name) {
            return `/item/#/search/${name}?page=1`;
        },
        filterDesc: function (desc) {
            let text = extractTextContent(desc)[0]["text"];
            text = text.replace(/门派：\S+/, "");
            return text;
        },
        getQuestLink: function (name) {
            return `/quest/#/search/${name}?page=1`;
        },
    },
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
@import "../assets/css/recipe.less";
</style>