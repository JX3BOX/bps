<template>
    <singlebox :post="post" :stat="stat" v-loading="loading" @extendUpdate="updateExtend">
        <!-- 子类别 -->
        <div class="u-meta u-sub-block" slot="single-header">
            <em class="u-label">心法</em>
            <span class="u-value">
                {{ post_subtype }}
            </span>
        </div>
    </singlebox>
</template>

<script>
// 依赖模块
import singlebox from "@jx3box/jx3box-common-ui/src/single/cms-single";

// 本地数据
import { getPost } from "../../service/post.js";
import { getStat, postStat } from "@jx3box/jx3box-common/js/stat";
import { appKey } from "../../../setting.json";
export default {
    name: "single",
    props: ["id"],
    data: function() {
        return {
            loading: false,
            post: {},
            stat: {},
        };
    },
    computed: {
        post_subtype: function() {
            return this?.post?.post_subtype || '其它';
        },
    },
    methods: {
        updateExtend : function (val){
            this.$store.state.extend = val
        }
    },
    mounted: function() {
        if (this.id) {
            this.loading = true;
            getPost(this.id)
                .then((res) => {

                    this.post = this.$store.state.post = res.data.data;
                    this.$store.state.id = this.id;
                    this.$store.state.user_id = this.post?.post_author;

                    document.title = this.post.post_title;
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
    },
};
</script>

