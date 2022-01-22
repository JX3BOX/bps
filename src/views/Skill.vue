<template>
    <div class="v-skill" v-loading="loading">
        <el-tabs v-model="active" type="card" @tab-click="changeType">
            <el-tab-pane label="技能" name="skill">
                <div class="m-skill-box" v-if="skill">
                    <div class="m-skill-kungfu" v-for="(kungfu, i) in skill" :key="i">
                        <h4 class="u-title">{{ kungfu.remark }}</h4>
                        <div class="u-list">
                            <skill_item :item="item" v-for="(item, i) in kungfu.forceSkills" :key="i" />
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="奇穴" name="talent">
                <div class="m-skill-box" v-if="talent && xf != '通用'">
                    <div class="m-skill-talent" v-for="(talent, i) in talent" :key="i">
                        <el-divider class="u-title" content-position="left">
                            {{ talent.level_name }}
                        </el-divider>
                        <div class="u-list">
                            <talent_item :item="item" v-for="(item, i) in talent.kungfuSkills" :key="'kungfu-' + i" />
                            <talent_item :item="item" v-for="(item, i) in talent.forceSkills" :key="'force-' + i" :force="true" />
                        </div>
                    </div>
                </div>
                <div class="m-skill-null" v-else>
                    <el-alert title="无通用奇穴，请通过侧边栏切换心法" type="info" show-icon></el-alert>
                </div>
            </el-tab-pane>
            <el-tab-pane label="阵法" name="zhenfa">
                <div class="m-skill-box" v-if="zhenfa && xf != '通用'">
                    <div class="m-skill-zhenfa" v-if="zhenfa">
                        <i class="u-pic">
                            <img :src="zhenfa.icon.FileName" />
                        </i>
                        <h4 class="u-title">{{ zhenfa.skillName }}</h4>
                        <div class="u-descs">
                            <div class="u-desc" v-for="(z, i) in zhenfa.descs" :key="i">
                                <em>{{ z.name }}</em>
                                <span>{{ z.desc }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="m-skill-null" v-else>
                    <el-alert title="无通用阵法，请通过侧边栏切换心法" type="info" show-icon></el-alert>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { getSkill, getTalent } from "@/service/skill";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import levels from "../assets/data/levels.json";
import _ from "lodash";
import skill_item from "@/components/skill/skill_item.vue";
import talent_item from "@/components/skill/talent_item.vue";
const TALENT_TOTAL_LEVELS = 12;
export default {
    name: "Skill",
    props: [],
    data: function() {
        return {
            loading: false,
            skill: "",
            talent: "",
            zhenfa: "",
            active: "skill",
        };
    },
    computed: {
        xf: function() {
            return this.$route.query.subtype || "通用";
        },
        kfid: function() {
            return xfmap[this.xf]["kungfuId"];
        },
    },
    methods: {
        changeType: function() {},
        loadData: function() {
            this.loading = true;
            getSkill(this.xf)
                .then((data) => {
                    let skillGroup = data
                    if (skillGroup && Array.isArray(skillGroup) && skillGroup.length) {
                        skillGroup.forEach((group) => {
                            if (group.kungfuId == this.kfid) {
                                this.skill = group.remarks;
                                this.zhenfa = group.zhenFa;
                            }
                        });
                    }
                })
                .finally(() => {
                    this.loading = false;
                });

            getTalent(this.xf)
                .then((data) => {
                    let talentGroup = data
                    if (talentGroup && Array.isArray(talentGroup) && talentGroup.length) {
                        talentGroup.forEach((group) => {
                            if (group.kungfuId == this.kfid) {
                                let _talent = group.kungfuLevel;
                                let _arr = new Array(TALENT_TOTAL_LEVELS);
                                _talent.forEach((item) => {
                                    item.level_name = levels[item.level - 1];
                                    _arr[item.level - 1] = item;
                                });
                                this.talent = _arr;
                            }
                        });
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
    created: function() {},
    watch: {
        xf: {
            immediate: true,
            handler: function() {
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

<style lang="less">
@import "../assets/css/skill.less";
</style>
