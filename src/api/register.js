import request from '@/utils/request'

// const api_name = '/register'
export default {
  register(registerForm) {
    return request({
      url: '/userInfo/register',
      method: 'post',
      data: registerForm
    })
  }

}
