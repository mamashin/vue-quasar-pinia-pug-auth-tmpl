import {defineStore} from 'pinia';
import {axiosInstance} from 'boot/axios'

export const authStore = defineStore('auth', {
  state: () => ({
    status: 'success',
    access_token: ''
  }),
  getters: {
    isLoggedIn: (state) => !!state.access_token,
  },
  actions: {
    logout() {
      delete axiosInstance.defaults.headers.common['Authorization']
      localStorage.removeItem('access_token')
      this.$patch({status: 'success', access_token: ''})
    },
    login(user) {
      // Перед запросом нового токена - удаляем тот что есть сейчас
      console.log(localStorage.getItem('access_token'))
      delete axiosInstance.defaults.headers.common['Authorization']
      localStorage.removeItem('access_token')
      return new Promise((resolve, reject) => {
        this.$patch({status: 'loading'})
        axiosInstance({
          url: '/token-auth/',
          data: user,
          method: 'POST'
        })
          .then(resp => {
            console.log(resp)
            const access_token = resp.data.token
            localStorage.setItem('access_token', access_token)
            axiosInstance.defaults.headers.common.Authorization = `Token ${access_token}`
            this.$patch({status: 'success', access_token: access_token})
            // commit('AuthSuccess', access_token)
            resolve(resp)
          })
          .catch(err => {
            this.$patch({status: 'error', access_token: ''})
            localStorage.removeItem('access_token')
            delete axiosInstance.defaults.headers.common['Authorization']
            // delete axiosInstance.defaults.headers.common.Authorization
            // axiosInstance.defaults.headers.common.Authorization = 'Token '
            resolve(err)
            // reject(err)
          })
      })
    }
  }
});
