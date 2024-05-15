import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, seterror] = useState(null);

  const handleInputChange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(formdata);
  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror("");
    try {
      const { data } = await axios.post("/api/signin", {
        username: formdata.username,
        email: formdata.email,
        password: formdata.password,
      });
      if (!data.success) {
        console.log(data.message)
        seterror(data.message);
      } else {
        console.log(data.message);
        seterror("")
        alert(data.message);
        navigate("/login");
      }
    } catch (error) {
      seterror(error.response.data.message);
      console.log(error.response.data);
    }
  };

  return (
    <>
      <div className="text-center mt-7 p-4 max-w-lg mx-auto">
        <h1 className="text-3xl font-bold my-7 text-slate-800">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="username"
            id="username"
            name="username"
            className="border rounded-lg p-3 outline-none"
            required
            onChange={handleInputChange}
          />
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
            Sign in
          </button>
        </form>
        {error && <p className="my-3 text-left text-red-500">{error}</p>}
        <p className="my-3 text-left">
          Have an account ?{" "}
          <Link to="/login" className="text-blue-700 hover:font-bold">
            Log in
          </Link>
        </p>
      </div>
    </>
  );
}
