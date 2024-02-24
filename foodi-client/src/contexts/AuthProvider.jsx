  // import React, { createContext, useEffect, useState } from "react";
  // import { getAuth } from "firebase/auth";
  // import app from "//firebase/firebase.config";
  // import { GoogleAuthProvider } from "firebase/auth";


  // export const AuthContext = createContext();
  // const auth = getAuth(app);

  // const googleProvider = new GoogleAuthProvider();

  // const AuthProvider = ({ children }) => {
  //   const [user, setUser] = useState(null);
  //   const [loading, setLoading] = useState(true);

  //   // create an account
  //   // import from firebase app

  //   const createUser = (email, password) => {
  //     // setLoading(true);
  //     return createUserWithEmailAndPassword(auth, email, password);
  //   };
  //   //sign up with gmail account using gmail in firebase

  //   const signupwithGmail = () => {
  //     return signInWithPopup(auth, googleProvider);
  //   };

  //   // login using email & password  in firebase using password authentication
  //   const login = (email, password) => {
  //     return signInWithEmailAndPassword(auth, email, password);
  //   };

  //   //logout  in firebase using password authentication
  //   const logout = () => {
  //     signOut(auth);
  //   };

  //   // update profile in manage user

  //   const updateuserProfile = ({ name, photoURL }) => {
  //     updateProfile(auth.currentUser, {
  //       displayName: name,
  //       photoURL: photoURL,
  //     });
  //   };

  //   // check sign in user

  //   useEffect(() => {
  //     const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
  //       if (currentuser) {
  //         setUser(currentuser);
  //         setLoading(false);
  //       } else {
  //         // User is signed out
  //         // ...
  //       }
  //     });
  //   //   return () => {
  //   //     return unsubscribe();
  //   //   };
  //   // }, []);
  //   return unsubscribe();

  //   const authInfo = {
  //     user,
  //     createUser,
  //     signupwithGmail,
  //     login,
  //     logout,
  //     updateuserProfile,
  //     // unsubscribe
  //   };
  //   return (
  //     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  //   );
  // };

  // export default AuthProvider;

  import React from 'react';
  import { createContext } from 'react';
  import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
  import { useState } from 'react';
  import { useEffect } from 'react';
  import app from '../firebase/firebase.config';
  import axios from 'axios';




  export const AuthContext = createContext();
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };

    const signUpwithGmail = () => {
      setLoading(true);

      return signInWithPopup(auth, googleProvider);
    };

    const login = (email, password) => {
      return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
      localStorage.removeItem('genius-token');
      return signOut(auth);
    };
    
    // update profile

    const updateUserProfile = ( name, photoURL ) => {
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
    };

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        if (currentUser) {
          // IN currentUser USE JWT TOKEN 
          const userInfo = {email: currentUser.email}
          axios.post('http://localhost:6001/jwt',userInfo)
          .then( (response) => {
            // console.log(response.data.token);
            if(response.data.token){
              localStorage.setItem("access-token",response.data.token)
            }
          })

          // setLoading(false);
        } else {
          // setUser(null);
          // console.log("")
          localStorage.removeItem("access-token")
          
        }
        setLoading(false);

      });

      return () =>{
        return unsubscribe();
    }
    }, []);

    const authInfo = {
      user,
      loading,
      createUser,
      signUpwithGmail,
      login,
      logout,
      updateUserProfile,
    };

    return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
  };

  export default AuthProvider;
