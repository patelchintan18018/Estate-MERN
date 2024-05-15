import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice";
import OAuth from "../components/OAuth";

export default function LogIn() {
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const { error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };
  // console.log(formdata)
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const { data } = await axios.post("/api/login", {
        email: formdata.email,
        password: formdata.password,
      });
      // console.log(data);
      if (data.success) {
        alert(data.message);
        console.log(data.userData);
        dispatch(loginSuccess(data.userData));
        navigate("/");
      } else {
        console.log(data)
        dispatch(loginFailure(data.message));
      }
    } catch (error) {
      dispatch(loginFailure(error.response.data.message))
    }
  };

  return (
    <>
      <div className="text-center mt-7 p-4 max-w-lg mx-auto">
        <h1 className="text-3xl font-bold my-7 text-slate-800">Log In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="email"
            id="email"
            name="email"
            className="border rounded-lg p-3 outline-none"
            required
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            name="password"
            className="border rounded-lg p-3 outline-none"
            required
            onChange={handleInputChange}
          />
          <button className="bg-slate-700 rounded-lg text-white p-3 uppercase hover:opacity-95 disabled:opacity-80">
            Log in
          </button>
          <OAuth/>
        </form>
        {error && <p className="my-3 text-left text-red-500">{error}</p>}
        <p className="my-3 text-left">
          Don't have an account ?{" "}
          <Link to="/signup" className="text-blue-700 hover:font-bold">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}
