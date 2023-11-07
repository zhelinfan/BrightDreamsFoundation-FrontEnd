import request from '@/utils/request'
export default {
  task(listForm) {
    return request({
      url: `/mission/$get/{id}`,
      method: 'get',
      data: listForm
    })
  }
}
