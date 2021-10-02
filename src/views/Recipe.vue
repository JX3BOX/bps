<template>
  <el-row>
    <el-col :span="24">
      <div class="menu">
        <el-input v-model="skillName" placeholder="请输入技能名称"></el-input>
      </div>
      <div class="grid-content">
        <el-table
            :data="data"
            height="700"
            border
            style="width: 100%">
          <el-table-column
              prop="icon"
              label="秘籍图标"
              width="50">
            <template slot-scope="scope">
              <span v-html="geticonLink(scope.row.icon)"></span>
            </template>
          </el-table-column>
          <el-table-column
              prop="school_name"
              label="门派名称"
              width="50">
          </el-table-column>
          <el-table-column
              prop="skill_name"
              label="技能名称"
              sortable
              width="120">
          </el-table-column>
          <el-table-column
              prop="name"
              label="秘籍名称"
              cell-class-name="changeColor"
              sortable
              width="250">
          </el-table-column>
          <el-table-column
              prop="Desc"
              label="秘籍描述"
              width="350"
              >
          </el-table-column>
          <el-table-column
              prop="tasks"
              label="任务来源"
              :formatter="tasksData">
          </el-table-column>
          <el-table-column
              prop="books"
              label="书籍来源"
              :formatter="booksData">
          </el-table-column>
          <el-table-column
              prop="doodad_template_id"
              label="碑铭来源"
              :formatter="doodadTemplateIdData">
          </el-table-column>
          <el-table-column
              prop="exam_print"
              label="监本"
              width="50"
              >
          </el-table-column>
        </el-table>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {getRecipe} from '@/service/node.js'
import {mount_belong_school} from '@jx3box/jx3box-data/data/xf/relation.json'
import iconLink from '@jx3box/jx3box-common/js/utils'

export default {
    name: "Recipe",
    props: [],
    components: {},
    data: function () {
        return {
            data :[
                {
                  id:'',
                  name: '',
                  icon: '',
                  quality: '',
                  category: '',
                  school_name: '',
                  skill_name: '',
                  skillFilter:'',
                  tasks: [
                    { name: '' }
                  ],
                  books: [
                    { name: '' }
                  ],
                  doodad_template_id: [
                    { doodad_template_id: '', name: '' }
                  ],
                  exam_print: '',
                  Desc: '',
                  remark: ''
                }
              ],
            skillName : ''
        }
    },
    computed: {
        mount_name : function (){
            return this.$route.query.subtype || '通用'
        },
        school_name : function (){
            if(this.mount_name == '通用'){
                return '通用'
            }else{
                return mount_belong_school[this.mount_name]
            }
        },
        params : function (){
            return {
                school_name : this.school_name,
                search  : this.skillName
            }
        }
    },
    watch: {
        params : {
            deep : true,
            immediate : true,
            handler : function (){
                this.loadData()
            }
        }
    },
    methods: {
        // 加载秘籍
        loadData : function (){
            getRecipe(this.params).then((res) => {
                this.data = res.data
            })
        },
        tasksData(row, column, cellValue, index){
          let arr = []
          if(row.tasks == null){
            return
          }
          row.tasks.forEach((item, index)=>{
            if (index > 2) {
              return
            }
            arr.push(item.name);
          })
          return arr.join(',')
        },
        booksData(row, column, cellValue, index){
          let arr = []
          if(row.books == null){
            return
          }
          row.books.forEach((item, index)=>{
            if (index > 2) {
              return
            }
            arr.push(item.name);
          })
          return arr.join(',')
        },
        doodadTemplateIdData(row, column, cellValue, index){
          let arr = []
          if(row.doodad_template_id == null){
            return
          }
          row.doodad_template_id.forEach((item, index)=>{
            if (index > 2) {
              return
            }
            arr.push(item.name);
          })
          return arr.join(',')
        },
        geticonLink(icon){
          return "<img src='"+iconLink.iconLink(icon) +"' alt='秘籍图标'/>"
        },
        changeColor(row, column, rowIndex, columnIndex){
          console.log(row)
          console.log(column)
          console.log(rowIndex)
          console.log(columnIndex)
        }
    },
    filters: {iconLink},
    created: function () {
    },
    mounted: function () {},
};
</script>

<style lang="less">
@import "../assets/css/recipe.less";
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.el-input {
  width: 300px;
}
.grenn {
  color: green;
}
.red {
  color: red;
}
</style>