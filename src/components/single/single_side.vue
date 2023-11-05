<template>
    <div class="m-single-side">
        <PostTopic v-if="id" type="bps" :id="~~id" :post-banner="post.post_banner" />
        <PostDirectory id="directory"/>
        <PostCollection v-if="showSideCollection" :store="collection_data"/>
    </div>
</template>

<script>
import PostDirectory from '@jx3box/jx3box-common-ui/src/single/PostDirectory.vue'
import PostCollection from '@jx3box/jx3box-common-ui/src/single/PostCollection.vue'
import PostTopic from '@jx3box/jx3box-common-ui/src/single/PostTopic.vue'
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
        PostTopic
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
        },
        post : function (){
            return this.$store.state.post
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
