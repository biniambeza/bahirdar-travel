import React from 'react'
import { Link } from 'react-router-dom'

const TourCard = ({ tour }) => {
  const getTourTypeColor = (type) => {
    switch (type) {
      case 'boat': return 'bg-blue-100 text-blue-800'
      case 'land': return 'bg-green-100 text-green-800'
      case 'combined': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTourTypeLabel = (type) => {
    switch (type) {
      case 'boat': return 'Boat Tour'
      case 'land': return 'Land Tour'
      case 'combined': return 'Combined Tour'
      default: return type
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <div className={`h-3 ${tour.type === 'boat' ? 'bg-blue-500' : tour.type === 'land' ? 'bg-green-500' : 'bg-purple-500'}`}></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{tour.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${getTourTypeColor(tour.type)}`}>
            {getTourTypeLabel(tour.type)}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4">{tour.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            <strong>Duration:</strong> {tour.duration}
          </span>
          <span className="text-lg font-bold text-blue-600">
            ETB {tour.price}
          </span>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-2">Includes:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {tour.includes && tour.includes.slice(0, 3).map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                {item}
              </li>
            ))}
            {tour.includes && tour.includes.length > 3 && (
              <li className="text-blue-600">+{tour.includes.length - 3} more</li>
            )}
          </ul>
        </div>

        <Link
          to="/booking"
          className="w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 px-4 rounded-lg font-semibold block transition duration-300"
        >
          Book This Tour
        </Link>
      </div>
    </div>
  )
}

export default TourCard