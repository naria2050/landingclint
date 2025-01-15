'use client'

import { AnimatePresence } from 'framer-motion'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import TourPackages from './components/TourPackages.jsx'
import BookingForm from './components/BookingForm.jsx'
import Footer from './components/Footer.jsx'

export default function Home() {
  return (
    <AnimatePresence>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Hero />
          <TourPackages />
          <BookingForm />
        </main>
        <Footer />
      </div>
    </AnimatePresence>
  )
}

