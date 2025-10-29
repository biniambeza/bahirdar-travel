import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const UserDashboard = () => {
  const { user } = useAuth()

  const upcomingBookings = [
    {
      id: 1,
      tour: 'Lake Tana Monastery Tour',
      date: '2024-12-15',
      status: 'confirmed',
      price: 1500
    },
    {
      id: 2,
      tour: 'Blue Nile Falls Adventure',
      date: '2024-12-20',
      status: 'pending',
      price: 800
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Here's your travel overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-500 text-white p-6 rounded-lg">
            <div className="text-2xl mb-2">📅</div>
            <h3 className="text-lg font-semibold">Upcoming Tours</h3>
            <p className="text-3xl font-bold">2</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg">
            <div className="text-2xl mb-2">✅</div>
            <h3 className="text-lg font-semibold">Completed</h3>
            <p className="text-3xl font-bold">5</p>
          </div>
          <div className="bg-purple-500 text-white p-6 rounded-lg">
            <div className="text-2xl mb-2">💳</div>
            <h3 className="text-lg font-semibold">Total Spent</h3>
            <p className="text-3xl font-bold">ETB 8,200</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Bookings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
              <Link to="/user/bookings" className="text-blue-600 hover:text-blue-800">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingBookings.map(booking => (
                <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{booking.tour}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Date: {booking.date}</span>
                    <span>ETB {booking.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <Link
                to="/booking"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition duration-300"
              >
                <div className="text-2xl mr-4">🚤</div>
                <div>
                  <h3 className="font-semibold">Book New Tour</h3>
                  <p className="text-sm text-gray-600">Explore our available tours</p>
                </div>
              </Link>
              <Link
                to="/user/profile"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-green-50 transition duration-300"
              >
                <div className="text-2xl mr-4">👤</div>
                <div>
                  <h3 className="font-semibold">Update Profile</h3>
                  <p className="text-sm text-gray-600">Manage your account information</p>
                </div>
              </Link>
              <Link
                to="/monasteries"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-purple-50 transition duration-300"
              >
                <div className="text-2xl mr-4">⛪</div>
                <div>
                  <h3 className="font-semibold">Browse Monasteries</h3>
                  <p className="text-sm text-gray-600">Discover ancient monasteries</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard