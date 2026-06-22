import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import { addUserData } from "../Utils/UserSlice"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const {
    username,
    firstName,
    lastName,
    displayPicture,
    bio,
    followers,
    following,
    posts,
  } = useSelector((store) => store.user);

  const[uploadedImg, setUploadedImg] = useState(null)
  const dispatch = useDispatch()
  const nav = useNavigate()

  useEffect(() => {

    // console.log(tempImgUrl, imgFile)
    if(!uploadedImg)return

    const formData = new FormData()
    formData.append("file", uploadedImg)
    formData.append("upload_preset", "Socially")

    async function uploadImg()
    {
        const res = await axios.post("https://api.cloudinary.com/v1_1/derddgaed/image/upload", formData)
        // console.log(res)
        // console.log(res.data.url)
        const res2 = await axios.patch(import.meta.env.VITE_BACKEND_URL + "/profile/edit/dp", {displayPicture : res.data.url}, {withCredentials : true})
        dispatch(addUserData(res2.data.data))
    }

    uploadImg()

  }, [uploadedImg])


  return (
    <div className="flex-1 bg-gradient-to-br from-indigo-950 via-slate-900 to-black p-6 overflow-y-auto h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
          
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <img
              onClick={() => {
                document.getElementById("dp").click()
              }}
              src={
                displayPicture ||
                "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
              }
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-indigo-500 shadow-xl cursor-pointer"
            />

            <input 
             onChange={(e) => {
                // console.log(e.target.files[0])
                setUploadedImg(e.target.files[0])
             }}
             id="dp" type="file" className="hidden" />

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-white">
                {firstName} {lastName}
              </h2>

              <span className="text-indigo-400 text-lg">
                @{username}
              </span>

              <p className="text-gray-300 mt-4">
                {bio || "No bio added yet."}
              </p>
            </div>


          <div className="self-start md:self-center">
            <button
              onClick={() => {
                nav("/profile/edit")
              }}
              className="
                px-5 py-2.5
                bg-white/10
                border border-white/10
                hover:bg-white/20
                text-white
                rounded-xl
                transition
                backdrop-blur-md
              "
            >
              <i className="fa-regular fa-pen-to-square mr-2"></i>
              Edit Profile
            </button>
          </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-10">
            <div className="bg-white/5 rounded-2xl p-5 text-center border border-white/10">
              <h2 className="text-2xl font-bold text-white">
                {followers.length || 0}
              </h2>
              <p className="text-gray-400">Followers</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 text-center border border-white/10">
              <h2 className="text-2xl font-bold text-white">
                {following.length || 0}
              </h2>
              <p className="text-gray-400">Following</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 text-center border border-white/10">
              <h2 className="text-2xl font-bold text-white">
                {posts.length || 0}
              </h2>
              <p className="text-gray-400">Posts</p>
            </div>
          </div>

          {/* Posts */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Posts
              </h2>

              {!posts || posts.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                  <h1 className="text-gray-400 text-xl">
                    No posts yet...
                  </h1>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {posts.map((post) => (
                    <div
                      key={post._id}
                      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                    >
                      <img
                        src={post.imageUrl}
                        alt="post"
                        className="w-full h-60 object-cover"
                      />

                      <div className="p-4">
                        <p className="text-white break-words">
                          {post.caption}
                        </p>

                        <div className="flex justify-between mt-4 text-gray-400 text-sm">
                          <span>
                            ❤️ {post.likes?.length || 0}
                          </span>

                          <span>
                            💬 {post.comments?.length || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;