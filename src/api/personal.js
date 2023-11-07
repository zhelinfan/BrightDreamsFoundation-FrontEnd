import request from '@/utils/request'

// const api_name = '/register'
export default {
  getUserInfo(id) {
    return request({
      url: `/userInfo/get/${id}`,
      method: 'get',
      data: id
    })
  }

}
