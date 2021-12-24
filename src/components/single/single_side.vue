<template>
    <div class="m-single-side">
        <PostDirectory id="directory"/>
        <PostCollection v-if="showSideCollection" :store="collection_data"/>
    </div>
</template>

<script>
import PostDirectory from '@jx3box/jx3box-common-ui/src/single/PostDirectory.vue'
import PostCollection from '@jx3box/jx3box-common-ui/src/single/PostCollection.vue'
export default {
    name: "single_side",
    props: ['id'],
    data: function() {
        return {
            
        };
    },
    components : {
        PostDirectory,
        PostCollection,
    },
    computed : {
        hasDirectory : function (){
            return this.$store.state.extend?.directory
        },
        showSideCollection : function (){
            let hasCollection = this.$store.state.post?.post_collection
            let foldTopCollection = !this.$store.state.post?.collection_collapse
            return hasCollection && foldTopCollection
        },
        collection_data : function (){
            return this.$store.state.extend?.collection_data
        }
    }
};
</script>

<style lang="less">
.m-single-side {
    padding: 20px;
}
.m-single-directory {
    .mb(20px);
}
</style>
