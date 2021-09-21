<template>
    <div class="m-recipe">
        <el-alert title="即将上线" type="warning" show-icon></el-alert>
    </div>
</template>

<script>
import {getRecipe} from '@/service/node.js'
import {mount_belong_school} from '@jx3box/jx3box-data/data/xf/relation.json'
export default {
    name: "Recipe",
    props: [],
    components: {},
    data: function () {
        return {
            data : []
        };
    },
    computed: {
        mount_name : function (){
            return this.$route.query.subtype || '通用'
        },
        school_name : function (){
            if(this.mount_name == '通用'){
                return '通用'
            }else{
                return mount_belong_school[this.mount_name]
            }
        },
        params : function (){
            return {
                school_name : this.school_name
            }
        }
    },
    watch: {
        params : {
            deep : true,
            immediate : true,
            handler : function (){
                this.loadData()
            }
        }
    },
    methods: {
        // 加载秘籍
        loadData : function (){
            getRecipe(this.params).then((res) => {
                this.data = res.data
            })
        }
    },
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
@import "../assets/css/recipe.less";
</style>