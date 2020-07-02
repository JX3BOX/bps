<template>
    <div class="v-lua" v-loading="loading" v-if="isMember">
        <div class="m-lua-index m-lua-box">
            <div class="u-title">
                <i class="el-icon-collection-tag"></i>
                <span class="u-title-list" @click="showList">文件夹</span>
            </div>
            <div
                class="u-type"
                :class="{ on: current == type }"
                v-for="(icon, type) in schoolmap"
                :key="type"
                @click="changeType(type)"
            >
                <img class="u-typeicon" :src="type | iconURL" /><span>{{
                    type
                }}</span>
            </div>
        </div>
        <div class="m-lua-tree m-lua-box">
            <div class="u-title">
                <i class="el-icon-collection-tag"></i>
                <span class="u-title-list" @click="showList">文件列表</span>
                <span class="u-title-file"
                    ><i class="el-icon-arrow-right"></i> {{ file }}</span
                >
                <div class="u-back" @click="showList">
                    <i class="el-icon-caret-left"></i> 返 回
                </div>
            </div>
            <div
                class="u-item"
                v-show="group == current && !data"
                v-for="(item, group) in map"
                :key="group"
            >
                <div
                    class="u-subitem"
                    v-for="(subitem, subgroup) in item"
                    :key="subgroup"
                >
                    <div class="u-wrapper">
                        <div class="u-container" v-if="isDirectory(subitem)">
                            <div
                                class="u-folder"
                                @click="showSubtree($event, group + subgroup)"
                            >
                                <i class="el-icon-folder"></i> {{ subgroup }}
                            </div>
                            <div class="u-subtree" :ref="group + subgroup">
                                <div
                                    class="u-leaf"
                                    @click="showCode(lua)"
                                    v-for="(lua, i) in subitem"
                                    :key="i"
                                >
                                    <i class="el-icon-tickets"></i> {{ lua }}
                                </div>
                            </div>
                        </div>
                        <div class="u-leaf" @click="showCode(subitem)" v-else>
                            <i class="el-icon-tickets"></i> {{ subgroup }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="u-data" v-show="data">
                <div class="u-code" ref="lua">
                    <pre><code class="language-lua" id="lua">{{data}}</code></pre>
                </div>
            </div>
        </div>
    </div>
    <div class="v-null" v-else>
        <el-alert :title="isGuest ? '需要登录才能查看' : '仅邮箱验证用户可见'" type="warning" show-icon>
        </el-alert>
    </div>
</template>

<script>
import { getMap, getLua } from "../service/lua";
import { __imgPath } from "@jx3box/jx3box-common/js/jx3box.json";
import schoolmap from "../assets/data/lua.json";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import "../plugins/prism.js";
import "../plugins/prism.css";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "Lua",
    props: [],
    data: function() {
        return {
            loading: false,
            map: {},
            schoolmap,
            current: "",
            data: "",
            file: "",
            isMember: false,
            isGuest: true,
        };
    },
    computed: {
        subtype: function() {
            return this.$store.state.subtype;
        },
        school: function() {
            let subtype = this.subtype || "通用";
            return xfmap[subtype]["school"];
        },
        school_name: function() {
            let names = Object.keys(schoolmap);
            let ids = Object.values(schoolmap);
            let i = ids.indexOf(this.school);
            if (i >= 0) {
                return names[i];
            } else {
                return "";
            }
        },
    },
    methods: {
        isDirectory: function(val) {
            return Array.isArray(val);
        },
        showSubtree: function(e, key) {
            this.$refs[key][0]["classList"].toggle("on");
        },
        showCode: function(path) {
            this.file = path;
            this.loadLua(path);
        },
        showList: function() {
            this.file = "";
            this.data = "";
        },
        loadMap: function() {
            this.loading = true;
            getMap()
                .then((data) => {
                    this.map = data;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        loadLua: function(path) {
            this.loading = true;
            getLua(path)
                .then((data) => {
                    this.data = data;
                })
                .then(() => {
                    let root = this.$refs.lua;
                    root && Prism.highlightAllUnder(root);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        changeType(type) {
            this.current = type;
            this.data = "";
        },
        checkPermission: function() {
            let group = User.getInfo().group;
            if (group > 1) this.isGuest = false;
            return group > 7;
        },
    },
    filters: {
        iconURL: function(val) {
            return __imgPath + "image/school/" + schoolmap[val] + ".png";
        },
    },
    mounted: function() {
        this.isMember = this.checkPermission()
        if (this.isMember) {
            this.current = this.school_name;
            this.loadMap();
        }
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/lua.less";
</style>
