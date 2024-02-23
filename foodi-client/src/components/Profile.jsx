import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import avatarImg from "/avatar.png";

import { Link, useNavigate } from "react-router-dom";
// prop is a user
const Profile = ({ user }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // logogut handle
  const handleLogout = () => {
    logout()
      .then(() => {
        // Sign-out successful.
        navigate("/")
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="drawer drawer-end z-50 ">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            // avatar is used for circle the image
            className="drawer-button btn btn-circle btn-ghost avatar"
          >
            {/* // agr user hai toh uska gmail ka photo wrna default default image set kiya hai */}
            <div className="w-10 rounded-full">
              {user.photoURL? <img alt="" src={user.photoURL} /> : <img alt="" src={avatarImg} />}
              
            </div>

          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a href="/update-profile">Profile</a>
            </li>
            <li>
              <a href="order">Order</a>
            </li>

            <li>
              <a>Setting</a>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
