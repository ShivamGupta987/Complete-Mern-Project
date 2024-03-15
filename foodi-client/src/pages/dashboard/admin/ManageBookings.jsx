import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";

const ManageBookings = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // This state will hold the IDs of orders that have been confirmed, for immediate UI update

  // this is for my ordeer confirmer immeditate respons
  const [confirmedOrders, setConfirmedOrders] = useState(new Set());

  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments/all");
      return res.data;
    },
  });

  const handleConfirm = async (item) => {
    console.log(item);

    await axiosSecure.patch(`/payments/${item._id}`).then((res) => {
      console.log(res.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Payments confirmed!",
        showConfirmButton: false,
        timer: 1500,
      });

      // this is for solve error

      // Add the confirmed item's ID to the confirmedOrders set for immediate UI feedback
      setConfirmedOrders((prev) => new Set(prev).add(item._id));

      // Then refetch to ensure data consistency with the backend when possible
      refetch();
    });
  };

  return (
    <div>
      <div>
        <div className="flex items-center justify-between m-4">
          <h5>All Orders</h5>
          <h5>Total Orders: {orders.length}</h5>
        </div>

        {/* table */}
        <div>
          <div className="overflow-x-auto">
            <table className="table table-zebra md:w-[870px]">
              {/* head */}
              <thead className="bg-green text-white rounded-lg">
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Transaction Id</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Confirm Order</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item.email}</td>
                    <td>{item.transactionId}</td>
                    <td>${item.price}</td>
                    <td>
                      {confirmedOrders.has(item._id)
                        ? "confirmed"
                        : item.status}
                    </td>
                    <td className="text-center">
                      {confirmedOrders.has(item._id) ||
                      item.status === "confirmed" ? (
                        "Done"
                      ) : (
                        <button
                          onClick={() => handleConfirm(item)}
                          className="btn btn-xs bg-green text-white"
                        >
                          <GiConfirmed />
                        </button>
                      )}
                    </td>
                    <td>
                      <button className="btn btn-xs bg-orange-500 text-white">
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
