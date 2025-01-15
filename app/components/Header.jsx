'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const announcements = [
  "🌟 Summer Sale: 20% off all beach packages!",
  "🏔️ New mountain tours available now!",
  "🎉 Book now and get a free city tour!"
]

export default function Header() {
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white text-[#2B3B5B]">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="w-40">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tJda3re8jLVoRy9DiCugIu6r1AEsR9.png"
              alt="Naria Holidays"
              width={160}
              height={60}
              className="object-contain"
            />
          </div>
          <div className="hidden md:flex space-x-6">
            <Link href="#" className="hover:text-[#FF8C00] transition duration-300">Home</Link>
            <Link 
              href="#contact" 
              className="hover:text-[#FF8C00] transition duration-300"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact
            </Link>
          </div>
          <div className="md:hidden">
            <button 
              className="focus:outline-none text-[#2B3B5B]" 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-2">
              <Link href="#" className="block py-2 hover:text-[#FF8C00] transition duration-300">Home</Link>
              <Link 
                href="#contact" 
                className="block py-2 hover:text-[#FF8C00] transition duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  const contactSection = document.querySelector('#contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-gradient-to-r from-[#FF8C00] to-[#FF6B00] py-8 px-4 relative">
        <motion.div
          key={currentAnnouncement}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto flex items-center justify-center"
        >
          <p className="text-center font-bold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-4xl mx-auto px-12">
            {announcements[currentAnnouncement]}
          </p>
        </motion.div>
      </div>
    </header>
  )
}
