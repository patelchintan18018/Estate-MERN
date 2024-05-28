import React from "react";
import { FaBath, FaBed, FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Card({ singlesearchlistings }) {
  return (
    <div className="singlesearchlistings shadow-lg rounded-lg overflow-hidden w-full sm:w-[300px] lg:w-[310px]">
      <Link to={`/listing/${singlesearchlistings._id}`} className="">
        <div className="overflow-hidden">

        <img
          src={singlesearchlistings.imageUrls[0]}
          alt="Hotel image"
          className="object-cover hover:scale-110 transition-all duration-500 h-[320px] sm:h-[220px] w-full"
        />
        </div>
        <div className="p-5 flex flex-col gap-2">
          <p className="font-bold line-clamp-1 text-slate-800">
            {singlesearchlistings.name}
          </p>
          <div className="flex gap-2 items-center">
            <FaLocationDot className="text-green-700 text-xl" />
            <p className="line-clamp-1">{singlesearchlistings.address}</p>
          </div>
          <p className="text-gray-600 line-clamp-2 text-sm">
            {singlesearchlistings.description}
          </p>
          <p>
            <span className="font-bold text-slate-700">
              ${" "}
              {singlesearchlistings.offer
                ? singlesearchlistings.regularPrice -
                  singlesearchlistings.discountPrice
                : singlesearchlistings.regularPrice}
            </span>{" "}
            {singlesearchlistings.type === "rent" ? "/ month" : ""}
          </p>
          <div className="flex gap-5">
            <p className="flex gap-2 items-center">
              <span className="font-semibold">
                {singlesearchlistings.bedrooms}
              </span>{" "}
              <FaBed  className="text-green-700 text-xl"/>
            </p>
            <p className="flex gap-2 items-center">
              <span className="font-semibold">
                {singlesearchlistings.bathrooms}
              </span>{" "}
              <FaBath  className="text-green-700 text-xl"/>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
