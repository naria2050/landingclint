import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'https://narialandingserver.vercel.app', // your API base URL
  // baseURL: 'http://localhost:5000',
});

const useAxiosPublic = () => {
  return axiosPublic; // return the axios instance
};

export default useAxiosPublic;


// import axios from 'axios';

// const useAxiosPublic = () => {
//   const axiosPublic = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://narialandingserver.vercel.app',
//   });

//   return axiosPublic;
// };

// export default useAxiosPublic;


