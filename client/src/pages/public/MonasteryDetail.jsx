import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { monasteryService } from '../../services/monasteryService'
import LoadingSpinner from '../../components/common/LoadingSpinner'

const MonasteryDetail = () => {
  const { id } = useParams()
  const [monastery, setMonastery] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMonastery()
  }, [id])

  const fetchMonastery = async () => {
    try {
      const response = await monasteryService.getMonasteryById(id)
      setMonastery(response.data)
    } catch (error) {
      console.error('Error fetching monastery:', error)
      // Fallback data
      const mockMonasteries = {
        1: {
          id: 1,
          name: 'Kibran Gabriel Monastery',
          location: 'Lake Tana Island',
          description: 'One of the most famous and historically significant monasteries on Lake Tana, known for its extensive collection of ancient manuscripts and strict access policies.',
          detailedHistory: 'Kibran Gabriel Monastery was founded in the 14th century and has been a center of religious learning for centuries. The monastery is particularly renowned for its library containing over 200 ancient manuscripts, some dating back to the 13th century. Unfortunately, women are not permitted to visit this monastery due to traditional religious beliefs.',
          features: [
            'Ancient manuscripts library',
            '14th-century architecture',
            'Religious artifacts museum',
            'Beautiful lake views'
          ],
          visitingHours: '9:00 AM - 5:00 PM Daily',
          entryFee: 200,
          bestTimeToVisit: 'October to March',
          restrictions: 'Women are not permitted to enter',
          images: []
        },
        2: {
          id: 2,
          name: 'Ura Kidane Mihret',
          location: 'Zege Peninsula',
          description: 'Famous for its beautiful circular structure and vibrant religious murals depicting biblical scenes.',
          detailedHistory: 'Ura Kidane Mihret is one of the most visited monasteries on Lake Tana. Built in the 14th century, it features exceptional circular architecture and is renowned for its vivid mural paintings that cover the interior walls, depicting scenes from the Bible and Ethiopian saints.',
          features: [
            'Circular church architecture',
            'Vibrant mural paintings',
            'Peaceful surroundings',
            'Accessible location'
          ],
          visitingHours: '8:00 AM - 6:00 PM Daily',
          entryFee: 150,
          bestTimeToVisit: 'Year-round',
          restrictions: 'None',
          images: []
        }
      }
      setMonastery(mockMonasteries[id] || mockMonasteries[1])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!monastery) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Monastery not found</h1>
          <Link to="/monasteries" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            Back to Monasteries
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link to="/monasteries" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Monasteries
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-64 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center text-white">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-2">{monastery.name}</h1>
              <p className="text-xl text-blue-100">{monastery.location}</p>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
                <p className="text-gray-600 mb-6">{monastery.description}</p>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">History</h3>
                <p className="text-gray-600 mb-6">{monastery.detailedHistory}</p>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                  {monastery.features && monastery.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Visit Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700">Visiting Hours</h4>
                    <p className="text-gray-600">{monastery.visitingHours}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Entry Fee</h4>
                    <p className="text-gray-600">ETB {monastery.entryFee}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Best Time to Visit</h4>
                    <p className="text-gray-600">{monastery.bestTimeToVisit}</p>
                  </div>
                  {monastery.restrictions && (
                    <div>
                      <h4 className="font-semibold text-gray-700 text-red-600">Restrictions</h4>
                      <p className="text-red-600">{monastery.restrictions}</p>
                    </div>
                  )}
                </div>

                <Link
                  to="/booking"
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 px-4 rounded-lg font-semibold mt-6 block transition duration-300"
                >
                  Book Tour to This Monastery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonasteryDetail