import axios from 'axios'
import createAuthRefreshInterceptor from "axios-auth-refresh";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const refreshAuthLogic = (
  failedRequest,
  config = {
    method: 'get',
    url: 'refresh',
    headers: {
      cookies: `jwt=${localStorage.getItem('refreshToken')}`
    }
  }
) =>
  axiosInstance(config).then((response) => {
    localStorage.setItem('token', response.data.accessToken)
    failedRequest.response.config.headers.Authorization =
      'Bearer ' + response.data.accessToken
    return Promise.resolve()
  })

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic, {
  statusCodes: [401]
})

export default axiosInstance
