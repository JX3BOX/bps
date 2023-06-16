<template>
    <div class="m-collection-item">
        <a class="u-image" :href="`/collection/${data.id}`" target="_blank">
            <img :src="data.image | getCover" />
        </a>
        <div class="u-content">
            <a class="u-title" :href="`/collection/${data.id}`" target="_blank">
                <!-- <i class="el-icon-collection"></i> -->
                {{ data.title }}
            </a>
            <div class="u-info" v-if="data.collection_user_info">
                <a :href="data.collection_user_info.user_id | authorLink" class="u-user" target="_blank">
                    <img class="u-avatar" :src="data.collection_user_info.user_avatar | showAvatar" />
                    <span class="u-nickname" v-text="data.collection_user_info.display_name"></span>
                </a>
                <!-- <ul class="u-tags" v-if="data.tags && data.tags.length">
                    <li v-for="(tag, key) in data.tags" :key="key" v-text="tag" class="u-tag"></li>
                </ul>-->
            </div>
            <!-- <div
                class="u-excerpt"
                v-html="data.excerpt"
                v-if="data.excerpt"
            ></div>-->
            <div class="u-posts">
                <!-- <i class="el-icon-notebook-2"></i> -->
                <!-- <span class="u-posts-title">小册文章：</span> -->
                <el-row :gutter="80">
                    <el-col :span="6" v-for="(post, key) in data.posts.slice(0, 8)" :key="key">
                        <a
                            class="u-post"
                            :href="post.type === 'custom' ? post.url : getLink(post.type, post.id)"
                            target="_blank"
                        >
                            <i class="el-icon-notebook-2"></i>
                            {{ post.title }}
                        </a>
                    </el-col>
                </el-row>
            </div>
            <div class="u-meta">
                <span class="u-updated">
                    <i class="el-icon-refresh"></i>
                    最后更新于{{ dateFormat(data.updated) }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { showAvatar, getLink, resolveImagePath, authorLink } from "@jx3box/jx3box-common/js/utils";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import dateFormat from "@/utils/dateFormat.js";
export default {
    name: "CollectionItem",
    props: ["data"],
    components: {},
    data: function () {
        return {};
    },
    computed: {},
    watch: {},
    methods: {
        getLink,
        dateFormat: function (timestamp) {
            return dateFormat(new Date(timestamp * 1000));
        },
    },
    filters: {
        getCover: function (val) {
            return val ? resolveImagePath(val) : `${__imgPath}image/collection/default_cover.png`;
        },
        authorLink,
        showAvatar: function (url) {
            return showAvatar(url);
        },
    },
    created: function () {},
    mounted: function () {},
};
</script>
