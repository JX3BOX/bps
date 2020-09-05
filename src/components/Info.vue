<template>
    <div class="m-info">
        <div class="m-info-notice">
            <!-- <router-link class="u-item" to="/story">🌈 职业背景故事页上线</router-link> -->
        </div>

        <div class="m-info-router">
            <router-link to="/"><i class="el-icon-collection"></i></router-link>
            <router-link to="/raw"><i class="el-icon-reading"></i></router-link>
            <!-- <router-link to="/lua"><i class="el-icon-cpu"></i></router-link> -->
            <router-link to="/skill"><i class="el-icon-key"></i></router-link>
            <router-link to="/rank"><i class="el-icon-s-data"></i></router-link>
            <router-link to="/ladder"><i class="el-icon-trophy"></i></router-link>
            <router-link to="/story"><i class="el-icon-film"></i></router-link>
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
