<template>
    <li class="u-item">
        <!-- Banner -->
        <a
            class="u-banner"
            :href="postLink(item.ID)"
            :target="target"
            v-reporter="{
                data: {
                    href: reporterLink(item.ID),
                },
                caller,
            }"
        >
            <img :src="getBanner(item.post_banner, item.post_subtype)" :key="item.ID" />
            <span class="u-subject" :class="subject || 'ALL'">{{ subject || "ALL" }}</span>
        </a>

        <!-- 标题 -->
        <h2 class="u-post" :class="{ isSticky: item.sticky }">
            <!-- 图标 -->
            <!-- <img class="u-icon" svg-inline src="../../assets/img/list/post.svg" /> -->
            <img class="u-icon" :src="item.post_subtype | xficon" :alt="item.post_subtype" :title="item.post_subtype" />

            <!-- 资料片 -->
            <span class="u-label u-zlp" v-if="item.zlp">{{ item.zlp }}</span>

            <!-- 标题文字 -->
            <a
                class="u-title"
                :style="item.color | showHighlight"
                :href="postLink(item.ID)"
                :target="target"
                v-reporter="{
                    data: {
                        href: reporterLink(item.ID),
                    },
                    caller,
                }"
                >{{ item.post_title || "无标题" }}</a
            >

            <!-- 角标 -->
            <span class="u-marks" v-if="item.mark && item.mark.length">
                <i v-for="mark in item.mark" class="u-mark" :key="mark">{{ mark | showMark }}</i>
            </span>

            <span class="u-push" v-if="isEditor">
                <time v-if="showPushDate" class="u-push__time" :class="{'is-recent': isRecent()}">{{ pushDate }} 已推送</time>
                <el-button class="u-push__btn" size="mini" type="warning" @click="onPush" icon="el-icon-s-promotion">推送</el-button>
            </span>
        </h2>

        <!-- 字段 -->
        <div class="u-content u-desc">
            <!-- {{ item.post_excerpt || item.post_title || "这个作者很懒,什么都没有留下" }} -->
            <div class="u-metalist u-collection">
                <strong>小册</strong>
                <em>
                    <template v-if="~~item.post_collection">
                        <a :href="`/collection/${item.post_collection}`" target="_blank"
                            >《{{ item.collection_info && item.collection_info.title }}》</a
                        >
                    </template>
                    <template v-else>-</template>
                </em>
            </div>
            <div class="u-metalist u-topics">
                <strong>主题</strong>
                <em>
                    <template v-if="item.topics && item.topics.length">
                        <a class="u-topic" :href="`/bps?topic=${topic}`" v-for="topic in item.topics" :key="topic">{{
                            topic
                        }}</a>
                    </template>
                    <template v-else>-</template>
                </em>
            </div>
        </div>

        <!-- 作者 -->
        <div class="u-misc">
            <img class="u-author-avatar" :src="item.author_info | showAvatar" :alt="item.author_info | showNickname" />
            <a class="u-author-name" :href="item.post_author | authorLink" target="_blank">{{
                item.author_info | showNickname
            }}</a>
            <span class="u-date">
                Updated on
                <time v-if="order == 'update'">{{ item.post_modified | dateFormat }}</time>
                <time v-else>{{ item.post_date | dateFormat }}</time>
            </span>
        </div>
    </li>
</template>

<script>
import { appKey } from "@/../setting.json";
import { showAvatar, authorLink, showBanner, buildTarget } from "@jx3box/jx3box-common/js/utils";
import { __ossMirror, __imgPath } from "@jx3box/jx3box-common/data/jx3box";
import { cms as mark_map } from "@jx3box/jx3box-common/data/mark.json";
import { showDate } from "@jx3box/jx3box-common/js/moment.js";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import User from "@jx3box/jx3box-common/js/user";
import dayjs from "dayjs";
import bus from "@/utils/bus";

export default {
    name: "ListItem",
    props: ["item", "order", "caller"],
    components: {},
    data: function () {
        return {
            target: buildTarget(),
        };
    },
    computed: {
        subject: function () {
            let subject = "";
            if (this.item.tags?.includes("PVE") && this.item.tags?.includes("PVP")) {
                subject = "ALL";
            } else if (this.item.tags?.includes("PVE")) {
                subject = "PVE";
            } else if (this.item.tags?.includes("PVP")) {
                subject = "PVP";
            }
            return subject;
        },
        client() {
            return this.item?.client;
        },
        isEditor() {
            return User.isEditor();
        },
        pushDate({item}) {
            const date = item?.log?.push_at
            return showDate(new Date(date));
        },
        showPushDate() {
            return Boolean(this.item?.log);
        },
    },
    methods: {
        getBanner: function (val, subtype) {
            if (val) {
                return showBanner(val);
            } else {
                let img_name = (subtype && xfmap[subtype]?.["id"]) || 0;
                return __imgPath + "image/bps_thumbnail/" + img_name + ".png";
            }
        },
        postLink: function (val) {
            return location.origin + `/${appKey}/` + val;
        },
        reporterLink: function (val) {
            const prefix = this.client === 'std' ? 'www' : 'origin'
            return`${prefix}:/${appKey}/` + val;
        },
        showDate,
        // 是否为30天内
        isRecent: function () {
            const date = this.item?.log?.push_at
            return dayjs().diff(dayjs(date), "day") < 30;
        },
        onPush() {
            bus.emit("design-task", this.item);
        },
    },
    filters: {
        authorLink,
        showHighlight: function (val) {
            return val ? `color:${val};font-weight:600;` : "";
        },
        showMark: function (val) {
            return mark_map[val] || val;
        },
        showAvatar: function (userinfo) {
            return showAvatar(userinfo?.user_avatar);
        },
        showNickname: function (userinfo) {
            return userinfo?.display_name || "匿名";
        },
        dateFormat: function (gmt) {
            return showDate(new Date(gmt));
        },
        xficon: function (val) {
            if (!val || val == "其它") val = "通用";
            let xf_id = xfmap[val] && xfmap[val]["id"];
            return __imgPath + "image/xf/" + xf_id + ".png";
        },
    },
    created: function () {},
    mounted: function () {},
};
</script>
