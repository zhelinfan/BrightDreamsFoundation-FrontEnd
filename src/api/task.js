import request from '@/utils/request'
export default {
  task(id) {
    return request({
      url: `/mission/get/${id}`,
      method: 'get',
      data: id
    })
  }
}
