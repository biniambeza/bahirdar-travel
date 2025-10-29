import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { bookingService } from '../../services/bookingService'

const BookingForm = ({ tour, onBookingDataChange }) => {
  const [formData, setFormData] = useState({
    date: '',
    numberOfPeople: 1,
    specialRequests: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { user } = useAuth()

  const handleChange = (e) => {
    const newData = {
      ...formData,
      [e.target.name]: e.target.value
    }
    setFormData(newData)
    onBookingDataChange(newData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      setMessage('Please login to book a tour')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const bookingData = {
        tour: tour._id || tour.id,
        date: formData.date,
        numberOfPeople: parseInt(formData.numberOfPeople),
        specialRequests: formData.specialRequests
      }

      await bookingService.createBooking(bookingData)
      setMessage('Booking request submitted successfully! We will contact you soon.')
      
      // Reset form
      const resetData = {
        date: '',
        numberOfPeople: 1,
        specialRequests: ''
      }
      setFormData(resetData)
      onBookingDataChange(resetData)
    } catch (error) {
      setMessage('Error submitting booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const minDate = new Date().toISOString().split('T')[0]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
          Tour Date *
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          min={minDate}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="numberOfPeople" className="block text-sm font-medium text-gray-700 mb-2">
          Number of People *
        </label>
        <select
          id="numberOfPeople"
          name="numberOfPeople"
          value={formData.numberOfPeople}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
            <option key={num} value={num}>
              {num} {num === 1 ? 'person' : 'people'}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2">
          Special Requests
        </label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Any special requirements or requests..."
        ></textarea>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {message}
        </div>
      )}

      {!user && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Please <a href="/login" className="underline font-semibold">login</a> or <a href="/register" className="underline font-semibold">register</a> to book a tour.
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !user}
        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-semibold transition duration-300"
      >
        {loading ? 'Submitting...' : 'Book Now'}
      </button>
    </form>
  )
}

export default BookingForm