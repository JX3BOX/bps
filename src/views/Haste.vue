<!--
 * @Author: iRuxu
 * @Date: 2022-07-16 23:11:05
 * @LastEditTime: 2022-07-16 23:22:51
 * @Description:
-->
<template>
    <HasteStd v-if="client == 'std'"></HasteStd>
    <HasteOrigin v-else></HasteOrigin>
</template>

<script>
import HasteStd from "./HasteStd.vue";
import HasteOrigin from "./HasteOrigin.vue";
export default {
    name: "Haste",
    props: [],
    components: {
        HasteStd,
        HasteOrigin,
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
