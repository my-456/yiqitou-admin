<template>
  <div class="info">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">内容管理</a></el-breadcrumb-item>
        </el-breadcrumb>
        <div style="margin-top:20px">
          <el-button @click="uploadArticle" type="primary">上传</el-button>
        </div>
      </div>
      <div class="text item">
      </div>
    </el-card>
    <div style="height:20px"></div>
    <el-card class="box-card-table">
      <div class="text item">
        <el-table :data="infoList" stripe style="width: 100%">
          <el-table-column align="center" prop="date" label="封面" width="auto">
             <template slot-scope="scope">
               <img :src='scope.row.title_img' class="image" alt="">
             </template>
          </el-table-column>
          <el-table-column align="center" prop="now_person" label="项目人数" width="auto"> </el-table-column>
           <el-table-column align="center" prop="schedule" label="项目进度" width="auto"> </el-table-column>
          <el-table-column align="center" prop="target_money" label="项目总额" width="auto"> </el-table-column>
          <el-table-column align="center" prop="date_end" label="截止时间" width="auto"> </el-table-column>
          <el-table-column align="center" prop="address" label="操作" width="auto">
            <template slot-scope="scopd">
              <el-button
                size="mini"
                circle
                icon="el-icon-edit"
                type="primary"
                @click="$router.push('/publish?id='+scopd.row.id.toString())"
              >
              </el-button>
              <el-button
                type="danger"
                size="mini"
                circle
                icon="el-icon-delete"
                @click="deleteArticle(scopd.row.id)"
              >
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page.sync="pages.page" :page-size="pages.per_page" @current-change="onCurrentChange" class="feny" background layout="prev, pager, next" :total="total_count">
        </el-pagination>
      </div>
    </el-card>
    <info-upload :title="edit.title" :infoDialog="edit.infoDialog"/>
  </div>
</template>

<script>
import { getList } from '@/api/info.js'
import InfoUpload from './conmponent/info-upload.vue'
export default {
  name: 'infoIndex',
  components: {
    InfoUpload
  },
  data () {
    return {
      edit: {
        title: '',
        infoDialog: false
      },
      selectInfo: [],
      pages: {
        page: 1,
        per_page: 10,
        status: null,
        channel_id: ''
      },
      total_count: 0,
      infoList: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      const res = await getList()
      console.log(res)
      this.infoList = res.data
    },
    uploadArticle () {
      console.log('上传')
      this.edit.title = '上传'
      this.edit.infoDialog = true
    },
    closeEdit () {
      this.edit.infoDialog = false
    },
    deleteArticle () {},
    onCurrentChange () {},
    onSubmit () {}
  }
}
</script>

<style lang="less" scoped>
  .feny{
    margin-top: 20px;
  }

  .image{
    width:100px;
  }
</style>
