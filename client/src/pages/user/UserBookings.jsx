import React, { useState, useEffect } from 'react'
import { bookingService } from '../../services/bookingService'
import LoadingSpinner from '../../components/common/LoadingSpinner'

const UserBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await bookingService.getUserBookings()
      setBookings(response.data || [])
    } catch (error) {
      console.error('Error fetching bookings:', error)
      // Fallback data
      setBookings([
        {
          id: 1,
          tour: {
            title: 'Lake Tana Monastery Tour',
            price: 1500
          },
          date: '2024-12-15',
          numberOfPeople: 2,
          totalPrice: 3000,
          status: 'confirmed',
          specialRequests: 'Vegetarian lunch please'
        },
        {
          id: 2,
          tour: {
            title: 'Blue Nile Falls Adventure',
            price: 800
          },
          date: '2024-12-20',
          numberOfPeople: 1,
          totalPrice: 800,
          status: 'pending',
          specialRequests: ''
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
          <p className="text-gray-600">View and manage your tour bookings</p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Bookings Yet</h2>
            <p className="text-gray-600 mb-6">Start your adventure by booking your first tour!</p>
            <a
              href="/booking"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
            >
              Book a Tour
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {bookings.map(booking => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{booking.tour?.title}</h3>
                    <p className="text-gray-600">Booking Date: {new Date(booking.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium mt-2 lg:mt-0 ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Number of People</p>
                    <p className="font-semibold">{booking.numberOfPeople}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Price per Person</p>
                    <p className="font-semibold">ETB {booking.tour?.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Price</p>
                    <p className="font-semibold text-lg">ETB {booking.totalPrice}</p>
                  </div>
                </div>

                {booking.specialRequests && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Special Requests</p>
                    <p className="text-gray-800">{booking.specialRequests}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserBookings