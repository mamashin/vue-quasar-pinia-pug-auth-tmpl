import { axiosInstance } from 'boot/axios'

export const useApi = async (url, method, params) => {
  return await new Promise((resolve, reject) => {
    axiosInstance({
      url: url,
      method: method,
      data: params
    })
      .then(resp => {
        const dadata_answer = resp.data
        resolve(resp.data)
      })
      .catch(err => {
        // reject(err)
        console.log('err -', err.response)
        resolve(err.response.data)
      })
  })
}
