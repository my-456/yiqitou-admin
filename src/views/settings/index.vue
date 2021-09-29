<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            ><a href="/settings">个人设置</a></el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <div class="info-box">
         <div class="leftBox">
         <el-form ref="form" :model="form" label-width="80px" >
           <el-form-item label="编号">
            {{user.id}}
           </el-form-item>
           <el-form-item label="手机">
             {{user.mobile}}
           </el-form-item>
           <el-form-item label="媒体名称">
             <el-input v-model="user.name"></el-input>
           </el-form-item>
           <el-form-item label="媒体介绍">
             <el-input type="textarea" v-model="user.intro"></el-input>
           </el-form-item>
           <el-form-item label="邮箱">
             <el-input v-model="user.email"></el-input>
           </el-form-item>
           <el-form-item>
             <el-button type="primary" @click="onSubmit">保存设置</el-button>
           </el-form-item>
         </el-form>
         </div>
         <div class="rightBox">
           <div class="rightImage">
             <el-image @click="$refs.file.click()" :src="user.photo" style="width: 200px; height: 200px"/>
             <p @click="$refs.file.click()">修改头像100px</p>
             <input id="file" type="file" @change="onFileChange" hidden ref="file" />
           </div>
         </div>
      </div>
    </el-card>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <img width="150" :src="previewImage" alt="">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getInfo } from '../../api/user'
export default {
  data () {
    return {
      form: {
        name: '',
        info: '',
        email: '',
        number: '',
        tel: ''
      },
      user: {},
      previewImage: '',
      dialogVisible: false
    }
  },
  created () {
    this.getAvatar()
  },
  methods: {
    async getAvatar () {
      const res = await getInfo()
      this.user = res.data.data
      console.log(res)
    },
    onFileChange () {
      this.dialogVisible = true
      // 处于图片预览
      const file = this.$refs.file
      console.log(file)
      const blobData = window.URL.createObjectURL(file.files[0])
      console.log(blobData)
      this.previewImage = blobData
      // 解决选择相同文件不触发 change 事件问题
      this.$refs.file.value = ''
    },
    handleClose () {},
    // 提交
    onSubmit () {}
  }
}
</script>

<style>
.info-box{
  width: 100%;
  height: 100%;
  display: flex;
}
.rightBox{
  width: 50%;
}
.leftBox{
  flex: 1;
}
.rightImage{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
