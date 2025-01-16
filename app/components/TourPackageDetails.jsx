'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function TourPackageDetails({ pkg, onClose, onBookNow }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
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
            src={`https://narialandingserver.vercel.app${pkg.imageUrl}`}
            alt={pkg.title} 
            layout="fill" 
            objectFit="cover" 
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col flex-grow overflow-hidden">
          <div className="p-4 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">{pkg.title}</h2>
            <p className="text-base text-gray-600 mb-2">{pkg.header}</p>
            <div className="text-sm text-gray-700 space-y-2">
              <p>{pkg.description}</p>
              <p>{pkg.shortDescription}</p>
              <p>{pkg.subHeader}</p>
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

