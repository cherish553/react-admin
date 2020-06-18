import axios from 'axios'
import cookie from 'js-cookie'
const http = axios.create({
  baseURL: `/api`,
})

http.interceptors.request.use(
  config => {
    const token = cookie.get('token')
    if (token) {
      if (config.method === "get") {
        config.params = config.params || {};
        config.params = { ...config.params, api_token: token }
      } else {
        config.data = config.data || {};
        config.data = { ...config.data, api_token: token }
      }
    }
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
    return Promise.resolve(false)
  }
)

export const get = <T>(url: string, params?: object): Promise<T> =>
  http.get(url, { params })
export const post = http.post
export const put = http.put
export const del = http.delete
