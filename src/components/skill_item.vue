<template>
    <div class="u-item" v-if="item">
        <div class="u-info">
            <i class="u-pic"><img :src="item.icon.FileName"/></i>
            <span class="u-name">{{ item.skillName }}</span>
            <span class="u-release">{{ item.releaseType }}</span>
            <span class="u-cd">{{ item.cd }}</span>
        </div>
        <div class="u-details">
            <span class="u-distance"
                ><em>距离</em><span>{{ item.distance }}</span></span
            >
            <span class="u-weapon"
                ><em>武器</em><span>{{ item.weapon }}</span></span
            >
            <span class="u-consumption"
                ><em>消耗内力</em><span>{{ item.consumption }}</span></span
            >
        </div>
        <div class="u-descbox">
            <div class="u-spdesc">{{ item.specialDesc }}</div>
            <div class="u-desc" v-html="format(item.desc)"></div>
            <div class="u-sdesc">{{ item.simpleDesc }}</div>
        </div>
        <div class="u-cheasts" v-if="item.cheasts.length" v-show="!!item.collapse">
            <div
                class="u-cheast"
                v-for="(cheast, i) in item.cheasts"
                :key="cheast + i"
            >
                <i class="el-icon-collection-tag"></i>
                <span class="u-cheast-name">{{ cheast.name }}</span>
                <span class="u-cheast-desc">{{ cheast.desc }}</span>
            </div>
        </div>
        <el-button class="u-panel" size="mini" icon="el-icon-connection" @click="toggleCheasts(item)" v-if="item.cheasts.length">秘籍</el-button>
    </div>
</template>

<script>
export default {
    name: "skill_item",
    props: ["item"],
    data: function() {
        return {};
    },
    computed: {},
    methods: {
        format : function (txt){
            return txt.replace(/\\n/g,'\n')
        },
        toggleCheasts : function (item){
            item.collapse = !item.collapse
            this.$forceUpdate()
        }
    },
    filters : {
    },
    mounted: function() {},
    components: {},
};
</script>

<style scoped lang="less">
    .u-item{
        .pr;
    }
    .u-panel{
        .pa;.rt(10px);
    }
</style>