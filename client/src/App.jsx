import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateListing from "./pages/CreateListing";
// import UserListing from "./pages/UserListing";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
            {/* <Route path="/userListing" element={<UserListing/>} /> */}
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
