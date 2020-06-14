<template>
    <div class="u-item" v-if="item">
        <i class="u-pic"><img :src="item.icon.FileName"/></i>
        <span class="u-name">{{ item.name }}</span>
        <span class="u-desc">{{ item.desc }}</span>
        <span class="u-id">ID : {{ item.skill_id }}</span>
    </div>
</template>

<script>
export default {
    name: "talent_item",
    props: ["item"],
    data: function() {
        return {};
    },
    computed: {},
    methods: {},
    mounted: function() {},
    components: {},
};
</script>
