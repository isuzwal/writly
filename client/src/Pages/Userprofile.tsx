import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { userlist } from "../type/userlistType";
import { SlLike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState<userlist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!username) return;
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile/${username}`, {
          credentials: "include",
        });
        
        if (!res.ok) {
          throw new Error(`Failed to fetch user: ${res.status}`);
        }
        
        const data = await res.json();
        if (data.userInfo) {
          setUser(data.userInfo);
          console.log("From user Profile", data.userInfo);
        } else {
          setError("User not found");
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
        setError("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (loading) return <p className="text-center mt-10 text-white">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-white">{error}</p>;
  if (!user) return <p className="text-center mt-10 text-white">User not found</p>;

  return (
    <div className="max-w-3xl mx-auto bg-navabar rounded-lg shadow-md overflow-hidden mt-10 text-white">
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
          <span><strong>{user?.follower?.length || 0}</strong> Followers</span>
          <span><strong>{user?.post?.length || 0}</strong> Posts</span>
        </div>
      </div>
      
      {/* Posts */}
      <div className="border-t border-gray-700">
        {user.post && user.post.length > 0 ? (
          user.post.map((post, idx) => (
            <div key={idx} className="p-4 border-b border-gray-700 hover:bg-gray-800 transition">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-gray-300 text-sm mt-1">{post.text}</p>
              {post.image && (
                <img 
                  src={post.image} 
                  alt="Post" 
                  className="w-full mt-2 rounded-md max-h-60 object-cover" 
                />
              )}
              <div className="flex gap-6 mt-3 text-gray-400 text-sm">
                <span className="flex items-center gap-1">
                  <SlLike /> {post.like?.length || 0}
                </span>
                <span className="flex items-center gap-1">
                  <FaRegComment /> {post.comment?.length || 0}
                </span>
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

export default UserProfile;