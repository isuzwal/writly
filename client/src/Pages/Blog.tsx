import { useContext, useState ,useEffect} from "react";
import { UserContext } from "../UserAuth/User"
import { Heart,LoaderCircle ,AlertCircle,MessageSquareMore,PencilLineIcon,Send } from "lucide-react";
import { CiBookmarkPlus } from "react-icons/ci";
import { Outlet } from "react-router";
import { useLocation } from "react-router";
import { NavLink ,Link } from "react-router";
import Post from "../Pages/Post";
import Userlist from "../Pages/Userpages/userlist";
import {PostType} from  ".././type/PostType";
import linklist from "../Pages/Links/links";
import LikedStore from "../store/Likestore"
import CommentStore from "../store/Commentstore"
import bookmarkState from "../store/Bookmarks";
const Blog=()=>{
  const [loading ,setLoading]=useState<boolean>(false);
  const [error ,setError]=useState<string | null>(null);
  const [Iscommnet,setIsComment]=useState<Record<string,boolean>>({})
  const [comment ,setComment]=useState<Record<string ,string>>({})
  const location=useLocation()
  const nestedlocation=location.pathname !== "/home";
  const context=useContext(UserContext)
  const [post ,setPost]=useState<PostType[]>([])
  const [isFollowing ,setFollowing]=useState<{[userId:string]:boolean}>({})
  const {likedPost,liked,setInitialLikedStatus}=LikedStore()
  const {setbookmark ,bookmarks} =bookmarkState()
  const {postcomment}=CommentStore()
  
  if(!context){
    throw new Error
  }
  const currentuserId=context.user?._id || " ";
  const {ISPoped,isPoped ,user}=context;
  
    useEffect(() => {
    post.forEach((post) => {
      setInitialLikedStatus(post._id, post.likes.includes(currentuserId), post.likes.length);
    });
  }, [post]);

    // for all post 
    useEffect(()=>{
      const fetchPosts = async () => {
        setLoading(true)
        try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post`, {
            credentials: "include",
          });
          const data = await res.json();
          setPost(data.data.post); 
        } catch (error:any) {
       const msg=error.response?.data?.message || "Something Went Wrong Try Again"
          setError(msg)
        }finally{
          setLoading(false)
        }
      };
      fetchPosts()
    },[])
    useEffect(() => {
      if (isPoped) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    
      return () => {
        document.body.style.overflow = "auto";
      };
    }, [isPoped]);
   
  //  // commentBoxOpen
   const showcommnet=(postID:string)=>{
        setIsComment((prevcomment)=>({
        ...prevcomment,[postID]:!prevcomment[postID]}))
    }
// fixing the   when one comment  were write it show to all other comment section
const handlechangecommnet=(postId:string,value:string)=>{
  setComment((prev)=>({
  ...prev,[postId]:value
  }))
} 
useEffect(()=>{})
// this for the Following and Followed User API route
const follow = async (followedId: string, followingId: string) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        followedId,
        followingId
      }),
      credentials: "include"
    });
    if (!res.ok) {
      throw new Error('Failed to follow user');
    }
    const data = await res.json();
    setFollowing((prevState) => ({
      ...prevState,
      [followedId]: true
    }));
    return data;
  } catch (error) {
    setError((error as Error ).message|| "Something Went Wrong ")
  }
}
// unfollowed Router
const unfollow = async (followedId: string, followingId: string) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/unfollow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        followedId,
        followingId
      }),
      credentials: "include"
    });
    
    if (!res.ok) {
      throw new Error('Failed to unfollow user');
    }
    const data = await res.json();
    setFollowing((prevState) => ({
      ...prevState,
      [followedId]: false
    }));
    return data;
  } catch (error) {
    setError((error as Error ).message|| "Something Went Wrong ")
 
  }
}

if(loading){
   return <div className="flex items-center min-h-screen justify-center  bg-maincolor text-white font-dm">
    <p className="flex gap-2  text-xl sm:text-3xl items-center">Loading Post it make take some Time <LoaderCircle  size={28 }className="animate-spin" /></p>
  </div>
}
// while there is error
if (error){
  return <div className="flex  bg-maincolor justify-center min-h-screen items-center">
    <h1 className="text-white  gap-2 underline  flex items-center text-xl sm:text-3xl font-dm"><AlertCircle size={28} />{error}</h1>
  </div>
}
    return (
<section className=" bg-maincolor   min-h-screen overflow-hidden ">
   <div className="container mx-auto    max-w-8xl">
     <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] px-5 py-2">
      {/*Link Section  */}
     <div className="sm:col-span-1 hidden    lg:block text-center  bg-[#1d1c1c] ">
     <div className=" flex flex-col  gap-8">
      <div className="flex items-center gap-3 max-w-max hover:bg-navabar bg-opacity-25 rounded-md  px-4 py-2 mb-4">
              <img src={user?.profileImage} className="w-10 h-10 rounded-full object-cover" alt="Profile" />
              <span className="text-white mt-1 font-medium text-[15px] hidden lg:block">
                {user?.username || "User"}
              </span> 
      </div>
    {/* Navigation Items */}
    {linklist.map((link, index) => (
      <Link to={typeof link.link==="function"? `${link.link((user?.username ||"").trim()) || user?._id}`:`${link.link|| " "}` }
        key={index}
        className="flex   items-center gap-3 px-4 py-2 rounded-lg   hover:bg-[#2a2929] max-w-max transition-colors duration-200" >
        <span className="text-white text-xl">{link.icon}</span>
        <span className="text-white font-medium text-[15px] hidden lg:block">{link.label}</span>
      </Link>
    ))}
    <button onClick={ISPoped} className="mt-4   shadow-lg shadow-slate-300/40  flex-row    flex items-center justify-center gap-2  max-w-max bg-[#4f46e5] hover:bg-[#635bff] text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300">
       <PencilLineIcon />
       <span className="hidden lg:block">Create Post</span>
    </button>
    </div>
 
</div>
  {isPoped && (
    <div className="fixed inset-0 z-30 px-2  bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-navabar  bg-opacity-100 z-40  max-w-2xl w-full mx-auto rounded-xl p-2 shadow-xl relative">
        <Post />
      </div>
    </div>
  )}
          {/*Post Section*/}
          <div className="  col-span-3  sm:col-span-2   lg:col-span-1 w-full flex flex-col justify-start md:h-[calc(100vh-0.5rem)] overflow-y-auto scroll-hidden">
            <div className={`flex justify-center  gap-1 p-2 `}>
            <div className="flex   py-2 w-full justify-between     rounded-md text-white">
              <NavLink to="/home/latest"    className={({isActive})=>isActive
              ? "bg-gray-600     text-[16px]  text-center justify-center bg-opacity-70 rounded-l-md  flex-1 px-4 py-1.5  border-r-[1px]    border-slate-50 ":
              " px-4 py-1.5 flex flex-1  justify-center bg-navabar bg-opacity-80 rounded-l-md   border-r-[1px]     border-slate-50  text-[16px] "  
             }>Latest</NavLink>
              <NavLink  to="/home/popular"  className={({isActive})=>isActive 
              ?"bg-gray-600  text-[16px] bg-opacity-70 text-center px-4 py-1.5 flex-1   justify-center":  
              " justify-center    text-[16px]   bg-navabar bg-opacity-80  flex-1  px-4 py-1.5 flex   items-center"}
              >Popular</NavLink>
              <NavLink to="/home/following"  className={({isActive})=>isActive 
              ?"bg-gray-600   justify-center  bg-opacity-70 rounded-r-md text-center  px-4 py-1.5 flex-1    border-l-[1px]    border-slate-50 text-[16px]  ":
              " justify-center    rounded-r-md  flex-1  bg-navabar bg-opacity-80  border-l-[1px]    border-slate-50 px-4 py-1.5 flex   text-[16px] "}
              >Follwing</NavLink>
              </div>
            </div>
            {nestedlocation ? (
              <Outlet />
            ):(
              <div className="flex flex-col ">
               {post.map((post,index) => (
                <div  key={index} className="   bg-navabar cursor-pointer border-b-[2px] border-b-maincolor w-full hover:bg-navabar hover:bg-opacity-40 text-white px-2 ">
                   <div className="flex  flex-row justify-between p-1 items-center">
                   <div className="flex items-center gap-3">
                     <img src={post.user?.profileImage} className="object-cover rounded-full w-10 h-10" />
                     <div className="text-start mr-2  ">
                     <Link to={`/home/${post.user?.username}`} className="text-[12px] ml-1  hover:underline  font-extrabold">{post.user?.username}</Link>
                     <p className="text-[9px] font-bold">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
            <div className="p-2">
          {/* Only show follow button if it's not the current user's own post */}
          {post.user?._id !== currentuserId && (
            isFollowing[post.user?._id || " "] ? (
              <button
                onClick={() => unfollow(post.user?._id || " ", currentuserId)} // Call unfollow if already following
                className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded-lg"
              >
                Following
              </button>
            ) : (
              <button     
                onClick={() => {follow(post.user?._id || " ", currentuserId)
                }} // Call follow if not following
                className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded-lg"
              >
                Follow
              </button>
            )
          )}
          </div>
               </div>
               <Link to={`/home/post/${post._id}`} className="block underline:none px-2">
                <p className="text-gray-300">{post.text}</p>
                </Link>
                {post.image && (
                <Link  to={`/home/post/${post._id}`} className="">
                <div className="w-full   h-aspect-square  overflow-hidden rounded-sm">
                <img  src={post?.image}  className="w-full h-full object-cover" 
               alt="Post image" />
              </div>
                </Link>
               )}             
               <div className="flex flex-row p-2 items-center  rounded-sm  gap-2   justify-between">
                <div className="flex flex-row   px-2     py-1    gap-6 justify-between w-32  items-center  text-center">
                <button className="flex items-center gap-2">
                          <span onClick={() => likedPost(post._id,user?._id|| " ")} className="flex    gap-2 items-center cursor-pointer">
                              <Heart size={22} 
                              className={`
                              ${liked[post._id] ? "fill-rose-500 text-rose-500" :"fill-none"}
                              transition-colors duration-200 rounded-full "  `}
                              />
                            <h3 className="font-semibold text-[16px]">{post.likes.length}</h3>
                          </span>
                        </button>
                 <button 
                  onClick={()=>showcommnet(post._id)}
                  className="flex  items-center  p-1  ">
                  <div className="flex  p-1.5 hover:bg-blue-700 transition-colors duration-200 ease-in-out hover:bg-opacity-30  hover:text-blue-600 rounded-full items-center justify-center text-sm gap-1 cursor-pointer">
                    <MessageSquareMore  size={22}/>
                   </div>
                   <h3 className="font-semibold ">{post.comments?.length}</h3> 
                </button>
              </div>
                 <span onClick={()  =>{
                   setbookmark(post._id, currentuserId)}}
                   className={`${
                   bookmarks.some((bookmarks) => bookmarks._id === post._id) ? "text-blue-500 fill-blue-500" : ""}flex text-sm cursor-pointer transition-colors duration-200 `}>
                 <CiBookmarkPlus size={20} />
               </span>
                </div>
                {Iscommnet[post._id] && (
                  <div className="flex items-start gap-3 px-4 py-3 bg-maincolor bg-opacity-50 border border-gray-700 rounded-xl shadow-sm w-full">
                     <img src={user?.profileImage}  alt="Profile" className="w-10 h-10 rounded-full object-cover"/>
                     <div className="flex-1">
                       <div className="bg-[#2a2a2a] flex  text-white px-4 py-2 rounded-full text-sm w-full  ">
                       <input type="text"   value={comment[post._id] || ""} placeholder="Write a comment..." 
                       onChange={(e)=>handlechangecommnet(post._id,e.target.value)} className="bg-transparent  w-full outline-none" />
                       <button  onClick={()=>{
                        setComment({ })
                        postcomment(post._id,user?._id || " ",comment[post._id]) || " "} 
                        }className="hover:bg-maincolor  px-2 py-1 bg-opacity-40 rounded-lg duration-300 "><Send size={20} /></button>
                     </div>
                    </div>
               </div>
                )}
             </div>  
              ))}
            </div>
           )}
          </div>
          <div className="md:col-span-1 hidden  lg:block text-center">
            <Userlist />
            </div>
        </div>
        </div>
      </section>
    )
}
export default Blog;