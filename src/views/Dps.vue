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
			<el-table :data="list" empty-text="没有找到对应的DPS计算器，请重新搜索">
				<el-table-column label="心法" :filters="xfList" :filter-method="filterXf">
					<template slot-scope="scope">
						<div class="u-xf" :style="xfImg(scope.row.xfImg)">{{ scope.row.xfName }}</div>
					</template>
				</el-table-column>
				<el-table-column label="作者">
					<template slot-scope="scope">
						<a :href="userLink(scope.row.user.ID)" target="_blank" class="u-user">
							<img class="u-img" :src="userAvatar(scope.row.user.user_avatar)" alt="" srcset="" />
							<span>{{ scope.row.user.display_name }}</span>
						</a>
					</template>
				</el-table-column>
				<el-table-column label="名称">
					<template slot-scope="scope">
						<a class="u-name" :href="scope.row.url" target="_blank">{{ scope.row.name }}</a>
					</template>
				</el-table-column>
				<el-table-column prop="client" label="客户端" :filters="client" :filter-method="filterClient"></el-table-column>
				<el-table-column prop="type" label="计算器类型" :filters="type" :filter-method="filterType"></el-table-column>
			</el-table>
		</div>

		<!-- 下一页 -->
		<el-button class="m-dps-more" v-show="hasNextPage" type="primary" @click="appendPage" :loading="loading" icon="el-icon-arrow-down">加载更多</el-button>

		<!-- 分页 -->
		<el-pagination class="m-dps-pages" background layout="total, prev, pager, next, jumper" :hide-on-single-page="true" :page-size="per" :total="total" :current-page.sync="page" @current-change="changePage"></el-pagination>
	</div>
</template>

<script>
import { getDpsCompute } from "@/service/helper.js";
import _xf from "@jx3box/jx3box-data/data/xf/xfid.json";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box";
import { showAvatar, authorLink } from "@jx3box/jx3box-common/js/utils";
export default {
	name: "Dps",
	props: [],
	components: {},
	data: function () {
		return {
			loading: false, //加载状态

			search: "",
			list: [],
			xfList: [],
			client: [
				{ key: "std", value: "正式服", text: "正式服" },
				{ key: "origin", value: "怀旧服", text: "怀旧服" },
				{ key: "all", value: "双端", text: "双端" },
			],
			type: [
				{ key: "jx3box", value: "魔盒DPS计算器", text: "魔盒DPS计算器" },
				{ key: "excel", value: "xls表格", text: "xls表格" },
				{ key: "other", value: "其他客户端或web", text: "其他客户端或web" },
			],

			page: 1, //当前页数
			per: 20, //每页条目
			total: 1, //总条目数

			append: false,
		};
	},
	computed: {
		// 是否显示加载更多
		hasNextPage: function () {
			return this.pages > 1 && this.page < this.pages;
		},
		//提交查询参数
		params: function () {
			return this.search == ""
				? {
						page: this.page,
						limit: this.per,
				  }
				: {
						page: this.page,
						limit: this.per,
						name: this.search,
				  };
		},
		//总页数
		pages: function () {
			return Math.ceil(this.total / this.per);
		},
	},
	methods: {
		//获取数据
		getData() {
			this.loading = true;
			getDpsCompute(this.params).then((res) => {
				this.total = res.data.data.total;
				let list = this.convertList(res.data.data.list);
				this.append ? (this.list = this.list.concat(list)) : (this.list = list);
				this.loading = false;
			});

			for (const key in _xf) {
				this.xfList.push({
					text: _xf[key],
					value: _xf[key],
				});
			}
		},
		//转换list数据
		convertList(list) {
			list.map((l) => {
				let client = this.client.find((k) => k.key == l.client);
				let type = this.type.find((k) => k.key == l.type);
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
		//过滤心法
		filterXf(value, row) {
			return row.xfName === value;
		},
		//过滤客户端
		filterClient(value, row) {
			return row.client === value;
		},
		//过滤类型
		filterType(value, row) {
			return row.type === value;
		},
		// 翻页加载
		changePage: function (i) {
			this.page = i;
			this.append = false;
			this.getData();
		},
		// 追加加载
		appendPage: function () {
			this.append = true;
			this.page += 1;
			this.getData();
		},
	},
	watch: {
		search(val) {
			this.page = 1;
			this.list = [];
			this.getData();
		},
	},
	created: function () {
		this.getData();
	},
};
</script>

<style lang="less">
@import "~@/assets/css/dps.less";
</style>
