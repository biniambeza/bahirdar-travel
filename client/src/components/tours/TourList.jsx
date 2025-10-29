import React from 'react'
import TourCard from './TourCard'

const TourList = ({ tours }) => {
  if (!tours || tours.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No tours available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tours.map((tour) => (
        <TourCard key={tour._id || tour.id} tour={tour} />
      ))}
    </div>
  )
}

export default TourList