<template>
    <div class="m-dps" v-loading="loading">
        <!-- 搜索 -->
        <div class="m-dps-search">
            <el-input v-model.trim.lazy="search" placeholder="请输入关键词..">
                <template slot="prepend"> <i class="el-icon-search"></i> 搜索 </template>
                <template slot="append">
                    <i class="el-icon-position"></i>
                </template>
            </el-input>
        </div>
        <!-- 表格 -->
        <div class="m-dps-list">
            <el-table :data="list" empty-text="没有找到对应的DPS计算器，请重新搜索" @cell-click="openLink" @filter-change="filterChange">
                <el-table-column label="心法" :filters="xfList" column-key="xf" :filter-multiple="false">
                    <template slot-scope="scope">
                        <div class="u-xf">
                            <img class="u-xf-icon" :src="showMountIcon(scope.row.mount)" /><span class="u-xf-name">{{ scope.row.xfName }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="名称">
                    <template slot-scope="scope">
						<i class="u-star" v-if="scope.row.star">★ 编辑推荐</i>
						<a class="u-name" :href="scope.row.url" target="_blank">{{ scope.row.name }}</a>
                    </template>
                </el-table-column>
                <el-table-column label="作者">
                    <template slot-scope="scope">
                        <a :href="userLink(scope.row.user.ID)" target="_blank" class="u-user" @click.stop="">
                            <img class="u-img" :src="userAvatar(scope.row.user.user_avatar)" alt="" srcset="" />
                            <span class="u-author">{{ scope.row.user.display_name }}</span>
                        </a>
                    </template>
                </el-table-column>

                <el-table-column prop="client" label="客户端" :filters="client" :filter-multiple="false" column-key="client"></el-table-column>
                <el-table-column prop="type" label="计算器类型" :filters="type" :filter-multiple="false" column-key="type"></el-table-column>
            </el-table>
        </div>

        <!-- 下一页 -->
        <el-button class="m-dps-more" v-show="hasNextPage" type="primary" @click="appendPage" :loading="loading" icon="el-icon-arrow-down">加载更多</el-button>

        <!-- 分页 -->
        <el-pagination
            class="m-dps-pages"
            background
            layout="total, prev, pager, next, jumper"
            :hide-on-single-page="true"
            :page-size="per"
            :total="total"
            :current-page.sync="page"
            @current-change="changePage"
        ></el-pagination>
    </div>
</template>

<script>
import { getDpsCompute } from "@/service/helper.js";
import _xf from "@jx3box/jx3box-data/data/xf/xfid.json";
import { __imgPath, __Domain, __Origin } from "@jx3box/jx3box-common/data/jx3box";
import { showAvatar, authorLink, showMountIcon } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Dps",
    data: function() {
        return {
            loading: false, //加载状态

            search: "",
            list: [],
            xfList: [],
            client: [
                { value: "std", text: "正式服" },
                { value: "origin", text: "怀旧服" },
                { value: "all", text: "双端" },
            ],
            type: [
                { value: "jx3box", text: "jx3box" },
                { value: "excel", text: "xls" },
                { value: "other", text: "其它" },
            ],

            page: 1,
            per: 50, //每页条目
            total: 1, //总条目数

            filterParams: {},
        };
    },
    computed: {
        // 是否显示加载更多
        hasNextPage: function() {
            return this.pages > 1 && this.page < this.pages;
        },
        //提交查询参数
        params: function() {
            return {
                page: this.page,
                limit: this.per,
                name: this.search,
            };
        },
        //总页数
        pages: function() {
            return Math.ceil(this.total / this.per);
        },
    },
    methods: {
        //获取数据
        getData(params = this.params) {
            this.loading = true;
            if (this.search == "") delete params.name;
            if (JSON.stringify(this.filterParams) !== "{}") params = { ...this.filterParams, ...params };
            getDpsCompute(params).then((res) => {
                this.total = res.data.data.total;
                let list = this.convertList(res.data.data.list);
                this.append ? (this.list = this.list.concat(list)) : (this.list = list);
                this.loading = false;
                this.append = false;
            });
        },
        //转换list数据
        convertList(list) {
            list.map((l) => {
                let client = this.client.find((k) => k.value == l.client);
                let type = this.type.find((k) => k.value == l.type);
                let xfName = _xf[l.mount];
                let xfImg = __imgPath + "image/xf/" + l.mount + ".png";
                l.client = client.text;
                l.type = type.text;
                l.xfName = xfName;
                l.xfImg = xfImg;
            });
            return list;
        },
        //心法图标
        xfImg(link) {
            return { backgroundImage: `url(" ` + link + `")` };
        },
        //用户头像
        userAvatar(id) {
            return showAvatar(id);
        },
        //用户链接
        userLink(id) {
            return authorLink(id);
        },
        //选择 -心法 -客户端 -类型
        filterChange(object) {
            for (const key in object) {
                if (key == "xf") {
                    object[key].length !== 0 ? (this.filterParams.mount = object[key][0]) : delete this.filterParams.mount;
                } else if (key == "client") {
                    object[key].length !== 0 ? (this.filterParams.client = object[key][0]) : delete this.filterParams.client;
                } else {
                    object[key].length !== 0 ? (this.filterParams.type = object[key][0]) : delete this.filterParams.type;
                }
            }
            this.getData();
        },
        // 翻页加载
        changePage: function(i) {
            this.page = i;
            this.getData();
        },
        // 追加加载
        appendPage: function() {
            this.append = true;
            this.page += 1;
            this.getData();
        },
        // 打开链接
        openLink(row) {
            window.open(row.url);
        },
        getXfList() {
            for (const key in _xf) {
                this.xfList.push({
                    text: _xf[key],
                    value: key,
                });
            }
        },
        showMountIcon,
    },
    watch: {
        search(val, old) {
            if (val !== old) {
                this.page = 1;
            }
            this.getData();
        },
    },
    created: function() {
        this.getXfList();
        this.getData();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/dps.less";
</style>
