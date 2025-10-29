import React, { useState, useEffect } from 'react'
import { monasteryService } from '../../services/monasteryService'
import LoadingSpinner from '../../components/common/LoadingSpinner'

const MonasteryManagement = () => {
  const [monasteries, setMonasteries] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingMonastery, setEditingMonastery] = useState(null)

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
          description: 'One of the most famous monasteries on Lake Tana.',
          entryFee: 200,
          visitingHours: '9:00 AM - 5:00 PM',
          featured: true,
          isActive: true
        },
        {
          id: 2,
          name: 'Ura Kidane Mihret',
          location: 'Zege Peninsula',
          description: 'Famous for its beautiful circular structure.',
          entryFee: 150,
          visitingHours: '8:00 AM - 6:00 PM',
          featured: true,
          isActive: true
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (monastery) => {
    setEditingMonastery(monastery)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this monastery?')) {
      try {
        // In a real app, call API to delete
        setMonasteries(monasteries.filter(m => m.id !== id))
      } catch (error) {
        console.error('Error deleting monastery:', error)
      }
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
            <h1 className="text-3xl font-bold text-gray-800">Manage Monasteries</h1>
            <p className="text-gray-600">Add, edit, or remove monasteries from the system</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
          >
            Add Monastery
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entry Fee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {monasteries.map((monastery) => (
                  <tr key={monastery.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{monastery.name}</div>
                          <div className="text-sm text-gray-500">{monastery.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {monastery.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ETB {monastery.entryFee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        monastery.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {monastery.isActive ? 'Active' : 'Inactive'}
                      </span>
                      {monastery.featured && (
                        <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(monastery)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(monastery.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {monasteries.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">⛪</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Monasteries</h2>
            <p className="text-gray-600 mb-6">Get started by adding your first monastery.</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
            >
              Add Monastery
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MonasteryManagement