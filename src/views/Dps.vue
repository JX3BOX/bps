<template>
    <div class="m-dps">
        <!-- 搜索 -->
        <!-- <div class="m-dps-search">
            <el-input v-model.trim.lazy="search" placeholder="请输入关键词..">
                <template slot="prepend"> <i class="el-icon-search"></i> 搜索 </template>
                <template slot="append">
                    <i class="el-icon-position"></i>
                </template>
            </el-input>
        </div>
        <div class="m-dps-list">
            <el-table>
                <el-table-column prop="" label="心法"></el-table-column>
                <el-table-column prop="" label="作者"></el-table-column>
                <el-table-column prop="" label="名称"></el-table-column>
                <el-table-column prop="" label="客户端" :filters="origin" :filter-method="filterOrigin"></el-table-column>
                <el-table-column prop="" label="类型"></el-table-column>
            </el-table>
        </div> -->
    </div>
</template>

<script>
export default {
    name: "Dps",
    props: [],
    components: {},
    data: function() {
        return {};
    },
    computed: {
    },
    watch: {},
    methods: {
    },
    filters: {},
    created: function() {},
    mounted: function() {},
};
</script>

<style lang="less">
@import "~@/assets/css/dps.less";
</style>
