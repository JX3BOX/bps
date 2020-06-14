<template>
    <div class="m-info">
        <div class="m-info-notice">
            <router-link class="u-item" to="/lua">🌈 独家职业解包上线·王者必备</router-link>
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
