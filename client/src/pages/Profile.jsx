import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutUserStart,
  signoutUserSuccess,
  signoutUserFailure,
} from "../redux/userSlice.js";
import axios from "axios";

export default function Profile() {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const [updateUserData, setupdateUserData] = useState({});
  const [userListings, setuserListings] = useState([]);
  const [deleteListingError, setdeleteListingError] = useState(false);
  const [deleteListingLoading, setdeleteListingLoading] = useState(false);

  const handleChange = (e) => {
    setupdateUserData({ ...updateUserData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      const { data } = await axios.post(
        `/api/user/update/${currentUser._id}`,
        updateUserData
      );
      // console.log(data);
      if (data.success) {
        alert(data.message);
        dispatch(updateUserSuccess(data.userData));
        console.log(data);
      } else {
        alert(data.message);
        dispatch(updateUserFailure(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const { data } = await axios.delete(
        `/api/user/delete/${currentUser._id}`
      );
      if (data.success) {
        dispatch(deleteUserSuccess());
        alert(data.message);
      } else {
        dispatch(deleteUserFailure(data));
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signoutUserStart());
      const { data } = await axios.get("/api/signout");
      if (data.success) {
        alert(data.message);
        dispatch(signoutUserSuccess());
      } else {
        alert(data.message);
        dispatch(signoutUserFailure(data.message));
      }
    } catch (error) {}
  };

  const getUserListings = async () => {
    try {
      const { data } = await axios.get(
        `/api/user/userListing/${currentUser._id}`
      );
      console.log(data);
      setuserListings(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteListing = async (id) => {
    setdeleteListingError(false);
    setdeleteListingLoading(true);
    try {
      const { data } = await axios.delete(`/api/listing/delete/${id}`);
      console.log(data);
      if (data.success) {
        alert(data.message);
        setuserListings((prev) => prev.filter((list) => list._id !== id));
        setdeleteListingError(false);
        setdeleteListingLoading(false);
      } else {
        alert(data.message);
        console.log(data.message);
        setdeleteListingError(data.message);
        setdeleteListingLoading(false);
      }
    } catch (error) {
      console.log(error);
      setdeleteListingError(data.message);
      setdeleteListingLoading(false);
    }
  };

  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl font-bold my-7 text-slate-800 text-center">
          Profile
        </h1>
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <img
            className="w-24 h-24 object-cover self-center rounded-full cursor-pointer"
            src={currentUser.photoURL}
            onError={(e) => {
              e.target.onError = null;
              e.target.src =
                "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png";
            }}
            alt="profile-image"
          />
          <input
            type="text"
            onChange={handleChange}
            name="username"
            id="username"
            placeholder="username"
            defaultValue={currentUser.username}
            className="p-3 focus:outline-none rounded-lg"
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            disabled={currentUser}
            className="p-3 focus:outline-none rounded-lg disabled:bg-gray-300"
            value={currentUser.email}
          />
          <input
            type="password"
            onChange={handleChange}
            name="password"
            id="password"
            placeholder="password"
            className="p-3 focus:outline-none rounded-lg"
          />
          <button className="p-3 bg-slate-700 uppercase hover:opacity-90 text-white rounded-lg">
            update
          </button>
          <Link
            to="/create-listing"
            className="p-3 bg-green-700 rounded-lg text-white uppercase text-center hover:opacity-90"
          >
            Create Listing
          </Link>
        </form>
        <div className="flex justify-between text-red-600 my-5 font-semibold cursor-pointer">
          <span onClick={handleDelete} className="hover:scale-105">
            Delete account
          </span>
          <span onClick={handleSignOut} className="hover:scale-105">
            Sign out
          </span>
        </div>
        <p className="flex justify-center text-green-700 font-semibold cursor-pointer">
          <span className="hover:scale-105" onClick={getUserListings}>
            Show listing
          </span>
        </p>
        <div className="userListings text-center flex flex-col ">
          {userListings && userListings.length > 0 && (
            <div>
              <p className="text-2xl font-bold mt-7 mb-3 text-slate-700"> <span className="border-b-4 border-slate-700 p-1">Your Listings</span></p>
              {userListings.map((singleListing) => {
                return (
                  <div
                    key={singleListing._id}
                    className="flex  justify-between items-center p-4 border rounded-lg mt-5 shadow-2xl "
                  >
                    <Link
                      to={`/listing/${singleListing._id}`}
                      className="overflow-hidden rounded-lg"
                    >
                      <img
                        src={singleListing.imageUrls[0]}
                        alt="Hotel image"
                        className="h-20 w-28 sm:h-24 sm:w-32 object-cover rounded-lg hover:scale-110 transition-transform duration-500 overflow-hidden"
                      />
                    </Link>

                    <Link to={`/listing/${singleListing._id}`} className="">
                      <p className="hidden sm:inline-block hover:font-semibold transition-transform duration-300 p-3 truncate">
                        {singleListing.name}
                      </p>
                    </Link>

                    <div className="text-center">
                      <p
                        onClick={() => handleDeleteListing(singleListing._id)}
                        className="text-red-600 font-semibold hover:scale-105 transition-transform duration-200 uppercase"
                      >
                        Delete
                      </p>
                      <p className="text-green-600 font-semibold hover:scale-105 transition-transform duration-200 uppercase">
                        Edit
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
