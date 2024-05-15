import React from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userSlice";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);

      const { data } = await axios.post("/api/googleLogin", {
        username: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      });
      dispatch(loginSuccess(data.userData));
      alert(data.message);
      navigate("/");
    } catch (error) {
      console.log("Unable to login with Google", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="p-3 text-white bg-red-700 hover:opacity-90 rounded-lg uppercase"
    >
      Login with google
    </button>
  );
}
