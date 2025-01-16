'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import Image from 'next/image';

export default function CardList() {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState('');
  const axiosPublic = useAxiosPublic();

  // Fetch cards on component mount
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axiosPublic.get('/card');
        setCards(res.data);
      } catch (err) {
        console.error('Error fetching cards:', err);
        setError('Failed to load cards. Please try again later.');
      }
    };
    fetchCards();
  }, [axiosPublic]);

  // Handle card deletion
  const handleDelete = async (id) => {
    try {
      const res = await axiosPublic.delete(`/card/${id}`);
      if (res.status === 200) {
        setCards((prevCards) => prevCards.filter((card) => card._id !== id));
        Swal.fire('Deleted!', 'The card has been successfully deleted.', 'success');
      } else {
        throw new Error('Failed to delete the card');
      }
    } catch (err) {
      console.error('Error deleting card:', err);
      Swal.fire('Error', 'An error occurred while deleting the card.', 'error');
    }
  };

  // React Hook Form setup
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Handle new card submission
  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'image') {
        formData.append(key, value[0]); // Append file
      } else {
        formData.append(key, value); // Append text fields
      }
    });

    try {
      const res = await axiosPublic.post('/card', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.status === 201 && res.data.insertedId) {
        Swal.fire('Success!', 'Card added successfully.', 'success');
        reset();
        const updatedCards = await axiosPublic.get('/card');
        setCards(updatedCards.data);
      } else {
        Swal.fire('Warning!', 'Failed to add the card. Try again.', 'warning');
      }
    } catch (err) {
      console.error('Error adding card:', err.response?.data || err.message);
      Swal.fire('Error!', `Failed to add the card: ${err.response?.data || err.message}`, 'error');
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
                  <Image
                    src={card.imageUrl || '/default-image.png'}
                    alt={card.title || 'Card image'}
                    width={50}
                    height={50}
                    className="object-cover rounded"
                  />
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

      <div className="my-10">
        <h3 className="text-center text-2xl font-bold">Add New Card</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered w-full"
          {...register('title', { required: 'Title is required' })}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <input
          type="text"
          placeholder="Header"
          className="input input-bordered w-full"
          {...register('header', { required: 'Header is required' })}
        />
        {errors.header && <p className="text-red-500">{errors.header.message}</p>}

        <input
          type="text"
          placeholder="Sub Header"
          className="input input-bordered w-full"
          {...register('subHeader', { required: 'Sub Header is required' })}
        />
        {errors.subHeader && <p className="text-red-500">{errors.subHeader.message}</p>}

        <input
          type="text"
          placeholder="Description"
          className="input input-bordered w-full"
          {...register('description', { required: 'Description is required' })}
        />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}

        <input
          type="text"
          placeholder="Short Description"
          className="input input-bordered w-full"
          {...register('shortDescription', { required: 'Short Description is required' })}
        />
        {errors.shortDescription && <p className="text-red-500">{errors.shortDescription.message}</p>}

        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          {...register('image', { required: 'Image is required' })}
        />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}

        <div className="md:col-span-2">
          <button type="submit" className="btn btn-primary w-full">
            Add Card
          </button>
        </div>
      </form>
    </div>
  );
}

