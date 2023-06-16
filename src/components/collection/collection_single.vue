<template>
    <CollectionLayout :has-right="false">
        <div class="m-collection-single">
            <el-alert
                v-if="!collection"
                title="该剑三小册不存在或已被删除"
                type="info"
                center
                show-icon
                :closable="false"
            ></el-alert>

            <template v-else>
                <div class="m-collection-detail-content">
                    <div class="m-collection-detail-header">
                        <header class="m-single-header">
                            <!-- 标题 -->
                            <div class="m-single-title">
                                <span class="u-title u-sub-block" :href="url" :title="collection.title">
                                    <i class="u-private el-icon-lock" v-if="!collection.public" title="仅自己可见"></i>
                                    <span class="u-title-text">{{ collection.title }}</span>
                                </span>
                            </div>

                            <!-- 信息 -->
                            <div class="m-single-info">
                                <!-- 用户名 -->
                                <div class="u-author u-sub-block">
                                    <i class="u-author-icon">
                                        <img svg-inline src="@/assets/img/author.svg" />
                                    </i>
                                    <a class="u-name" :href="collection.user_id | authorLink">{{
                                        collection.user_nickname
                                    }}</a>
                                </div>

                                <!-- 发布日期 -->
                                <span class="u-podate u-sub-block" title="发布日期">
                                    <i class="u-icon el-icon-date"></i>
                                    <time>{{ dateFormat(collection.created) }}</time>
                                </span>

                                <!-- 最后更新 -->
                                <span class="u-modate u-sub-block" title="最后更新">
                                    <i class="u-icon el-icon-refresh"></i>
                                    <time>{{ dateFormat(collection.updated) }}</time>
                                </span>

                                <!-- 查看次数 -->
                                <span class="u-views u-sub-block">
                                    <i class="u-icon el-icon-view"></i>
                                    {{ views }}
                                </span>

                                <!-- 编辑 -->
                                <a class="u-edit u-sub-block" :href="edit_link" v-if="canEdit">
                                    <i class="u-icon-edit el-icon-edit-outline"></i>
                                    <span>编辑</span>
                                </a>

                                <!-- 删除 -->
                                <a
                                    href="javascript:void(0)"
                                    class="u-delete u-sub-block"
                                    @click="delete_handle($event, collection.id)"
                                    v-if="canEdit"
                                >
                                    <i class="u-icon-remove el-icon-delete"></i>
                                    <span>删除</span>
                                </a>
                            </div>
                        </header>
                    </div>

                    <template v-if="collection.description">
                        <el-divider content-position="left">
                            <i class="el-icon-collection"></i>
                            小册简介
                        </el-divider>
                        <div class="u-description">
                            <p v-html="resolveImagePath(collection.description)"></p>
                        </div>
                    </template>

                    <template v-if="collection.posts && collection.posts.length">
                        <el-divider content-position="left">
                            <i class="el-icon-folder"></i>
                            小册文章
                        </el-divider>
                        <ul class="u-list">
                            <li class="u-item" v-for="(post, key) in collection.posts" :key="key">
                                <span class="u-item-order">{{ key + 1 }}.</span>
                                <span class="u-item-link" v-if="post.type === 'custom'">
                                    <i class="el-icon-link"></i>站外链接
                                </span>
                                <a
                                    class="u-item-author"
                                    v-if="post.type !== 'custom' && post.user_id"
                                    target="_blank"
                                    :href="post.user_id | authorLink"
                                >
                                    <img class="u-avatar" :src="showAvatar(post.user_avatar)" />
                                    <span class="u-nickname" v-text="post.user_nickname"></span>
                                    <span class="u-div">/</span>
                                </a>
                                <a
                                    class="u-item-title"
                                    target="_blank"
                                    :href="post.type === 'custom' ? post.url : getLink(post.type, post.id)"
                                    >{{ post.title }}</a
                                >
                                <time
                                    class="u-updated"
                                    v-if="post.updated"
                                    v-text="'最后更新于 ' + dateFormat(post.updated)"
                                ></time>
                            </li>
                        </ul>
                    </template>
                </div>

                <!-- <div class="m-tags" v-if="collection.tags && collection.tags.length">
                <div class="u-tags-title">
                    <i class="el-icon-price-tag"></i>
                    <span>标签</span>
                </div>
                <ul class="u-tags">
                    <li v-for="(tag, key) in collection.tags" :key="key" v-text="tag" class="u-tag"></li>
                </ul>
            </div>-->

                <Thx
                    class="m-thx"
                    :postId="id"
                    postType="collection"
                    :postTitle="title"
                    :userId="author_id"
                    :adminBoxcoinEnable="true"
                    :userBoxcoinEnable="true"
                    client="all"
                />

                <div class="m-comments" v-if="id">
                    <el-divider content-position="left">
                        <span style="color: #999999"> <i class="el-icon-chat-line-square"></i> 讨论 </span>
                    </el-divider>
                    <jx3-comment :id="id" category="collection" />
                </div>
            </template>
        </div>
    </CollectionLayout>
</template>

<script>
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
import CollectionPublish from "@jx3box/jx3box-editor/service/enum/CollectionPublic";
import { getCollection, removeCollection } from "@/service/helper";
import dateFormat from "@/utils/dateFormat";
import {
    getThumbnail,
    getLink,
    getTypeLabel,
    authorLink,
    editLink,
    showAvatar,
    resolveImagePath,
} from "@jx3box/jx3box-common/js/utils";
import User from "@jx3box/jx3box-common/js/user.js";
import { getStat, postStat } from "@jx3box/jx3box-common/js/stat";

import CollectionLayout from "@/layout/CollectionLayout.vue";
export default {
    name: "CollectionSingle",
    props: [],
    components: {
        "jx3-comment": Comment,
        CollectionLayout,
    },
    data: function () {
        return {
            collection: "",
            publish: CollectionPublish,
            url: location.href,
            views: 0,
            loading: false,
        };
    },
    computed: {
        edit_link: function () {
            return editLink("collection", this.collection.id);
        },
        id: function () {
            return this.collection?.id;
        },
        author_id: function () {
            return this.collection?.user_id || 0;
        },
        canEdit: function () {
            return this.author_id == User.getInfo().uid || User.isEditor();
        },
        title: function () {
            return this.collection.title;
        },
    },
    watch: {
        "$route.params.id": {
            immediate: true,
            handler(id) {
                if (id) {
                    this.loadData(id);
                    this.execStat(id);
                }
            },
        },
    },
    methods: {
        getThumbnail,
        getLink,
        getTypeLabel,
        showAvatar,
        resolveImagePath,
        dateFormat: function (timestamp) {
            return dateFormat(new Date(timestamp * 1000));
        },
        delete_handle($event, collection_id) {
            $event.preventDefault();
            this.$confirm("确认是否删除该剑三小册？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                removeCollection(collection_id).then((data) => {
                    this.$message.success("删除成功");
                    this.$router.push({ name: "collection" });
                });
            });
        },
        loadData: function (id) {
            this.loading = true;
            getCollection(id)
                .then((res) => {
                    this.collection = res?.data?.data || {};
                    this.$store.state.user_id = this.collection.user_id;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        execStat: function (id) {
            postStat("collection", id);
            getStat("collection", id).then((res) => {
                this.views = res.data.views || 0;
            });
        },
    },
    filters: {
        authorLink,
    },
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/collection/collection.less";
.m-single-header {
    padding-top: 0;
}
</style>
