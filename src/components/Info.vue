<template>
    <div class="m-info">
        <div class="m-info-notice">
            <span class="u-item" href="/macro/#/">🌈 全新职业栏目测试版上线</span>
            <!-- <span class="u-item" href="/macro/#/">🌈 <span>即将上线</span> · 私人宏仓库</span> -->
            <!-- <span class="u-item" href="/macro/#/">✨ <span>即将上线</span> · 云端宏一键同步</span> -->
            <!-- <span class="u-item" href="/house/#/rank">⚽️ <span>即将上线</span> · 云端宏排行榜</span> -->
        </div>

        <div class="m-info-router">
            <router-link to="/"><i class="el-icon-collection"></i></router-link>
            <router-link to="/skill"><i class="el-icon-key"></i></router-link>
            <router-link to="/miji"><i class="el-icon-reading"></i></router-link>
            <router-link to="/rank"><i class="el-icon-s-data"></i></router-link>
            <router-link to="/ladder"><i class="el-icon-trophy"></i></router-link>
            <router-link to="/lua"><i class="el-icon-cpu"></i></router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "Info",
    props: [],
    data: function() {
        return {};
    },
    computed: {},
    methods: {},
    mounted: function() {}
};
</script>

<style lang="less">
@import '../assets/css/info.less';
</style>
