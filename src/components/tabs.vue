<template>
    <el-tabs class="m-tabs" v-model="view" @tab-click="changeView">
        <el-tab-pane label="职业攻略" name="index">
            <span slot="label">
                <i class="el-icon-collection"></i>
                <b>职业攻略</b>
                <em class="u-secret">权威白皮书</em>
            </span>
        </el-tab-pane>

        <el-tab-pane label="职业数据" name="skill">
            <span slot="label">
                <i class="el-icon-key"></i>
                <b>技能数据</b>
                <em class="u-new">最新同步</em>
            </span>
        </el-tab-pane>

        <el-tab-pane label="秘籍数据" name="miji">
            <span slot="label">
                <i class="el-icon-reading"></i>
                <b>秘籍数据</b>
                <em class="u-new">最新同步</em>
            </span>
        </el-tab-pane>

        <el-tab-pane label="DPS排行榜" name="rank">
            <span slot="label">
                <i class="el-icon-s-data"></i>
                <b>DPS排行榜</b>
                <em class="u-ready">即将推出</em>
            </span>
        </el-tab-pane>

        <el-tab-pane label="门派天梯榜" name="ladder">
            <span slot="label">
                <i class="el-icon-trophy"></i>
                <b>门派天梯榜</b>
                <em class="u-ready">即将推出</em>
            </span>
        </el-tab-pane>

        <el-tab-pane label="源码解析" name="lua">
            <span slot="label">
                <i class="el-icon-cpu"></i>
                <b>源码解析</b>
                <em class="u-secret">大神宝典</em>
            </span>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
    name: "tabs",
    props: [],
    data: function() {
        return {
            view: "index",
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
