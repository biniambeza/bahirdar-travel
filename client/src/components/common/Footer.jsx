import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Bahir Dar Travel</h3>
            <p className="text-gray-300">
              Discover the beauty of Lake Tana and its ancient monasteries with our expert guides.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <Link to="/monasteries" className="text-gray-300 hover:text-white transition duration-300">Monasteries</Link>
              <Link to="/tours" className="text-gray-300 hover:text-white transition duration-300">Tours</Link>
              <Link to="/booking" className="text-gray-300 hover:text-white transition duration-300">Book Now</Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="text-gray-300 space-y-2">
              <p>📍 Bahir Dar, Ethiopia</p>
              <p>📞 +251 XXX XXX XXX</p>
              <p>✉️ info@bahirdartravel.com</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <div className="text-gray-300 hover:text-white cursor-pointer transition duration-300">Facebook</div>
              <div className="text-gray-300 hover:text-white cursor-pointer transition duration-300">Instagram</div>
              <div className="text-gray-300 hover:text-white cursor-pointer transition duration-300">Twitter</div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Bahir Dar Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer