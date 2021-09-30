/**
 * 文章相关请求模块
 */
import request from '../utils/request'

// 获取列表
export function getList () {
  return request({
    method: 'post',
    url: '/goods/sub_list'
  })
}

/**
 * 文章上传
 */
export const uploadArticle = (data) => {
  return request({
    url: '/subscribe/insert_subscribe',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
/**
 * 富文本上传
 */
export const uploadText = (data) => {
  return request({
    url: '/subscribe/insert_message',
    method: 'post',
    data
  })
}
