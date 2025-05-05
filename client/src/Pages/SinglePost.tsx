import { useParams, Link } from "react-router";  // Make sure to use react-router-dom
import { useEffect, useState } from "react";
import { PostType } from "../type/PostType";
import { Heart, MessageSquareMore } from "lucide-react";
import { CiBookmarkPlus } from "react-icons/ci";

const SinglePost = () => {
  const { id } = useParams(); // Get post ID from the URL
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isliked, setLiked] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/id/${id}`, {
          credentials: "include",
        });
        
        if (!res.ok) {
          throw new Error(`Failed to fetch post: ${res.status}`);
        }
        
        const data = await res.json();
        if (data.data && data.data.post) {
          setPost(data.data.post);
          // Initialize like state
          if (data.data.post._id) {
            setLiked(prev => ({ ...prev, [data.data.post._id]: false }));
          }
        }
      } catch (error) {
        console.error("Error fetching single post:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchPost();
    }
  }, [id]);

  const likedpost = async (postID: string) => {
    try {
      // Toggle the UI state immediately for responsiveness
      setLiked(prevLiked => ({
        ...prevLiked, 
        [postID]: !prevLiked[postID]
      }));
      
      // Here you would typically call an API to record the like
      // For example:
      // await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/like/${postID}`, {
      //   method: 'POST',
      //   credentials: "include",
      // });
      
      console.log("Post liked:", postID);
    } catch (error) {
      console.error("Error liking post:", error);
      // Revert UI state on error
      setLiked(prevLiked => ({
        ...prevLiked, 
        [postID]: !prevLiked[postID]
      }));
    }
  };

  if (loading) return <div className="text-white">Loading post...</div>;
  if (!post) return <div className="text-white">Post not found.</div>;

  return (
    <div className="flex flex-col p-1 m-2 gap-2">
      <div className="p-1 cursor-pointer hover:bg-navabar hover:bg-opacity-40 shadow rounded-lg bg-navabar text-white px-2">
        <div className="flex flex-row justify-between p-1 items-center gap-2">
          <div className="flex flex-row items-center font-dm font-semibold">
            <img 
              src={post?.user?.profileImage || "https://via.placeholder.com/36"} 
              className="object-cover rounded-full w-9 h-9" 
              alt="Profile"
            />
            <div className="mt-4 flex-col flex">
              {/* Fix the link to point to the user profile page */}
              <Link to={`/home/${post.user?.username}`}>
                <span className="font-bold hover:underline">{post.user?.username}</span>
              </Link>
              <p className="text-[9px] font-bold">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="p-2">
            <button className="bg-black md:px-4 md:py-1.5 px-3 py-1 flex font-dm font-semibold rounded-md text-white text-[14px] items-center">
              Follow
            </button>
          </div>
        </div>
        <div className="px-2">
          <span className="text-[15px] text-start font-dm">{post.title}</span>
          <p>{post.text}</p>
        </div>
        {post.image && (
          <div className="w-full h-72 overflow-hidden rounded-sm">
            <img 
              src={post.image} 
              className="w-full h-full object-cover" 
              alt="Post image" 
            />
          </div>
        )}
        <div className="flex flex-row p-2 items-center rounded-sm gap-2 justify-between">
          <div className="flex flex-row px-2 py-1 gap-3 justify-between w-32 items-center text-center">
            <button className="flex items-center px-1">
              <span 
                key={post._id} 
                onClick={() => post._id && likedpost(post._id)}
                className="flex items-center cursor-pointer"
              >
                <div className="flex p-1.5 hover:bg-rose-700 transition-colors duration-200 ease-in-out hover:text-white hover:bg-opacity-80 rounded-full items-center justify-center text-sm gap-1 cursor-pointer">
                  <Heart 
                    className={`${isliked[post._id] ? 'fill-rose-600 text-rose-600' : 'fill-none group-hover:text-rose-600'} transition-colors duration-200 rounded-full`} 
                    size={22} 
                  />
                </div>
              </span>
              <h3 className="font-semibold text-[15px]">
                {post.like ? post.like.length : 0}
              </h3>
            </button>
            
            <button className="flex items-center p-1">
              <div className="flex p-1.5 hover:bg-blue-700 transition-colors duration-200 ease-in-out hover:bg-opacity-30 hover:text-blue-600 rounded-full items-center justify-center text-sm gap-1 cursor-pointer">
                <MessageSquareMore size={22} />
              </div>
              <h3 className="font-semibold">
                {post.comment ? post.comment.length : 0}
              </h3> 
            </button>
          </div>
          <span className="flex text-sm cursor-pointer">
            <CiBookmarkPlus size={20} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;