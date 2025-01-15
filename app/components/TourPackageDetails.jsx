'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function TourPackageDetails({ pkg, onClose, onBookNow }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg overflow-hidden w-full max-w-sm max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-square w-full max-w-[250px] mx-auto">
          <Image 
            src={pkg.image} 
            alt={pkg.name} 
            layout="fill" 
            objectFit="cover" 
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col flex-grow overflow-hidden">
          <div className="p-4 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">{pkg.name}</h2>
            <p className="text-base text-gray-600 mb-2">Starting from {pkg.price}</p>
            <div className="text-sm text-gray-700 space-y-2">
              <p>{pkg.description}</p>
              <p>Immerse yourself in the beauty of our tropical paradise, where crystal-clear waters meet powdery white sand beaches. Our overwater bungalows offer a unique and luxurious experience, allowing you to wake up to stunning ocean views every morning.</p>
              <p>During your stay, you can enjoy a wide range of activities:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Snorkeling in vibrant coral reefs</li>
                <li>Sunset sailing excursions</li>
                <li>Beachfront yoga sessions</li>
                <li>Spa treatments with ocean views</li>
                <li>Gourmet dining experiences</li>
                <li>Island-hopping adventures</li>
              </ul>
              <p>Our all-inclusive packages ensure a worry-free vacation, with meals, drinks, and many activities included in your stay. Whether you're seeking romance, relaxation, or adventure, our tropical island getaway offers something for everyone.</p>
              <p>Book now to secure your slice of paradise and create unforgettable memories in one of the world's most beautiful destinations.</p>
            </div>
          </div>
          <div className="p-4 bg-gray-100 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 text-sm"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 text-sm"
              onClick={onBookNow}
            >
              Book Now
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

