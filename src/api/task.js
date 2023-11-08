import request from '@/utils/request'
export default {
  getUncompleteTask(id) {
    return request({
      url: `/mission/get/${id}`,
      method: 'get',
      data: id
    })
  },
  search(id, keywords) {
    return request({
      url: `/mission/searchUncompleted/${id}`,
      method: 'post',
      data: { keywords, id }
    })
  },
  fetchMissions(id) {
    return request({
      url: `mission/$get/{id}`,
      method: 'get'
      // params: query // 如果你的后端接口确实使用这些查询参数进行了筛选
    })
  },
  submit(history) {
    return request({
      url: `missionHistory/submit`,
      method: 'post',
      data: history
    })
  },
  checkSubmission(userId, missionId) {
    return request({
      url: `missionHistory/selectNewest/${userId}/${missionId}`,
      method: 'get',
      data: { userId, missionId }
    })
  },
  loadSingleMission(id) {
    return request({
      url: `mission/getById/${id}`,
      method: 'get',
      data: id
    })
  },
  getUrl(file) {
    return request({
      url: `mission/upload`,
      method: 'post',
      data: file
    })
  }
}

