/*
用户管理相关的API请求函数
*/
import request from '@/utils/request'

const api_name = '/userInfo'

export default {

  /*
  获取用户分页列表(带搜索)
  */
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },
  save(role) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: role
    })
  },
  getById(id) {
    return request({
      url: `${api_name}/get/${id}`,
      method: 'get'
    })
  },
  updateById(role) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: role
    })
  },
  batchRemove(idList) {
    return request({
      url: `${api_name}/batchRemove`,
      method: `delete`,
      data: idList
    })
  },
  // isFromChild means the main person is child or not.
  getBind(id, isBind, isFromChild) {
    return request({
      url: `${api_name}/getBind/${id}/${isBind}/${isFromChild}`,
      method: 'get'
    })
  },
  bind(id, idList, isChildBind) {
    return request({
      url: `${api_name}/bind/${id}/${isChildBind}`,
      method: `post`,
      data: idList
    })
  },
  unbind(id, idList, isChildUnbind) {
    return request({
      url: `${api_name}/unbind/${id}/${isChildUnbind}`,
      method: `delete`,
      data: idList
    })
  }
}
