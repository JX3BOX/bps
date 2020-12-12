<template>
    <div class="u-item" v-if="item">
        <i class="u-pic"><img :src="item.icon.FileName"/></i>
        <span class="u-name">{{ item.name || item.skillName }}</span>
        <span class="u-desc">{{ item.desc }}</span>
        <span class="u-id" v-if="!force">ID : {{ item.skill_id }}</span>
        <span class="u-id" v-else>CD : {{item.cd}}</span>
    </div>
</template>

<script>
export default {
    name: "talent_item",
    props: ["item","force"],
    data: function() {
        return {};
    },
    computed: {},
    methods: {},
    mounted: function() {},
    components: {},
};
</script>
