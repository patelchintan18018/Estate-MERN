import React, { useState, useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const imagefileInputRef = useRef(null);

  const initialFormData = {
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    parking: false,
    furnished: false,
    offer: false,
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
  };

  const [files, setfiles] = useState([]);
  const [formData, setformData] = useState(initialFormData);

  const [imageUploadError, setimageUploadError] = useState(false);
  const [uploading, setuploading] = useState(false);
  const [formError, setformError] = useState(false);
  const [formLoading, setformLoading] = useState(false);

  // console.log(formData);
  const resetForm = () => {
    setformData(initialFormData);
    setfiles([]);
  };

  const handleImageUpload = () => {
    const promises = [];

    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setimageUploadError(false);
      setuploading(true);
      setformError(false);
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setformData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setimageUploadError(false);
          setuploading(false);
        })
        .catch((err) => {
          setimageUploadError("Image upload failed, 10MB max. size per image");
          setuploading(false);
        });
      setimageUploadError(false);
    } else {
      setuploading(false);
      setimageUploadError("You can only upload 6 images per listing");
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_chnaged",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done !!`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleDeleteImage = (index) => {
    setformData({
      ...formData,
      imageUrls: formData.imageUrls.filter((url, i) => index !== i),
    });
  };

  const handleFormChange = (e) => {
    if (e.target.id === "sell" || e.target.id === "rent") {
      setformData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setformData({
        ...formData,
        [e.target.name]: e.target.checked,
      });
    }

    if (
      e.target.type === "text" ||
      e.target.type === "number" ||
      e.target.type === "textarea"
    ) {
      setformData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.imageUrls.length < 1)
        return setformError("You must upload at least one image");

      console.log("Offer:", formData.offer);
    console.log("Regular Price:", formData.regularPrice);
    console.log("Discount Price:", formData.discountPrice);
    const isDiscountLessThanRegular = formData.regularPrice < formData.discountPrice;
    console.log("Is discount less than regular price?", isDiscountLessThanRegular);

      if (formData.offer && +formData.regularPrice < +formData.discountPrice)
        return setformError("Discounted price must be less than regular price");

      setformLoading(true);
      setformError(false);
      const { data } = await axios.post("/api/listing/create", {
        ...formData,
        userRef: currentUser._id,
      });
      setformLoading(false);
      if (!data.success) {
        setformError(data.message);
      }

      alert(data.message);
      console.log(data);
      imagefileInputRef.current.value = null;
      navigate(`/listing/${data.newListing._id}`);
      resetForm();
    } catch (error) {
      setformError(error.message);
      setformLoading(false);
    }
  };

  return (
    <>
      <div className="p-5 max-w-4xl mx-auto">
        <h1 className="font-bold text-3xl my-7 text-slate-800 text-center">
          Create a Listing{" "}
        </h1>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="leftForm flex flex-col flex-1 gap-4">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              maxLength="100"
              minLength="10"
              required
              className="p-3 rounded-lg focus:outline-none"
              value={formData.name}
              onChange={handleFormChange}
            />
            <textarea
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              required
              className="p-3 rounded-lg focus:outline-none"
              value={formData.description}
              onChange={handleFormChange}
            />
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              required
              className="p-3 rounded-lg focus:outline-none"
              value={formData.address}
              onChange={handleFormChange}
            />

            <div className="mt-3 flex gap-7 flex-wrap">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="sell"
                  id="sell"
                  className="w-5"
                  checked={formData.type === "sell"}
                  onChange={handleFormChange}
                />
                <span>sell</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="rent"
                  id="rent"
                  className="w-5"
                  checked={formData.type === "rent"}
                  onChange={handleFormChange}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="parking"
                  id="parking"
                  className="w-5"
                  value={formData.parking}
                  onChange={handleFormChange}
                />
                <span>Parking spot</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="furnished"
                  id="furnished"
                  className="w-5"
                  value={formData.furnished}
                  onChange={handleFormChange}
                />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="offer"
                  id="offer"
                  className="w-5"
                  value={formData.offer}
                  onChange={handleFormChange}
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
                  max="50"
                  required
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none"
                  value={formData.bedrooms}
                  onChange={handleFormChange}
                />
                <p>Beds</p>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  name="bathrooms"
                  id="bathrooms"
                  min="1"
                  max="50"
                  required
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none"
                  value={formData.bathrooms}
                  onChange={handleFormChange}
                />
                <p>Baths</p>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  name="regularPrice"
                  id="regularPrice"
                  min="50"
                  max="10000000"
                  required
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none"
                  value={formData.regularPrice}
                  onChange={handleFormChange}
                />
                <div className="text-center">
                  <p>Regular price</p>
                  {formData.type !== "sell" && (
                    <p className="text-xs">($ / Month)</p>
                  )}
                </div>
              </div>
              {formData.offer && (
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    name="discountPrice"
                    id="discountPrice"
                    min="0"
                    max="1000000"
                    required
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none"
                    value={formData.discountPrice}
                    onChange={handleFormChange}
                  />
                  <div className="text-center">
                    <p>Discount price</p>
                    {formData.type !== "sell" && (
                      <p className="text-xs">($ / Month)</p>
                    )}
                  </div>
                </div>
              )}
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
                ref={imagefileInputRef}
                onChange={(e) => setfiles(e.target.files)}
                id="images"
                accept="image/*"
                multiple
                className="p-3 border border-gray-300 rounded-lg w-full"
              />
              <button
                type="button"
                disabled={uploading}
                onClick={handleImageUpload}
                className="bg-green-700 text-white border border-green-700 font-semibold px-3 uppercase rounded-lg hover:shadow-lg disabled:opacity-90"
              >
                {uploading ? "uploading..." : "upload"}
              </button>
            </div>
            <p className="text-red-600 ">
              {imageUploadError && imageUploadError}
            </p>
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  className="flex items-center justify-between px-5 py-3 border rounded-lg"
                  key={url}
                >
                  <img
                    src={url}
                    alt="image"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(index)}
                    className="text-red-600 hover:font-semibold"
                  >
                    Delete
                  </button>
                </div>
              ))}
            {formError && <p className="text-red-600">{formError}</p>}
            <button
              disabled={formLoading || uploading}
              className="p-3 bg-slate-700 uppercase text-white rounded-lg hover:opacity-95 disabled:opacity-80"
            >
              {formLoading ? "Creating..." : "Create Listing"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
