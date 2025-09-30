import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserAuth/User";
import { Heart, LoaderCircle, AlertCircle, MessageSquareMore, } from "lucide-react";
import { Link, useNavigate } from "react-router";

import { PostType } from "../type/PostType";
const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const context = useContext(UserContext);
  const [post, setPost] = useState<PostType[]>([]);
 const navigate = useNavigate();
  if (!context) {
    throw new Error();
  }

  // for all post
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/home-post`, {
        });
        const data = await res.json();
        setPost(data.data.post);
      } catch (error: any) {
        const msg = error.response?.data?.message || "Something Went Wrong Try Again";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);





  if (loading) {
    return (
      <div className="flex items-center min-h-screen justify-center  bg-maincolor text-white font-dm">
        <p className="flex gap-2  text-xl sm:text-3xl items-center">
          Loading Post it make take some Time <LoaderCircle size={28} className="animate-spin" />
        </p>
      </div>
    );
  }
  // while there is error
  if (error) {
    return (
      <div className=" relative flex bg-maincolor justify-center min-h-screen items-center">
        <h1 className="text-white  gap-2 underline  flex items-center text-xl sm:text-3xl font-dm">
          <AlertCircle size={28} />
          {error}
        </h1>
      </div>
    );
  }
  function formatTimeAgo(date: Date) {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const timeUnits = [
      { name: "year", seconds: 31536000 },
      { name: "month", seconds: 2592000 },
      { name: "day", seconds: 86400 },
      { name: "hour", seconds: 3600 },
      { name: "minute", seconds: 60 },
    ];
    for (const u of timeUnits) {
      const interval = seconds / u.seconds;
      if (interval >= 1) {
        const v = Math.floor(interval);
        return `${v} ${u.name}${v > 1 ? "s" : ""} ago`;
      }
    }
    return `${seconds} seconds ago`;
  }
    const goLogin = () => {
    navigate("/login");
  };

  return (
    <section className=" bg-maincolor   min-h-screen overflow-hidden py-2">
      <div className="container   mx-auto    max-w-5xl w-full  ">
        <div className="     w-full  flex flex-col justify-start md:h-[calc(100vh-0.5rem)] overflow-y-auto scroll-hidden">
          <div className="flex flex-col ">
            {post.map((post, index) => (
              <div
                key={index}
                className="   bg-navabar  rounded-t-md cursor-pointer border-b-[2px] border-b-maincolor w-full hover:bg-navabar hover:bg-opacity-70 text-white px-2 ">
                <div className="flex  flex-row justify-between p-1 items-center">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.user?.profileImage}
                      className="object-cover rounded-full w-10 h-10"
                    />
                    <div className="text-start mr-2  ">
                      <Link
                        to={`${post.user?.username}`}
                        className="text-[12px] ml-1  hover:underline  font-extrabold">
                        {post.user?.username}
                      </Link>
                      <p className="text-[9px] font-bold">
                        {formatTimeAgo(new Date(post.createdAt))}
                      </p>
                    </div>
                  </div>
                  <div className="p-2">
                    {/* Only show follow button if it's not the current user's own post */}
                  </div>
                </div>
                <div className="block underline:none px-2">
                  <p className="text-gray-300">{post.text}</p>
                </div>
                {post.image && (
                  <div>
                    <div className="w-full   h-aspect-square  overflow-hidden rounded-sm">
                      <img
                        src={post?.image}
                        className="w-full h-full object-cover"
                        alt="Post image"
                      />
                    </div>
                  </div>
                )}
                <div className="flex flex-row p-2 items-center  rounded-sm  gap-2   justify-between">
                  <div className="flex flex-row   px-2     py-1    gap-6 justify-between w-32  items-center  text-center">
                    <button  onClick={goLogin}
                      className="flex  items-center  p-1  ">
                      <div className="flex  p-1.5 hover:bg-pink-500 transition-colors duration-200 ease-in-out hover:bg-opacity-30  hover:text-pink-400 rounded-full items-center justify-center text-sm gap-1 cursor-pointer">
                        <Heart size={22} />
                      </div>
                      <h3 className="font-semibold ">{post.comments?.length}</h3>
                    </button>
                    <button  onClick={goLogin}
                      className="flex  items-center  p-1  ">
                      <div className="flex  p-1.5 hover:bg-blue-700 transition-colors duration-200 ease-in-out hover:bg-opacity-30  hover:text-blue-600 rounded-full items-center justify-center text-sm gap-1 cursor-pointer">
                        <MessageSquareMore size={22} />
                      </div>
                      <h3 className="font-semibold ">{post.comments?.length}</h3>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Home;
