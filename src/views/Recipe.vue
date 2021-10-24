<template>
    <div class="v-recipe">
        <RecipeStd v-if="client=='std'" />
        <RecipeOrigin v-else />
    </div>
</template>

<script>
import RecipeStd from "./Recipe_std.vue";
import RecipeOrigin from "./Recipe_origin.vue";
export default {
    name: "Recipe",
    props: [],
    components: {
        RecipeStd,
        RecipeOrigin,
    },
    data: function () {
        return {};
    },
    computed: {
        client : function (){
            return this.$store.state.client
        }
    },
    watch: {},
    methods: {},
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>