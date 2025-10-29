import API from './api'

export const tourService = {
  getAllTours: async () => {
    const response = await API.get('/tours')
    return response.data
  },

  getTourById: async (id) => {
    const response = await API.get(`/tours/${id}`)
    return response.data
  },

  getToursByType: async (type) => {
    const response = await API.get(`/tours?type=${type}`)
    return response.data
  }
}