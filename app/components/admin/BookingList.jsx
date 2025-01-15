'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import useAxiosPublic from '../hooks/useAxiosPublic';

const PDFDownloadButton = dynamic(() => import('./PDFDownloadButton'), {
  ssr: false,
  loading: () => <p>Loading PDF generator...</p>
})

export default function BookingList() {
  const [bookings, setBookings] = useState([])
  //Booking get
  useEffect(() => {
    const axiosPublic = useAxiosPublic();

    const fetchBooking = async () => {
      try {
        const res = await axiosPublic.get('/booking');  // Make GET request to fetch videos
        setBookings(res.data);  // Update the videos state with the fetched data
        console.log(res.data); // Log the fetched data
      } catch (error) {
        console.error('Error fetching Booking:', error);
        setError('There was an error fetching the Booking.');
      }
    };

    fetchBooking();  // Make the API call directly inside the useEffect
  }, []);





  const handleDelete = async (id) => {
    try {
      const axiosPublic = useAxiosPublic();
      // Make the DELETE request to the server
      const response = await axiosPublic.delete(`/booking/${id}`);

      // Check if the deletion was successful
      if (response.status === 200) {
        // Reload the page after successful deletion
        window.location.reload();
      } else {
        console.error('Failed to delete the video');
      }
    } catch (error) {
      console.error('Error deleting the video:', error);
    }
  };


  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Booking List</h2>
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
                {/* <td className="border px-4 py-2">{booking._id}</td> */}
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
      <div className="mt-4">
        <PDFDownloadButton bookings={bookings} />
      </div>
    </div>
  )
}

