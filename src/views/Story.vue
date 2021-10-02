<template>
    <div class="v-story" v-loading="loading">
        <el-tabs v-show="isSchool" v-model="active" type="card" @tab-click="loadData">
            <el-tab-pane label="门派背景" name="introduction"></el-tab-pane>
            <el-tab-pane label="门派事记" name="history"></el-tab-pane>
            <el-tab-pane label="门派人物" name="person"></el-tab-pane>
        </el-tabs>

        <div class="m-bps-story">
            <template v-if="data">
                <div class="u-introduction" v-if="active == 'introduction'">
                    <p v-for="(p, i) in data" :key="i">{{ p && p.desc }}</p>
                </div>
                <div class="u-history" v-if="active == 'history'">
                    <div class="u-item" v-for="(history, i) in data" :key="i">
                        <h2 class="u-title u-name">{{ history.name }}</h2>
                        <p v-for="(p, j) in history.descs" :key="j">{{ p && p.desc }}</p>
                    </div>
                </div>
                <div class="u-person" v-if="active == 'person'">
                    <div class="u-item" v-for="(person, i) in data" :key="i">
                        <h2 class="u-title">
                            <span class="u-name">{{ person.name }}</span>
                            <span
                                class="u-desc"
                                :class="'v' + person.level"
                            >{{ person.nameDesc || person.jobDesc }}</span>
                            <span class="u-age">{{ person.age }}</span>
                        </h2>

                        <p v-for="(p, j) in person.descs" :key="j">{{ p && p.desc }}</p>
                    </div>
                </div>
            </template>
            <el-alert v-else title="没有相关资料" type="info" show-icon></el-alert>
        </div>
    </div>
</template>

<script>
import { getStory } from "../service/story";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
export default {
    name: "Story",
    props: [],
    data: function () {
        return {
            active: "introduction",
            data: "",
            loading: false,
        };
    },
    computed: {
        xf: function () {
            return this.$route.query.subtype || "通用";
        },
        force: function () {
            return xfmap[this.xf]["force"];
        },
        isSchool: function () {
            return !!this.force;
        },
    },
    methods: {
        loadData: function () {
            this.loading = true;
            getStory(this.active, this.force)
                .then((res) => {
                    // console.log(res.data.data);
                    let data = res.data.data;
                    if (data) {
                        // 门派背景
                        if (this.active == "introduction") {
                            data.descs.sort((a, b) => {
                                return a.part - b.part;
                            });
                            this.data = data.descs;
                        } else {
                            data.sort((a, b) => {
                                return a.index - b.index;
                            });
                            data.forEach((item) => {
                                item.descs.sort((a, b) => {
                                    return a.part - b.part;
                                });
                            });
                            this.data = data;
                        }
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
    mounted: function () {
        this.loadData();
    },
    watch: {
        xf: function () {
            this.loadData();
        },
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/story.less";
</style>
