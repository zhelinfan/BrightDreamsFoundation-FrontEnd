import request from '@/utils/request'
export function fetchMissions(page, limit, query) {
  return request({
    url: `/mission/${page}/${limit}`,
    method: 'get',
    params: query // 如果你的后端接口确实使用这些查询参数进行了筛选
  })
}
