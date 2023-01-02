<template>
    <div class="m-skill-wiki" v-loading="loading">
        <div class="u-trigger" @click="loadWiki" v-show="!wiki_post">查看百科</div>

        <div class="m-wiki-post-panel" v-if="wiki_post && wiki_post.post">
            <WikiPanel :wiki-post="wiki_post" :showQR="false">
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
                    <div class="m-wiki-compatible" v-if="compatible">
                        <i class="el-icon-warning-outline"></i> 暂无缘起技能百科，以下为重制版百科，仅作参考，<a
                            class="s-link"
                            :href="publish_url(`skill/${id}`)"
                            >参与修订</a
                        >。
                    </div>
                    <Article :content="wiki_post.post.content" />
                    <div class="m-wiki-signature">
                        <i class="el-icon-edit"></i>
                        本次修订由 <b>{{ user_name }}</b> 提交于{{ updated_at }}
                    </div>
                </template>
            </WikiPanel>

            <!-- 历史版本 -->
            <WikiRevisions type="skill" :source-id="id" />

            <!-- 百科评论 -->
            <WikiComments type="skill" :source-id="id" />
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
import { wiki } from "@jx3box/jx3box-common/js/wiki";
import { ts2str } from "@jx3box/jx3box-common/js/utils.js";
export default {
    name: "skill_wiki",
    components: {
        WikiPanel,
        Article,
        WikiRevisions,
        WikiComments,
    },
    props: ['skill'],
    data() {
        return {
            wiki_post: "",
            is_empty: false,
            compatible: false,
            loading: false,
        };
    },
    computed: {
        id: function () {
            return this.skill.SkillID;
        },
        client: function () {
            return this.$store.state.client || "std";
        },
        user_name: function () {
            return this.wiki_post?.post?.user_nickname;
        },
        updated_at: function () {
            return ts2str(this.wiki_post?.post?.updated);
        },
        author_id: function () {
            return ~~this.wiki_post.post.user_id;
        },
    },
    methods: {
        publish_url: publishLink,
        loadWiki() {
            // 获取最新攻略
            if (this.id) {
                this.loading = true;
                wiki.mix({ type: "skill", id: this.id, client: this.client }, { supply: 1 }).then((res) => {
                    const { post, source, compatible, isEmpty, users } = res;
                    this.wiki_post = {
                        post: post,
                        source: source,
                        users,
                    };
                    this.is_empty = isEmpty;
                    this.compatible = compatible;
                    this.loading = false;
                });
            }
        },
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
