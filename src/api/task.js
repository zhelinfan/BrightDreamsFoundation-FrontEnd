import request from '@/utils/request'
export default {
  getUncompleteTask(id) {
    return request({
      url: `/mission/get/${id}`,
      method: 'get',
      data: id
    })
  },
  search(formData, id) {
    return request({
      url: `/mission/searchUncompleted/${id}`,
      method: 'post',
      data: formData
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
  },
  getSubmitTask(userId, missionId) {
    return request({
      url: `/missionHistory/select/${userId}/${missionId}`,
      method: 'get',
      data: { userId, missionId }
    })
  },
  getCompleteTask(id) {
    return request({
      url: `/missionHistory/selectNewest/${id}`,
      method: 'get',
      data: id
    })
  },
  search2(formData, id) {
    return request({
      url: `/missionHistory/searchCompleted/${id}`,
      method: 'post',
      data: formData
    })
  },
  search3(formData, id) {
    return request({
      url: `/missionHistory/search/${id}`,
      method: 'post',
      data: formData
    })
  }
}

