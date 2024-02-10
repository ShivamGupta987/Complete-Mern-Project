import React from "react";
import { FaTrashAlt, FaUser, FaUsers } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
// import Login from "../components/Login";

const Users = () => {
  const { refetch, data: users = [], isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await fetch(`http://localhost:6001/users`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      } catch (error) {
        throw new Error('Failed to fetch users');
      }
    },
  });

  const isAdmin = false;

  console.log(users);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data</p>;
  }

  return (
    <div>
      {isAdmin ? (
        <div>
          <div className="flex items-center justify-between m-4">
            <h5>All Users</h5>
            <h5>Total Users: {users && users.length}</h5>
          </div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table table-zebra md:w-[870px]">
              {/* head */}
              <thead className="bg-green text-white rounded-lg">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.role === 'admin' ? (
                        "Admin"
                      ) : (
                        <button className="btn btn-xs btn-circle bg-indigo-500 text-white">
                          <FaUsers />
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
      ) : (
        <Login/>
      )}
    </div>
  );
};

export default Users;
