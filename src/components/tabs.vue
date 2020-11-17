<template>
    <el-tabs class="m-tabs" v-model="view" @tab-click="changeView">
        <el-tab-pane label="职业攻略" name="index">
            <span slot="label">
                <i class="el-icon-collection"></i>
                <b>职业攻略</b>
                <em class="u-secret">权威白皮书</em>
            </span>
        </el-tab-pane>

        <el-tab-pane label="技能/Buff数据库" name="raw">
            <span slot="label">
                <i class="el-icon-reading"></i>
                <b>原始数据</b>
                <em class="u-hot">重磅独家</em>
            </span>
        </el-tab-pane>

        <el-tab-pane label="源码解析" name="lua" v-if="isSuperAuthor">
            <span slot="label">
                <i class="el-icon-cpu"></i>
                <b>源码分析</b>
                <em class="u-ready">签约作者</em>
            </span>
        </el-tab-pane>

        <el-tab-pane label="职业数据" name="skill">
            <span slot="label">
                <i class="el-icon-key"></i>
                <b>技能系数</b>
                <em class="u-new">最新同步</em>
            </span>
        </el-tab-pane>

        <!-- <el-tab-pane label="DPS排行榜" name="rank">
            <span slot="label">
                <i class="el-icon-s-data"></i>
                <b>DPS排行榜</b>
                <em class="u-new">全新上线</em>
            </span>
        </el-tab-pane>

        <el-tab-pane label="门派天梯榜" name="ladder">
            <span slot="label">
                <i class="el-icon-trophy"></i>
                <b>门派天梯榜</b>
                <em class="u-new">全新上线</em>
            </span>
        </el-tab-pane> -->

        <el-tab-pane label="背景故事" name="story">
            <span slot="label">
                <i class="el-icon-film"></i>
                <b>背景故事</b>
            </span>
        </el-tab-pane>

    </el-tabs>
</template>

<script>
import User from '@jx3box/jx3box-common/js/user'
export default {
    name: "tabs",
    props: [],
    data: function() {
        return {
            view: "index",
            isSuperAuthor : User.isSuperAuthor()
        };
    },
    watch : {
        $route : function (_route){
            this.view = _route.name
        }
    },
    computed: {},
    methods: {
        changeView: function() {
            this.$router.push({ name: this.view });
        },
    },
};
</script>

<style lang="less">
@import "../assets/css/tabs.less";
</style>
