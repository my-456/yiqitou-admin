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
        <el-form-item label="标题" prop="title">
          <el-input  v-model="article.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-tiptap height="400" lang="zh" :extensions="extensions" v-model="article.content"></el-tiptap>
        </el-form-item>
        <el-form-item label="封面" >
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动区域" prop="channel">
          <el-select v-model="article.channel_id" placeholder="请选择活动区域">
            <el-option v-for="(item,index) in channels" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(false)">{{$route.query.id ? '修改文章' : '发布文章'}}</el-button>
          <el-button @click="onSubmit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'element-tiptap/lib/index.css'
import { getArticleChannels, addArticle, updateArticle, getArticle } from '../../api/info'
import { uploadImage } from '../../api/image'
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
            const fd = new FormData()
            fd.append('image', file)
            const res = await uploadImage(fd)
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
        content: '',
        cover: {
          type: 0,
          image: []
        },
        channel_id: ''
      },
      channels: [],
      formRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在5到30个字符', trigger: 'blur' }
        ],
        content: [
          {
            validator (rule, value, callback) {
              if (value === '<p></p>') {
              // 验证失败
                callback(new Error('请输入文章内容'))
              } else {
              // 验证通过
                callback()
              }
            }
          },
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        channel: [
          { required: true, message: '请选择活动区域', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getInfo()
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
        await updateArticle(this.article, draft)
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      } else {
        await addArticle(this.article, draft)
        this.$message({
          message: '发布成功',
          type: 'success'
        })
      }
      console.log('提交')
    },
    async getInfo () {
      const res = await getArticleChannels()
      this.channels = res.data.data.channels
      console.log(res)
    },
    // 加载文章内容
    async loadAticle () {
      const res = await getArticle(this.$route.query.id)
      this.article = res.data.data
      console.log(res)
    }
  }
}
</script>

<style>
</style>
