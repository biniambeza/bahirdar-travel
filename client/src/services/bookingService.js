import API from './api'

export const bookingService = {
  createBooking: async (bookingData) => {
    const response = await API.post('/bookings', bookingData)
    return response.data
  },

  getUserBookings: async () => {
    const response = await API.get('/bookings/my-bookings')
    return response.data
  },

  getAllBookings: async () => {
    const response = await API.get('/bookings')
    return response.data
  }
}