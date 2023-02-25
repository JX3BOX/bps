<template>
    <AppLayout>
        <SkillStd v-if="client == 'std'"></SkillStd>
        <SkillOrigin v-else></SkillOrigin>
    </AppLayout>
</template>

<script>
import AppLayout from "@/layout/AppLayout.vue";
import SkillStd from "./SkillStd.vue";
import SkillOrigin from "./SkillOrigin.vue";
export default {
    name: "Skill",
    props: [],
    components: {
        SkillStd,
        SkillOrigin,
        AppLayout,
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
