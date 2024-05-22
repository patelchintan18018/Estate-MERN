import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import 'swiper/swiper-bundle.css';

export default function UserListing() {
  SwiperCore.use([Navigation, Autoplay]);
  const params = useParams();
  const [listing, setlisting] = useState(null);
  const [getlistingError, setgetlistingError] = useState(false);
  const [getlistingLoading, setgetlistingLoading] = useState(false);

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
    <>
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
          {listing && listing.name}
        </>
      )}
    </>
  );
}
