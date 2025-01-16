'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import useAxiosPublic from '../hooks/useAxiosPublic'

const PDFDownloadButton = dynamic(() => import('./PDFDownloadButton'), {
  ssr: false,
  loading: () => <p>Loading PDF generator...</p>
})

export default function BookingList() {
  const [bookings, setBookings] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const axiosPublic = useAxiosPublic()

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true)
        const res = await axiosPublic.get('/booking')
        setBookings(res.data)
        setError('')
      } catch (error) {
        console.error('Error fetching Bookings:', error)
        setError('There was an error fetching the Bookings. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [axiosPublic])

  const handleDelete = async (id) => {
    try {
      const response = await axiosPublic.delete(`/booking/${id}`)
      if (response.status === 200) {
        setBookings(bookings.filter(booking => booking._id !== id))
      } else {
        throw new Error('Failed to delete the booking')
      }
    } catch (error) {
      console.error('Error deleting the booking:', error)
      setError('An error occurred while deleting the booking. Please try again.')
    }
  }

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Booking List</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Contact No.</th>
                <th className="px-4 py-2">Country Destinations</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="border px-4 py-2">{booking.name}</td>
                  <td className="border px-4 py-2">{booking.email}</td>
                  <td className="border px-4 py-2">{booking.contractNo}</td>
                  <td className="border px-4 py-2">{booking.countryDestinations}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-4">
        <PDFDownloadButton bookings={bookings} />
      </div>
    </div>
  )
}

