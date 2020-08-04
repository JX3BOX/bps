<template>
    <div class="v-ladder">
        <el-tabs v-model="boss" type="card" @tab-click="loadData">
            <el-tab-pane
                :label="item"
                :name="item"
                v-for="item in bosslist"
                :key="item"
            ></el-tab-pane>
        </el-tabs>
        <el-table class="m-rank-table" :data="data" v-if="data.length" :default-sort = "{prop: 'highestDps', order: 'descending'}">
            <el-table-column type="index" label="排名" sortable></el-table-column>
            <el-table-column prop="mountName" label="心法"></el-table-column>
            <el-table-column prop="medianDps" label="平均秒伤" sortable></el-table-column>
            <el-table-column prop="higherDps" label="top10%秒伤" sortable></el-table-column>
            <el-table-column prop="highestDps" label="最高秒伤" sortable></el-table-column>
        </el-table>
    </div>
</template>

<script>
import { getLadder } from "@/service/rank.js";
import bosslist from "@/assets/data/boss.json";
// import test from "@/assets/data/laddertest.json";

export default {
    name: "Ladder",
    props: [],
    data: function() {
        return {
            boss: bosslist[0],
            bosslist,
            data: "",
        };
    },
    computed: {
    },
    methods: {
        loadData() {
            getLadder().then((res) => {
                this.data = res.data.result[this.boss]
            });
            // this.data = test.result[this.boss];
        },
    },
    mounted: function() {
        this.loadData();
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/rank.less";
</style>
