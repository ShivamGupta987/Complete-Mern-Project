import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Order = () => {

  const{user} = useAuth();
  const token = localStorage.getItem('access-token')

  const { isLoading, error, data: orders, refetch } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      try {
        const response = await fetch(`http://localhost:6001/payments?email=${user?.email}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.result || []; 
      } catch (error) {
        console.error("Fetching orders failed:", error);
        throw error; 
      }
    },
    enabled: !!user?.email, 
  });

  // console.log(orders)

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const formatDate = (createdAt) =>{
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  }
  return (

    // thi all from CartPage.jsx samre to same
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-28 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Track All Your<span className="text-green"> Orders!</span>
            </h2>
          </div>
        </div>
      </div>

      {/* table  */}


      {
        (orders.length > 0) ? <div>
        <div className="">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-green text-white rounded-sm">
                <tr>
                  <th>#</th>
                  <th>Order Date</th>
                  <th>TransactionId</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              {/* row 1 */}
              <tbody>
                {orders.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {formatDate(item.createdAt)}
                    
                    </td>
                    <td className="font-medium">{item.transitionId}</td>
                    <td>
                     $ {item.price}
                    </td>
                    <td>{item.status}</td>
                    <td>
                      <Link to = "/contact"
                        className="btn btn-sm border-none text-red bg-transparent"
                    
                      >
                        Contact
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* foot */}
            </table>
          </div>
        </div>
        <hr />
   
      </div> : <div className="text-center mt-20">
        <p>Order is empty. Please add products.</p>
        <Link to="/menu"><button className="btn bg-green text-white mt-5 ">Back to Menu</button></Link>
      </div>
      }
      


    </div>
  );
};

export default Order;


