// import React from 'react'

import { useContext } from "react"
import { AuthContext } from "../contexts/AuthProvider"
import { useQuery } from "@tanstack/react-query"


// cart ka length kya hai isliye sue kiye humne

const useCart = () => {
    const{user} = useContext(AuthContext)
    const token = localStorage.getItem('access-token')

    const {refetch,data:cart = []} = useQuery({
      queryKey : ['carts',user?.email],
        queryFn: async () => {
            const res = await fetch(`https://complete-mern-project-13.onrender.com/carts?email=${user?.email}`,{
              headers:{
                authorization:`Bearer ${token}`
              }
            })
            return res.json()
          },

    })

  return [cart,refetch]
}

export default useCart
