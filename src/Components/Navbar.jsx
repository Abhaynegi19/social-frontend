import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { username, displayPicture } = useSelector(
    (store) => store.user
  );
  const nav = useNavigate()

  return (
    <nav className="z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        
        <h3 className="text-2xl font-bold text-white cursor-pointer">
          Socially
        </h3>

        <div className="flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Search users..."
            className="
              w-full px-4 py-2.5
              rounded-xl
              bg-white/10
              border border-white/10
              text-white
              placeholder-gray-400
              outline-none
              focus:border-indigo-500
              transition
            "
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-300 font-medium hidden sm:block">
            {username}
          </span>

          <img
            onClick={() => nav("/profile")}
            src={
              displayPicture ||
              "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
            }
            alt="Profile"
            className="
              w-10 h-10
              rounded-full
              object-cover
              border-2 border-indigo-500
              cursor-pointer
              hover:scale-105
              transition
            "
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;