import React, { useState, useEffect } from 'react'
import { monasteryService } from '../../services/monasteryService'
import MonasteryGrid from '../../components/monasteries/MonasteryGrid'
import LoadingSpinner from '../../components/common/LoadingSpinner'

const Monasteries = () => {
  const [monasteries, setMonasteries] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchMonasteries()
  }, [])

  const fetchMonasteries = async () => {
    try {
      const response = await monasteryService.getAllMonasteries()
      setMonasteries(response.data || [])
    } catch (error) {
      console.error('Error fetching monasteries:', error)
      // Fallback data
      setMonasteries([
        {
          id: 1,
          name: 'Kibran Gabriel Monastery',
          location: 'Lake Tana Island',
          description: 'One of the most famous monasteries on Lake Tana, known for its ancient manuscripts and restricted access to women.',
          history: 'Founded in the 14th century, it houses valuable religious manuscripts and artifacts.',
          visitingHours: '9:00 AM - 5:00 PM',
          entryFee: 200,
          featured: true,
          restrictions: 'Women are not permitted to enter'
        },
        {
          id: 2,
          name: 'Ura Kidane Mihret',
          location: 'Zege Peninsula',
          description: 'Famous for its beautiful circular structure and vibrant religious murals depicting biblical scenes.',
          history: 'Established in the 14th century, known for its exceptional mural paintings.',
          visitingHours: '8:00 AM - 6:00 PM',
          entryFee: 150,
          featured: true
        },
        {
          id: 3,
          name: 'Tana Cherkos',
          location: 'Lake Tana Island',
          description: 'One of the oldest monasteries with claims of housing the Ark of Covenant for 800 years.',
          history: 'Dates back to the 4th century, making it one of the earliest Christian sites in Ethiopia.',
          visitingHours: '8:00 AM - 5:00 PM',
          entryFee: 180,
          featured: false
        },
        {
          id: 4,
          name: 'Azwa Maryam',
          location: 'Lake Tana Island',
          description: 'Known for its peaceful atmosphere and beautiful location on the lake.',
          history: 'Founded in the 14th century, features traditional Ethiopian church architecture.',
          visitingHours: '9:00 AM - 5:00 PM',
          entryFee: 120,
          featured: false
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const filteredMonasteries = monasteries.filter(monastery =>
    monastery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    monastery.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    monastery.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Lake Tana Monasteries</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the ancient monasteries scattered across the islands of Lake Tana, 
            each with its own unique history and spiritual significance.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search monasteries by name, location, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-2xl mx-auto block px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <MonasteryGrid monasteries={filteredMonasteries} />

        {filteredMonasteries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No monasteries found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Monasteries