<template>
    <div class="v-lua" v-loading="loading" v-if="isSuperAuthor">
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
                    type == "item" ? "物品" : type
                }}</span>
            </div>
        </div>
        <!-- 搜索 -->
        <div class="m-lua-search">
            <el-input
                placeholder="请输入关键词"
                v-model="search"
                class="input-with-select"
                @change="searchLua"
            >
                <span slot="prepend"><i class="el-icon-search"></i> 搜索</span>
                <el-button
                    slot="append"
                    icon="el-icon-position"
                    @change="searchLua"
                ></el-button>
            </el-input>
        </div>
        <el-alert
            class="m-lua-warning"
            title="本功能仅内部作者可见，仅作为攻略写作的参考资料。禁止外传，违者后果自负！"
            type="warning"
            effect="dark"
            show-icon
            :closable="false"
        ></el-alert>
        <div class="m-lua-tree m-lua-box">
            <div class="u-title">
                <i class="el-icon-collection-tag"></i>
                <span class="u-title-list" @click="showList">文件列表</span>
                <span class="u-title-file"
                    ><i class="el-icon-arrow-right"></i> {{ file }}</span
                >
                <div class="u-back" @click="showList" v-if="data">
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
                    :class="{ isHidden: search && !hasResult(subitem) }"
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
                                    v-show="!search || lua.includes(search)"
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
                    <pre><code class="language-lua" id="lua" v-html="data"></code></pre>
                </div>
            </div>
        </div>
    </div>
    <div class="v-null" v-else>
        <el-alert type="warning" show-icon><span slot="title">没有查看权限，仅<a href="/dashboard/#cooperation" target="_blank">【签约作者】</a>可见。</span></el-alert>
    </div>
</template>

<script>
import { getMap, getLua } from "../service/lua";
import { __imgPath, __ossRoot } from "@jx3box/jx3box-common/data/jx3box.json";
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
            isSuperAuthor: false,
            search: "",
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
        client : function (){
            return this.$store.state.client || 'std'
        }
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
            this.file = this.current;
            this.data = "";
        },
        loadMap: function() {
            this.loading = true;
            getMap(this.client)
                .then((data) => {
                    this.map = data;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        loadLua: function(path) {
            this.loading = true;
            getLua(this.client,path)
                .then((res) => {
                    this.data = res.data;
                })
                .then(() => {
                    let root = this.$refs.lua;
                    root && Prism.highlightAllUnder(root);
                    this.$forceUpdate();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        changeType(type) {
            this.file = this.current = type;
            this.data = "";
            this.search = "";
        },
        hasResult: function(subitem) {
            if (this.isDirectory(subitem)) {
                for (let filename of subitem) {
                    if (filename.includes(this.search)) {
                        return true;
                        break;
                    }
                }
                return false;
            } else {
                return subitem.includes(this.search);
            }
        },
        searchLua: function() {
            if (this.data) {
                // this.$notify.error({
                //     title: "错误",
                //     message: "请切至指定目录再进行搜索",
                // });
                this.data = ''
            }
        },
    },
    filters: {
        iconURL: function(val) {
            return __imgPath + "image/school/" + schoolmap[val] + ".png";
        },
    },
    mounted: function() {
        User.isSuperAuthor().then((data) => {
            this.isSuperAuthor = data

            if (this.isSuperAuthor) {
                this.current = this.school_name;
                this.loadMap();
            }

            // TEST
            // this.loadLua()
        })
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/lua.less";
</style>
