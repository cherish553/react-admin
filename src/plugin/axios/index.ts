import axios from 'axios'
const http = axios.create({
  baseURL: `/api`,
})

http.interceptors.request.use(
  config => {
    console.log(config)
    // if (token) config.headers['token'] = token
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    const {
      data: { data, code },
    } = response
    console.log(data)
    console.log(code)
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
