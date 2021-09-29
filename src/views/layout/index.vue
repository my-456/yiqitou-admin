<template>
  <div class="layout">
    <el-container class="layoutBox">
      <el-aside width="auto"  class="aside">
        <Aside class="aside-menu" />
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from './component/aside.vue'
import Header from './component/header.vue'

export default {
  name: 'Layout',
  components: {
    Aside,
    Header
  },
  data () {
    return {}
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
.layoutBox {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
.aside {
  background-color: #d3dce6;
  .aside-menu {
    height: 100%;
  }
}

/deep/ .el-menu-item {
  text-align: left;
}
</style>
