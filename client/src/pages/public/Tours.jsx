import React, { useState, useEffect } from 'react'
import { tourService } from '../../services/tourService'
import TourList from '../../components/tours/TourList'
import LoadingSpinner from '../../components/common/LoadingSpinner'

const Tours = () => {
  const [tours, setTours] = useState([])
  const [filteredTours, setFilteredTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchTours()
  }, [])

  useEffect(() => {
    if (filter === 'all') {
      setFilteredTours(tours)
    } else {
      setFilteredTours(tours.filter(tour => tour.type === filter))
    }
  }, [filter, tours])

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
          description: 'Full-day boat tour visiting the most famous monasteries on Lake Tana including Kibran Gabriel, Ura Kidane Mihret, and Tana Cherkos.',
          duration: '8 hours',
          price: 1500,
          type: 'boat',
          includes: ['Boat transportation', 'Expert guide', 'Lunch', 'Entrance fees', 'Bottled water'],
          excludes: ['Personal expenses', 'Tips', 'Hotel pickup/dropoff'],
          available: true,
          featured: true
        },
        {
          id: 2,
          title: 'Blue Nile Falls Adventure',
          description: 'Half-day trip to the spectacular Blue Nile Falls with hiking through beautiful landscapes and local villages.',
          duration: '5 hours',
          price: 800,
          type: 'land',
          includes: ['Transportation', 'Expert guide', 'Waterfall entrance fee', 'Bottled water'],
          excludes: ['Lunch', 'Personal expenses', 'Tips'],
          available: true,
          featured: true
        },
        {
          id: 3,
          title: 'Cultural Heritage Tour',
          description: 'Comprehensive tour covering monasteries, local markets, and cultural sites with traditional lunch included.',
          duration: 'Full day',
          price: 2000,
          type: 'combined',
          includes: ['All transportation', 'Expert guide', 'Traditional lunch', 'All entrance fees', 'Cultural experiences'],
          excludes: ['Personal expenses', 'Tips', 'Souvenirs'],
          available: true,
          featured: false
        },
        {
          id: 4,
          title: 'Sunset Boat Cruise',
          description: 'Evening boat cruise on Lake Tana to enjoy the beautiful sunset and bird watching.',
          duration: '2 hours',
          price: 500,
          type: 'boat',
          includes: ['Boat ride', 'Guide', 'Refreshments'],
          excludes: ['Dinner', 'Personal expenses'],
          available: true,
          featured: false
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Available Tours</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our carefully curated tours to experience the best of Bahir Dar and Lake Tana.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full transition duration-300 ${
              filter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All Tours
          </button>
          <button
            onClick={() => setFilter('boat')}
            className={`px-6 py-2 rounded-full transition duration-300 ${
              filter === 'boat' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Boat Tours
          </button>
          <button
            onClick={() => setFilter('land')}
            className={`px-6 py-2 rounded-full transition duration-300 ${
              filter === 'land' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Land Tours
          </button>
          <button
            onClick={() => setFilter('combined')}
            className={`px-6 py-2 rounded-full transition duration-300 ${
              filter === 'combined' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Combined Tours
          </button>
        </div>

        <TourList tours={filteredTours} />

        <div className="text-center mt-12 bg-white rounded-lg p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Custom Tours Available</h2>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? We can create a custom tour package tailored to your interests and schedule.
          </p>
          <a
            href="/booking"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300"
          >
            Request Custom Tour
          </a>
        </div>
      </div>
    </div>
  )
}

export default Tours