'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

export default function VideoLinkList() {
  const [videos, setVideos] = useState([])
  const [newVideo, setNewVideo] = useState({ title: '', url: '' })
  const [error, setError] = useState('')  // Declare the error state






  //video link
  useEffect(() => {
    const axiosPublic = useAxiosPublic();

    const fetchVideos = async () => {
      try {
        const res = await axiosPublic.get('/video');  // Make GET request to fetch videos
        setVideos(res.data);  // Update the videos state with the fetched data
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError('There was an error fetching the video links.');
      }
    };

    fetchVideos();  // Make the API call directly inside the useEffect
  }, []);

  console.log(videos)




  const handleDelete = async (id) => {
    try {
      const axiosPublic = useAxiosPublic();
      // Make the DELETE request to the server
      const response = await axiosPublic.delete(`/video/${id}`);

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
    const { title, url } = data;

    const VideoInfo = {
      title: title,
      url: url
    };

    const axiosPublic = useAxiosPublic(); // Get the axios instance

    try {
      const res = await axiosPublic.post('/video', VideoInfo);
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
      <h2 className="text-xl font-semibold mb-4">Video Link List</h2>
      {error && <p className="text-red-500">{error}</p>} {/* Show error message if it exists */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">URL</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video._id}>
                <td className="border px-4 py-2">{video._id}</td>
                <td className="border px-4 py-2">{video.title}</td>
                <td className="border px-4 py-2">
                  <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {video.url}
                  </a>
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(video._id)}
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

        <input type="url" name="Url" placeholder="Video URL" className="input input-bordered" required {...register("url", { required: true })} />

        <div className="form-control ">
          <button className="btn btn-primary  ">Add Video Link</button>
        </div>
      </form>
    </div>
  )
}
