import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

export default function Home() {
  SwiperCore.use([Navigation, Autoplay]);
  const { currentUser } = useSelector((state) => state.user);
  const [offerListings, setofferListings] = useState([]);
  const [rentListings, setrentListings] = useState([]);
  const [sellListings, setsellListings] = useState([]);

  console.log(offerListings);
  console.log(rentListings);
  console.log(sellListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const { data } = await axios.get(`/api/listing/get?offer=true&limit=4`);
        setofferListings(data.searchlistings);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const { data } = await axios.get(`/api/listing/get?type=rent&limit=4`);
        setrentListings(data.searchlistings);
        fetchSellListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSellListings = async () => {
      try {
        const { data } = await axios.get(`/api/listing/get?type=sell&limit=4`);
        setsellListings(data.searchlistings);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);
  return (
    <>
      <div className="heropage flex flex-col gap-6 py-28 px-7 justify-center ">
        <h1 className="text-slate-700 font-bold text-2xl sm:text-3xl md:text-5xl">
          Find your next <span className="text-slate-500">perfect</span> <br />{" "}
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-lg">
          SahandEstate will help you to find your home fast, easy and
          comfortable. <br />
          Our expert support are always available.
        </div>
        <Link to="/search" className="text-blue-600 font-bold ">
          Let's start now ...
        </Link>
      </div>
      <div className="swiper-sliders">
        <Swiper
          navigation={{ prevEl: false, nextEl: false }}
          loop={true}
          autoplay={{ delay: 2500 }}
          speed={1000}
        >
          {offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                className=" h-[450px] sm:h-[550px] w-full"
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat `,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="various-listings flex flex-col gap-10 p-10">
        <div className="offer-listing flex flex-col justify-start p-5 gap-5">
          <div className="">
            <p className="font-bold text-slate-700 text-xl">Recent offers</p>
            <Link to={`/search?offer=true`} className="text-sm">Show more offers</Link>
          </div>
          <div>

          {offerListings && offerListings.length > 0 && (
            <div className="flex flex-wrap gap-5 justify-center items-center">
              {offerListings.map((listing) => (
                <Card key={listing._id} singlesearchlistings={listing} />
              ))}
            </div>
          )}
          </div>
        </div>

        <div className="rent-listing flex flex-col justify-start p-5 gap-5">
          <div className="">
            <p className="font-bold text-slate-700 text-xl">Recent places for rent</p>
            <Link to={`/search?type=rent`} className="text-sm">Show more places for rent</Link>
          </div>
          <div>

          {rentListings && rentListings.length > 0 && (
            <div className="flex flex-wrap gap-5 ">
              {rentListings.map((listing) => (
                <Card key={listing._id} singlesearchlistings={listing} />
              ))}
            </div>
          )}
          </div>
        </div>
        <div className="sell-listing flex flex-col justify-start p-5 gap-5">
          <div className="">
            <p className="font-bold text-slate-700 text-xl">Recent places for sell</p>
            <Link to={`/search?type=sell`} className="text-sm">Show more places for sell</Link>
          </div>
          <div>

          {sellListings && sellListings.length > 0 && (
            <div className="flex flex-wrap gap-5 ">
              {sellListings.map((listing) => (
                <Card key={listing._id} singlesearchlistings={listing} />
              ))}
            </div>
          )}
          </div>
        </div>
        
        
      </div>

      {/* {currentUser.username ?'Yes':'NO'} */}
    </>
  );
}
