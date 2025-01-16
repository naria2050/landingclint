'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import Image from 'next/image';

export default function CardList() {
  const [cards, setCards] = useState([])
  const [error, setError] = useState('')
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axiosPublic.get('/card');
        setCards(res.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
        setError('There was an error fetching the cards.');
      }
    };

    fetchCards();
  }, [axiosPublic]);

  const handleDelete = async (id) => {
    try {
      const response = await axiosPublic.delete(`/card/${id}`);
      if (response.status === 200) {
        setCards(cards.filter(card => card._id !== id));
        Swal.fire('Deleted!', 'The card has been deleted.', 'success');
      } else {
        console.error('Failed to delete the card');
        Swal.fire('Error', 'Failed to delete the card', 'error');
      }
    } catch (error) {
      console.error('Error deleting the card:', error);
      Swal.fire('Error', 'An error occurred while deleting the card', 'error');
    }
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    const { title, header, subHeader, description, shortDescription, image } = data;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('header', header);
    formData.append('subHeader', subHeader);
    formData.append('description', description);
    formData.append('shortDescription', shortDescription);
    formData.append('image', image[0]);

    try {
      const res = await axiosPublic.post('/card', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (res.status === 201 && res.data.insertedId) {
        Swal.fire({
          title: 'Success!',
          text: 'Card added successfully.',
          icon: 'success',
        });
        reset();
        // Fetch cards again to update the list
        const updatedCards = await axiosPublic.get('/card');
        setCards(updatedCards.data);
      } else {
        Swal.fire({
          title: 'Warning!',
          text: 'The card was not added successfully.',
          icon: 'warning',
        });
      }
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      Swal.fire({
        title: 'Error!',
        text: `There was an error while adding the card: ${error.response?.data || error.message}`,
        icon: 'error',
      });
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-6">Card List</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Header</th>
              <th className="px-4 py-2 text-left">Sub Header</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr key={card._id} className="border-t border-gray-300">
                <td className="px-4 py-2">
                  {card.imageUrl && (
                    <Image
                    src={`https://narialandingserver.vercel.app${card.imageUrl}`}
                      alt={card.title}
                      width={50}
                      // http://localhost:5000
                      height={50}
                      className="object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-4 py-2">{card.title}</td>
                <td className="px-4 py-2">{card.header}</td>
                <td className="px-4 py-2">{card.subHeader}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(card._id)}
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

      <div className='my-10'>
        <h3 className='text-center text-2xl font-bold'>Add New Card</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered w-full"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <input
          type="text"
          placeholder="Header"
          className="input input-bordered w-full"
          {...register("header", { required: "Header is required" })}
        />
        {errors.header && <p className="text-red-500">{errors.header.message}</p>}

        <input
          type="text"
          placeholder="Sub Header"
          className="input input-bordered w-full"
          {...register("subHeader", { required: "Sub Header is required" })}
        />
        {errors.subHeader && <p className="text-red-500">{errors.subHeader.message}</p>}

        <input
          type="text"
          placeholder="Description"
          className="input input-bordered w-full"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}

        <input
          type="text"
          placeholder="Short Description"
          className="input input-bordered w-full"
          {...register("shortDescription", { required: "Short Description is required" })}
        />
        {errors.shortDescription && <p className="text-red-500">{errors.shortDescription.message}</p>}

        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          {...register("image", { required: "Image is required" })}
        />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}

        <div className="md:col-span-2">
          <button type="submit" className="btn btn-primary w-full">Add Card</button>
        </div>
      </form>
    </div>
  )
}

