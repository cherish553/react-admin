import axios from 'axios'
import cookie from 'js-cookie'
const http = axios.create({
  baseURL: `/api`,
})

http.interceptors.request.use(
  config => {
    const token = cookie.get('token')
    config.headers["Authorization"] = `Bearer ${token}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    const {
      data: { data, code },
    } = response
    if (code === 0) return data
    return false
  },
  error => {
    if (error.response.status === 401) {
      const url = window.location.href
      window.location.href = url.slice(0, url.match('#')!.index! + 1) + '/login'
    }
    return Promise.resolve(false)
  }
)

export const get = <T>(url: string, params?: object): Promise<T> =>
  http.get(url, { params })
export const post = http.post
export const put = http.put
export const del = <T>(url: string, params?: object): Promise<T> =>
  http.delete(url, { params })
