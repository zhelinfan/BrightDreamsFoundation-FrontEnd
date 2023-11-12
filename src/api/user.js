import request from '@/utils/request'

export default {
  login(loginForm) {
    return request({
      url: '/user/login',
      method: 'post',
      data: loginForm
    })
  },
  getOneUser(id) {
    return request({
      url: `/userInfo/get/${id}`,
      method: 'get',
      data: id
    })
  }
}

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
