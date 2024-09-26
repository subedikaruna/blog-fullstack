import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Initialize fields with empty strings to prevent undefined values
  const [blog, setBlog] = useState({
    title: "",
    avatar: "",
    description: "",
  });

  const editBlog = async (e) => {
    e.preventDefault();
    if (id) {
      try {
        const response = await axios.patch(
          `http://localhost:4000/blog/${id}`,
          blog
        );
        if (response.status === 200) {
          navigate("/");
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while updating the blog.");
      }
    }
  };
  const fetchBlog = async () => {
    if (id) {
      console.log(id);
      const response = await axios.get(
        `http://localhost:4000/blog/${id}`,
        blog
      );
      if (response.status === 200) {
        setBlog(response.data.data);
      } else {
        alert("Something went wrong");
      }
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <Layout>
      <div className="bg-gray-100 flex items-center justify-center h-screen">
        <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
            Edit Blog
          </h2>

          <form onSubmit={editBlog}>
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                value={blog.title || ""}
                name="title"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter the title"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Upload Image
              </label>
              <input
                type="text"
                id="image"
                name="image"
                onChange={(e) => setBlog({ ...blog, avatar: e.target.value })}
                value={blog.avatar || ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter image URL"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                onChange={(e) =>
                  setBlog({ ...blog, description: e.target.value })
                }
                value={blog.description || ""}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter the description"
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditBlog;
