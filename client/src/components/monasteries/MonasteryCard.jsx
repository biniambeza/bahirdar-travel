import React from 'react'
import { Link } from 'react-router-dom'

const MonasteryCard = ({ monastery }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold">{monastery.name}</h3>
          <p className="text-blue-100 mt-2">{monastery.location}</p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4 line-clamp-3">{monastery.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            Entry Fee: <strong>ETB {monastery.entryFee}</strong>
          </span>
          <span className="text-sm text-gray-500">{monastery.visitingHours}</span>
        </div>
        <div className="flex justify-between items-center">
          <Link 
            to={`/monasteries/${monastery._id || monastery.id}`}
            className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300"
          >
            View Details →
          </Link>
          {monastery.featured && (
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Featured</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default MonasteryCard