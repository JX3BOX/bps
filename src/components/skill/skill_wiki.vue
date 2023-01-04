<template>
    <div class="m-skill-wiki">
        <div class="m-wiki-post-panel" v-if="wiki && wiki">
            <WikiPanel :wiki-post="wiki" :showQR="false">
                <template slot="head-title">
                    <span class="u-txt">技能百科</span>
                </template>
                <template slot="head-actions">
                    <a class="el-button el-button--primary" :href="publish_url(`skill/${id}`)">
                        <i class="el-icon-edit"></i>
                        <span>完善技能百科</span>
                    </a>
                </template>
                <template slot="body">
                    <Article :content="wiki.content" />
                    <div class="m-wiki-signature">
                        <i class="el-icon-edit"></i>
                        本次修订由 <b>{{ user_name }}</b> 提交于{{ updated_at }}
                    </div>
                </template>
            </WikiPanel>

            <el-collapse>
                <el-collapse-item>
                    <template slot="title">&emsp;<i class="el-icon-info"></i>&nbsp;更多内容</template>
                    <!-- 历史版本 -->
                    <WikiRevisions type="skill" :source-id="id" />

                    <!-- 百科评论 -->
                    <WikiComments type="skill" :source-id="id" />
                </el-collapse-item>
            </el-collapse>
        </div>
        <div class="m-wiki-post-empty" v-if="is_empty">
            <i class="el-icon-s-opportunity"></i>
            <span>暂无百科，我要</span>
            <a class="s-link" :href="publish_url(`skill/${id}`)">完善百科</a>
        </div>
    </div>
</template>

<script>
import Article from "@jx3box/jx3box-editor/src/Article.vue";
import WikiPanel from "@jx3box/jx3box-common-ui/src/wiki/WikiPanel";
import WikiRevisions from "@jx3box/jx3box-common-ui/src/wiki/WikiRevisions";
import WikiComments from "@jx3box/jx3box-common-ui/src/wiki/WikiComments";

import { publishLink } from "@jx3box/jx3box-common/js/utils";
import { ts2str } from "@jx3box/jx3box-common/js/utils.js";
export default {
    name: "skill_wiki",
    components: {
        WikiPanel,
        Article,
        WikiRevisions,
        WikiComments,
    },
    props: {
        wiki: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {};
    },
    computed: {
        id: function () {
            return this.wiki?.source_id;
        },
        client: function () {
            return this.$store.state.client || "std";
        },
        user_name: function () {
            return this.wiki?.user_nickname;
        },
        updated_at: function () {
            return ts2str(this.wiki?.updated);
        },
        author_id: function () {
            return ~~this.wiki?.user_id;
        },
        is_empty: function () {
            return !this.wiki;
        },
    },
    methods: {
        publish_url: publishLink,
    },
};
</script>

<style lang="less">
.m-skill-wiki {
    .mt(20px);
    .u-trigger {
        .pointer;
        .x;
        font-size: 12px;
        border-top: 1px dashed #eee;
        padding-top: 8px;
        i {
            .mr(3px);
        }
    }
}
.m-wiki-post-empty {
    .u-msg-yellow;
    .x;
    .s-link {
        .underline(@color-link);
    }
    letter-spacing: 2px;
    .fz(14px);
}

.m-wiki-compatible {
    .u-msg-yellow;
    margin: 10px auto;
    padding: 5px 10px;
    a {
        .underline(@color-link);
    }
}

.m-wiki-signature {
    .x(right);
    color: #999;
    .fz(12px,2);
    border-top: 1px dashed #ddd;
    padding: 5px 0;
}
</style>
