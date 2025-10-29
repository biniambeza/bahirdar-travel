import React, { useState, useEffect } from 'react'
import { tourService } from '../../services/tourService'
import LoadingSpinner from '../../components/common/LoadingSpinner'

const TourManagement = () => {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTours()
  }, [])

  const fetchTours = async () => {
    try {
      const response = await tourService.getAllTours()
      setTours(response.data || [])
    } catch (error) {
      console.error('Error fetching tours:', error)
      // Fallback data
      setTours([
        {
          id: 1,
          title: 'Lake Tana Monastery Tour',
          description: 'Full-day boat tour visiting monasteries',
          duration: '8 hours',
          price: 1500,
          type: 'boat',
          available: true,
          featured: true
        },
        {
          id: 2,
          title: 'Blue Nile Falls Adventure',
          description: 'Half-day trip to the waterfalls',
          duration: '5 hours',
          price: 800,
          type: 'land',
          available: true,
          featured: true
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleToggleAvailability = async (id) => {
    try {
      // In a real app, call API to update
      setTours(tours.map(tour => 
        tour.id === id ? { ...tour, available: !tour.available } : tour
      ))
    } catch (error) {
      console.error('Error updating tour:', error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      try {
        // In a real app, call API to delete
        setTours(tours.filter(t => t.id !== id))
      } catch (error) {
        console.error('Error deleting tour:', error)
      }
    }
  }

  const getTourTypeColor = (type) => {
    switch (type) {
      case 'boat': return 'bg-blue-100 text-blue-800'
      case 'land': return 'bg-green-100 text-green-800'
      case 'combined': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Tours</h1>
            <p className="text-gray-600">Manage all available tours and packages</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300">
            Add Tour
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className={`h-2 ${tour.type === 'boat' ? 'bg-blue-500' : tour.type === 'land' ? 'bg-green-500' : 'bg-purple-500'}`}></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{tour.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getTourTypeColor(tour.type)}`}>
                    {tour.type}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tour.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">{tour.duration}</span>
                  <span className="text-lg font-bold text-blue-600">ETB {tour.price}</span>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleToggleAvailability(tour.id)}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      tour.available 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                  >
                    {tour.available ? 'Available' : 'Unavailable'}
                  </button>
                  
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(tour.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {tour.featured && (
                  <div className="mt-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Featured
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {tours.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">🚤</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Tours Available</h2>
            <p className="text-gray-600 mb-6">Get started by creating your first tour package.</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300">
              Create Tour
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TourManagement