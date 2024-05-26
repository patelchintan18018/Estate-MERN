import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });

  console.log(sidebardata);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sell"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({...sidebardata,
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl==='true'?true:false,
        furnished: furnishedFromUrl==='true'?true:false,
        offer: offerFromUrl==='true'?true:false,
        sort: sortFromUrl || 'createdAt',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async() =>{
        const searchQuery = urlParams.toString()
        try {
           const {data} = await axios.get(`/api/listing/get?${searchQuery}`) 
           console.log(data)
        } catch (error) {
console.log(error)
        }
    }
fetchListings()
  }, [location.search]);

  return (
    <main className="flex flex-col md:flex-row">
      <div className="filterSearch border-slate-200 border-b-8 md:border-r-8 md:min-h-screen md:w-1/3 p-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <label className="font-semibold whitespace-nowrap">
              {" "}
              Search Term :
            </label>
            <input
              type="text"
              placeholder="Search..."
              id="searchTerm"
              className="p-3 rounded-lg w-full"
              onChange={handleChange}
              value={sidebardata.searchTerm}
            />
          </div>
          <div className="flex flex-wrap gap-5 items-center">
            <label className="font-semibold">Type :</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="all"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "all"}
              />
              <label>Sell & Rent</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="sell"
                id="sell"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "sell"}
              />
              <label>Sell</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="rent"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "rent"}
              />
              <label>Rent</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="offer"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <label>Offer</label>
            </div>
          </div>
          <div className="flex items-center gap-5 flex-wrap">
            <label className="font-semibold">Amenities :</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <label>Parking</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <label>Furnished</label>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <label className="font-semibold">Sort :</label>
            <select
              name="sort_order"
              id="sort_order"
              className="p-2 rounded-lg"
              onChange={handleChange}
              defaultValue={"createdAt_desc"}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="p-3 rounded-lg uppercase hover:opacity-95 bg-slate-800 text-white">
            Search
          </button>
        </form>
      </div>
      <div className="displaySearchListing md:w-2/3">
        <h1 className="font-bold text-2xl border-b-8 w-full p-5 border-slate-200  text-slate-700">
          Listing results :
        </h1>
      </div>
    </main>
  );
}
