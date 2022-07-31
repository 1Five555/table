import request from './request'


export const getTableList =  (params) => {
  return  request({
    url: '/getTableList',
    method:'POST',
    params
  })
}
export const getUsers =  () => {
  return  request({
    url: '/users',
  })
}