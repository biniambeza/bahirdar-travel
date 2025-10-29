import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Bookings',
      value: '156',
      change: '+12%',
      color: 'blue',
      icon: '📊'
    },
    {
      title: 'Active Tours',
      value: '8',
      change: '+2',
      color: 'green',
      icon: '🚤'
    },
    {
      title: 'Monasteries',
      value: '12',
      change: 'Active',
      color: 'purple',
      icon: '⛪'
    },
    {
      title: 'Revenue',
      value: 'ETB 245,600',
      change: '+18%',
      color: 'orange',
      icon: '💰'
    }
  ]

  const recentActivities = [
    { id: 1, action: 'New booking received', time: '2 hours ago', type: 'booking' },
    { id: 2, action: 'Tour updated: Lake Tana Monastery', time: '5 hours ago', type: 'tour' },
    { id: 3, action: 'New monastery added', time: '1 day ago', type: 'monastery' },
    { id: 4, action: 'User registration', time: '1 day ago', type: 'user' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.change.includes('+') ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className="text-3xl">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/admin/monasteries"
                className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg text-center transition duration-300"
              >
                <div className="text-2xl mb-2">⛪</div>
                <span>Manage Monasteries</span>
              </Link>
              <Link
                to="/admin/tours"
                className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg text-center transition duration-300"
              >
                <div className="text-2xl mb-2">🚤</div>
                <span>Manage Tours</span>
              </Link>
              <Link
                to="/admin/bookings"
                className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg text-center transition duration-300"
              >
                <div className="text-2xl mb-2">📅</div>
                <span>Manage Bookings</span>
              </Link>
              <Link
                to="/admin/users"
                className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg text-center transition duration-300"
              >
                <div className="text-2xl mb-2">👥</div>
                <span>Manage Users</span>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'booking' ? 'bg-blue-500' :
                    activity.type === 'tour' ? 'bg-green-500' :
                    activity.type === 'monastery' ? 'bg-purple-500' : 'bg-orange-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard