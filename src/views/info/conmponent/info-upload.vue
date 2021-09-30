<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="infoDialog"
      width="50%"
      :before-close="handleClose"
      append-to-body
    >
    <!-- <img :src="imageUrl" /> -->
      <el-form ref="form"  :model="form" label-width="80px">
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action=""
           :show-file-list="false"
           :on-change="handlePictureCardPreview"
           :before-upload="beforeAvatarUpload">
           <img v-if="imageUrl" :src="imageUrl" class="avatar">
           <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!-- <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
            <i class="el-icon-upload"></i>
           <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
           <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload> -->
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-model="form.money"></el-input>
        </el-form-item>
        <el-form-item label="发起人">
          <el-input v-model="form.initiator"></el-input>
        </el-form-item>
        <el-form-item label="份数">
          <el-input v-model="form.copies"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirm">立即上传</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { uploadArticle } from '@/api/info.js'
export default {
  props: {
    infoDialog: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    infoData: {
      type: Object
    }
  },
  data () {
    return {
      form: {
        name: '',
        money: '',
        initiator: '',
        copies: '',
        value1: ''
      },
      imageUrl: '',
      fd: {},
      file: ''
    }
  },
  methods: {
    handlePictureCardPreview (file) {
      console.log(file)
      this.imageUrl = ''
      this.imageUrl = URL.createObjectURL(file.raw)
      this.file = file.raw
      // console.log(file, fd.get('file'), this.imageUrl)
    },
    handleClose () {
      this.$parent.closeEdit()
    },
    confirm () {
      console.log(this.form.value1)
      // const dateStart = this.form.value1[0]
      // const dateEnd = this.form.value1[1]
      const dateStart = '2021-5-10'
      const dateEnd = '2021-10-1'
      const fd = new FormData()
      fd.append('figure_img', this.file)
      fd.append('title_name', this.form.name)
      fd.append('target_money', this.form.money)
      fd.append('initiator', this.form.initiator)
      fd.append('date_start', dateStart)
      fd.append('date_end', dateEnd)
      fd.append('copies', this.form.copies)
      console.log('上传表单', fd)
      this.getuploadArticle(fd)
      this.$parent.closeEdit()
      this.$parent.getList()
    },
    // beforeAvatarUpload (file) {
    //   console.log(file)
    //   const isJPG = file.type === 'image/jpeg'
    //   const isLt2M = file.size / 1024 / 1024 < 5
    //   if (!isJPG) {
    //     this.$message.error('上传头像图片只能是 JPG,PNG 格式!')
    //   }
    //   if (!isLt2M) {
    //     this.$message.error('上传头像图片大小不能超过 5MB!')
    //   }
    //   return isJPG && isLt2M
    // },
    // 点击上传
    beforeAvatarUpload () {},
    async getuploadArticle (data) {
      await uploadArticle(data)
    }
  }
}
</script>

<style lang="less">
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
