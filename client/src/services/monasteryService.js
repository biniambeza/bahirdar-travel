import API from './api'

export const monasteryService = {
  getAllMonasteries: async () => {
    const response = await API.get('/monasteries')
    return response.data
  },

  getMonasteryById: async (id) => {
    const response = await API.get(`/monasteries/${id}`)
    return response.data
  },

  getFeaturedMonasteries: async () => {
    const response = await API.get('/monasteries?featured=true')
    return response.data
  }
}