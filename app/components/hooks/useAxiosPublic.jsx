import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'https://narialandingserver.vercel.app', // your API base URL
});

const useAxiosPublic = () => {
  return axiosPublic; // return the axios instance
};

export default useAxiosPublic;
