import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'

// Public Pages
import Home from './pages/public/Home'
import Monasteries from './pages/public/Monasteries'
import MonasteryDetail from './pages/public/MonasteryDetail'
import Tours from './pages/public/Tours'
import Booking from './pages/public/Booking'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

// User Pages
import UserDashboard from './pages/user/UserDashboard'
import UserBookings from './pages/user/UserBookings'
import UserProfile from './pages/user/UserProfile'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import MonasteryManagement from './pages/admin/MonasteryManagement'
import TourManagement from './pages/admin/TourManagement'
import BookingManagement from './pages/admin/BookingManagement'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/monasteries" element={<Monasteries />} />
              <Route path="/monasteries/:id" element={<MonasteryDetail />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/booking" element={<Booking />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* User Routes */}
              <Route path="/user/dashboard" element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              } />
              <Route path="/user/bookings" element={
                <ProtectedRoute>
                  <UserBookings />
                </ProtectedRoute>
              } />
              <Route path="/user/profile" element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/monasteries" element={
                <ProtectedRoute adminOnly={true}>
                  <MonasteryManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/tours" element={
                <ProtectedRoute adminOnly={true}>
                  <TourManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/bookings" element={
                <ProtectedRoute adminOnly={true}>
                  <BookingManagement />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App