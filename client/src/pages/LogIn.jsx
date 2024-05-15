import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function LogIn() {
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const [error, seterror] = useState(null);
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };
  console.log(formdata)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("/api/login", {
        email: formdata.email,
        password: formdata.password,
      });
      console.log(data);
      if (data.success) {
        alert(data.message);
        navigate('/');
      } else {
        seterror(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="text-center mt-7 p-4 max-w-lg mx-auto">
        <h1 className="text-3xl font-bold my-7 text-slate-800">Log In</h1>
        <form onClick={handleSubmit} className="flex flex-col gap-4">
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
        </form>
        {error && <p className="my-3 text-left text-red-500">{error}</p>}
        <p className="my-3 text-left">
          Create an account ?{" "}
          <Link to="/signin" className="text-blue-700 hover:font-bold">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}
