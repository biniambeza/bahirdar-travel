import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { monasteryService } from '../../services/monasteryService'
import { tourService } from '../../services/tourService'
import MonasteryGrid from '../../components/monasteries/MonasteryGrid'
import TourList from '../../components/tours/TourList'
import LoadingSpinner from '../../components/common/LoadingSpinner'

const Home = () => {
  const [featuredMonasteries, setFeaturedMonasteries] = useState([])
  const [featuredTours, setFeaturedTours] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [monasteriesResponse, toursResponse] = await Promise.all([
          monasteryService.getFeaturedMonasteries(),
          tourService.getAllTours()
        ])
        
        setFeaturedMonasteries(monasteriesResponse.data?.slice(0, 3) || [])
        setFeaturedTours(toursResponse.data?.slice(0, 3) || [])
      } catch (error) {
        console.error('Error fetching data:', error)
        // Fallback data
        setFeaturedMonasteries([
          {
            id: 1,
            name: 'Kibran Gabriel Monastery',
            location: 'Lake Tana Island',
            description: 'One of the most famous monasteries on Lake Tana, known for its ancient manuscripts and restricted access to women.',
            entryFee: 200,
            visitingHours: '9:00 AM - 5:00 PM',
            featured: true
          },
          {
            id: 2,
            name: 'Ura Kidane Mihret',
            location: 'Zege Peninsula',
            description: 'Famous for its beautiful circular structure and vibrant religious murals depicting biblical scenes.',
            entryFee: 150,
            visitingHours: '8:00 AM - 6:00 PM',
            featured: true
          },
          {
            id: 3,
            name: 'Tana Cherkos',
            location: 'Lake Tana Island',
            description: 'One of the oldest monasteries with claims of housing the Ark of Covenant for 800 years.',
            entryFee: 180,
            visitingHours: '8:00 AM - 5:00 PM',
            featured: true
          }
        ])
        
        setFeaturedTours([
          {
            id: 1,
            title: 'Lake Tana Monastery Tour',
            description: 'Full-day boat tour visiting the most famous monasteries on Lake Tana.',
            duration: '8 hours',
            price: 1500,
            type: 'boat',
            includes: ['Boat transportation', 'Expert guide', 'Lunch', 'Entrance fees']
          },
          {
            id: 2,
            title: 'Blue Nile Falls Adventure',
            description: 'Half-day trip to the spectacular Blue Nile Falls with hiking.',
            duration: '5 hours',
            price: 800,
            type: 'land',
            includes: ['Transportation', 'Guide', 'Waterfall entrance fee']
          },
          {
            id: 3,
            title: 'Cultural Heritage Tour',
            description: 'Comprehensive tour covering monasteries, local markets, and cultural sites.',
            duration: 'Full day',
            price: 2000,
            type: 'combined',
            includes: ['All transportation', 'Expert guide', 'Lunch', 'All entrance fees']
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const features = [
    {
      icon: '⛪',
      title: 'Ancient Monasteries',
      description: 'Explore 14th-century monasteries on Lake Tana islands with rich religious history.'
    },
    {
      icon: '🌊',
      title: 'Blue Nile Falls',
      description: 'Witness the spectacular "Smoking Water" waterfall, one of Africa\'s most stunning natural wonders.'
    },
    {
      icon: '🚤',
      title: 'Lake Tana Tours',
      description: 'Enjoy boat tours on Ethiopia\'s largest lake, home to diverse birdlife and peaceful islands.'
    },
    {
      icon: '🏛️',
      title: 'Cultural Heritage',
      description: 'Immerse yourself in the unique culture and traditions of the Ethiopian Orthodox Church.'
    }
  ]

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      {/* Hero Section with Lake Tana Background */}
     <section 
  className="relative text-white py-20 md:py-32 min-h-[80vh] flex items-center"
  style={{
    backgroundImage: `url('/Tana2.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
  }}
>
  <div className="container mx-auto px-4 text-center relative z-10">
    <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
      Discover Bahir Dar
    </h1>
    <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-lg">
      Experience the magic of Lake Tana's ancient monasteries and the breathtaking Blue Nile Falls
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link 
        to="/booking" 
        className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition duration-300 transform hover:scale-105 shadow-lg"
      >
        Book Your Tour
      </Link>
      <Link 
        to="/monasteries" 
        className="border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition duration-300 transform hover:scale-105"
      >
        Explore Monasteries
      </Link>
    </div>
  </div>
</section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Why Choose Bahir Dar Travel?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition duration-300 border border-gray-100 hover:border-blue-200 group cursor-pointer">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Monasteries Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Featured Monasteries
          </h2>
          <MonasteryGrid monasteries={featuredMonasteries} />
          <div className="text-center mt-8">
            <Link 
              to="/monasteries" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105"
            >
              View All Monasteries
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Popular Tours
          </h2>
          <TourList tours={featuredTours} />
          <div className="text-center mt-8">
            <Link 
              to="/tours" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105"
            >
              View All Tours
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home