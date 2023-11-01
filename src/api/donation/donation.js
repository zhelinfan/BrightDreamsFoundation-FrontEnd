import request from '@/utils/request'

const api_name = '/donation'

export default {

  /*
  获取donation分页列表(带搜索)
  */
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
}