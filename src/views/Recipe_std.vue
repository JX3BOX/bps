<template>
    <div class="m-recipe" v-loading="loading">
        <!-- 搜索 -->
        <div class="m-recipe-search">
            <el-input v-model="search" placeholder="请输入关键词.." @input="handleSearch">
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
            <el-table :data="data" :default-sort="{prop:'name'}" size="small" :loading="loading">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="u-expand">
                            <el-form-item
                                :label="key"
                                v-for="(val,key) in props.row"
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
                        <a :href="scope.row.RecipeName | getItemLink" class="u-link">
                            <img :src="scope.row.IconID | iconLink" class="u-icon" />
                            <span
                                class="u-name"
                                :class="'isQuality-' + scope.row.Quality"
                            >{{scope.row.RecipeName}}</span>
                        </a>
                    </template>
                </el-table-column>
                <el-table-column prop="Desc" label="秘籍描述">
                    <template slot-scope="scope">
                        <span class="u-desc">{{scope.row.Desc}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="exam_print" label="监本" width="100">
                    <template slot-scope="scope">
                        <template v-if="scope.row.ExamPrint">
                            <span class="u-points">
                                <img src="../assets/img/recipe/exam_points.png" alt />
                                {{scope.row.ExamPrint}}
                            </span>
                        </template>
                    </template>
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
            hidden_fields: ["idkey"],

            isInit: true
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
                return item.Name && !!item.SkillID && !item.RecipeName.includes('废') && !item.RecipeName.includes('镜像') && !item.RecipeName.includes('删除') && !item.RecipeName.includes('复制')
            })
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
                return item.SkillName
            })
            return clean_list
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
            handler: function (){
                this.search = ""
                this.isInit = true
            }
        }
    },
    methods: {
        // 加载秘籍
        loadData: function () {
            this.loading = true;
            let cache = sessionStorage.getItem(
                `bps-recipe-${this.school_name}`
            );
            if (cache) {
                try {
                    this.raw = JSON.parse(cache);
                    this.loading = false;
                } catch (e) {
                    this.getRecipe();
                }
            } else {
                this.getRecipe();
            }
        },
        getRecipe: function () {
            getRecipe(this.params)
                .then((res) => {
                    this.raw = res.data;
                    if (this.isInit) {
                        sessionStorage.setItem(
                            `bps-recipe-${this.school_name}`,
                            JSON.stringify(this.raw)
                        );
                        this.isInit = false
                    }
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
        // 搜索
        handleSearch: function (val){
            if (!val) {
                this.loadData()
            } else {
                this.loading = true
                this.getRecipe()
            }
        }
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