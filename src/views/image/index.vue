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
      </div>
    </el-card>
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
