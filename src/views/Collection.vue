<template>
    <div class="v-collection">
        <el-tabs v-model="type" type="card">
            <el-tab-pane :label="item.label" :name="item.key" v-for="(item,i) in types" :key="i">
                <span slot="label" class="u-tab-icon"><i :class="item.icon"></i>{{item.label}}</span>
                <div class="m-collection-box">
                    <div class="m-collection-header">{{item.desc}}</div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    name: "Collection",
    props: [],
    components: {},
    data: function () {
        return {
            types: [
                {
                    label: "减伤",
                    desc: "包含减伤、化解等，部分穿透将无视此类技能。",
                    key: "jianshang",
                    icon : "el-icon-sugar"
                },
                {
                    label: "抵御",
                    desc: "包含闪避、格挡、招架等，部分技能将无视此效果。",
                    key: "diyu",
                    icon : "el-icon-dessert"
                },
                {
                    label: "无敌",
                    desc: "包含无敌、免死、假死、隐身等，部分穿刺技能将无视此类技能。",
                    key: "wudi",
                    icon : "el-icon-ice-cream"
                },
                {
                    label: "控制",
                    desc: "包含锁足、定身、眩晕、击倒、击退、击飞、缴械、魅惑、昏睡、拉拽等。",
                    key: "kongzhi",
                    icon : "el-icon-hot-water"
                },
                {
                    label: "解控",
                    desc: "包含解控、免控等。",
                    key: "jiekong",
                    icon : "el-icon-cold-drink"
                },
                {
                    label: "驱散",
                    desc: "包含单体或群体驱散。",
                    key: "qusan",
                    icon : "el-icon-watermelon"
                },
                {
                    label: "减疗",
                    desc: "减疗后通过贯体治疗技能将更容易治愈目标。",
                    key: "jianliao",
                    icon : "el-icon-grape"
                },
                {
                    label: "打断",
                    desc: "包含打断、打退等。",
                    key: "daduan",
                    icon : "el-icon-cherry"
                },
                {
                    label: "位移",
                    desc: "包含位移、轻功等。",
                    key: "weiyi",
                    icon : "el-icon-apple"
                },
                {
                    label: "减速",
                    desc: "包含减速、封轻功等。",
                    key: "jiansu",
                    icon : "el-icon-lollipop"
                },
                {
                    label: "强仇",
                    desc: "大部分技能为坦克心法独有，少量门派与宠物也有仇恨技能，强仇后将固定攻击该目标。",
                    key: "chouhen",
                    icon : "el-icon-ice-cream-round"
                },
            ],
            type : 'jianshang'
        };
    },
    computed: {},
    methods: {},
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>

<style scoped lang="less">
@import "../assets/css/collection.less";
</style>