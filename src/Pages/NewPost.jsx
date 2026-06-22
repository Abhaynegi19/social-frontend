import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

const NewPost = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1">
          {/* Content */}
        </main>
      </div>
    </div>
  );
}

export default NewPost