'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

export default function CardList() {
  const [cards, setCards] = useState([])
  const [newCard, setNewCard] = useState({ title: '', url: '' })
  const [error, setError] = useState('')  // Declare the error state






  //video link
  useEffect(() => {
    const axiosPublic = useAxiosPublic();

    const fetchCards = async () => {
      try {
        const res = await axiosPublic.get('/card');  // Make GET request to fetch videos
        setCards(res.data);  // Update the videos state with the fetched data
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError('There was an error fetching the video links.');
      }
    };

    fetchCards();  // Make the API call directly inside the useEffect
  }, []);

  const handleDelete = async (id) => {
    try {
      const axiosPublic = useAxiosPublic();
      // Make the DELETE request to the server
      const response = await axiosPublic.delete(`/card/${id}`);

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












  //add Video link
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    const { title, header, subHeader, description, subDescription, url } = data;

    const CardInfo = {
      title: title,
      header: header,
      subHeader: subHeader,
      description: description,
      subDescription: subDescription,
      url: url
    };

    const axiosPublic = useAxiosPublic(); // Get the axios instance

    try {
      const res = await axiosPublic.post('/card', CardInfo);
      reset();

      if (res.status === 201 && res.data.insertedId) {
        reset();

        Swal.fire({
          title: 'Success!',
          text: 'Video added successfully.',
          icon: 'success',
        });
        window.location.reload();

      } else {
        Swal.fire({
          title: 'Warning!',
          text: 'The video was not added successfully.',
          icon: 'warning',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'There was an error while adding the video.',
        icon: 'error',
      });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Card List</h2>
      {error && <p className="text-red-500">{error}</p>} {/* Show error message if it exists */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Header</th>
              <th className="px-4 py-2">Sub Description</th>

            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr key={card._id}>
                <td className="border px-4 py-2">{card.title}</td>
                <td className="border px-4 py-2">{card.header}</td>
                <td className="border px-4 py-2">{card.subHeader}</td>

                <td className="border px-4 py-2">
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
      {/* <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex gap-4">
          <input type="text" name="Title" placeholder="Title" className="input input-bordered" required {...register("title", { required: true })} />

          <input type="text" name="Header" placeholder="Header" className="input input-bordered" required {...register("header", { required: true })} />

          <input type="text" name="Sub Header" placeholder="Sub Header" className="input input-bordered" required {...register("subHeader", { required: true })} />

          <input type="text" name="Description" placeholder="Description" className="input input-bordered" required {...register("description", { required: true })} />
          <input type="text" name="Short Description" placeholder="Short Description" className="input input-bordered" required {...register("shortDescription", { required: true })} />

          <input type="url" name="URL" placeholder="Image URL" className="input input-bordered" required {...register("url", { required: true })} />

          <div className="form-control ">
            <button className="btn btn-primary  ">Add Card</button>
          </div>
        </form> */}
<div className='my-10'><p className='text-center text-2xl font-bold'>AddCard</p></div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 grid gap-4 md:grid-cols-2">
        <input
          type="text"
          name="Title"
          placeholder="Title"
          className="input input-bordered"
          required
          {...register("title", { required: true })}
        />

        <input
          type="text"
          name="Header"
          placeholder="Header"
          className="input input-bordered"
          required
          {...register("header", { required: true })}
        />

        <input
          type="text"
          name="Sub Header"
          placeholder="Sub Header"
          className="input input-bordered"
          required
          {...register("subHeader", { required: true })}
        />

        <input
          type="text"
          name="Description"
          placeholder="Description"
          className="input input-bordered"
          required
          {...register("description", { required: true })}
        />

        <input
          type="text"
          name="Short Description"
          placeholder="Short Description"
          className="input input-bordered"
          required
          {...register("shortDescription", { required: true })}
        />

        <input
          type="url"
          name="URL"
          placeholder="Image URL"
          className="input input-bordered"
          required
          {...register("url", { required: true })}
        />

        <div className="form-control md:col-span-2">
          <button className="btn btn-primary w-full">Add Card</button>
        </div>
      </form>

    </div>
  )
}
