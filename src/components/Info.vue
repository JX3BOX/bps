<template>
    <div class="m-info">
        <div class="m-info-notice">
            <!-- <router-link class="u-item" to="/story">🌈 职业背景故事页上线</router-link> -->
        </div>

        <div class="m-info-router" v-if="mode == 'list'">
            <router-link to="/"><i class="el-icon-collection"></i></router-link>
            <router-link to="/raw"><i class="el-icon-cpu"></i></router-link>
            <router-link to="/lua" v-if="isSuperAuthor"><i class="el-icon-folder"></i></router-link>
            <router-link to="/skill"><i class="el-icon-key"></i></router-link>
            <router-link to="/story"><i class="el-icon-film"></i></router-link>
        </div>
    </div>
</template>

<script>
import User from '@jx3box/jx3box-common/js/user.js'
export default {
    name: "Info",
    props: [],
    data: function() {
        return {
            isSuperAuthor : User.isSuperAuthor()
        };
    },
    computed: {
        mode: function() {
            return this.$store.state.mode;
        },
    },
    methods: {},
    mounted: function() {}
};
</script>

<style lang="less">
@import '../assets/css/info.less';
</style>
