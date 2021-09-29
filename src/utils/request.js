/**
 * 基于axios封装请求模块
 */
import axios from 'axios'
import store from '../store'
import JSONbig from 'json-bigint'
const request = axios.create({
  // baseURL: 'http://api-toutiao-web.itheima.net', // 请求的基础路径
  baseURL: '/api', // 请求的基础路径
  // 定义后端返回的原始数据的处理
  // 参数 data 就是后端返回的原始数据
  transformResponse: [function (data) {
  // 后端返回的数据可能不是 JSON 格式字符串
  // 如果不是的话，那么 JSONbig.parse 调用就会报错
  // 所以我们用 try-catch 来捕获异常的发生
    try {
      // 如果转换成功，直接返回结果
      return JSONbig.parse(data)
    } catch (error) {
      // 如果转换失败，直接返回元数据
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  // console.log('user', JSON.parse(user))
  if (user) {
    config.headers.Authorization = `Bearer ${JSON.parse(user).token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 导出请求方法
export default request
