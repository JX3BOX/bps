<template>
    <div class="m-list-nav">
        <h5 class="u-title">
            心法导航
            <router-link class="u-more" :to="{ query: { subtype: '' } }">全部心法 &raquo;</router-link>
        </h5>
        <ul class="m-bps-nav u-list">
            <li class="u-item" v-for="(item, i) in xfmap" :key="i" v-show="item.client.includes(client)">
                <router-link class="u-link" :class="{ 'router-link-exact-active': activeName === item.name }" :to="{ query: { subtype: item.name, tab: tab } }">
                    <i class="u-pic">
                        <img :src="item.id | xficon" :alt="item.name" />
                    </i>
                    <span class="u-txt">{{ item.name }}</span>
                </router-link>
            </li>
        </ul>

        <h5 class="u-title">在线应用</h5>
        <div class="m-nav-group">
            <a href="/app/database" target="_blank">
                <i class="el-icon-suitcase"></i>
                <span>剑三数据库</span>
                <!-- <i class="u-mark isnew">全新上线</i> -->
            </a>
            <a href="/pz" target="_blank">
                <i class="el-icon-shopping-bag-1"></i>
                <span>在线配装</span>
            </a>
            <router-link to="/haste">
                <i class="el-icon-stopwatch"></i>
                <span>急速阈值</span>
            </router-link>
            <router-link to="/dps">
                <i class="el-icon-cpu"></i>
                <span>DPS计算器</span>
            </router-link>
        </div>
    </div>
</template>

<script>
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import { __ossMirror, __imgPath, __ossRoot } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "list_nav",
    props: [],
    computed: {
        client: function() {
            return this.$store.state.client;
        },
        tab: function() {
            return this.$route.query.tab;
        },
        activeName: function() {
            return this.$route?.query?.subtype;
        },
        xfmap() {
            delete xfmap['山居剑意']
            return xfmap
        }
    },
    methods: {
        navLink: function(val) {
            return `./?subtype=${val}` + "#" + this.$route.path;
        },
    },
    filters: {
        xficon: function(val) {
            return __imgPath + "image/xf/" + val + ".png";
        },
    },
    mounted: function() {},
    components: {},
};
</script>

<style lang="less">
@import "../../assets/css/nav.less";
</style>
