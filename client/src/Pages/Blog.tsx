import { useContext, useState ,useEffect} from "react";
import { UserContext } from "../UserAuth/User"
import { Heart ,MessageSquareMore,PencilLineIcon,Send } from "lucide-react";
import { CiBookmarkPlus } from "react-icons/ci";
import { Outlet } from "react-router";
import { useLocation } from "react-router";
import { NavLink ,Link } from "react-router";
 import Post from "../Pages/Post";
import Userlist from "../Pages/Userpages/userlist";
import {PostType} from  ".././type/PostType";
import linklist from "../Pages/Links/links";
const Blog=()=>{

  // const [loading ,setLoading]=useState<boolean>(false);
  // const [error ,setError]=useState<boolean>(false);
  const [isliked,setLiked]=useState<{[key:string]:boolean}>({});
  const [Iscommnet,setIsComment]=useState<{[key:string]:boolean}>({})
  const [comment ,setComment]=useState<string>("")
  const location=useLocation()
  const nestedlocation=location.pathname !== "/home";
  const context=useContext(UserContext)
 
  if(!context){

    throw new Error
  }
  const {ISPoped,isPoped ,user}=context;
  const [post ,setPost]=useState<PostType[]>([])

  // type SocialLink = {
    //   twitter?: string;
    //   github?: string;
    //   website?: string;
    // };
    
    // -> for scrollbar
    
    //->opening the Comment Section
  
    // for all post 
    useEffect(()=>{
      const fetchPosts = async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post`, {
            credentials: "include",
          });
          const data = await res.json();
          setPost(data.data.post); 
        } catch (error) {
          console.error("Error fetching posts:", error);
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
    //-> for liked 
    const likedpost = (postID: string) => {
      setLiked((prevliked) => ({
        ...prevliked, 
        [postID]: !prevliked[postID]
      }));
    };
    // comment show case
    const showcommnet=(postID:string)=>{
       setIsComment((prevcomment)=>({
        ...prevcomment,[postID]:!prevcomment[postID]}))
    }
   

    return (
<section className=" bg-maincolor  min-h-screen ">
     <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] px-5 py-2">
     <div className="hidden md:block md:col-span-1 bg-[#1d1c1c] px-2 py-3">
     <div className="flex flex-col py-14  w-full h-full gap-8">
     <div className="flex items-center gap-3 hover:bg-navabar bg-opacity-25 rounded-md  px-4 py-2 mb-4">
              <img src={user?.profileImage} className="w-10 h-10 rounded-full object-cover" alt="Profile" />
              <span className="text-white mt-1 font-medium text-[15px] hidden lg:block">
                {user?.username || "User"}
              </span>
            </div>
    {/* Navigation Items */}
    {linklist.map((link, index) => (
      <Link to={typeof link.link==="function"? link.link(user?.username)||"":link.link} key={index}
        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#2a2929] transition-colors duration-200" >
        <span className="text-white text-xl">{link.icon}</span>
        <span className="text-white font-medium text-[15px] hidden lg:block">{link.label}</span>
      </Link>
    ))}
    <button onClick={ISPoped} className="mt-4  w-1/2  flex items-center justify-center gap-2  bg-[#4f46e5] hover:bg-[#635bff] text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300">
       <PencilLineIcon />Post
    </button>
  </div>

  {isPoped && (
    <div className="fixed inset-0 z-30 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-navabar  bg-opacity-95 z-40 w-full max-w-xl rounded-xl p-4 shadow-xl relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
          onClick={ISPoped}>
          &times;
        </button>
        <Post />
      </div>
    </div>
  )}
</div>
          {/*Post Section*/}
          <div className="  col-span-3 md:col-span-1 w-full flex flex-col justify-start md:h-[calc(100vh-1rem)] overflow-y-auto scroll-hidden">
            <div className={`flex   justify-center  gap-1  p-2 `}>
            <div className="flex     rounded-md text-white border-2">
              <NavLink to="/home/latest"    className={({isActive})=>isActive
              ? "bg-gray-600   bg-opacity-70 rounded-l-md text-center  w-24 px-4 py-1.5  border-r-2 border-slate-100  text-[14px] items-center":
              " px-4 py-1.5 flex w-24 bg-navabar bg-opacity-80 rounded-l-md   border-r-2   border-slate-100   text-[14px] items-center"  
            }>Latest</NavLink>
              <NavLink  to="/home/popular"  className={({isActive})=>isActive 
              ?"bg-gray-600   bg-opacity-70 text-center px-4 py-1.5 flex   w-24  text-[14px] items-center":  " bg-navabar bg-opacity-80  w-24  px-4 py-1.5 flex   text-[14px] items-center"}
              >Popular</NavLink>
              <NavLink to="/home/following"  className={({isActive})=>isActive 
              ?"bg-gray-600    bg-opacity-70 rounded-r-md text-center  px-4 py-1.5 flexs  w-24 border-l-2 border-slate-100  text-[14px] items-center":" border-slate-100    rounded-r-md   w-24  bg-navabar bg-opacity-80   border-l-2 px-4 py-1.5 flex  text-[14px] items-center"}
              >Follwing</NavLink>
              </div>
            </div>
            
            {nestedlocation ? (
              <Outlet />
            ):(
                 <div className="">
              <div className="flex    flex-col  p-1 m-2 gap-2   ">
               {post.map((post) => (
                <div className=" p-1  cursor-pointer  hover:bg-navabar hover:bg-opacity-40  shadow rounded-lg bg-navabar text-white px-2 ">
                   <div className="flex  flex-row justify-between p-1 items-center gap-2">
                    <div className="flex flex-row items-center  font-dm font-semibold">
                     <img src={user?.profileImage} className="object-cover rounded-full w-9 h-9" />
                     <div className="mt-4  flex-col flex  ">
                     <Link to={`/home/post/user/${post.user?.username}`} className="text-[12px] ml-1  hover:underline  font-extrabold">{post.user?.username}</Link>
                     <p className="text-[9px] font-bold">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="p-2">
                    <button className="bg-black  md:px-4 md:py-1.5 px-3 py-1 flex font-dm font-semibold rounded-md text-white text-[14px] items-center">Follow</button>
                </div>
               </div>
               <Link to={`/home/post/${post._id}`} className="block underline:none px-2">
                <p className="text-gray-300">{post.text}</p>
                </Link>
                {post.image && (
                <Link  to={`/home/post/${post._id}`} className="">
                <div className="w-full   h-72 overflow-hidden rounded-sm">
                <img  src={post?.image}  className="w-full h-full object-cover" 
               alt="Post image" />
              </div>
                </Link>
               )}             
               <div className="flex flex-row p-2 items-center  rounded-sm  gap-2   justify-between">
                <div className="flex flex-row   px-2     py-1    gap-3 justify-between w-32  items-center  text-center">
                <button className="flex items-center gap-1">
                          <span onClick={() => likedpost(post._id)} className="flex items-center cursor-pointer">
                            <div className="flex p-1.5 hover:bg-rose-700 transition-colors duration-200 ease-in-out hover:text-white hover:bg-opacity-80 rounded-full items-center justify-center text-sm gap-1 cursor-pointer">
                              <Heart size={22} 
                                className={`${isliked[post._id] ? 'fill-rose-600 text-rose-600' : 'fill-none'} transition-colors duration-200 rounded-full`} 
                              />
                            </div>
                          </span>
                          <h3 className="font-semibold text-[15px]">{post.like?.length || 0}</h3>
                        </button>
                 <button 
                  onClick={()=>showcommnet(post._id)}
                  className="flex  items-center  p-1  ">
                  <div className="flex  p-1.5 hover:bg-blue-700 transition-colors duration-200 ease-in-out hover:bg-opacity-30  hover:text-blue-600 rounded-full items-center justify-center text-sm gap-1 cursor-pointer">
                    <MessageSquareMore  size={22}/>
                   </div>
                   <h3 className="font-semibold ">{post.comment?.length || 0}</h3> 
                </button>
              </div>
                 <span className="flex text-sm cursor-pointer ">
                <CiBookmarkPlus  size={20}/>
                </span>
                </div>
                {Iscommnet[post._id] && (
                  <div className="flex items-start gap-3 px-4 py-3 bg-maincolor bg-opacity-50 border border-gray-700 rounded-xl shadow-sm w-full">
                     <img src={user?.profileImage}  alt="Profile" className="w-10 h-10 rounded-full object-cover"/>
                     <div className="flex-1">
                       <div className="bg-[#2a2a2a] flex  text-white px-4 py-2 rounded-full text-sm w-full  ">
                       <input type="text" value={comment} placeholder="Write a comment..." 
                       onChange={(e)=>setComment(e.target.value)} className="bg-transparent  w-full outline-none" />
                       <button className="hover:bg-maincolor  px-2 py-1 bg-opacity-40 rounded-lg duration-300 "><Send size={20} /></button>
                     </div>
                    </div>
               </div>
                )}
             </div>  
              ))}
            </div>
            </div>
           )}
          </div>
          <div className="md:col-span-1 hidden  text-center  md:block">
            <Userlist />
            </div>
        </div>

      </section>
    )
}
export default Blog;

