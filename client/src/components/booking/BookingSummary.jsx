import React from 'react'

const BookingSummary = ({ tour, bookingData }) => {
  const calculateTotal = () => {
    return tour.price * bookingData.numberOfPeople
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Booking Summary</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Tour:</span>
          <span className="font-semibold">{tour.title}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Date:</span>
          <span>{bookingData.date ? new Date(bookingData.date).toLocaleDateString() : 'Not selected'}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Number of People:</span>
          <span>{bookingData.numberOfPeople}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Price per person:</span>
          <span>ETB {tour.price}</span>
        </div>
        
        <div className="border-t pt-3">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>ETB {calculateTotal()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingSummary