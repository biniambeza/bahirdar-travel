import React, { useState, useEffect, useRef } from 'react'
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
  const [currentFeature, setCurrentFeature] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef(null)

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
        // Enhanced fallback data with images
        setFeaturedMonasteries([
          {
            id: 1,
            name: 'Kibran Gabriel Monastery',
            location: 'Lake Tana Island',
            description: 'One of the most famous monasteries on Lake Tana, known for its ancient manuscripts and restricted access to women.',
            entryFee: 200,
            visitingHours: '9:00 AM - 5:00 PM',
            featured: true,
            image: '/kibran-gabriel.jpg',
            rating: 4.9,
            highlights: ['Ancient Manuscripts', '14th Century', 'Male Only']
          },
          {
            id: 2,
            name: 'Ura Kidane Mihret',
            location: 'Zege Peninsula',
            description: 'Famous for its beautiful circular structure and vibrant religious murals depicting biblical scenes.',
            entryFee: 150,
            visitingHours: '8:00 AM - 6:00 PM',
            featured: true,
            image: '/ura-kidane.jpg',
            rating: 4.8,
            highlights: ['Circular Architecture', 'Colorful Murals', 'Easy Access']
          },
          {
            id: 3,
            name: 'Tana Cherkos',
            location: 'Lake Tana Island',
            description: 'One of the oldest monasteries with claims of housing the Ark of Covenant for 800 years.',
            entryFee: 180,
            visitingHours: '8:00 AM - 5:00 PM',
            featured: true,
            image: '/tana-cherkos.jpg',
            rating: 4.7,
            highlights: ['Ancient History', 'Ark Legend', 'Island Location']
          }
        ])
        
        setFeaturedTours([
          {
            id: 1,
            title: 'Lake Tana Monastery Tour',
            description: 'Full-day boat tour visiting the most famous monasteries on Lake Tana with expert guides and traditional lunch.',
            duration: '8 hours',
            price: 1500,
            type: 'boat',
            includes: ['Boat transportation', 'Expert guide', 'Lunch', 'Entrance fees'],
            image: '/monastery-tour.jpg',
            rating: 4.9,
            reviews: 127,
            badge: 'Best Seller',
            discount: 15
          },
          {
            id: 2,
            title: 'Blue Nile Falls Adventure',
            description: 'Half-day trip to the spectacular Blue Nile Falls with hiking through lush landscapes and local villages.',
            duration: '5 hours',
            price: 800,
            type: 'land',
            includes: ['Transportation', 'Guide', 'Waterfall entrance fee', 'Refreshments'],
            image: '/blue-nile-falls.jpg',
            rating: 4.8,
            reviews: 89,
            badge: 'Popular',
            discount: 10
          },
          {
            id: 3,
            title: 'Cultural Heritage Tour',
            description: 'Comprehensive tour covering monasteries, local markets, and cultural sites with authentic experiences.',
            duration: 'Full day',
            price: 2000,
            type: 'combined',
            includes: ['All transportation', 'Expert guide', 'Lunch', 'All entrance fees'],
            image: '/cultural-tour.jpg',
            rating: 5.0,
            reviews: 64,
            badge: 'Premium',
            discount: 20
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const features = [
    {
      icon: '⛪',
      title: 'Ancient Monasteries',
      description: 'Explore 14th-century monasteries on Lake Tana islands with rich religious history and priceless artifacts.',
      gradient: 'from-purple-500 via-blue-600 to-indigo-700',
      image: '/feature-monasteries.jpg',
      stats: '20+ Sacred Sites'
    },
    {
      icon: '🌊',
      title: 'Blue Nile Falls',
      description: 'Witness the spectacular "Smoking Water" waterfall, one of Africa\'s most stunning natural wonders.',
      gradient: 'from-blue-500 via-cyan-600 to-teal-700',
      image: '/feature-falls.jpg',
      stats: '45m Height'
    },
    {
      icon: '🚤',
      title: 'Lake Tana Tours',
      description: 'Enjoy boat tours on Ethiopia\'s largest lake, home to diverse birdlife and peaceful islands.',
      gradient: 'from-green-500 via-emerald-600 to-green-700',
      image: '/feature-lake.jpg',
      stats: '3,600 km² Lake'
    },
    {
      icon: '🏛️',
      title: 'Cultural Heritage',
      description: 'Immerse yourself in the unique culture and traditions of the Ethiopian Orthodox Church.',
      gradient: 'from-orange-500 via-red-600 to-amber-700',
      image: '/feature-culture.jpg',
      stats: '700+ Years History'
    }
  ]

  const stats = [
    { number: '50+', label: 'Monasteries Explored', icon: '⛪' },
    { number: '1000+', label: 'Happy Travelers', icon: '😊' },
    { number: '15+', label: 'Expert Guides', icon: '🎓' },
    { number: '98%', label: 'Satisfaction Rate', icon: '⭐' }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Travel Blogger",
      image: "/avatar1.jpg",
      content: "The monastery tour was absolutely magical! The ancient history and spiritual atmosphere left me speechless.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Photographer",
      image: "/avatar2.jpg",
      content: "As a photographer, Bahir Dar provided endless stunning scenes. The Blue Nile Falls at sunrise was incredible!",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Cultural Enthusiast",
      image: "/avatar3.jpg",
      content: "The cultural immersion was beyond expectations. The local guides shared stories you won't find in any guidebook.",
      rating: 5
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="overflow-hidden">
      {/* Enhanced Hero Section with Parallax and Mouse Effects */}
      <section 
        ref={heroRef}
        className="relative text-white min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background Layers */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center transform scale-110"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('/Tana2.jpg')`,
              transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0002})`
            }}
          ></div>
          <div 
            className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-900/50 to-indigo-900/70"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`
            }}
          ></div>
        </div>

        {/* Mouse Follow Gradient */}
        <div 
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-yellow-400/20 to-red-500/20 blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 160,
            top: mousePosition.y - 160,
            opacity: 0.6
          }}
        ></div>

        {/* Animated floating elements */}
        <div className="absolute top-20 left-10 w-8 h-8 bg-yellow-400 rounded-full opacity-20 animate-float">
          <div className="absolute inset-0 bg-yellow-300 rounded-full animate-ping"></div>
        </div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-blue-400 rounded-full opacity-30 animate-float" style={{animationDelay: '1s'}}>
          <div className="absolute inset-0 bg-blue-300 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute bottom-32 left-20 w-6 h-6 bg-green-400 rounded-full opacity-25 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-10 h-10 bg-red-400 rounded-full opacity-20 animate-float" style={{animationDelay: '3s'}}></div>

        {/* Main Content */}
        <div className="container mx-auto px-4 text-center relative z-20">
          <div className="animate-fade-in-up">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8 animate-pulse">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
              <span className="text-sm font-semibold">✨ #1 Cultural Destination in Ethiopia</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 drop-shadow-2xl bg-gradient-to-r from-yellow-300 via-white to-yellow-200 bg-clip-text text-transparent leading-tight">
              DISCOVER
              <br />
              <span className="text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                BAHAIR DAR
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl lg:text-4xl mb-8 max-w-4xl mx-auto leading-relaxed font-light drop-shadow-2xl">
              Where <span className="text-yellow-300 font-bold">Ancient Spirituality</span> Meets 
              <span className="text-blue-300 font-bold"> Natural Wonder</span>
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16">
              <Link 
                to="/booking" 
                className="group relative bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 px-12 py-6 rounded-2xl font-black text-xl transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-yellow-500/50 flex items-center gap-4 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  🚀 START YOUR JOURNEY
                  <span className="group-hover:rotate-90 transition-transform duration-300">✨</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Link>
              
              <Link 
                to="/monasteries" 
                className="group border-2 border-white/80 hover:border-yellow-400 bg-white/5 backdrop-blur-lg hover:bg-yellow-400/10 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
              >
                <span className="flex items-center gap-3">
                  🗺️ EXPLORE SACRED SITES
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </span>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">20+</div>
                <div className="text-sm text-white/80">Sacred Sites</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">5★</div>
                <div className="text-sm text-white/80">Rated Tours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">24/7</div>
                <div className="text-sm text-white/80">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/70 text-sm">Scroll to Explore</span>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section with Animation */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="group text-center p-8 transform hover:scale-110 transition-all duration-500 cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-300 group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section className="py-20 bg-gradient-to-b from-blue-900/10 to-white/10 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-4 text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            Experience Magic
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Discover why Bahir Dar is considered Ethiopia's spiritual and natural paradise
          </p>
          
          {/* Interactive Feature Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group cursor-pointer transform hover:scale-105 transition-all duration-700 ${
                  index % 2 === 1 ? 'lg:order-2' : ''
                }`}
                onMouseEnter={() => setCurrentFeature(index)}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <div className={`aspect-video bg-gradient-to-br ${feature.gradient} relative overflow-hidden`}>
                    {/* Feature Image Background */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-1000"
                      style={{ backgroundImage: `url(${feature.image})` }}
                    ></div>
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-80 group-hover:opacity-60 transition-opacity duration-500`}></div>
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex items-center justify-center text-white text-center p-8">
                      <div className="max-w-md">
                        <div className="text-6xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                          {feature.icon}
                        </div>
                        <h3 className="text-3xl font-black mb-4 group-hover:text-yellow-300 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-lg opacity-90 mb-4">{feature.description}</p>
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                          ⭐ {feature.stats}
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400/50 rounded-3xl transition-all duration-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Indicators */}
          <div className="flex justify-center gap-4">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentFeature(index)}
                className={`w-4 h-4 rounded-full transition-all duration-500 ${
                  currentFeature === index 
                    ? 'bg-gradient-to-r from-yellow-400 to-red-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Monasteries Section */}
      <section className="py-20 bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-6 py-3 mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              ✨ Spiritual Journey Awaits
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-gradient-to-r from-blue-800 to-purple-800 bg-clip-text">
              Sacred Monasteries
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Step into centuries of spiritual heritage, ancient manuscripts, and architectural marvels that whisper stories of faith and history
            </p>
          </div>
          
          <div data-aos="fade-up" data-aos-delay="200">
            <MonasteryGrid monasteries={featuredMonasteries} />
          </div>
          
          <div className="text-center mt-16">
            <Link 
              to="/monasteries" 
              className="group inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-5 rounded-2xl font-black text-lg transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/30 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                🏰 EXPLORE ALL SACRED SITES
                <span className="group-hover:translate-x-2 transition-transform duration-300">⚡</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Tours Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 rounded-full px-6 py-3 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              🎯 Curated Experiences
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text">
              Unforgettable Tours
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Handcrafted adventures that blend nature's wonders with cultural immersion and spiritual discovery
            </p>
          </div>
          
          <div data-aos="fade-up" data-aos-delay="300">
            <TourList tours={featuredTours} />
          </div>
          
          <div className="text-center mt-16">
            <Link 
              to="/tours" 
              className="group inline-flex items-center gap-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-12 py-5 rounded-2xl font-black text-lg transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-green-500/30 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                🎯 DISCOVER ALL ADVENTURES
                <span className="group-hover:rotate-180 transition-transform duration-500">🌍</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-100 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
              Traveler Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from adventurers who've experienced the magic
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 cursor-pointer border border-gray-100 hover:border-purple-200"
                data-aos="fade-up"
                data-aos-delay={index * 200}
              >
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">{testimonial.name}</div>
                    <div className="text-gray-500 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ultimate CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Limited Time Offer Badge */}
          <div className="inline-flex items-center gap-3 bg-yellow-400 text-gray-900 rounded-full px-8 py-4 mb-8 animate-bounce">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
            <span className="font-black text-lg">⚡ LIMITED TIME: 20% OFF ALL TOURS!</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black mb-6">
            Ready for Your
            <br />
            <span className="text-transparent bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text">
              Spiritual Awakening?
            </span>
          </h2>
          
          <p className="text-2xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Join thousands of travelers who've transformed their lives through the magic of Bahir Dar's ancient wonders and natural beauty
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Link 
              to="/booking" 
              className="group bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-16 py-6 rounded-2xl font-black text-xl transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-yellow-500/50 flex items-center gap-4 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                ⚡ BOOK NOW & SAVE 20%
                <span className="group-hover:animate-spin">🎯</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>
            
            <Link 
              to="/contact" 
              className="group border-2 border-white/80 hover:border-yellow-400 bg-white/10 backdrop-blur-lg hover:bg-yellow-400/20 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3"
            >
              💬 GET PERSONALIZED ITINERARY
              <span className="group-hover:scale-125 transition-transform">✨</span>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <span>🔒</span> Secure Booking
            </div>
            <div className="flex items-center gap-2">
              <span>⭐</span> 5-Star Rated
            </div>
            <div className="flex items-center gap-2">
              <span>🔄</span> Free Cancellation
            </div>
            <div className="flex items-center gap-2">
              <span>👥</span> Small Groups
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home