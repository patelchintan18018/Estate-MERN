import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function CreateListing() {
  const [files, setfiles] = useState([]);
  const [formData, setformData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setimageUploadError] = useState(false);
  const [uploading, setuploading] = useState(false);
  console.log(formData);

  const handleImageUpload = () => {
    const promises = [];

    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setimageUploadError(false);
      setuploading(true);
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
          setimageUploadError("Image upload failed, 2MB max. size per image");
          setuploading(false);
        });
      // setimageUploadError(false);
    } else {
      setimageUploadError("Max. 6 images can upload");
      setuploading(false);
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
              placeholder="Name"
              maxLength="62"
              minLength="10"
              required
              className="p-3 rounded-lg focus:outline-none"
            />
            <textarea
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              required
              className="p-3 rounded-lg focus:outline-none"
            />
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
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
                className="bg-green-700 text-white border border-green-700 font-semibold px-3 uppercase rounded-lg hover:shadow-lg hover:bg-transparent hover:text-green-700 "
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
            <button className="p-3 bg-slate-700 uppercase text-white rounded-lg hover:opacity-95">
              Create Listing
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
