import { useParams } from "react-router";
import { useEffect,useState } from "react";
import { userlist } from "./userlistType";
import { SlLike } from "react-icons/sl";
import {  FaRegComment } from "react-icons/fa";
const UserProfile=()=>{
    const [user ,setUser]=useState<userlist|null>(null)
    const {username}=useParams()
    useEffect( ()=>{
       if(!username) return ;
       const fetchData=async()=>{
           try{
           const response= await fetch (`${import.meta.env.VITE_BACKEND_URL}/blog/user/name${username}`,{
               credentials:"include"
           })
           const data = await response.json();
            setUser(data.userInfo); 
       }catch (error) {
           console.error("Error fetching posts:", error);
       }
   }
   fetchData();
   },[username])
   if (!user) {
       return <div className="text-center p-10">Loading User</div>;
     }
    return (
        <div className="  p-2">
        <div className="relative h-56  border-2 cursor-pointer  rounded-xl overflow-hidden shadow-md mb-2">
          <img  src={user?.coverImage} alt="Cover" className="h-full w-full object-cover"/>
          <div className="absolute -bottom-1 z-30 ">
            <img src={user?.profileImage} alt="Profile" className="h-36 w-36 object-cover  rounded-full border-[3px] cursor-pointer  "/>
          </div>
        </div>
        <div className="p-1 flex flex-col ">
          <div className="flex    px-2 text-start  flex-col  text-sm mt-2">
           <h1 className="text-3xl font-bold">{user?.username}</h1>
            <span className="flex gap-3  text-gray-700 ">
              <strong className="font-dm">Followers {user.follower?.length}</strong> 
              <strong className="">Post {user.post?.length}</strong>
              </span>
          </div>
            <div className="p-2">
              <span className="text-slate-900 font-semibold">Bio</span>
            <p className="text-gray-600">{user.bio}</p>
            </div>
        </div>
        <div className="p-2">
            {user.post?.map((post, index) => (
            <div key={index} className=" border-t-[2px] border-gray-300 p-5 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600 mt-2">{post.text}</p>
              <div className="w-full border-2  h-56 overflow-hidden rounded-md">
                <img src={post?.image} 
                loading="lazy"
                className="w-full h-full object-cover" />
               </div>
              <div className="flex  gap-5  text-xs text-gray-800 mt-4">
                <span>{post.like?.length}<SlLike size={18} /></span>
                <span>{post.comment?.length}<FaRegComment  size={18}/></span>
              </div>
            </div>
          ))}
        </div>
      </div>
        
    )
}
export default UserProfile;