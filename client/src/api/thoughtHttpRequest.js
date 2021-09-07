import _instance from '@/api/axiosInstance'

import router from '@/router'
import Vue from 'vue'

export const getAllThoughts = async (page) => {
  return await _instance.get('/?page=' + page)
    .catch(redirectIfError)
}

export const getThought = async (thoughtId) => {
  return await _instance.get(`/${thoughtId}`)
    .then(response => {
      return response.data[0]
    })
    .catch(redirectIfError)
}

export const createThought = async (newThought) => {
  return await _instance.post('/', newThought)
    .catch(redirectIfError)
}

export const updateThought = async (thoughtId, editedThought) => {
  return await _instance.patch(`/${thoughtId}`, editedThought)
    .catch(redirectIfError)
}

export const deleteThought = async (thoughtId) => {
  return await _instance.delete(`/${thoughtId}`)
    .catch(redirectIfError)
}

const redirectIfError = () => {
  router.push('/')

  Vue.prototype.$message({
    type: 'error',
    message: 'An error occured. Redirection to homepage.'
  })
}
