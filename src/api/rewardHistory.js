import request from '@/utils/request'

export default {
  getAllHistory(id) {
    return request({
      url: `/pointHistory/${id}`,
      method: 'get',
      data: id
    })
  }
}
