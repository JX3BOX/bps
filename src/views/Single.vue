<template>
    <SingleLayout>
        <singlebox :post="post" :stat="stat" v-loading="loading" @extendUpdate="updateExtend">
            <template slot="single-header">
                <div class="u-meta u-sub-block">
                    <em class="u-label">心法</em>
                    <span class="u-value">
                        <img class="u-icon-xf" :src="xficon(xficon_id)" :alt="xf" />
                        {{ xf }}
                    </span>
                </div>
                <div class="u-meta u-sub-block">
                    <em class="u-label">资料片</em>
                    <span class="u-value">{{ zlp }}</span>
                </div>
            </template>
        </singlebox>
    </SingleLayout>
</template>

<script>
// 依赖模块
import SingleLayout from "@/layout/SingleLayout.vue";
import singlebox from "@/components/cms-single";

// 本地数据
import { getPost } from "@/service/post.js";
import { getStat, postStat, postHistory, postReadHistory } from "@jx3box/jx3box-common/js/stat";
import { appKey } from "@/../setting.json";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import { __ossRoot, __ossMirror, __iconPath, __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import User from "@jx3box/jx3box-common/js/user";

export default {
    name: "single",
    data: function () {
        return {
            loading: false,
            post: {},
            stat: {},
        };
    },
    computed: {
        post_subtype: function () {
            return this?.post?.post_subtype || "其它";
        },
        id: function () {
            return this.$route.params.id;
        },
        xf: function () {
			return this.post?.post_subtype;
		},
        xficon_id: function () {
			return this.xf && xfmap[this.xf]?.id;
		},
        zlp: function () {
			return this.post?.zlp || "未知";
		},
    },
    methods: {
        updateExtend: function (val) {
            this.$store.state.extend = val;
        },
        xficon: function (val) {
			return __imgPath + "image/xf/" + val + ".png";
		},
    },
    mounted: function () {
        if (this.id) {
            this.loading = true;
            getPost(this.id)
                .then((res) => {
                    this.post = this.$store.state.post = res.data.data;
                    this.$store.state.id = this.id;
                    this.$store.state.user_id = this.post?.post_author;

                    document.title = this.post.post_title;

                    if (User.isLogin()) {
                        User.isLogin() && postHistory({
                            source_type: appKey,
                            source_id: ~~this.id,
                            link: location.href,
                            title: this.post.post_title,
                        });

                        this.post.visible > 1 && postReadHistory({ id: this.id, category: "posts", subcategory: "default", visible_type: this.post.visible });
                    }

                })
                .finally(() => {
                    this.loading = false;
                });

            getStat(appKey, this.id).then((res) => {
                this.stat = this.$store.state.stat = res.data;
            });
            postStat(appKey, this.id);
        }
    },
    components: {
        singlebox,
        SingleLayout,
    },
};
</script>

<style lang="less">
    @import '~@/assets/css/single.less';
</style>
