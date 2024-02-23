// import React, { useContext } from "react";
// import { useForm } from "react-hook-form"
// import { AuthContext } from "../../contexts/AuthProvider";
// import { useLocation, useNavigate } from "react-router-dom";

// const UpdateProfile = () => {
//     const {updateUserProfile} = useContext(AuthContext)
//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors },
//       } = useForm();

//       const location = useLocation();
//       const navigate = useNavigate();
//       const from = location.state?.from?.pathname || "/"

  

//       const onSubmit = (data) => {
//         const name = data.name;
//         const photoURL = data.photoURL;
//         updateUserProfile(name,photoURL).then(() => {
//             // Profile updated!
//             // ...
//             navigate (from,{replace:true})
//           }).catch((error) => {
//             // An error occurred
//             // ...
//           });
//       }


    
//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
//         <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
//             <h3 className="font-bold">Update Your Profile</h3>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Name</span>
//             </label>
//             <input 
//             {...register("name")}
//               type="text"
//               placeholder="your name"
//               className="input input-bordered"
//               required
//             />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Upload Photo</span>
//             </label>
//             <input
//             {...register("photoURL")}
//               type="text"
//               placeholder="photoURL"
//               className="input input-bordered"
//               required
//             />
//             {/* TODO : UPLOADING IMAGE  */}
//             {/* <input type="file" className="file-input w-full max-w-xs" /> */}
          
//           </div>
//           <div className="form-control mt-6">
//             <button className="btn bg-green text-white">Update </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateProfile;

import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import { useForm } from 'react-hook-form';

const UserProfile = () => {
    const {updateUserProfile} = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
      const onSubmit = (data) => {
        const name = data.name;
        const photoURL = data.photoURL;

        updateUserProfile(name, photoURL).then(() => {
            // Profile updated!
            alert("Profile updated successfully")
          }).catch((error) => {
            // An error occurred
            // ...
          });
      }
  return (
    <div className='h-screen max-w-md mx-auto flex items-center justify-center '>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" {...register("name")} placeholder="Your name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upload Photo</span>
          </label>
          <input type="file" {...register("photoURL")}  className="file-input w-full mt-1" />
          {/* <input type="text" {...register("photoURL")} placeholder="photo url" className="input input-bordered" required /> */}
        </div>
        <div className="form-control mt-6">
          <input type='submit' value={"Update"} className="btn bg-green text-white"/>
        </div>
      </form>
    </div>
    </div>
  )
}

export default UserProfile
