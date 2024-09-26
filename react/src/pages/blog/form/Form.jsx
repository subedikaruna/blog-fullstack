import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = ({ type }) => {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const createBlog = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("No token found! Please log in.");
      navigate("/login"); // Redirect to login if no token
      return;
    }
    const data = {
      title: title,
      avatar: image,
      description: description,
    };
    const response = await axios({
      url: "http://localhost:4000/blog",
      method: "POST",
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // .post("http://localhost:4000/blog", data);
    if (response.status === 200) {
      navigate("/");
    } else {
      alert("something went wrong");
    }
  };
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          {type}
        </h2>

        <form onSubmit={createBlog} method="post">
          <div className="mb-6">
            <label
              for="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter the title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              for="image"
              style={{}}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Upload Image
            </label>
            <input
              type="text"
              id="image"
              name="image"
              className="w-full px-4 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              required
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              for="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter the description"
              required
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
