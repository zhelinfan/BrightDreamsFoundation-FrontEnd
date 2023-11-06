import request from '@/utils/request'
export function fetchMissions(id) {
  return request({
    url: `/mission/$get/{id}`,
    method: 'get'
    // params: query // 如果你的后端接口确实使用这些查询参数进行了筛选
  })
}

