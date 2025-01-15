'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import TourPackageDetails from './TourPackageDetails'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import useAxiosPublic from './hooks/useAxiosPublic'

const packages = [
  { id: 1, name: 'Beach Paradise', price: '$999', image: '/placeholder.svg?height=300&width=400', description: 'Experience the ultimate beach getaway with crystal clear waters and white sandy beaches.' },
  { id: 2, name: 'Mountain Escape', price: '$1299', image: '/placeholder.svg?height=300&width=400', description: 'Embark on a thrilling adventure in the majestic mountains with breathtaking views and fresh air.' },
  { id: 3, name: 'City Explorer', price: '$899', image: '/placeholder.svg?height=300&width=400', description: 'Discover the vibrant culture and exciting nightlife of world-renowned cities.' },
  { id: 4, name: 'Desert Safari', price: '$1099', image: '/placeholder.svg?height=300&width=400', description: 'Experience the magic of the desert with camel rides and stargazing under the clear night sky.' },
  { id: 5, name: 'Tropical Island', price: '$1499', image: '/placeholder.svg?height=300&width=400', description: 'Escape to a secluded tropical island paradise with overwater bungalows and pristine beaches.' },
]

export default function TourPackages() {
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [packages, setPackages] = useState([])
  
  


  // Fetch video URL
  useEffect(() => {
    const axiosPublic = useAxiosPublic()

    const fetchVideo = async () => {
      try {
        const res = await axiosPublic.get('/card')  // Fetch video data from API
        setPackages(res.data)  // Set the video URL in state
      } catch (error) {
        console.error('Error fetching video:', error)
      }
    }

    fetchVideo()  // Fetch video URL when the component mounts
  }, [])



  const handleBookNow = () => {
    setSelectedPackage(null)
    const bookingSection = document.getElementById('booking')
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-100 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[#2B3B5B] to-[#FF8C00] text-transparent bg-clip-text">
            Our Popular Tour Packages
          </h2>
          <div className="w-24 h-2 bg-gradient-to-r from-[#2B3B5B] to-[#FF8C00] mx-auto rounded-full"></div>
        </motion.div>
        <div className="relative px-12">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
          >
            {packages.map((pkg) => (
              <SwiperSlide key={pkg.id}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative aspect-square">
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      layout="fill"
                      objectFit="cover"
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-start p-4">
                      <motion.button
                        className="bg-[#FF8C00] hover:bg-[#FF6B00] text-white font-bold py-2 px-4 rounded transition duration-300 text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedPackage(pkg)}
                      >
                        Learn More
                      </motion.button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1 text-[#2B3B5B]">hh</h3>
                    <p className="text-sm text-[#FF8C00] font-semibold">Starting from </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-[#2B3B5B] to-[#1E2A40] hover:from-[#1E2A40] hover:to-[#2B3B5B] text-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00] z-10 transition duration-300">
            <ChevronLeft className="w-6 h-6 mx-auto" />
          </button>
          <button className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-[#2B3B5B] to-[#1E2A40] hover:from-[#1E2A40] hover:to-[#2B3B5B] text-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-[#FF8C00] z-10 transition duration-300">
            <ChevronRight className="w-6 h-6 mx-auto" />
          </button>
        </div>
      </div>
      {selectedPackage && (
        <TourPackageDetails
          pkg={selectedPackage}
          onClose={() => setSelectedPackage(null)}
          onBookNow={handleBookNow}
        />
      )}
    </section>
  )
}

