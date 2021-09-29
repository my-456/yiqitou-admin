<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">内容管理</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="text item">
        <div class="header-tab">
          <el-radio-group v-model="radio1" @change="onChange">
            <el-radio-button label="false">全部</el-radio-button>
            <el-radio-button label="true">收藏</el-radio-button>
          </el-radio-group>
          <el-button type="success" plain @click="dialogVisible = true"
            >点击上传</el-button
          >
        </div>
        <el-row :gutter="20">
          <el-col
            class="img"
            :xl="4"
            :sm="6"
            :md="6"
            :lg="4"
            v-for="image in imageList"
            :key="image.id"
            >
              <el-image
                style="width: 150px; height: 150px"
                :src="image.url"
              ></el-image>
              <div class="imgBtn">
                <el-button
                  :loading="image.loading"
                  @click="onCollect(image)"
                  type="warning"
                  :icon="image.is_collected?'el-icon-star-on':'el-icon-star-off'"
                  circle
                  size="small"
                ></el-button>
                <el-button @click="onDelete(image)" type="danger" icon="el-icon-delete" circle size="small"></el-button>
              </div>
              </el-col>
        </el-row>
      </div>
    </el-card>
    <el-dialog
      title="上传图片"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :modal-append-to-body="false"
    >
      <el-upload
        class="upload-demo"
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        :headers="header"
        multiple
        name="image"
        :on-success="uploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>

    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        @current-change="onCurrentChange"
        :page-size='pages.per_page'
        :current-page.sync="pages.page"
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getImage, collectImage, deleteImage } from '../../api/image'
export default {
  data () {
    return {
      isActive: true,
      total: 0,
      dialogVisible: false,
      radio1: false,
      imageList: [],
      collect: false,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      header: {},
      pages: {
        collect: false,
        page: 1,
        per_page: 10
      }
    }
  },
  created () {
    console.log('mapState', this.$store.state.user)
    const user = this.$store.state.user
    const header = {
      Authorization: `Bearer ${JSON.parse(user).token}`
    }
    this.header = header
    this.getImage()
  },
  methods: {
    async getImage () {
      this.pages.collect = this.collect
      const res = await getImage(this.pages)
      console.log('图片', res)
      const result = res.data.data.results
      result.forEach(v => {
        v.loading = false
      })
      this.imageList = result
      this.total = res.data.data.total_count
    },
    onChange (e) {
      console.log('bol', e)
      this.collect = e
      this.pages.page = 1
      this.getImage()
    },
    handleClose () {
      this.dialogVisible = false
    },
    // 图片上传成功
    uploadSuccess () {
      this.dialogVisible = false
      this.getImage()
      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },
    // 点击收藏图标
    onCollect (image) {
      image.loading = true
      console.log(this.imageList, image.id, image.is_collected, image.loading)
      collectImage(image.id, !image.is_collected).then(res => {
        // 更新视图状态
        image.is_collected = !image.is_collected
        // 关闭 loading
        image.loading = false
      })
    },
    // 删除图片
    onDelete (image) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        console.log(image)
        await deleteImage(image.id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 分页
    onCurrentChange (page) {
      console.log('分页', page)
      this.pages.page = page
      this.getImage()
    }
  }
}
</script>

<style lang="less">
.header-tab {
  width: 100%;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
[class*=el-col-]{
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 0;
  position: relative;
}

.el-dialog{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 600px;
}

.imgBtn{
  width: 150px;
  height: 30px;
  background: #222222;
  opacity: 0.5;
  position: absolute;
  bottom: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  i{
    color: #fff;
    opacity: 1
  }
}

</style>
