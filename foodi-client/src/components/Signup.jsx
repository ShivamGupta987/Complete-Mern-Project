
// import React, { useContext } from "react";
// import { FaFacebookF, FaGithub, FaGoogle,FaRegUser } from "react-icons/fa";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form"
// import Modal from "./Modal";
// import { AuthContext } from "../contexts/AuthProvider";
// import axios from "axios";
// import useAxiosPublic from "../hooks/useAxiosPublic";

// const Signup = () => {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//       } = useForm();

//       const onSubmit = (data) => {
//         const email = data.email;
//         const password = data.password;
//         // console.log(email, password)
//         createUser(email, password)
//           .then((result) => {
//             // Signed up
//             const user = result.user;
//             updateUserProfile(data.email, data.photoURL).then(() => {
//               const userInfor = {
//                 name: data.name,
//                 email: data.email,
//               };
//               axiosPublic.post("/users", userInfor)
//                 .then((response) => {
//                   // console.log(response);
//                   alert("Signin successful!");
//                   navigate(from, { replace: true });
//                 });
//             });
//           })
//           .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // ..
//           });
//       };
//       const handleRegister = () => {
//         signUpWithGmail()
//           .then((result) => {
//             const user = result.user;
//             const userInfor = {
//               name: result?.user?.displayName,
//               email: result?.user?.email,
//             };
//             axiosPublic
//               .post("/users", userInfor)
//               .then((response) => {
//                 // console.log(response);
//                 alert("Signin successful!");
//                 navigate("/");
//               });
//           })
//           .catch((error) => console.log(error));
//       };
//   return (
//     <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
//         <div className="modal-action flex flex-col justify-center mt-0">
//           <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
//             <h3 className="font-bold text-lg">Create A Account!</h3>

//             {/* Name */}
//                {/* name */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Name</span>
//             </label>
//             <input
//               type="name"
//               placeholder="Your name"
//               className="input input-bordered"
//               {...register("name")}
//             />
//           </div>

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
//                 autoComplete="current-Password"
//                 {...register("password")}
//               />
//               <label className="label mt-1">
//                 <a href="#" className="label-text-alt link link-hover">
//                   Forgot password?
//                 </a>
//               </label>
//             </div>

//             {/* error */}
//             <p>{errors.message}</p>

//             {/* submit btn */}
//             <div className="form-control mt-6">
//               <input
//                 type="submit"
//                 value="Sign up"
//                 className="btn bg-green text-white"
//               />
//             </div>

//             <div className="text-center my-2">
//             Have an account?
//             <Link to="/login">
//               <button className="ml-2 underline">Login here</button>
//             </Link>
//           </div>

//           </form>

//           {/* social sign in */}
//           <div className="text-center space-x-3 mb-5">
//           <button
//             onClick={handleRegister}
//             className="btn btn-circle hover:bg-green hover:text-white"
//           >
//             <FaGoogle />
//           </button>
            
//             <button className="btn btn-circle hover:bg-green hover:text-white">
//               <FaFacebookF />
//             </button>
//             <button className="btn btn-circle hover:bg-green hover:text-white">
//             <FaGithub />
//             </button>
//           </div>
//         </div>
       
//     </div>
//   )
// }

// export default Signup

import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const { createUser, signUpWithGmail, updateUserProfile } = useContext(AuthContext);

  // Redirect after login
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    try {
      const result = await createUser(data.email, data.password);
      await updateUserProfile(data.name); // Assuming this function exists and updates the profile
      
      const userInfo = {
        name: data.name,
        email: data.email,
      };

      await axiosPublic.post("/users", userInfo);
      alert("Signup successful!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      alert(error.message); // More sophisticated error handling is recommended
    }
  };

  const handleRegisterWithGoogle = async () => {
    try {
      const result = await signUpWithGmail(); // Assuming this function signs up and signs in with Google
      const userInfor = {
        name: result.user.displayName,
        email: result.user.email,
      };

      await axiosPublic.post("/users", userInfor);
      alert("Signin successful with Google!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      alert(error.message); // More sophisticated error handling is recommended
    }
  };

  // Form and other UI elements...

//   return (
//     <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
//       <div className="modal-action flex flex-col justify-center mt-0">
//         <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
//           {/* Your form fields here */}
//         </form>

//         <div className="text-center space-x-3 mb-5">
//           <button
//             onClick={handleRegisterWithGoogle}
//             className="btn btn-circle hover:bg-green hover:text-white"
//           >
//             <FaGoogle />
//           </button>
//           {/* Other social sign-in buttons */}
//         </div>
//       </div>
//     </div>
//   );
// };
return (
      <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
          <div className="modal-action flex flex-col justify-center mt-0">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
              <h3 className="font-bold text-lg">Create A Account!</h3>
  
              {/* Name */}
                 {/* name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                placeholder="Your name"
                className="input input-bordered"
                {...register("name")}
              />
            </div>
  
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
                  autoComplete="current-Password"
                  {...register("password")}
                />
                <label className="label mt-1">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
  
              {/* error */}
              <p>{errors.message}</p>
  
              {/* submit btn */}
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Sign up"
                  className="btn bg-green text-white"
                />
              </div>
  
              <div className="text-center my-2">
              Have an account?
              <Link to="/login">
                <button className="ml-2 underline">Login here</button>
              </Link>
            </div>
  
            </form>
  
            {/* social sign in */}
            <div className="text-center space-x-3 mb-5">
            <button
              onClick={handleRegisterWithGoogle}
              className="btn btn-circle hover:bg-green hover:text-white"
            >
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

export default Signup;
