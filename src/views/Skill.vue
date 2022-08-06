<template>
    <SkillStd v-if="client == 'std'"></SkillStd>
    <SkillOrigin v-else></SkillOrigin>
</template>

<script>
import SkillStd from "./SkillStd.vue";
import SkillOrigin from "./SkillOrigin.vue";
export default {
    name: "Skill",
    props: [],
    components: {
        SkillStd,
        SkillOrigin,
    },
    data: function () {
        return {};
    },
    computed: {
        client: function () {
            return this.$store.state.client;
        },
    },
    watch: {},
    methods: {},
    created: function () {},
    mounted: function () {},
};
</script>
