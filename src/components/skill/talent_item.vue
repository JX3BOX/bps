<!--
 * @Author: X3ZvaWQ
 * @Date: 2022-07-29 16:19:07
 * @LastEditors: X3ZvaWQ
 * @LastEditTime: 2022-08-07 01:39:38
 * @Description:
-->
<template>
    <div class="u-item" v-if="item">
        <i class="u-pic"><img :src="item.icon.FileName" /></i>
        <span class="u-name">{{ item.name || item.skillName }}</span>
        <template v-if="!muilt_desc">
            <span class="u-desc">{{ item.desc }}</span>
        </template>
        <template v-else>
            <span class="u-desc" v-for="(desc, i) in item.desc" :key="i">
                <em class="u-desc-title">{{ desc.title }}：</em>
                <span class="u-desc-content">{{ desc.content }}</span>
            </span>
        </template>
        <template v-if="item.cd || item.skill_id">
            <span class="u-id" v-if="!force">CD : {{ item.cd }}</span>
            <span class="u-id" v-else>ID : {{ item.skill_id }}</span>
        </template>
    </div>
</template>

<script>
export default {
    name: "talent_item",
    props: ["item", "force"],
    data: function () {
        return {};
    },
    computed: {
        muilt_desc: function () {
            return this.item.desc instanceof Array;
        },
    },
    methods: {},
    mounted: function () {},
    components: {},
};
</script>
