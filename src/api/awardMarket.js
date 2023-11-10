import request from '@/utils/request'

export default {
  getGoodList() {
    return request({
      url: '/good',
      method: 'get',
      data: ''
    })
  },
  buyGood(order) {
    return request({
      url: '/good/buy',
      method: 'post',
      data: order
    })
  },
  sortByPopularity() {
    return request({
      url: '/good/sortByPopularity',
      method: 'post',
      data: ''
    })
  },
  sortByCost(type) {
    return request({
      url: `/good/sortByCost${type}`,
      method: 'post',
      data: type
    })
  },
  search(keywords) {
    return request({
      url: `/good/search`,
      method: 'post',
      data: keywords
    })
  }
}

