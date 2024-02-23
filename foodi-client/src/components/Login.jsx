import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
// import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [errorMessage, seterrorMessage] = useState("");
  const { signUpWithGmail, login } = useAuth();
  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  //react hook form
  const {
    register,
    handleSubmit, reset,
    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => {
  //   const email = data.email;
  //   const password = data.password;
  //   login(email, password)
  //     .then((result) => {
  //       // Signed in
  //       const user = result.user;
  //       const userInfor = {
  //         name: data.name,
  //         email: data.email,
  //       };
  //       axiosPublic
  //         .post("/users", userInfor)
  //         .then((response) => {
  //           // console.log(response);
  //           alert("Signin successful!");
  //           navigate(from, { replace: true });
  //         });
  //       // console.log(user);
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorMessage = error.message;
  //       seterrorMessage("Please provide valid email & password!");
  //     });
  //     reset()

  // };
  const onSubmit = async (data) => {
    try {
      // Attempt to log in with the provided email and password
      const result = await login(data.email, data.password);
      
      // Assuming login is successful and you have the user information
      // Now, you want to post this information to your backend or perform other actions
      const userInfor = {
        name: data.name, // Ensure you have 'name' in your form data or find an alternative
        email: data.email,
      };
  
      await axiosPublic.post("/users", userInfor);
      
      // If the post request is successful, show an alert and navigate
      alert("Sign in successful!");
      navigate(from, { replace: true });
  
    } catch (error) {
      // Handle any errors that occur during the login process
      console.error("Login error:", error);
      // It's best to set a more user-friendly error message
      seterrorMessage("Failed to log in. Please check your credentials and try again.");
    }
  
    // Reset form fields
    reset();
  };
  

  // login with google
  // login with google
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axiosPublic
          .post("/users", userInfor)
          .then((response) => {
            // console.log(response);
            alert("Signin successful!");
            navigate("/");
          });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
    <div className="mb-5">
    <form
            className="card-body"
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="font-bold text-lg">Please Login!</h3>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
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
              <label className="label">
                <a href="#" className="label-text-alt link link-hover mt-2">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* show errors */}
            {errorMessage ? (
              <p className="text-red text-xs italic">
                Provide a correct username & password.
              </p>
            ) : (
              ""
            )}

            {/* submit btn */}
            <div className="form-control mt-4">
              <input
                type="submit"
                className="btn bg-green text-white"
                value="Login"
              />
            </div>

            {/* close btn */}
            <Link to="/">
            <div
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </div></Link>

            <p className="text-center my-2">
              Donot have an account?
              <Link to="/signup" className="underline text-red ml-1">
                Signup Now
              </Link>
            </p>
          </form>
    <div className="text-center space-x-3">
        <button onClick={handleRegister} className="btn btn-circle hover:bg-green hover:text-white">
          <FaGoogle />
        </button>
        <button className="btn btn-circle hover:bg-green hover:text-white">
          <FaFacebookF />
        </button>
        <button className="btn btn-circle hover:bg-green hover:text-white">
          <FaGithub />
        </button>
      </div>
    </div>
  </div>
  )
}

export default Login
// import React, { useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
// import { useForm } from "react-hook-form";
// import useAuth from "../hooks/useAuth";
// import useAxiosPublic from "../hooks/useAxiosPublic";

// const Login = () => {
//   const [errorMessage, setErrorMessage] = useState("");
//   const { signUpWithGmail, login } = useAuth();
//   const axiosPublic = useAxiosPublic();

//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/";

//   const { register, handleSubmit, reset, formState: { errors } } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const result = await login(data.email, data.password);
//       // Assuming login function returns user data and doesn't automatically handle redirects
//       await axiosPublic.post("/users/login", { email: data.email });
//       navigate(from, { replace: true });
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || "An error occurred. Please try again.");
//     }
//     reset();
//   };

//   const handleRegister = async () => {
//     try {
//       const result = await signUpWithGmail();
//       await axiosPublic.post("/users/login", { email: result?.user?.email });
//       navigate(from, { replace: true });
//     } catch (error) {
//       console.error(error);
//       setErrorMessage(error.message);
//     }
//   };

//   return (
//     <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
//       <div className="mb-5">
//         <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
//           {/* Form fields and labels here */}

        
//             <h3 className="font-bold text-lg">Please Login!</h3>

//             {/* email */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Email</span>
//               </label>
//               <input
//                 type="email"
//                 placeholder="email"
//                 className="input input-bordered"
//                 {...register("email")}
//               />
//             </div>

//             {/* password */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Password</span>
//               </label>
//               <input
//                 type="password"
//                 placeholder="password"
//                 className="input input-bordered"
//                 {...register("password", { required: true })}
//               />
//               <label className="label">
//                 <a href="#" className="label-text-alt link link-hover mt-2">
//                   Forgot password?
//                 </a>
//               </label>
//             </div>

          
//           {errorMessage && (
//             <p className="text-red-500 text-xs italic">{errorMessage}</p>
//           )}
//              {/* submit btn */}
//              <div className="form-control mt-4">
//               <input
//                 type="submit"
//                 className="btn bg-green text-white"
//                 value="Login"
//               />
//             </div>

//           {/* Social Login Buttons */}
//           <div className="text-center space-x-3">
//             <button onClick={handleRegister} className="btn btn-circle hover:bg-green hover:text-white">
//               <FaGoogle />
//             </button>
//             {/* Add onClick handlers for Facebook and GitHub if needed */}
//             <button className="btn btn-circle hover:bg-green hover:text-white">
//           <FaFacebookF />
//         </button>
//         <button className="btn btn-circle hover:bg-green hover:text-white">
//           <FaGithub />
//         </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
