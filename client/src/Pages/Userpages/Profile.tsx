import {  useContext } from "react";
import { UserContext  } from "../../UserAuth/User";
import { NavLink ,Outlet ,useLocation } from "react-router";
import { PostType } from "../../type/PostType";
import { Heart, MessageSquareMore } from "lucide-react";

const Profile=()=>{

  const context=useContext(UserContext)
    if(!context){
      throw new Error
    }
    const {user}=context
    const userRouteLocation=useLocation()
    const userNestedroute=userRouteLocation.pathname ===`/home/user/${user.username}`
      console.log(userNestedroute)
    return (
      <div className=" bg-navabar  min-h-screen rounded-lg shadow-md overflow-y-auto scroll-hidden   text-white">
      <div className="relative">
        <img 
          src={user?.coverImage || "https://via.placeholder.com/800x200"} 
          alt="Cover" 
          className="w-full h-48 object-cover" 
        />
        <img 
          src={user?.profileImage || "https://via.placeholder.com/100"} 
          alt="Profile" 
          className="w-28 h-28 rounded-full border-4 border-white absolute -bottom-14 left-6 object-cover" 
        />
      </div>
      <div className="pt-16 px-6 pb-4">
        <h2 className="text-2xl font-bold">{user?.username}</h2>
        <p className="text-gray-300 mt-1">{user?.bio || "No bio available"}</p>
        <div className="flex gap-4 mt-2 text-gray-300 text-sm">
          <span><strong>{user?.follower?.length || 0}</strong> Followers</span>
          <span><strong>{user?.post?.length || 0}</strong> Posts</span>
        </div>
      </div>
      
      {/* Posts */}
      <div className="border-t border-gray-700">
            <div className={`flex    justify-center  gap-2  p-2 `}>
            <div className="flex w-full justify-evenly items-center   rounded-md text-white border-2">
              <NavLink  to={`/home/user/${user.username}/following`} className={({isActive})=>isActive 
              ?"bg-gray-600  flex-1  bg-opacity-70 text-center px-4 py-1.5 flex    justify-center text-[14px] items-center":  "flex-1 justify-center  bg-navabar bg-opacity-80   px-4 py-1.5 flex   text-[14px] items-center"}
              >Following</NavLink>
              <NavLink to={`/home/user/${user.username}/likes`} className={({isActive})=>isActive 
              ?"bg-gray-600    bg-opacity-70 rounded-r-md text-center  px-4 py-1.5 flex  justify-center border-l-2 flex-1 border-slate-100  text-[14px] items-center":" justify-center  border-slate-100  flex-1   rounded-r-md    bg-navabar bg-opacity-80   border-l-2 px-4 py-1.5 flex  text-[14px] items-center"}
              >Like</NavLink>
              </div>
          </div>
         {userNestedroute ? (
        <div className="border-t border-gray-700">
         {user?.post && user.post.length > 0 ? (
            user.post.map((post: PostType) => (
            <div key={post._id}    className="  cursor-pointer border-b-[2px] border-b-maincolor  hover:bg-navabar hover:bg-opacity-40   bg-navabar text-white px-2 ">
             <div className="flex gap-2 flex-row items-center font-dm font-semibold">
            <img src={user.profileImage || "https://via.placeholder.com/36"}
            className="object-cover rounded-full w-9 h-9"
            alt="Profile" />
          <div className="mt-2 flex-col flex">
            <h1>
              <span className="font-bold hover:underline">{user?.username}</span>
            </h1>
            <p className="text-[9px] font-bold">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="p-2">
          <p className="text-gray-300 text-sm mt-1">{post?.text}</p>
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
     <p className="p-4 text-gray-400">{" "}</p>
    )}
</div>
    ):(
   <Outlet />
  )}
</div>
</div>
    )
}
export default Profile;