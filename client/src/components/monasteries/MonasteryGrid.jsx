import React from 'react'
import MonasteryCard from './MonasteryCard'

const MonasteryGrid = ({ monasteries }) => {
  if (!monasteries || monasteries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No monasteries found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {monasteries.map((monastery) => (
        <MonasteryCard key={monastery._id || monastery.id} monastery={monastery} />
      ))}
    </div>
  )
}

export default MonasteryGrid