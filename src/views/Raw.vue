<template>
    <div class="v-raw" v-loading="loading">
        <el-tabs v-model="kungfuid" type="card" @tab-click="changeKungfu">
            <el-tab-pane v-if="~~mountid" label="心法被动" name="pasv" key="pasv"></el-tab-pane>
            <el-tab-pane
                :label="kungfu | showKungfuName"
                :name="kungfu"
                v-for="kungfu in kungfus"
                :key="kungfu"
            ></el-tab-pane>
            <template v-if="~~mountid">
                <el-tab-pane label="奇穴" name="talent" key="talent" v-if="client === 'std'"></el-tab-pane>
                <el-tab-pane label="镇派" name="talent2" key="talent2" v-if="client === 'origin'"></el-tab-pane>
                <el-tab-pane label="阵法" name="zhenfa" key="zhenfa"></el-tab-pane>
            </template>
        </el-tabs>

        <!-- 搜索 -->
        <!-- <div class="m-raw-search m-archive-search">
            <el-input
                placeholder="搜索关键词"
                v-model="search"
                class="input-with-select"
                @change="loadSkills"
            >
                <template slot="prepend">技能名</template>
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>-->

        <ul class="m-resource-list" v-if="data && data.length">
            <template v-if="kungfuid === 'talent'">
                <el-collapse>
                    <el-collapse-item
                        v-for="(item, index) in data"
                        :key="item.SkillID"
                        :title="num2zh(index)"
                        :name="index"
                    >
                        <li v-for="(o, i) in item" class="u-item" :key="i">
                            <span class="u-id">ID:{{ o.SkillID }}</span>
                            <img
                                class="u-pic"
                                :title="'IconID:' + o.IconID"
                                :src="o.IconID | iconURL"
                            />
                            <div class="u-primary">
                                <a
                                    class="u-name"
                                    :href="o.SkillID | skillLink"
                                    target="_blank"
                                >
                                    {{ o.Name }}
                                    <em v-if="o.SkillName"
                                        >({{ o.SkillName }})</em
                                    >
                                </a>
                                <span class="u-content">{{
                                    o.Desc | filterRaw
                                }}</span>
                                <div class="u-remarks">
                                    <span class="u-remark"
                                        >Level : {{ o.Level }}</span
                                    >
                                    <span class="u-remark"
                                        >Remark : {{ o.Remark }}</span
                                    >
                                    <span v-if="o.HelpDesc" class="u-remark"
                                        >HelpDesc : {{ o.HelpDesc }}</span
                                    >
                                    <span v-if="o.SimpleDesc" class="u-remark"
                                        >SimpleDesc : {{ o.SimpleDesc }}</span
                                    >
                                    <span v-if="o.SpecialDesc" class="u-remark"
                                        >SpecialDesc : {{ o.SpecialDesc }}</span
                                    >
                                </div>
                            </div>
                        </li>
                    </el-collapse-item>
                </el-collapse>
            </template>
            <template v-else>
                <li v-for="(o, i) in data" class="u-item" :key="i">
                    <span class="u-id">ID:{{ o.SkillID }}</span>
                    <img
                        class="u-pic"
                        :title="'IconID:' + o.IconID"
                        :src="o.IconID | iconURL"
                    />
                    <div class="u-primary">
                        <a
                            class="u-name"
                            :href="o.SkillID | skillLink"
                            target="_blank"
                        >
                            {{ o.Name }}
                            <em v-if="o.SkillName">({{ o.SkillName }})</em>
                        </a>
                        <span class="u-content">{{ o.Desc | filterRaw }}</span>
                        <div class="u-remarks">
                            <span class="u-remark">Level : {{ o.Level }}</span>
                            <span class="u-remark"
                                >Remark : {{ o.Remark }}</span
                            >
                            <span v-if="o.HelpDesc" class="u-remark"
                                >HelpDesc : {{ o.HelpDesc }}</span
                            >
                            <span v-if="o.SimpleDesc" class="u-remark"
                                >SimpleDesc : {{ o.SimpleDesc }}</span
                            >
                            <span v-if="o.SpecialDesc" class="u-remark"
                                >SpecialDesc : {{ o.SpecialDesc }}</span
                            >
                        </div>
                    </div>
                </li>
            </template>
        </ul>
        <el-alert
            v-else
            class="m-archive-null"
            title="没有找到相关条目"
            type="info"
            center
            show-icon
        ></el-alert>
    </div>
</template>

<script>
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import { getSkills } from "../service/raw";
import { __iconPath, __ossRoot } from "@jx3box/jx3box-common/data/jx3box.json";
import cloneDeep from 'lodash/cloneDeep'
import { getLink } from "@jx3box/jx3box-common/js/utils";
import kungfumap_std from "@/assets/data/kungfu_std.json";
import kungfumap_origin from "@/assets/data/kungfu_origin.json";
import pasvmap from "@/assets/data/pasv.json";
import zhenfamap from "@/assets/data/zhenfa.json";
import kungfus from "@/assets/data/kungfuid.json";
import talent from "@/assets/data/talent.json";
import talent2 from "@/assets/data/talent2.json";
export default {
    name: "Raw",
    props: [],
    data: function () {
        return {
            data: [],
            loading: false,

            kungfuid: "pasv",
            search: "",
        };
    },
    computed: {
        subtype: function () {
            return this.$route.query.subtype || "通用";
        },
        mountid: function () {
            return xfmap[this.subtype]?.["id"] || "0";
        },
        kungfus: function () {
            return this.kungfumap[this.mountid]["kungfus"];
        },
        skill_ids: function () {
            return this.kungfumap[this.mountid]["skills"][this.kungfuid];
        },
        pasv_skills: function () {
            return pasvmap[this.subtype][this.client];
        },
        zhenfa_skills: function () {
            return this.mountid && zhenfamap[this.mountid] || [];
        },
        talent_skills: function () {
            return this.mountid && talent[this.mountid] || [];
        },
        talent2_skills: function (){
            return this.mountid && talent2[this.mountid] || []
        },
        ids: function () {
            let skills = {
                pasv: this.pasv_skills,
                zhenfa: this.zhenfa_skills,
                talent: this.talent_skills.flat(),
                talent2: this.talent2_skills.flat(),
            };
            return skills[this.kungfuid]
                ? skills[this.kungfuid]?.join(",")
                : this.skill_ids?.join(",");
        },
        client: function () {
            return this.$store.state.client || "std";
        },
        params: function () {
            return {
                ids: this.ids,
                client: this.client,
            };
        },
        kungfumap: function () {
            return this.client == "origin" ? kungfumap_origin : kungfumap_std;
        },
    },
    methods: {
        loadSkills: function () {
            this.loading = true;
            getSkills(this.params)
                .then((res) => {
                    let data = res.data || [];
                    if (this.kungfuid == "zhenfa") {
                        this.data = data;
                    } else if (this.kungfuid === "talent") {
                        this.data = this.handleTalentData(data);
                    } else {
                        this.data = this.removeLowLevelSkills(data);
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        changeKungfu: function () {},
        removeLowLevelSkills: function (data) {
            let arr = [];
            let _data = [];
            // 只保留最高等级
            data.forEach((item) => {
                if (!arr.includes(item.SkillID)) {
                    arr.push(item.SkillID);
                    _data.push(item);
                } else {
                    let i = arr.indexOf(item.SkillID);
                    if (~~item.Level > ~~_data[i].Level) {
                        _data[i] = item;
                    }
                }
            });
            return _data;
        },
        handleTalentData: function (data) {
            const skills = {
                talent: this.talent_skills,
                // talent2: this.talent2_skills
            }
            const talentSkills = cloneDeep(skills[this.kungfuid])
            return talentSkills.map((item) => {

                return item.map((SkillID) => {
                    
                    const currentTalent = data.find((d) => d.SkillID == SkillID);

                    return currentTalent;
                });
            });

        },
        num2zh: function (num) {
            const zh = [
                "一",
                "二",
                "三",
                "四",
                "五",
                "六",
                "七",
                "八",
                "九",
                "十",
                "十一",
                "十二",
            ];
            return `第${zh[num]}层`;
        },
    },
    filters: {
        filterRaw: function (str) {
            str = str && str.replace(/\\n/g, "\n");
            str = str && str.replace(/(\<TALENT.*?\>)/g, "\n$1");
            str = str && str.replace(/(\<EnchantID.*?\>)/g, "\n$1");
            return str;
        },
        iconURL: function (id) {
            return __iconPath + "icon/" + id + ".png";
        },
        skillLink: function (id) {
            return getLink("skill", id);
        },
        showKungfuName: function (val) {
            return kungfus[val];
        },
    },
    watch: {
        subtype: {
            immediate: true,
            handler: function () {
                // this.kungfuid = this.kungfus[0];
                this.kungfuid = 'pasv'
                this.loadSkills();
            },
        },
        kungfuid: {
            immediate: true,
            handler: function (val) {
                this.loadSkills();
            },
        },
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/raw.less";
</style>
