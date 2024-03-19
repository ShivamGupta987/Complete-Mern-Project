import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";

const Modal = () => {
  const [errorMessage, seterrorMessage] = useState("");

  const { signUpwithGmail, login } = useContext(AuthContext);
  // redirectin to home page or specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  // react-hook-form

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((result) => {
        // Signed in
        const user = result.user;
        const userInfor = {
          name: data.name,
          email: data.email,
        };
        axios
          .post("https://complete-mern-project-13.onrender.com/users", userInfor)
          .then((response) => {
            // console.log(response);
            alert("Signin successful!");
            navigate(from, { replace: true });
          });
        // console.log(user);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        seterrorMessage("Please provide valid email & password!");
      });
    reset();
  };

  // google sign in login
  const handleRegister = () => {
    signUpwithGmail()
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axiosPublic
          .post("http:localhost:6001/users", userInfor)
          .then((response) => {
            // console.log(response);
            alert("Signin successful!");
            navigate("/");
          });
      })
      .catch((error) => console.log(error));
  };

  return (
    <dialog
      id="my_modal_5"
      // by default modal is shwon on bottom in small devices
      className="modal modal-middle sm:modal-middle"
    >
      <div className="modal-box">
        <div className="modal-action flex flex-col justify-center mt-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body"
            method="dialog"
          >
            <h3 className="font-bold text-lg">Please Login!</h3>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>

                {/* email */}
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                // required
                {...register("email")}
              />
            </div>

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", { required: true })}
              />
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* error */}
            {errorMessage ? (
              <p className="text-red text-xs italic">
                Provide a correct username & password.
              </p>
            ) : (
              ""
            )}

            {/*  login button */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="login"
                className="btn bg-green text-white"
              />
            </div>

             {/* close btn */}
             <div
              htmlFor="my_modal_5"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_5").close()}
            >
              ✕
            </div>
            
            {/* sign up */}


            <p className="text-center my-2 mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="underline text-red ml-1">
                Signup Now
              </Link>
            </p>

           
          
          </form>

          {/*  social sign in */}

          <div className="text-center space-x-3 mb-5">
            <button
              className="btn btn-circle hover:bg-green hover:text-white"
              onClick={handleRegister}
            >
              <FaGoogle />
            </button>
            <button className="btn btn-circle hover:bg-green text-gray">
              <FaFacebookF />
            </button>
            <button className="btn btn-circle hover:bg-green text-gray">
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
