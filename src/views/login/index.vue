<template>
  <div class="login-container">
    <el-form :rules="formRules" :v-model="user" class="el-form" ref="form" :model="user" label-width="80px">
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="user.code" placeholder='请输入验证码'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onLogin" :loading="loading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { Login } from '../../api/user.js'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '', // 13911111111
        code: ''// 246810
      },
      loading: false,
      formRules: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确号码格式', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      // this.loading = true
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        this.$router.push('/')
        // /this.login()
      })
    }
    // async login () {
    //   const data = this.user
    //   try {
    //     const res = await Login(data)
    //     this.$message({
    //       message: '登录成功',
    //       type: 'success'
    //     })
    //     this.loading = false
    //     console.log(res)
    //     this.$store.commit('setUser', res.data.data)
    //     this.$router.push('/')
    //   } catch (error) {
    //     this.$message('手机号或验证码错误')
    //     this.loading = false
    //   }
    // }
  }
}
</script>

<style scoped lang="less">
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../../assets/90d02cd283890e93a0cb9bab1f42140a.jpeg")
    no-repeat;
  background-size: cover;
}

/deep/ .el-form-item__label {
  color: #000;
}
/deep/ .el-form {
  background: #fff;
  padding: 50px 50px 30px 0;
  opacity: 0.4;
}
</style>
