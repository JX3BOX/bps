<template>
    <div class="v-rank">
        <el-tabs v-model="boss" type="card" @tab-click="loadData">
            <el-tab-pane
                :label="item"
                :name="item"
                v-for="item in bosslist"
                :key="item"
            ></el-tab-pane>
        </el-tabs>
        <el-table class="m-rank-table" :data="data" v-if="data.length">
            <el-table-column type="index" label="排名"></el-table-column>
            <el-table-column prop="userName" label="角色名"></el-table-column>
            <el-table-column prop="server" label="服务器"></el-table-column>
            <el-table-column prop="mountName" label="心法"></el-table-column>
            <el-table-column prop="dps" label="DPS"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import { getRank } from "@/service/rank.js";
import bosslist from "@/assets/data/boss.json";
// import test from "@/assets/data/ranktest.json";

export default {
    name: "Rank",
    props: [],
    data: function() {
        return {
            boss: bosslist[0],
            bosslist,
            data: "",
        };
    },
    computed: {
        xf: function() {
            let xf = this.$store.state.subtype;
            if (xf == "问水诀") {
                return "问水诀/山居剑意";
            } else if (xf == "通用") {
                return "";
            } else {
                return this.$store.state.subtype || "";
            }
        },
    },
    methods: {
        loadData() {
            getRank(this.xf, this.boss).then((res) => {
                this.data = res.data.result
            });
            // this.data = test.result;
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
