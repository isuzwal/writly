import { useParams, Link } from "react-router";  // Make sure to use react-router-dom
import { useEffect, useState,useContext } from "react";
import { PostType } from "../type/PostType";
import { Heart, MessageSquareMore } from "lucide-react";
import { CiBookmarkPlus } from "react-icons/ci";
import { comment } from "../type/commenttpe";
import LikedStore from "../store/Likestore";
import { UserContext } from "../UserAuth/User"
import { AlertCircle } from "lucide-react";
const SinglePost = () => {
  const { id } = useParams(); // Get post ID from the URL
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment,setComment]=useState<comment[]>([])
  const [showcomment,setShowComments]=useState<boolean>(false)
  const [error,setError]=useState<string | null >(null)
  const {likedPost,liked}=LikedStore();
const context=useContext(UserContext)
 if(!context){
    throw new Error
  }
  const {user}=context;
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/${id}`, {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch post: ${res.status}`);
        }
        const data = await res.json();
        if (data.data && data.data.post) {
          setPost(data.data.post);  
        }
      } catch (error) {
         setError((error as Error ).message || "Try again !" )
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchPost();
    }
  }, [id]);


 
  if (loading) return <div className="text-white">Loading post...</div>;
  if (!post) return <div className="text-white">Post not found.</div>;
 
// comment Fetching Process 
const getcomments=async(postId?:string,userId?:string)=>{
  try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/single/commnet`, {
       method:'POST',
       headers:{
       'Content-Type':'application/json',
       },
       body:JSON.stringify({
             postId:postId,
             userId:userId
            }),
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch post: ${res.status}`);
        }
        // store the comment 
        const data = await res.json();
        setComment(data.data)
}catch(error){
  setError((error as Error).message || "Try Again !")
}
}
if (error) {
    return (
      <div className="flex bg-maincolor justify-center min-h-screen items-center">
        <h1 className="text-white gap-2 underline flex items-center text-xl sm:text-3xl font-dm">
          <AlertCircle size={28} />
          {error}
        </h1>
      </div>
    );
  }

  // If post is null after loading and no error, means it wasn't found
  if (!post) {
    return (
      <div className="flex bg-maincolor justify-center min-h-screen items-center">
        <h1 className="text-white gap-2 underline flex items-center text-xl sm:text-3xl font-dm">
          <AlertCircle size={28} />
          Post not found.
        </h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col p-1 m-2  gap-2">
      <div className="p-1 cursor-pointer hover:bg-navabar hover:bg-opacity-80 transition-all ease-in-out duration-300  shadow rounded-lg bg-navabar text-white px-2">
        <div className="flex flex-row justify-between p-1 items-center gap-2">
          <div className="flex gap-1 flex-row items-center font-dm font-semibold">
            <img 
              src={post?.user?.profileImage || "https://via.placeholder.com/36"} 
              className="object-cover rounded-full w-9 h-9" 
              alt="Profile"
            />
            <div className="mt-2 flex-col flex">
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
        <div className="flex flex-row   p-2 items-center rounded-sm gap-2 justify-between">
          <div className="flex flex-row px-2 py-1 gap-3 justify-between w-32 items-center text-center">
            <button className="flex items-center px-1">
              <span  key={post._id}   onClick={() => post._id && likedPost(post._id,user?._id || " ")}
                className="flex items-center cursor-pointer">
                <div className="flex p-1.5 hover:bg-rose-700 transition-colors duration-200 ease-in-out hover:text-white hover:bg-opacity-80 rounded-full items-center justify-center text-sm gap-1 cursor-pointer">
                  <Heart 
                    className={`${liked[post._id] ? 'fill-rose-600 text-rose-600' : 'fill-none group-hover:text-rose-600'} transition-colors duration-200 rounded-full`} 
                    size={22} 
                  />
                </div>
              </span>
              <h3 className="font-semibold text-[15px]">
                {post.likes ? post.likes.length : 0}
              </h3>
            </button>
            <button  onClick={() => {
             getcomments(post._id, post?.user?._id);
             setShowComments(prev => !prev);          
             }}
             className="flex items-center p-1">
              <div className="flex p-1.5 hover:bg-blue-700 transition-colors duration-200 ease-in-out hover:bg-opacity-30 hover:text-blue-600 rounded-full items-center justify-center text-sm gap-1 cursor-pointer">
                <MessageSquareMore size={22} />
                 {post?.comments?.length}
              </div>
              </button>
          </div>
          <span className="flex text-sm cursor-pointer">
            <CiBookmarkPlus size={20} />
          </span>
        </div>
        {/*Comment Section UI */}
       <div className="flex flex-col p-2 w-full max-h-56 overflow-y-auto scroll-hidden">
               {showcomment && comment && comment.map((items:comment,index)=>(
                 <div key={index} className=" bg-[#2a2a2a]   flex rounded-md items-center p-2 mb-2  text-white">
                  <div className=" flex items-center ">
                  <Link to={`/home/${items.sender?.username}`} >
                  <img src={items?.sender.profileImage} 
                 alt={items?.sender.username} 
                 className="w-8 aspect-square rounded-full"/>
                 </Link>
               </div>
               <div className="flex items-center   w-auto px-2">
                  <p className="text-gray-200 font-sans">{items.text}</p>
                </div>
             </div>
               ))}
            </div>
      </div>
    </div>
  );
};

export default SinglePost;