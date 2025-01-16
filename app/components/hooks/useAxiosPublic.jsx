import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'https://narialandingserver.vercel.app', // your API base URL
  // baseURL: 'http://localhost:5000',
});

const useAxiosPublic = () => {
  return axiosPublic; // return the axios instance
};

export default useAxiosPublic;
