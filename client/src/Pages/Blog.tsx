import { useContext, useState ,useEffect} from "react";
import ProfiledImage from "../assets/discord.jpeg"
import { UserContext } from "../UserAuth/User";
import { SlLike } from "react-icons/sl";
import { AiOutlineDislike } from "react-icons/ai";
import {  FaRegComment } from "react-icons/fa";
import { CiBookmarkPlus } from "react-icons/ci";
import { Outlet } from "react-router";
import { useLocation } from "react-router";
import { NavLink } from "react-router";
import Post from "./Post";
import {PostType} from "./PostType";
// // import { FaXTwitter } from "react-icons/fa6";
// import { FaGithub } from "react-icons/fa";
// import { CgWebsite } from "react-icons/cg";
const Blog=()=>{
  const [IsCommnet,setComment]=useState<boolean>(false)
  // const [loading ,setLoading]=useState<boolean>(false);
  // const [error ,setError]=useState<boolean>(false);
  
  const location=useLocation()
  const nestedlocation=location.pathname !== "/blog";
  const context=useContext(UserContext)
  const localDate=new Date().toLocaleDateString();
  if(!context){

    throw new Error
  }
  const {user,uppercaseletter,ISPoped,isPoped}=context;
  const [post ,setPost]=useState<PostType[]>([])
  // type SocialLink = {
    //   twitter?: string;
    //   github?: string;
    //   website?: string;
    // };
    
    // -> for scrollbar
    
    //->opening the Comment Section
    const commentOpen=()=>{
      setComment((prevstate)=>!prevstate)
    }
    // for all post 
    useEffect(()=>{
      const fetchPosts = async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blog`, {
            credentials: "include",
          });
          const data = await res.json();
          console.log("User data",data.data.post)
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
    
    return (
<section className="min-h-screen  ">
     <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] px-5 py-2">
          <div className="  hidden md:block  md:col-span-1   px-5    md:px-7  lg:px-10 py-6 ">
          <div className="   border-2  items-center shadow-sm  rounded-md">
            <div className="flex   items-center p-2  justify-between w-36 gap-2 ">
              <img src={ProfiledImage} className="object-cover w-20 h-20 rounded-full" />
               <p className="font-dm font-semibold mt-12">{uppercaseletter(user?.username)}</p>
            </div>
            <div className="flex  flex-col gap-2 px-4  py-3 ">
              <h2 className="flex justify-between bg-slate-100 px-3  font-bold rounded-md py-1 ">Post
                <span className="font-semibold">12</span>
              </h2>
              <h3  className="flex justify-between bg-slate-100 px-3  font-bold rounded-md py-1">Followers
                <span className="font-semibold">{user.follower}</span>
              </h3>
              <h3  className="flex justify-between bg-slate-100 px-3  font-bold rounded-md py-1">Folowing
                <span className="font-semibold">1,024</span></h3>
              <div className="flex flex-row  justify-center   rounded-md px-5 gap-5">
               {/* {user.follower.newlink.map((link:SocialLink,index:number)=>{
                  if (link.twitter) {
                    return (
                      <a 
                        key={index} 
                        href={link.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <FaXTwitter className="text-xl" />
                      </a>
                    );
                  }
                  if (link.github) {
                    return (
                      <a 
                        key={index} 
                        href={link.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <FaGithub className="text-xl" />
                      </a>
                    );
                  }
                  if (link.website) {
                    return (
                      <a 
                        key={index} 
                        href={link.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <CgWebsite className="text-xl" />
                      </a>
                    );
                  }
                  return null;
                   })} */}
              </div>
            </div>
          </div>
          </div>
          {/*Post Section*/}
          <div className=" col-span-3 md:col-span-1 w-full flex flex-col justify-start md:h-[calc(100vh-1rem)] overflow-y-auto scroll-hidden">
            <div className={` bg-slate-100  flex  sticky top-0 z-20  rounded-t-lg  flex-wrap md:flex-row gap-6  md:justify-start justify-evenly py-3 px-4  `}>
              <NavLink to="/blog/latest"    className={({isActive})=>isActive
              ? "bg-black px-4 py-1.5 flex rounded-md text-white text-[14px] items-center":
              " px-4 py-1.5 flex bg-slate-100  rounded-md text-black text-[14px] items-center"  
            }>Latest</NavLink>
              <NavLink  to="/blog/popular"  className={({isActive})=>isActive 
              ?"bg-black px-4 py-1.5 flex rounded-md text-white text-[14px] items-center":"bg-slate-100  px-4 py-1.5 flex rounded-md text-black text-[14px] items-center"}
              >Popular</NavLink>
              <NavLink to="/blog/following"  className={({isActive})=>isActive 
              ?"bg-black px-4 py-1.5 flex rounded-md text-white text-[14px] items-center":" bg-slate-100 px-4 py-1.5 flex rounded-md text-black text-[14px] items-center"}
              >Follwing</NavLink>
            </div>
            
            {nestedlocation ? (
              <Outlet />
            ):(
                 <div className="border-2">
                  <div  className=" px-2 py-1 flex  flex-col rounded-md ">
                      <div className=" px-2 py-1 flex items-center justify-end ">
                       <button onClick={ISPoped} 
                       className="bg-black md:px-4 md:py-1.5 px-7 py-1 flex font-dm font-semibold rounded-lg text-slate-100  text-[16px] items-center">Post</button>
                      </div> 
                      {isPoped && (
                   <div className="fixed inset-0 z-40 bg-black  bg-opacity-50 flex items-center justify-center">
                   <div className="bg-white w-full max-w-xl rounded-xl p-2 relative shadow-lg">
                      <Post />
                     </div>
                   </div>
               )}
            </div>
              <div className="flex  flex-col border-2 px-2 py-2  m-3 gap-2 shadow-sm rounded-md ">
              <div className="flex  flex-row justify-between p-1 items-center gap-2">
                <div className="flex flex-row items-center  text-gray-800 font-dm font-semibold">
                 <img src={ProfiledImage} className="object-cover rounded-full w-9 h-9" />
                   <div className="mt-4  flex-col flex  ">
                   <span className="text-[12px] ml-1 font-extrabold">{uppercaseletter(user?.username)}</span>
                   <p className="text-[9px] font-bold">{localDate}</p>
                   </div>
                </div>
                <div className="p-2">
                    <button className="bg-black  md:px-4 md:py-1.5 px-3 py-1 flex font-dm font-semibold rounded-md text-white text-[14px] items-center">Follow</button>
                </div>
              </div>
               <div className="px-2 ">
                <p className="text-[15px] text-start font-dm ">The Very First Post on Bolg-Hub</p>
               </div>
             
               <div className="w-full border-2  h-56 overflow-hidden rounded-md">
                <img src={ProfiledImage} 
                loading="lazy"
                className="w-full h-full object-cover" />
               </div>
              <div className="flex flex-row p-2 items-center border-t-2  rounded-sm  gap-2   justify-between">
                <div className="flex flex-row  py-1  gap-3 justify-center items-center  text-center">
                <span className="flex gap-1 text-sm items-center cursor-pointer">
                <SlLike  size={18}/>
                  <h3 className="font-semibold mt-1 ">10k</h3>
                </span>
                <span className="flex gap-1 text-sm items-center cursor-pointer">
                <AiOutlineDislike size={19} className="mt-1"  />
                <h3 className="font-semibold mt-1 ">0</h3>
                </span>
                <span onClick={commentOpen}
                 className="flex items-center text-sm gap-1 cursor-pointer">
                   <FaRegComment  size={19}/>
                   <h3 className="font-semibold ">200</h3>
                   </span>
                   </div>
                <span className="flex text-sm cursor-pointer ">
                <CiBookmarkPlus  size={20}/>
                </span>
                </div>
                  {IsCommnet&& (
                    <div className="h-32 w-full rounded-md border-2 ">
                      <h1>Hello</h1>
                    </div>
                  )}
                  {post.map((post) => (
  <div key={post._id} className="mb-4 p-4 rounded-lg shadow bg-white">
    <p className="text-xs text-gray-500 mt-1">
      Posted by: {post.user?.username}
    </p>
    <h2 className="text-xl font-bold">{post.title}</h2>
    <p className="text-sm text-gray-700 mb-2">{post.text}</p>

    {post.image && (
      <img
        src={post.image} // ✅ This is a full Cloudinary URL from the DB
        alt="Post"
        className="w-full max-h-64 object-cover rounded-md mt-2"
      />
    )}

   
  </div>
))}

            </div>
            </div>
                )}
          </div>
          <div className="md:col-span-1 hidden  text-center  md:block">
            <h1 className="font-dm font-semiboldt">Comming Sonn !</h1>
            </div>
        </div>

      </section>
    )
}
export default Blog;