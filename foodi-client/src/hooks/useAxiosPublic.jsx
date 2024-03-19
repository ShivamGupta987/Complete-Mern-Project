import axios from 'axios'
import React from 'react'


const axiosPublic =  axios.create({
    baseURL: 'https://complete-mern-project-13.onrender.com',
  })

const useAxiosPublic = () => {
  return axiosPublic
}

export default useAxiosPublic;

  
