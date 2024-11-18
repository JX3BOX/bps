<template>
    <AppLayout>
        <div class="v-raw" v-loading="loading">
            <div class="m-header">
                <el-radio-group v-model="platform" v-if="client == 'std'">
                    <el-radio-button label="std">旗舰</el-radio-button>
                    <el-radio-button label="wujie">无界</el-radio-button>
                </el-radio-group>
                <el-tabs v-model="kungfuid" type="card">
                    <el-tab-pane v-if="~~mountid" label="心法被动" name="pasv" key="pasv"></el-tab-pane>
                    <el-tab-pane
                        v-for="(kungfu, index) in kungfus"
                        :label="kungfu"
                        :name="kungfu"
                        :key="index"
                    ></el-tab-pane>
                    <template v-if="~~mountid">
                        <el-tab-pane label="奇穴" name="talent" key="talent" v-if="client === 'std'"></el-tab-pane>
                        <el-tab-pane label="镇派" name="talent2" key="talent2" v-if="client === 'origin'"></el-tab-pane>
                        <el-tab-pane v-if="panel.zhenfa?.length" label="阵法" name="zhenfa" key="zhenfa"></el-tab-pane>
                    </template>
                </el-tabs>
            </div>

            <ul class="m-resource-list" v-if="skills && skills.length">
                <template v-if="['talent', 'talent2'].includes(kungfuid)">
                    <el-collapse v-model="collapses">
                        <el-collapse-item
                            v-for="(item, index) in data"
                            :key="kungfuid + index"
                            :title="num2zh(index)"
                            :name="index"
                        >
                            <template v-for="(o, i) in item">
                                <li v-if="o" class="u-item" :key="i">
                                    <span class="u-id">ID:{{ o.SkillID }}</span>
                                    <img class="u-pic" :title="'IconID:' + o.IconID" :src="getIconURL(o.IconID)" />
                                    <div class="u-primary">
                                        <a class="u-name" :href="o.SkillID | skillLink" target="_blank">
                                            {{ o.Name }}
                                            <em v-if="o.SkillName">({{ o.SkillName }})</em>
                                        </a>
                                        <span class="u-content">
                                            <template v-if="o?.parse?.desc">
                                                <span>{{ o?.parse?.desc | filterRaw }}</span
                                                ><br />
                                                <span>{{ o?.parse?.talent_desc | filterRaw }}</span>
                                            </template>
                                            <template v-else>
                                                <span>{{ o.Desc | filterRaw }}</span>
                                            </template>
                                        </span>
                                        <div class="u-remarks">
                                            <span class="u-remark">Level : {{ o.Level }}</span>
                                            <span class="u-remark">Remark : {{ o.Remark }}</span>
                                            <span v-if="o.HelpDesc" class="u-remark">HelpDesc : {{ o.HelpDesc }}</span>
                                            <span v-if="o.SimpleDesc" class="u-remark"
                                                >SimpleDesc : {{ o.SimpleDesc }}</span
                                            >
                                            <span v-if="o.SpecialDesc" class="u-remark"
                                                >SpecialDesc : {{ o.SpecialDesc }}</span
                                            >
                                        </div>
                                    </div>

                                    <!-- <skill-wiki
                                        :wiki="wikis[o.SkillID]"
                                        :key="kungfuid + o.SkillID"
                                        :sourceId="o.SkillID"
                                    /> -->
                                </li>
                            </template>
                        </el-collapse-item>
                    </el-collapse>
                </template>
                <template v-else>
                    <li v-for="(o, i) in skills" class="u-item" :key="i">
                        <span class="u-id" v-if="o">ID:{{ o.SkillID }}</span>
                        <img class="u-pic" :title="'IconID:' + o.IconID" :src="getIconURL(o.IconID)" />
                        <div class="u-primary">
                            <a class="u-name" :href="o.SkillID | skillLink" target="_blank">
                                {{ o.Name }}
                                <em v-if="o.SkillName">({{ o.SkillName }})</em>
                            </a>
                            <span class="u-content">
                                <template v-if="o?.parse?.desc">
                                    <span>{{ o?.parse?.desc | filterRaw }}</span
                                    ><br />
                                    <span>{{ o?.parse?.talent_desc | filterRaw }}</span>
                                </template>
                                <template v-else>
                                    <span>{{ o.Desc | filterRaw }}</span>
                                </template>
                            </span>
                            <div class="u-remarks">
                                <span class="u-remark">Level : {{ o.Level }}</span>
                                <span class="u-remark">Remark : {{ o.Remark }}</span>
                                <span v-if="o.HelpDesc" class="u-remark">HelpDesc : {{ o.HelpDesc }}</span>
                                <span v-if="o.SimpleDesc" class="u-remark">SimpleDesc : {{ o.SimpleDesc }}</span>
                                <span v-if="o.SpecialDesc" class="u-remark">SpecialDesc : {{ o.SpecialDesc }}</span>
                            </div>
                        </div>
                    </li>
                </template>
            </ul>
            <el-alert v-else class="m-archive-null" title="没有找到相关条目" type="info" center show-icon></el-alert>
        </div>
    </AppLayout>
</template>

<script>
import AppLayout from "@/layout/AppLayout.vue";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import { getSkills, getTalents, getTalents2, getTalent2List } from "../service/raw";
import { __iconPath, __ossRoot } from "@jx3box/jx3box-common/data/jx3box.json";
import { getLink } from "@jx3box/jx3box-common/js/utils";
import { getKungfuPanel } from "@/service/node";

export default {
    name: "Raw",
    components: {
        AppLayout,
    },
    props: [],
    data: function () {
        return {
            panel: {
                pasv: [],
                zhenfa: [],
                kungfus: {},
            },

            platform: "std",
            // 奇穴使用旧逻辑
            data: [],
            loading: false,
            // 默认展开全部
            collapses: Array.from({ length: 12 }, (_, k) => k),

            kungfuid: "pasv",
            search: "",

            wikis: {},
            talents: null,
            talent_wujie: null,
            talents2: null,
        };
    },
    computed: {
        skills() {
            if (["talent", "talent2"].includes(this.kungfuid)) {
                return this.data;
            } else if (["pasv", "zhenfa"].includes(this.kungfuid)) {
                return this.panel[this.kungfuid].filter(Boolean);
            } else {
                const kungfu_name = this.kungfuid || this.kungfus[0];
                return this.panel.kungfus[kungfu_name].filter(Boolean);
            }
        },
        subtype: function () {
            return this.$route.query.subtype || "通用";
        },
        mountid: function () {
            return xfmap[this.subtype]?.["id"] || 0;
        },
        kungfus: function () {
            return Object.keys(this.panel.kungfus || {});
        },
        client: function () {
            return this.$store.state.client || "std";
        },
    },
    methods: {
        loadTalentSkills() {
            const talent_map = {
                std: this.talents,
                origin: this.talents2,
                wujie: this.talent_wujie,
            };
            if (!this.mountid || !this.talents || !this.talents2) return;
            const mountid = this.mountid;

            const talent_ids =
                this.client == "std" && this.platform == "wujie"
                    ? talent_map.wujie[mountid]
                    : talent_map[this.client][mountid];
            const talents_struct = talent_ids;
            const ids = talents_struct.flat(3);

            this.loading = true;
            getSkills({ ids: ids.join(","), client: this.client })
                .then((res) => {
                    const data = res.data;
                    this.data = talents_struct.map((group) =>
                        group
                            .map((skill_id) => {
                                const skills = data.filter((item) => item.SkillID == skill_id);
                                return skills.length > 1 ? skills.filter((skill) => skill.Level != 0) : skills;
                            })
                            .flat()
                    );
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        loadPanel() {
            // 预留无界、但是还没写
            const client = this.platform == "wujie" ? "wujie" : this.$store.state.client;
            getKungfuPanel({ mount_id: this.mountid, client }).then((res) => {
                const data = res.data.data;
                if (client == "wujie") {
                    if (this.mountid) {
                        let pasv_item = data.find(
                            (item) => item.kungfu_id == -1 && Object.keys(item.ui_tab?.tbExtraDescText || {}).length
                        );
                        // 有的没有描述 奇怪
                        if (!pasv_item) {
                            pasv_item = data.find((item) => item.kungfu_id == -1);
                        }
                        const desc = Object.values(pasv_item.ui_tab?.tbExtraDescText || {}).pop() || "";
                        const pasv_skill = {
                            ...pasv_item.skill,
                        };
                        if (pasv_skill.parse) {
                            pasv_skill.parse.desc += "\n" + desc;
                        }
                        this.panel.pasv = [pasv_skill];
                        this.panel.zhenfa = [];
                    }

                    const kungfus = data
                        .filter((item) => item.kungfu_id >= 0 && item.skill.IconID)
                        .reduce((acc, cur) => {
                            const kungfu_name = cur.kungfu_name;
                            if (!acc[kungfu_name]) acc[kungfu_name] = [];
                            if (!Array.isArray(cur.skill)) {
                                acc[kungfu_name].push(cur.skill);
                            } else {
                                acc[kungfu_name].push(...cur.skill);
                            }
                            return acc;
                        }, {});
                    this.panel.kungfus = kungfus;
                } else {
                    if (this.mountid) {
                        const pasv_skill = data
                            .find((item) => item.column == -1)
                            ?.skill?.reduce((acc, cur) => {
                                if (!acc) return cur;
                                if (acc.Level < cur.Level) return cur;
                                return acc;
                            });
                        this.panel.pasv = [pasv_skill];
                        const zhenfa_skill = data.find((item) => item.column == -2)?.skill;
                        this.panel.zhenfa = zhenfa_skill;
                    } else {
                        this.panel.pasv = [];
                        this.panel.zhenfa = [];
                    }

                    const kungfus = data
                        .filter((item) => item.kungfu_id)
                        .reduce((acc, cur) => {
                            const kungfu_name = cur.kungfu_name;
                            if (!acc[kungfu_name]) acc[kungfu_name] = [];
                            if (!Array.isArray(cur.skill)) {
                                acc[kungfu_name].push(cur.skill);
                            } else {
                                acc[kungfu_name].push(...cur.skill);
                            }
                            return acc;
                        }, {});
                    this.panel.kungfus = kungfus;
                }
                this.kungfuid = this.mountid ? "pasv" : this.kungfus[0];
            });
        },
        num2zh: function (num) {
            const zh = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
            return `第${zh[num]}重`;
        },
        //区分包括不限于技能大全的icon所属client
        getIconURL: function (iconID) {
            const iconURL =
                this.client === "origin"
                    ? __iconPath + "origin_icon/" + iconID + ".png"
                    : __iconPath + "icon/" + iconID + ".png";
            return iconURL;
        },
        async loadTalent2() {
            const versionsRes = await getTalent2List({ per: 1 });
            const version = versionsRes.data.data.list?.[0]?.talent_version;
            if (!version) return;
            const talents2Res = await getTalents2(version);
            const { detail, mount } = talents2Res.data.data;
            const result = {};
            for (const m of mount) {
                const { mount_id: mountId, first } = m;
                if (!first || !detail[first]) continue;
                const skillIds = detail[first].map((group) => group.filter(Boolean).map((item) => item.id));
                result[mountId] = skillIds;
            }
            return result;
        },
    },
    filters: {
        filterRaw: function (str) {
            str = str && str.replace(/\\n/g, "\n");
            str = str && str.replace(/(\<TALENT.*?\>)/g, "\n$1");
            str = str && str.replace(/(\<EnchantID.*?\>)/g, "\n$1");
            return str;
        },
        skillLink: function (id) {
            return getLink("skill", id);
        },
    },
    watch: {
        platform: {
            handler: function () {
                this.loadPanel();
                this.loadTalentSkills();
            },
        },
        subtype: {
            immediate: true,
            handler: function () {
                this.kungfuid = "pasv";
                this.loadPanel();
                this.loadTalentSkills();
            },
        },
    },
    mounted: async function () {
        this.talents = await getTalents();
        this.talents2 = await this.loadTalent2();
        this.talent_wujie = await getTalents("wujie");
        this.loadTalentSkills();
    },
};
</script>

<style lang="less">
@import "../assets/css/raw.less";

.v-raw {
    .m-header {
        display: flex;
        gap: 6px;
        align-items: center;

        .el-radio-group {
            margin-bottom: 15px;
        }
    }
}
</style>
