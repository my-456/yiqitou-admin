<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">发布文章</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :rules="formRules" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-tiptap height="400" lang="zh" :extensions="extensions" v-model="article.describe"></el-tiptap>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(false)">{{$route.query.id ? '修改文章' : '发布文章'}}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import 'element-tiptap/lib/index.css'
import { uploadText } from '../../api/info'
// Awesome Vue 官方收录的相关资源列表 引入tiptap
import {
  ElementTiptap,
  // necessary extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Image,
  TextColor
} from 'element-tiptap'
export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap
  },
  props: {},
  data () {
    return {
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // render command-button in bubble menu.
        new Underline({ bubble: true, menubar: false }), // render command-button in bubble menu but not in menubar.
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Image({
        // 默认会把图片生成base64
          async uploadRequest (file) {
            console.log(file)
            const fd = new FormData()
            fd.append('image', file)
            const res = await uploadText(fd)
            console.log(res)
            return res.data.data.url
          }
        }),
        new TextColor()
      ],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      article: {
        title: '',
        describe: '',
        date: '2020-10-1'
      },
      channels: [],
      formRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在5到30个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // 判断如果请求路径中有id，则展示文章内容
    if (this.$route.query.id) {
      this.loadAticle()
    }
  },
  methods: {
    async  onSubmit (draft) {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return false
        }
      })
      if (this.$route.query.di) {
      } else {
        await uploadText(this.article)
        this.$message({
          message: '发布成功',
          type: 'success'
        })
      }
      console.log('提交')
    }
  }
}
</script>

<style>
</style>
