import { useEffect,useState } from "react";
import { Heart, MessageSquareMore } from "lucide-react";
import { Link,useParams} from "react-router";
import { PostType } from "../../type/PostType";
import {userlist} from "../../type/userlistType"
import { Mail } from "lucide-react";
const PostUser = () => {
  const { username } = useParams<{ username: string }>(); 
  const [user, setUser] = useState<userlist | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!username) return; //check the  user first 
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/user/${username}`, {
          credentials: "include",
        });

        const data = await res.json();
        setUser(data.userInfo);
      } catch (error) {
        setUser(null)
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [username]);

  if (loading) {
    return <div className="text-white flex justify-center">Getting user profile...</div>;
  }

  if (!user) {
    return <div>Error: user not found</div>;
  }
  return (
    <div className=" bg-navabar min-h-screen rounded-lg shadow-md overflow-y-auto scroll-hidden   text-white">
      <div className="relative">
        <img 
          src={user?.coverImage || "https://via.placeholder.com/800x200"} 
          alt="Cover" 
          className="w-full h-48 object-cover" 
        />
        <img 
          src={user?.profileImage || "https://via.placeholder.com/100"} 
          alt="Profile" 
          className="w-28 h-28 rounded-full border-4 border-white absolute -bottom-14 left-6 object-cover" 
        />
      </div>
      <div className="pt-16 px-6 pb-4">
        <div className="flex gap-3   ">
         <div>
         <h2 className="text-2xl font-bold">{user?.username}</h2>
         <p className="text-gray-300 mt-1">{user?.bio || "No bio available"}</p>
        </div>
        <Link to={"/home/message"} className="mt-1 h-6 rounded-full hover:bg-neutral-700" ><Mail  size={26} className=" p-1.5"/></Link>
        </div>
        <div className="flex gap-4 mt-2 text-gray-300 text-sm">
          <span><strong>{user?.follower?.length || 0}</strong> Followers</span>
           <span><strong>{user?.following.length}</strong> Following</span>
          <span><strong>{user?.post?.length || 0}</strong> Posts</span>
        </div>
      </div>

      {/* Posts  Section */}
      <div className="border-t border-gray-700">
  {user?.post && user.post.length > 0 ? (
    user.post.map((post: PostType) => (
      <div
        key={post._id}
        className="p-4 cursor-pointer border-b border-gray-700 hover:bg-navabar bg-maincolor hover:bg-opacity-30"
      >
        <div className="flex gap-2 flex-row items-center font-dm font-semibold">
          <img
            src={user?.profileImage || "https://via.placeholder.com/36"}
            className="object-cover rounded-full w-9 h-9"
            alt="Profile"
          />
          <div className="mt-2 flex-col flex">
              <span className="font-bold ">{user?.username}</span>
            <p className="text-[9px] font-bold">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="p-2">
        <Link to={`/home/post/${post._id}`} className="block underline:none px-2">
                <p className="text-gray-300">{post.text}</p>
        </Link>
         {post.image && (
                <Link  to={`/home/post/${post._id}`} className="">
                <div className="w-full   h-72 aspect-square  overflow-hidden rounded-sm">
                <img  src={post?.image}  className="w-full h-full object-cover" 
               alt="Post image" />
              </div>
                </Link>
                )}
          <div className="flex gap-6 mt-3 text-gray-400 text-sm">
            <span className="flex items-center gap-1">
              <Heart /> {post.likes?.length || 0}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquareMore /> {post.comments?.length}
            </span>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="p-4 text-gray-400">No posts yet</p>
  )}
</div>

    </div>
  );
};

export default PostUser;


