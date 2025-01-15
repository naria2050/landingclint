'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

export default function BreakingNewsList() {
  const [news, setNews] = useState([])
  const [newNews, setNewNews] = useState({ title: '', url: '' })
  const [error, setError] = useState('')  // Declare the error state






  //news link get
  useEffect(() => {
    const axiosPublic = useAxiosPublic();

    const fetchNews = async () => {
      try {
        const res = await axiosPublic.get('/news');  // Make GET request to fetch videos
        setNews(res.data);  // Update the videos state with the fetched data

      } catch (error) {
        console.error('Error fetching news:', error);
        setError('There was an error fetching the news.');
      }
    };

    fetchNews();  // Make the API call directly inside the useEffect
  }, []);




  const handleDelete = async (id) => {
    try {
      const axiosPublic = useAxiosPublic();
      // Make the DELETE request to the server
      const response = await axiosPublic.delete(`/news/${id}`);

      // Check if the deletion was successful
      if (response.status === 200) {
        // Reload the page after successful deletion
        window.location.reload();
      } else {
        console.error('Failed to delete the news');
      }
    } catch (error) {
      console.error('Error deleting the news:', error);
    }
  };



  //add Video link
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    const { title, content } = data;

    const VideoInfo = {
      title: title,
      content: content
    };

    const axiosPublic = useAxiosPublic(); // Get the axios instance

    try {
      const res = await axiosPublic.post('/news', VideoInfo);
      reset();

      if (res.status === 201 && res.data.insertedId) {
        reset();

        Swal.fire({
          title: 'Success!',
          text: 'News added successfully.',
          timer: 2000,
          icon: 'success',

        });
        // window.location.reload();

      } else {
        Swal.fire({
          title: 'Warning!',
          text: 'The News was not added successfully.',
          icon: 'warning',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'There was an error while adding the news.',
        icon: 'error',
      });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Breaking News List</h2>
      {error && <p className="text-red-500">{error}</p>} {/* Show error message if it exists */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Content</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map((news) => (
              <tr key={news._id}>
                <td className="border px-4 py-2">{news._id}</td>
                <td className="border px-4 py-2">{news.title}</td>
                <td className="border px-4 py-2">
                  {news.content}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(news._id)}
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
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex gap-4">
        <input type="text" name="Title" placeholder="Title" className="input input-bordered" required {...register("title", { required: true })} />

        <input type="text" name="Url" placeholder="Content" className="input input-bordered" required {...register("content", { required: true })} />

        <div className="form-control ">
          <button className="btn btn-primary  ">Add Video Link</button>
        </div>
      </form>
    </div>
  )
}
