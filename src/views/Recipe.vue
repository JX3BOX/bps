<template>
    <AppLayout>
        <div class="m-recipe" v-loading="loading">
            <!-- 搜索 -->
            <div class="m-recipe-search">
                <el-input v-model.trim.lazy="search" placeholder="请输入关键词..">
                    <template slot="prepend"> <i class="el-icon-search"></i> 搜索 </template>
                    <template slot="append">
                        <i class="el-icon-position"></i>
                    </template>
                </el-input>
            </div>
            <!-- 列表 -->
            <div class="m-recipe-list" v-if="data && data.length">
                <el-table
                    :data="data"
                    :default-sort="{ prop: 'name' }"
                    size="small"
                    :loading="loading"
                    @row-click="expandRow"
                    ref="recipeTable"
                >
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="u-expand">
                                <el-form-item
                                    :label="key"
                                    v-for="(val, key) in props.row"
                                    :key="key"
                                    v-show="isNotHidden(key) && hasValidValue(val)"
                                >
                                    <span>{{ props.row[key] }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="SkillName"
                        label="技能名称"
                        width="120"
                        :filters="skills"
                        :filter-method="filterHandler"
                    ></el-table-column>
                    <el-table-column prop="name" label="秘籍名称" sortable width="300">
                        <template slot-scope="scope">
                            <span :href="scope.row.RecipeName | getItemLink" class="u-link">
                                <img :src="scope.row.IconID | iconLink" class="u-icon" />
                                <span class="u-name" :class="'isQuality-' + scope.row.Quality">{{
                                    scope.row.RecipeName
                                }}</span>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Desc" label="秘籍描述" sortable>
                        <template slot-scope="scope">
                            <span class="u-desc">{{ scope.row.Desc }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="exam_print" label="消耗" width="100" sortable>
                        <template slot-scope="scope">
                            <template v-if="scope.row.ExamPrint && !scope.row.TrainValue">
                                <span class="u-points">
                                    <img src="../assets/img/recipe/exam_points.png" alt />
                                    {{ scope.row.ExamPrint }}
                                </span>
                            </template>
                            <template v-if="scope.row.TrainCost">
                                <span class="u-points u-train">
                                    <img src="../assets/img/recipe/train_points.png" alt />
                                    {{ scope.row.TrainCost }}
                                </span>
                            </template>
                            <template v-if="scope.row.TrainValue">
                                <span class="u-points u-train">
                                    <img src="../assets/img/recipe/train_points.png" alt />
                                    {{ scope.row.TrainValue }}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column prop="tasks" label="任务来源">
                        <template slot-scope="scope">
                            <a
                                v-for="task in scope.row.tasks"
                                :key="task.name"
                                :href="task.id | getTaskLink"
                                target="_blank"
                                @click.stop
                            >
                                [{{ task.name }}]
                            </a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="books" label="书籍来源">
                        <template slot-scope="scope">
                            <a
                                v-for="book in scope.row.books"
                                :key="book.name"
                                :href="book.id | getItemLink"
                                target="_blank"
                                @click.stop
                            >
                                [{{ book.name }}]
                            </a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="doodad_template_id" label="碑铭来源">
                        <template slot-scope="scope">
                            <a
                                v-for="doodad in scope.row.doodad_template_id"
                                :key="doodad.name"
                                :href="doodad.id | getDoodadLink"
                                target="_blank"
                                @click.stop
                            >
                                [{{ doodad.name }}]
                            </a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="_remark" label="备注">
                        <template slot-scope="scope">
                            <span>{{ scope.row._remark }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="RecipeName" label="百科">
                        <template slot-scope="scope">
                            <a :href="scope.row.RecipeName | getItemWiki" class="u-link" target="_blank" @click.stop
                                >查看百科&raquo;</a
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </AppLayout>
</template>

<script>
import AppLayout from "@/layout/AppLayout.vue";
import { getRecipe } from "@/service/node.js";
import { mount_belong_school } from "@jx3box/jx3box-data/data/xf/relation.json";
import { iconLink, extractTextContent } from "@jx3box/jx3box-common/js/utils";
import { getLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Recipe",
    props: [],
    components: { AppLayout },
    data: function () {
        return {
            search: "",
            raw: [],
            loading: false,
            hidden_fields: ["idkey", "tasks", "books", "doodad_template_id", "_remark"],

            isInit: true,
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
                client: this.client,
            };
        },
        skills: function () {
            let list = new Set();
            this.data.forEach((item) => {
                list.add(item.SkillName);
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
                return (
                    item.Name &&
                    !!item.SkillID &&
                    !item.RecipeName.includes("废") &&
                    !item.RecipeName.includes("镜像") &&
                    !item.RecipeName.includes("删除") &&
                    !item.RecipeName.includes("复制")
                );
            });
            // 补全技能名称与武功套路
            clean_list = clean_list.map((item) => {
                let re = /《(.*?)·(.*?)》/;
                let name = item.RecipeName.match(re);
                item.SkillName = name && name[2];
                item.KungfuName = name && name[1];
                item.IconID = item.IconID;
                item.Desc = item.Desc;
                item.ExamPrint = item.ExamPrint;
                item.Quality = item.Quality;
                item.BindType = item.BindType;
                item.UiID = item.UiID;
                return item;
            });
            clean_list = clean_list.filter((item) => {
                return item.SkillName;
            });
            return clean_list;
        },
        client: function () {
            return this.$store.state.client || "std";
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
        school_name: {
            handler: function () {
                this.search = "";
                this.isInit = true;
            },
        },
    },
    methods: {
        // 加载秘籍
        loadData: function () {
            this.getRecipe();
        },
        getRecipe: function () {
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
            return row["SkillName"] === value;
        },
        isNotHidden: function (key) {
            return !this.hidden_fields.includes(key);
        },
        hasValidValue(val) {
            return val !== "" && val !== undefined && val !== null;
        },
        expandRow: function (row, column, event) {
            this.$refs.recipeTable.toggleRowExpansion(row);
        },
    },
    filters: {
        iconLink,
        getItemLink: function (id) {
            return getLink("item", id);
        },
        getTaskLink: function (id) {
            return getLink("quest", id);
        },
        getDoodadLink: function (id) {
            return getLink("doodad", id);
        },
        getItemWiki: function (str) {
            return `/item/search/${str}`;
        },
    },
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
@import "../assets/css/recipe.less";
</style>
