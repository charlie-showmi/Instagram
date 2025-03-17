import React from "react";
import { signInWithPopup } from "firebase/auth"; 
import GoogleButton from "react-google-button";
import { auth, provider } from "../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/appSlice";

const Login = () => {
  const dispatch = useDispatch();

  // Fixed function name
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      dispatch(
        setUser({
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        })
      );
      console.log({
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      });
      
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-200">
      <div className="p-8 bg-white flex flex-col gap-3 rounded-md">
        <h1 className="text-center text-xl font-medium">Login</h1> 
        <GoogleButton onClick={signInWithGoogle} /> 
      </div>
    </div>
  );
};

export default Login;
