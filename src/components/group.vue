<template>
  <div class="m-group">
    <h2 class="c-sidebar-right-title m-title">
      <img class="u-icon" svg-inline src="../assets/img/puzzle.svg"/>
      <span class="u-text">各职业门派群</span>
      <a
          class="u-show-message"
          target="_blank"
          href="https://www.jx3box.com/tool/13659/"
      >申请展示</a
      >
    </h2>
    <el-collapse accordion v-if="groups && JSON.stringify(groups) !== '{}'">
      <el-collapse-item
          v-for="(school, key) in groups"
          :title="key"
          :key="key"
          :name="key"
      >
        <ul class="u-groups">
          <li v-for="(group, k) in school" :key="k">
            <el-tag
                class="u-kungfu"
                v-if="group.kungfu"
                size="mini"
                effect="dark"
                :style="{backgroundColor: kungfu_color(group.kungfu)}"
                v-text="`${group.kungfu}`"
            ></el-tag>
            <el-tag
                class="u-platform"
                v-if="group.platform == 'QQ'"
                size="mini"
                v-text="`${group.platform}群`"
            ></el-tag>
            <el-tag
                class="u-platform"
                v-if="group.platform == 'YY'"
                size="mini"
                type="info"
                v-text="`${group.platform}群`"
            ></el-tag>
            <el-button
                class="u-number"
                size="mini"
                v-text="group.number"
                v-clipboard:copy="group.number"
                v-clipboard:success="copy_success"
                v-clipboard:error="copy_error"
            ></el-button>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
    <div v-else class="u-groups-empty">暂无相关群组</div>
  </div>
</template>

<script>
  import {get_groups} from '../service/group';
  import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";

  export default {
    name: "group",
    data() {
      return {
        groups: null,
      };
    },
    methods: {
      copy_success() {
        this.$notify({title: "复制成功", type: "success"});
      },
      copy_error() {
        this.$notify({title: "浏览器不支持", type: "error"});
      },
      kungfu_color(val){
        return xfmap[val] ? xfmap[val]["color"] : '';
      }
    },
    mounted: function () {
      // 获取群组
      get_groups('bps', {order_by: 'school', group_by: 'school'}).then(
        (data) => {
          data = data.data;
          if (data.code === 200) {
            this.groups = data.data.groups;
          }
        },
        () => {
          this.groups = false;
        }
      )
    },
  };
</script>

<style lang="less">
  @import "../assets/css/group.less";
</style>
