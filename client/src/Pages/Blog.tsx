import { useContext, useState ,useEffect} from "react";
import ProfiledImage from "../assets/discord.jpeg"
import { UserContext } from "../UserAuth/User";
import { Heart ,MessageSquareMore } from "lucide-react";
import { CiBookmarkPlus } from "react-icons/ci";
import { Outlet } from "react-router";
import { useLocation } from "react-router";
import { NavLink ,Link } from "react-router";
 import Post from "./Post";
import Userlist from "./userlist";
import {PostType} from "./PostType";

const Blog=()=>{

  // const [loading ,setLoading]=useState<boolean>(false);
  // const [error ,setError]=useState<boolean>(false);
  const [isliked,setLiked]=useState<{[key:string]:boolean}>({});
  const location=useLocation()
  const nestedlocation=location.pathname !== "/home";
  const context=useContext(UserContext)
 
  if(!context){

    throw new Error
  }
  const {ISPoped,isPoped}=context;
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
    const likedpost=(postID:string)=>{
      setLiked((prevliked)=>({
        ...prevliked,[postID]:!prevliked}))
      console.log("Post id is",postID)
    
    }
    console.log("Post",post)
    return (
<section className=" bg-maincolor flex-grow">
     <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] px-5 py-2">
       <div className="  hidden md:block   md:col-span-1   px-5    md:px-7  lg:px-10 py-6 ">
        
           <div className="  px-2 py-1 flex items-center ">
            <button onClick={ISPoped} 
           className="bg-black md:px-4 md:py-1.5 px-7 py-1 flex font-dm font-semibold rounded-lg text-slate-100  text-[16px] items-center">Post</button>
           </div> 
          {isPoped && (
          <div className="fixed  inset-0 z-40 bg-black  bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-xl rounded-xl p-2 relative shadow-lg">
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
                     <img src={ProfiledImage} className="object-cover rounded-full w-9 h-9" />
                     <div className="mt-4  flex-col flex  ">
                     <Link  to={`/home/user/${post.user?.username}`} className="text-[12px] ml-1  hover:underline  font-extrabold">{post.user?.username}</Link>
                     <p className="text-[9px] font-bold">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="p-2">
                    <button className="bg-black  md:px-4 md:py-1.5 px-3 py-1 flex font-dm font-semibold rounded-md text-white text-[14px] items-center">Follow</button>
                </div>
               </div>
              <div className="px-2 ">
                <span className="text-[15px] text-start font-dm ">{post.title}</span>
                <p>{post.text}</p>
               </div>

               <div className="w-full  h-72 overflow-hidden rounded-sm ">
                <img src={post?.image} 
                loading="lazy"
                className="w-full h-full object-cover" />
               </div>
               <div className="flex flex-row p-2 items-center  rounded-sm  gap-2   justify-between">
                <div className="flex flex-row   px-2     py-1    gap-3 justify-between w-32  items-center  text-center">
                
                <button className="flex  items-center   px-1  ">
                 <span key={post._id}  onClick={() => likedpost(post._id)}
                 className="flex items-center cursor-pointer">
                <div className="flex  p-1.5 hover:bg-rose-700 transition-colors duration-200 ease-in-out  hover:text-white hover:bg-opacity-80 rounded-full items-center justify-center text-sm gap-1 cursor-pointer">
                  <Heart 
                    className={`${isliked[post._id]  ? 'fill-rose-600 text-rose-600'
                      :'fill-none  group-hover:text-rose-600'
                    }transition-colors duration-200  rounded-full`} 
                  size={22} />
                 </div>
                </span>
                  <h3 className="font-semibold text-[15px] ">{post.like?.length}10</h3>
                </button>
                 
                 <button className="flex  items-center  p-1  ">
                  <div className="flex  p-1.5 hover:bg-blue-700 transition-colors duration-200 ease-in-out hover:bg-opacity-30  hover:text-blue-600 rounded-full items-center justify-center text-sm gap-1 cursor-pointer">
                    <MessageSquareMore  size={22}/>
                   </div>
                   <h3 className="font-semibold ">{post.comment?.length}100</h3> 
                </button>
              </div>
                 <span className="flex text-sm cursor-pointer ">
                <CiBookmarkPlus  size={20}/>
                </span>
                </div>
               
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

