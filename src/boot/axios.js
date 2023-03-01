import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside the
// "export default () => {}" function below (which runs individually
// for each client)

const api = axios.create({ baseURL: process.env.API_HOST })
const axiosInstance = axios.create({ baseURL: process.env.API_HOST })

axiosInstance.interceptors.request.use(async (response) => {
  if (localStorage.getItem('access_token')) {
    const token = localStorage.getItem('access_token')
    axiosInstance.defaults.headers.common.Authorization = `Token ${token}`
    response.headers.common.Authorization = `Token ${token}`
    return response
  }
  if (!window.location.href.endsWith('login')) {
   // Если текущий url не login и все токены протухли или их нет - редирект на login page. Костыль конечно, но работает
    document.location.href = '/#/login'
    return Promise.reject()
  }
  return response
})

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  // app.config.globalProperties.$api = api
  app.config.globalProperties.$api = axiosInstance
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { axios, axiosInstance }
