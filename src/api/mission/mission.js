import request from '@/utils/request'

const api_name = '/mission'

export default {

  /*
  获取mission分页列表(带搜索)
  */
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  batchRemove(idList) {
    return request({
      url: `${api_name}/batchRemove`,
      method: `delete`,
      data: idList
    })
  },
  releaseMission(id) {
    return request({
      url: `${api_name}/releaseMission/${id}`,
      method: 'post'
    })
  },
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },
  save(mission) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: mission
    })
  }
}
