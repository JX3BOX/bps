<template>
    <el-tabs class="m-tabs" v-model="view" @tab-click="changeView">
        <el-tab-pane label="职业攻略" name="index">
            <span slot="label">
                <i class="el-icon-collection"></i>
                <b>职业攻略</b>
                <!-- <em class="u-secret">权威白皮书</em> -->
            </span>
        </el-tab-pane>

        <el-tab-pane label="精品区" name="highlights">
            <span slot="label">
                <i class="el-icon-star-off"></i>
                <b>精品区</b>
                <em class="u-secret">优质作品</em>
            </span>
        </el-tab-pane>

        <!-- <el-tab-pane label="技能系数" name="skill">
            <span slot="label">
                <i class="el-icon-key"></i>
                <b>技能系数</b>
            </span>
        </el-tab-pane> -->

        <el-tab-pane label="技能/Buff数据库" name="raw">
            <span slot="label">
                <i class="el-icon-reading"></i>
                <b>技能大全</b>
                <!-- <em class="u-ready">签约</em> -->
            </span>
        </el-tab-pane>

        <el-tab-pane label="秘籍大全" name="recipe">
            <span slot="label">
                <i class="el-icon-magic-stick"></i>
                <b>秘籍大全</b>
            </span>
        </el-tab-pane>

        <el-tab-pane label="技能合集" name="kungfu">
            <span slot="label">
                <i class="el-icon-notebook-1"></i>
                <b>技能合集</b>
            </span>
        </el-tab-pane>

        <el-tab-pane label="急速阈值" name="haste">
            <span slot="label">
                <i class="el-icon-stopwatch"></i>
                <b>急速阈值</b>
            </span>
        </el-tab-pane>

        <el-tab-pane label="DPS计算器" name="dps">
            <span slot="label">
                <i class="el-icon-cpu"></i>
                <b>DPS计算器</b>
            </span>
        </el-tab-pane>

        <el-tab-pane label="门派天梯" name="ladder" v-if="client == 'std'">
            <span slot="label">
                <i class="el-icon-s-data"></i>
                <b>门派天梯</b>
            </span>
        </el-tab-pane>

        <!-- <el-tab-pane label="作品小册" name="collection">
            <span slot="label">
                <i class="el-icon-paperclip"></i>
                <b>作品小册</b>
            </span>
        </el-tab-pane> -->

        <el-tab-pane label="源码解析" name="lua" v-if="isSuperAuthor">
            <span slot="label">
                <i class="el-icon-full-screen"></i>
                <b>源码分析</b>
                <em class="u-ready">签约</em>
            </span>
        </el-tab-pane>

        <!-- <el-tab-pane label="门派群组" name="group" v-if="client == 'std'">
            <span slot="label">
                <i class="el-icon-headset"></i>
                <b>门派群组</b>
            </span>
        </el-tab-pane> -->

        <!-- <el-tab-pane label="背景故事" name="story">
            <span slot="label">
                <i class="el-icon-film"></i>
                <b>背景故事</b>
            </span>
        </el-tab-pane> -->
    </el-tabs>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "tabs",
    props: [],
    data: function () {
        return {
            view: "index",
        };
    },
    watch: {
        $route: {
            handler: function (_route) {
                this.view = _route.name;
            },
            immediate: true,
            deep: true,
        },
    },
    computed: {
        client: function () {
            return this.$store.state.client || "std";
        },
        isSuperAuthor: function () {
            return this.$store.state.isSuperAuthor || false;
        },
    },
    methods: {
        changeView: function () {
            this.$router.push({
                name: this.view,
                query: {
                    subtype: this.$route.query.subtype,
                },
            });
        },
    },
    mounted: function () {
        User.isSuperAuthor().then((data) => {
            this.$store.state.isSuperAuthor = data;
        });
    },
};
</script>

<style lang="less">
@import "~@/assets/css/tabs.less";
</style>
