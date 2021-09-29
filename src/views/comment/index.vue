<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            ><a href="/comment">评论管理</a></el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <div>
        <el-table :data="articleList" style="width: 100%">
          <el-table-column align="center"  prop="title" label="标题" width="auto">
          </el-table-column>
          <el-table-column align="center" prop="total_comment_count" label="总评论数" width="auto">
          </el-table-column>
          <el-table-column align="center" prop="fans_comment_count" label="粉丝评论数" width="auto"> </el-table-column>
          <el-table-column align="center"  label="状态" width="auto">
            <template slot-scope="scope">
              {{ scope.row.comment_status?'正常':"关闭" }}
            </template>
          </el-table-column>
          <el-table-column align="center"  label="操作" width="auto">
            <template slot-scope="scope">
              <el-switch
                :disabled="scope.row.disabled"
                @change="onStatus(scope.row)"
                v-model="scope.row.comment_status"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <div class="block">
      <div style="height:20px"></div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getInfo, updateCommentArticleStatus } from '../../api/info'
export default {
  data () {
    return {
      articleList: [],
      currentPage: 1,
      total: 0,
      pageSize: 10
    }
  },
  created () {
    this.getAticles()
  },
  methods: {
    // 分页
    handleSizeChange (res) {
      this.pageSize = res
      this.getAticles()
      console.log('1', res)
    },
    handleCurrentChange (res) {
      this.currentPage = res
      this.getAticles()
      console.log('2', res)
    },
    // 获取评论列表
    async getAticles () {
      const data = {
        response_type: 'comment',
        page: this.currentPage,
        per_page: this.pageSize

      }
      const res = await getInfo(data)
      const result = res.data.data.results
      this.total = res.data.data.total_count
      result.forEach(v => {
        v.disabled = false
      })
      this.articleList = result
      console.log(res, '评论', result)
    },
    async onStatus (article) {
      console.log(article)
      article.disabled = true
      await updateCommentArticleStatus(article.id.toString(), article.comment_status)
      article.disabled = false
    }
  }
}
</script>

<style>
</style>
