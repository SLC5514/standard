import request from '@/utils/request'

/**
 * @description: 登录
 * @param {String} username 用户名
 * @param {String} password 密码
 * @return:
 */
export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/api/user/info',
    method: 'post',
    data: {
      type: 'all'
    }
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}
