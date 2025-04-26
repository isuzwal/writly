import { useParams } from "react-router";
import { useEffect,useState } from "react";
import { PostType } from "./PostType";
import { SlLike } from "react-icons/sl";
import {  FaRegComment } from "react-icons/fa";
import { CiBookmarkPlus } from "react-icons/ci";
import ProfiledImage from "../assets/discord.jpeg"
const Singlepost=()=>{
      const [post ,setPost]=useState<PostType |null>(null)
      const [IsCommnet,setComment]=useState<boolean>(false)
      const {id}=useParams()
     useEffect( ()=>{
        if(!id) return ;
        const fetchData=async()=>{
            try{
            const response= await fetch (`${import.meta.env.VITE_BACKEND_URL}/blog/${id}`,{
                credentials:"include"
            })
            const data = await response.json();
            setPost(data.data.post); 
        }catch (error) {
            console.error("Error fetching posts:", error);
        }
    }
    fetchData();
    },[id])
    if (!post) {
        return <div className="text-center p-10">Loading post...</div>;
      }
    const commentOpen=()=>{
        setComment((prevstate)=>!prevstate)
      }
    return (
     
        <div className="flex  flex-col border-x-[1.5px]  border-gray-500 p-1 m-2 gap-2   ">
     
         <div key={post._id}  className=" p-1 border-b-[1.5px] cursor-pointer hover:bg-slate-200  transition-all ease-in-out duration-300  bg-opacity-50 border-gray-600 shadow bg-white">
            <div className="flex  flex-row justify-between p-1 items-center gap-2">
             <div className="flex flex-row items-center  text-gray-800 font-dm font-semibold">
              <img src={ProfiledImage} className="object-cover rounded-full w-9 h-9" />
              <div className="mt-4  flex-col flex  ">
              <span className="text-[12px] ml-1 font-extrabold">{post.user?.username}</span>
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

        <div className="w-full border-2  h-56 overflow-hidden rounded-md">
         <img src={post.image} 
         loading="lazy"
         className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-row p-2 items-center border-t-2  rounded-sm  gap-2   justify-between">
         <div className="flex flex-row   px-2     py-1    gap-3 justify-between w-32  items-center  text-center">
         <span className="flex gap-2   text-sm items-center cursor-pointer">
         <SlLike  size={18}/>
           <h3 className="font-semibold mt-1 ">{post.like}</h3>
         </span>
         <span onClick={commentOpen}
          className="flex items-center text-sm gap-1 cursor-pointer">
            <FaRegComment  size={19}/>
            <h3 className="font-semibold ">{post.comment?.length}</h3>
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
      </div>  
   
  
     </div>
    )
}
export default Singlepost;