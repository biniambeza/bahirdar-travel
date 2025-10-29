import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { tourService } from '../../services/tourService'
import BookingForm from '../../components/booking/BookingForm'
import BookingSummary from '../../components/booking/BookingSummary'
import LoadingSpinner from '../../components/common/LoadingSpinner'

const Booking = () => {
  const [tours, setTours] = useState([])
  const [selectedTour, setSelectedTour] = useState(null)
  const [bookingData, setBookingData] = useState({
    date: '',
    numberOfPeople: 1,
    specialRequests: ''
  })
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    fetchTours()
  }, [])

  const fetchTours = async () => {
    try {
      const response = await tourService.getAllTours()
      const availableTours = (response.data || []).filter(tour => tour.available)
      setTours(availableTours)
      if (availableTours.length > 0) {
        setSelectedTour(availableTours[0])
      }
    } catch (error) {
      console.error('Error fetching tours:', error)
      // Fallback data
      const fallbackTours = [
        {
          id: 1,
          title: 'Lake Tana Monastery Tour',
          description: 'Full-day boat tour visiting the most famous monasteries on Lake Tana.',
          duration: '8 hours',
          price: 1500,
          type: 'boat',
          includes: ['Boat transportation', 'Expert guide', 'Lunch', 'Entrance fees'],
          available: true
        },
        {
          id: 2,
          title: 'Blue Nile Falls Adventure',
          description: 'Half-day trip to the spectacular Blue Nile Falls with hiking.',
          duration: '5 hours',
          price: 800,
          type: 'land',
          includes: ['Transportation', 'Guide', 'Waterfall entrance fee'],
          available: true
        },
        {
          id: 3,
          title: 'Cultural Heritage Tour',
          description: 'Comprehensive tour covering monasteries, local markets, and cultural sites.',
          duration: 'Full day',
          price: 2000,
          type: 'combined',
          includes: ['All transportation', 'Expert guide', 'Lunch', 'All entrance fees'],
          available: true
        }
      ]
      setTours(fallbackTours)
      setSelectedTour(fallbackTours[0])
    } finally {
      setLoading(false)
    }
  }

  const handleTourChange = (e) => {
    const tourId = e.target.value
    const tour = tours.find(t => (t._id || t.id) === tourId)
    setSelectedTour(tour)
  }

  const handleBookingDataChange = (newData) => {
    setBookingData(newData)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Book Your Tour</h1>
            <p className="text-xl text-gray-600">
              Fill out the form below to book your unforgettable experience in Bahir Dar.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tour Selection</h2>
                
                <div className="mb-6">
                  <label htmlFor="tour" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Tour *
                  </label>
                  <select
                    id="tour"
                    value={selectedTour?._id || selectedTour?.id}
                    onChange={handleTourChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {tours.map((tour) => (
                      <option key={tour._id || tour.id} value={tour._id || tour.id}>
                        {tour.title} - ETB {tour.price}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedTour && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">{selectedTour.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{selectedTour.description}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Duration: {selectedTour.duration}</span>
                      <span>Price: ETB {selectedTour.price} per person</span>
                    </div>
                  </div>
                )}

                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Booking Details</h2>
                <BookingForm 
                  tour={selectedTour} 
                  onBookingDataChange={handleBookingDataChange}
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              {selectedTour && (
                <BookingSummary tour={selectedTour} bookingData={bookingData} />
              )}
              
              <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Need Help?</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📞 Call us: +251 XXX XXX XXX</p>
                  <p>✉️ Email: info@bahirdartravel.com</p>
                  <p>🕒 Available: 8:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking