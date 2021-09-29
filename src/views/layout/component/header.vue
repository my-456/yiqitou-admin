<template>
  <div class="header">
    <div class="left-title">
      <i :class="[isCollapse?'el-icon-s-unfold':'el-icon-s-fold']" @click="cut"/>
      今日头条管理系统
    </div>
    <div>
      <el-dropdown hide-on-click>
        <div class="avatar">
            <img src="../../../assets/logo.png" alt="" style="width:30px;height:30px">
            <span>用户昵称</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item @click.native="out">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: this.$store.state.isCollapse
    }
  },
  methods: {
    cut () {
      this.isCollapse = !this.isCollapse
      this.$store.commit('setCollapse', this.isCollapse)
      console.log(111, this.$store.state.isCollapse)
    },
    out () {
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('user')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
      console.log('退出')
    }
  }
}
</script>

<style lang="less">
.header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.avatar{
  display: flex;
  justify-content: center;
  align-items: center;
  img{
      border-radius: 50%;
  }
}
</style>
