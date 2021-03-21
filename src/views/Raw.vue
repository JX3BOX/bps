<template>
    <div class="v-raw" v-loading="loading">
        <div class="m-raw-tips el-alert el-alert--success is-light">
            ❤ 请通过【侧边栏】切换心法查看对应门派技能，更多Buff等数据请前往<a
                href="/app/database"
                target="_blank"
                >【剑三数据库】</a
            >应用
        </div>

        <!-- 搜索 -->
        <div class="m-raw-search m-archive-search">
            <el-input
                placeholder="搜索关键词"
                v-model="search"
                class="input-with-select"
                @change="loadSkills"
            >
                <template slot="prepend">技能名</template>
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <!-- <el-switch
                    class="u-switch u-hasdata"
                    slot="append"
                    v-model="strict"
                    active-color="#13ce66"
                    inactive-text="精确匹配"
                    @change="loadSkills"
                >
                </el-switch> -->
        </div>

        <ul class="m-resource-list" v-if="data.length">
            <li v-for="(o, i) in data" class="u-item" :key="i">
                <span class="u-id">ID:{{ o.SkillID }}</span>
                <img
                    class="u-pic"
                    :title="'IconID:' + o.IconID"
                    :src="o.IconID | iconURL"
                />
                <div class="u-primary">
                    <span class="u-name"
                        >{{ o.Name }}
                        <em v-if="o.SkillName">({{ o.SkillName }})</em>
                    </span>
                    <span class="u-content">{{ o.Desc | filterRaw }}</span>
                    <div class="u-remarks">
                        <span class="u-remark">Level : {{ o.Level }}</span>
                        <span class="u-remark">Remark : {{ o.Remark }}</span>
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
                    <el-button
                        class="u-raw"
                        icon="el-icon-view"
                        plain
                        size="mini"
                        @click="toggleProps(o)"
                        >{{ o.isopen ? "收起详情" : "展开详情" }}</el-button
                    >
                </div>
                <div class="u-props" :class="{ on: o.isopen }">
                    <span class="u-desc" title="区分物理或魔法等"
                        ><em>类型</em>{{ o.KindType }}</span
                    >
                    <span class="u-desc" title="区分眩晕或伤害等"
                        ><em>功能</em>{{ o.FunctionType }}</span
                    >
                    <span class="u-desc"
                        ><em>效果</em>{{ o.Design_Effect }}</span
                    >
                    <span class="u-desc" title="范围或指定目标等"
                        ><em>释放方式</em>{{ o.CastMode }}</span
                    >
                    <span class="u-desc" title="是否为被动"
                        ><em>被动</em>{{ o.IsPassiveSkill }}</span
                    >
                    <span class="u-desc" title="是否为通道/引导技能"
                        ><em>通道</em>{{ o.IsChannelSkill }}</span
                    >
                    <span class="u-desc"
                        ><em>可否打断</em>{{ o.CauseBeatBreak }}</span
                    >
                    <span class="u-desc"
                        ><em>可否打退</em>{{ o.CauseBeatBack }}</span
                    >
                    <span class="u-desc" title="是否受障碍影响"
                        ><em>3D碰撞</em>{{ o.Use3DObstacle }}</span
                    >
                    <span class="u-desc"
                        ><em>对玩家生效</em>{{ o.TargetTypePlayer }}</span
                    >
                    <span class="u-desc"
                        ><em>对NPC生效</em>{{ o.TargetTypeNpc }}</span
                    >
                    <span class="u-desc"
                        ><em>小队生效</em>{{ o.TargetRelationParty }}</span
                    >
                    <span class="u-desc"
                        ><em>团队生效</em>{{ o.TargetRelationRaid }}</span
                    >
                    <span class="u-desc"
                        ><em>无视增益</em>{{ o.IgnorePositiveShield }}</span
                    >
                    <span class="u-desc"
                        ><em>无视减益</em>{{ o.IgnoreNegativeShield }}</span
                    >

                    <span class="u-desc"
                        ><em>所属门派</em>{{ o.BelongSchool }}</span
                    >
                    <span class="u-desc"
                        ><em>所属套路</em>{{ o.BelongKungfu }}</span
                    >
                    <span class="u-desc"
                        ><em>最高等级</em>{{ o.MaxLevel }}</span
                    >
                    <span class="u-desc"
                        ><em>是否需求武器</em>{{ o.WeaponRequest }}</span
                    >
                    <span class="u-desc"
                        ><em>是否需要上马</em
                        >{{ o.SelfHorseStateRequest }}</span
                    >
                    <span class="u-desc"
                        ><em>需要脱战释放</em>{{ o.NeedOutOfFight }}</span
                    >
                    <span class="u-desc"
                        ><em>ScriptFile</em>{{ o.ScriptFile }}</span
                    >
                </div>
            </li>
        </ul>

        <!-- 空 -->
        <el-alert
            v-else
            class="m-archive-null"
            title="没有找到相关条目"
            type="info"
            center
            show-icon
        >
        </el-alert>

        <!-- 下一页 -->
        <el-button
            class="m-archive-more"
            :class="{ show: hasNextPage }"
            type="primary"
            :loading="loading"
            @click="appendPage(++page)"
            >加载更多</el-button
        >

        <!-- 分页 -->
        <el-pagination
            class="m-archive-pages"
            :page-size="per"
            background
            :hide-on-single-page="true"
            @current-change="changePage"
            :current-page.sync="page"
            layout="total, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
    </div>
</template>

<script>
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import { getSchoolSkills } from "../service/raw";
import { __iconPath,__ossRoot } from "@jx3box/jx3box-common/data/jx3box.json";

export default {
    name: "Raw",
    props: [],
    data: function() {
        return {
            data: [],
            page: 1, //当前页数
            total: 1, //总条目数
            pages: 1, //总页数
            per: 15, //每页条目

            loading: false,
            search:''
        };
    },
    computed: {
        subtype: function() {
            return this.$store.state.subtype;
        },
        school: function() {
            let subtype = this.subtype || '通用'
            return xfmap[subtype]['school'];
        },
        hasNextPage: function() {
            return this.total > 1 && this.page < this.pages;
        },
    },
    methods: {
        loadSkills: function(i = 1, append = false) {
            this.loading = true;

            let params = {
                page: i,
                per: this.per,
            }
            if(this.search){
                params.name = this.search
            }

            getSchoolSkills(this.school, params)
                .then((res) => {

                    let data = res.data

                    if (append) {
                        this.data = this.data.concat(data.list);
                    } else {
                        window.scrollTo(0, 0);
                        this.data = this.transformData(data.list);
                    }
                    this.total = data.total;
                    this.pages = data.pages;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        changePage: function(i) {
            this.loadSkills(i);
        },
        appendPage: function(i) {
            this.loadSkills(i, true);
        },
        transformData: function(data) {
            data.forEach((item) => {
                item.isopen = false;
            });
            return data;
        },
        toggleProps: function(o) {
            o.isopen = !o.isopen;
        },
    },
    filters: {
        filterRaw: function(str) {
            return str && str.replace(/\\n/g, "\n");
        },
        iconURL: function(id) {
            return __iconPath + "icon/" + id + ".png";
        },
    },
    created: function() {
        this.loadSkills(1);
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/raw.less";
</style>
