import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

const NewPost = () => {
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

        const handleSubmit = async (e) => {
          e.preventDefault();

          if (!imageUrl.trim()) {
            return toast.error("Image URL is required");
          }

          try {
            setLoading(true);

            await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/post/create`,
              {
                caption,
                imageUrl,
              },
              {
                withCredentials: true,
              }
            );

            const userRes = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/auth/get-user-data`,
              {
                withCredentials: true,
              }
            );

            dispatch(addUserData(userRes.data.data));

            toast.success("Post created successfully");

            setCaption("");
            setImageUrl("");

            nav("/profile");

          } catch (error) {
            toast.error(
              error?.response?.data?.err ||
              "Something went wrong"
            );
          } finally {
            setLoading(false);
          }
        };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h1 className="text-3xl font-bold mb-2">
                Create New Post
              </h1>

              <p className="text-gray-500 mb-8">
                Share something with your followers.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-2 font-medium">
                    Caption
                  </label>

                  <textarea
                    rows="5"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full border border-gray-300 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Image URL
                  </label>

                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Paste image url..."
                    className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {imageUrl && (
                  <div>
                    <p className="mb-2 font-medium">
                      Preview
                    </p>

                    <img
                      src={imageUrl}
                      alt="preview"
                      className="w-full h-80 object-cover rounded-xl border"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition"
                >
                  {loading ? "Creating..." : "Create Post"}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewPost;