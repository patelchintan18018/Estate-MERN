import React from "react";

export default function CreateListing() {
  return (
    <>
      <div className="p-5 max-w-4xl mx-auto">
        <h1 className="font-bold text-3xl my-7 text-slate-800 text-center">
          Create a Listing{" "}
        </h1>
        <form className="flex flex-col md:flex-row gap-4">
          <div className="leftForm flex flex-col flex-1 gap-4">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="name"
              maxLength="62"
              minLength="10"
              required
              className="p-3 rounded-lg focus:outline-none"
            />
            <textarea
              type="text"
              name="description"
              id="description"
              placeholder="description"
              required
              className="p-3 rounded-lg focus:outline-none"
            />
            <input
              type="text"
              name="address"
              id="address"
              placeholder="address"
              required
              className="p-3 rounded-lg focus:outline-none"
            />

            <div className="mt-3 flex gap-7 flex-wrap">
              <div className="flex gap-2">
                <input type="checkbox" name="sell" id="sell" className="w-5" />
                <span>sell</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" name="rent" id="rent" className="w-5" />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="parking"
                  id="parking"
                  className="w-5"
                />
                <span>Parking spot</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="furnished"
                  id="furnished"
                  className="w-5"
                />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="offer"
                  id="offer"
                  className="w-5"
                />
                <span>Offer</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-7 mt-3">
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  name="bedrooms"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none"
                />
                <p>Beds</p>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  name="bathrooms"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none"
                />
                <p>Baths</p>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  name="regularPrice"
                  id="regularPrice"
                  required
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none"
                />
                <div className="text-center">
                  <p>Regular price</p>
                  <p className="text-xs">($ / Month)</p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  name="discountPrice"
                  id="discountPrice"
                  required
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none"
                />
                <div className="text-center">
                  <p>Discount price</p>
                  <p className="text-xs">($ / Month)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rightForm flex flex-col flex-1 gap-4">
            <p>
              <span className="font-bold">Images : </span>
              <span className="text-gray-500">
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className="flex gap-3">
              <input
                type="file"
                name="images"
                id="images"
                accept="image/*"
                multiple
                className="p-3 border border-gray-300 rounded-lg w-full"
              />
              <button className="bg-green-700 text-white border border-green-700 font-semibold px-3 uppercase rounded-lg hover:shadow-lg hover:bg-transparent hover:text-green-700 ">
                Upload
              </button>
            </div>
            <button className="p-3 bg-slate-700 uppercase text-white rounded-lg hover:opacity-95">
              Create Listing
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
