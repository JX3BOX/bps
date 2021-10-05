<template>
    <div class="m-info">
        <div class="m-info-router">
            <router-link to="/"><i class="el-icon-collection"></i></router-link>
            <router-link to="/skill" v-if="client == 'std'"><i class="el-icon-key"></i></router-link>
            <router-link to="/raw"><i class="el-icon-reading"></i></router-link>
            <router-link to="/lua" v-if="client == 'std'"><i class="el-icon-cpu"></i></router-link>
            <router-link to="/collection"><i class="el-icon-notebook-1"></i></router-link>
            <router-link to="/recipe" v-if="client == 'origin'"><i class="el-icon-paperclip"></i></router-link>
            <router-link to="/ladder"><i class="el-icon-s-data"></i></router-link>
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
        client: function () {
            return this.$store.state.client;
        },
    },
    methods: {},
    mounted: function() {}
};
</script>

<style lang="less">
@import '../assets/css/info.less';
</style>
