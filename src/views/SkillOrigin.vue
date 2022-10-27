<template>
    <div class="v-skill" v-loading="loading">
        <el-tabs v-model="active" type="card" @tab-click="changeType">
            <el-tab-pane label="技能" name="skill">
                <div class="m-skill-box" v-if="skill && schoolName != '通用'">
                    <div class="m-skill-kungfu" v-for="(skills, kungfu) in skill" :key="kungfu">
                        <h4 class="u-title">{{ kungfu }}</h4>
                        <div class="u-list">
                            <skill_item :item="skill" v-for="(skill, i) in skills" :key="i" />
                        </div>
                    </div>
                </div>
                <div class="m-skill-null" v-else>
                    <el-alert title="该心法数据暂缺，请通过侧边栏切换心法" type="info" show-icon></el-alert>
                </div>
            </el-tab-pane>
            <el-tab-pane label="镇派" name="talent">
                <div class="m-skill-box" v-if="talent && schoolName != '通用'">
                    <div class="m-skill-talent" v-for="(talents, talent_group) in talent" :key="talent_group">
                        <el-divider class="u-title" content-position="left">
                            {{ talent_group }}
                        </el-divider>
                        <div class="u-list">
                            <talent_item :item="talent" v-for="(talent, i) in talents" :key="i" />
                        </div>
                    </div>
                </div>
                <div class="m-skill-null" v-else>
                    <el-alert title="该心法数据暂缺，请通过侧边栏切换心法" type="info" show-icon></el-alert>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import _ from "lodash";
import relation_map from "@jx3box/jx3box-data/data/xf/relation.json";
import { getSkill, getTalent } from "@/service/skill";
import skill_item from "@/components/skill/skill_item.vue";
import talent_item from "@/components/skill/talent_item.vue";

export default {
    name: "SkillOrigin",
    props: [],
    data: function () {
        return {
            loading: false,
            skill: "",
            talent: "",
            active: "skill",
        };
    },
    computed: {
        schoolName: function () {
            return relation_map.mount_belong_school[this.xf];
        },
        xf: function () {
            return this.$route.query.subtype;
        },
    },
    methods: {
        changeType: function () {},
        loadData: function () {
            this.loading = true;
            getSkill(this.schoolName, "origin")
                .then((res) => {
                    this.skill = res;
                })
                .catch(() => {
                    this.skill = null;
                })
                .finally(() => {
                    this.loading = false;
                });
            getTalent(this.schoolName, "origin")
                .then((res) => {
                    this.talent = res;
                })
                .catch(() => {
                    this.talent = null;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
    watch: {
        schoolName: {
            immediate: true,
            handler: function () {
                this.loadData();
            },
        },
    },
    components: {
        skill_item,
        talent_item,
    },
};
</script>

<style lang="less" scoped></style>
