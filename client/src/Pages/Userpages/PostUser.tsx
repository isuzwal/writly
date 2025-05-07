import { useEffect,useState } from "react";
import { Heart, MessageSquareMore } from "lucide-react";
import { Link ,useParams} from "react-router";
import { PostType } from "../../type/PostType";
import {userlist} from "../../type/userlistType"
const PostUser = () => {
  const {username} =useParams<{username:string}>()
  const [user, setUser] = useState<userlist |null>(null);

 useEffect(()=>{
       const fetchPosts = async () => {
         try {
           const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/user/${username}`, {
             credentials: "include",
           });
           const data = await res.json();
           setUser(data.userInfo); 
         } catch (error) {
           console.error("Error fetching posts:", error);
         }
       };
       fetchPosts()
     },[])
  
  if(!user){
    return <div>Lodaing User...</div>
  }
  return (
    <div className=" bg-navabar min-h-screen rounded-lg shadow-md overflow-y-auto scroll-hidden   text-white">
      <div className="relative">
        <img 
          src={user.coverImage || "https://via.placeholder.com/800x200"} 
          alt="Cover" 
          className="w-full h-48 object-cover" 
        />
        <img 
          src={user.profileImage || "https://via.placeholder.com/100"} 
          alt="Profile" 
          className="w-28 h-28 rounded-full border-4 border-white absolute -bottom-14 left-6 object-cover" 
        />
      </div>
      <div className="pt-16 px-6 pb-4">
        <h2 className="text-2xl font-bold">{user.username}</h2>
        <p className="text-gray-300 mt-1">{user.bio || "No bio available"}</p>
        <div className="flex gap-4 mt-2 text-gray-300 text-sm">
          <span><strong>{user.follower?.length || 0}</strong> Followers</span>
          <span><strong>{user.post?.length || 0}</strong> Posts</span>
        </div>
      </div>

      {/* Posts */}
      <div className="border-t border-gray-700">
  {user?.post && user.post.length > 0 ? (
    user.post.map((post: PostType) => (
      <div
        key={post._id}
        className="p-4 cursor-pointer border-b border-gray-700 hover:bg-gray-800 transition"
      >
        <div className="flex gap-2 flex-row items-center font-dm font-semibold">
          <img
            src={user.profileImage || "https://via.placeholder.com/36"}
            className="object-cover rounded-full w-9 h-9"
            alt="Profile"
          />
          <div className="mt-2 flex-col flex">
            <Link to={`/home/user/${user.username}`}>
              <span className="font-bold hover:underline">{user?.username}</span>
            </Link>
            <p className="text-[9px] font-bold">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="p-2">
        <Link to={`/home/post/${post._id}`} className="block underline:none px-2">
                <p className="text-gray-300">{post.text}</p>
                </Link>
          {post?.image && (
            <img
              src={post.image}
              alt="Post"
              className="w-full mt-2 rounded-md max-h-60 object-cover"
            />
          )}
          <div className="flex gap-6 mt-3 text-gray-400 text-sm">
            <span className="flex items-center gap-1">
              <Heart /> {post.like?.length || 0}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquareMore /> {post.comment?.length || 0}
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
