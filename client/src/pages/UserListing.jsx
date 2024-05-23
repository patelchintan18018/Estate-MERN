import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import 'swiper/swiper-bundle.css';
import { FaLocationDot ,FaBed, FaBath ,FaChair } from "react-icons/fa6";
import { FaParking } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function UserListing() {
  SwiperCore.use([Navigation, Autoplay]);
  const params = useParams();
  const [listing, setlisting] = useState(null);
  const [getlistingError, setgetlistingError] = useState(false);
  const [getlistingLoading, setgetlistingLoading] = useState(false);
  const {currentUser} = useSelector((state)=>state.user)

  useEffect(() => {
    const getListingDetails = async () => {
      setgetlistingError(false);
      setgetlistingLoading(true);

      const { data } = await axios.get(`/api/listing/get/${params.listingId}`);
      if (!data.success) {
        alert(data.message);
        setgetlistingLoading(false);
        return setgetlistingError(data.message);
      }
      setlisting(data.listing);
      setgetlistingLoading(false);
      setgetlistingError(false);
      // alert(data.message);
    };
    getListingDetails();
  }, [params.listingId]);

  return (
    <main>
      {getlistingLoading && (
        <p className="mt-7 text-2xl font-semibold">Loading...</p>
      )}
      {getlistingError && (
        <p className="mt-7 text-2xl font-semibold">Something went wrong...</p>
      )}
      {listing && !getlistingError && !getlistingLoading && (
        <>
          <Swiper navigation={{prevEl: false, nextEl: false}} loop={true} autoplay={{delay: 2500}} speed={1000}>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div className="h-[450px]" style={{background:`url(${url}) center no-repeat `, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex flex-col gap-4 max-w-5xl mx-auto p-3 my-7">
            <p className="text-2xl font-bold text-slate-800"><span className="uppercase">{listing.name}</span> - ${' '}{listing.offer ? listing.discountPrice: listing.regularPrice} {listing.type === 'rent' ? '/ Month' : ''} {listing.offer && (<span className="text-sm">($ {+listing.regularPrice - +listing.discountPrice} OFF)</span>)}</p>
            <p className="flex gap-3 items-center"><FaLocationDot className="text-slate-700 text-xl"/> {listing.address}</p>
            <div>{listing.type==='sell' ? <button className="bg-red-600 py-2 px-6 text-white rounded-lg">For Sell</button>:<button className="bg-green-600 py-2 px-6 text-white rounded-lg">For Rent</button>}</div>
            <p><span className="font-semibold">Description :</span> {listing.description}</p>
            <div className="flex gap-6 flex-wrap">
              <p className="flex gap-2 items-center mr-4"><FaBed  className="text-green-700 text-xl"/>{listing.bedrooms} Beds</p>
              <p className="flex gap-2 items-center mr-4"><FaBath className="text-green-700 text-xl"/>{listing.bathrooms} Baths</p>
              <p className="flex gap-2 items-center mr-4"><FaParking  className="text-green-700 text-xl"/>{listing.parking ? 'Parking spot':'No Parking spot'}</p>
              <p className="flex gap-2 items-center mr-4"><FaChair className="text-green-700 text-xl"/>{listing.furnished ? 'Fornished': 'Not furnished'}</p>
            </div>
            {currentUser && listing.userRef !== currentUser._id && <button className="bg-slate-800 py-2 px-6 text-white uppercase rounded-lg mt-4 hover:opacity-90">Contact landlord</button>}
            
          </div>
        </>
      )}
    </main>
  );
}
