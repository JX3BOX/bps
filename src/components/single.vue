<template>
    <singlebox :post="post" :stat="stat" v-loading="loading">
        <div class="u-meta u-sub-block" slot="single-header">
            <em class="u-label">心法</em>
            <span class="u-value">
                {{ post_subtype }}
            </span>
        </div>
        <!-- 文集+联合创作者 -->
        <Creators class="m-creators" :postId="id" :postType="post.post_type"/>
        <Collection class="m-collection" :id="post.post_collection" :defaultVisible="post.collection_collapse"/>
        <!-- 打赏 -->
        <Thx class="m-thx" slot="single-append" :postId="id" postType="bps" :userId="author_id" :adminBoxcoinEnable="true" :userBoxcoinEnable="true"/>
    </singlebox>
</template>

<script>
import singlebox from "@jx3box/jx3box-page/src/cms-single";
import { getPost } from "../service/post.js";
import { getStat, postStat } from "@jx3box/jx3box-common/js/stat";
import { getLink } from "@jx3box/jx3box-common/js/utils";
import Collection from '@jx3box/jx3box-common-ui/src/single/Collection.vue'
import Creators from '@jx3box/jx3box-common-ui/src/single/Creators.vue'

import _ from 'lodash'
export default {
    name: "single",
    props: [],
    data: function() {
        return {
            loading: false,
            post: {},
            author: {},
            stat: {},

            showCollection: false
        };
    },
    computed: {
        id: function() {
            return this.$store.state.id;
        },
        author_id : function (){
            return this.post?.post_author || 0  
        },
        post_subtype: function() {
            return _.get(this.post,'post_subtype') || '其它'
        },

        collectionInfo: function (){
            return this.$store.state.collectionInfo;
        },
        collapseTitle: function (){
            return this.collectionInfo?.title
        },
        collectionList: function (){
            return this.collectionInfo?.posts
        }
    },
    filters: {
        getLink: function (id){
            return getLink('collection', id);
        },
        showLink: function (item) {
            if (item.type == "custom") {
                return item.url;
            } else {
                return getLink(item.type, item.id);
            }
        },
    },
    methods: {
        handleShow: function (){
            this.showCollection = !this.showCollection;
        },
    },
    created: function() {
        if (this.id) {
            this.loading = true;
            getPost(this.id, this)
                .then((res) => {
                    this.post = this.$store.state.post = res.data.data;
                    this.$store.state.user_id = this.post.post_author;
                    document.title = this.post.post_title
                })
                .finally(() => {
                    this.loading = false;
                });

            getStat('bps',this.id).then((res) => {
                this.stat = this.$store.state.stat = res.data;
            });
            postStat('bps',this.id);
        }
    },
    components: {
        singlebox,
        Collection,
        Creators
    },
};
</script>

<style lang="less">
@import "../assets/css/single.less";
</style>
