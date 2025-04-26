import { useParams } from "react-router";
import { useEffect,useState } from "react";
import { userlist } from "./userlistType";

const UserProfile=()=>{
    const [user ,setUser]=useState<userlist|null>(null)
    const {id}=useParams()
    useEffect( ()=>{
       if(!id) return ;
       const fetchData=async()=>{
           try{
           const response= await fetch (`${import.meta.env.VITE_BACKEND_URL}/blog/user/${id}`,{
               credentials:"include"
           })
           const data = await response.json();
            setUser(data.userInfo); 
           console.log("User Info",data.userInfo)
       }catch (error) {
           console.error("Error fetching posts:", error);
       }
   }
   fetchData();
   },[id])
   if (!user) {
       return <div className="text-center p-10">Loading User</div>;
     }
    return (
        <div className="max-w-4xl mx-auto p-4">

        {/* Cover Image */}
        <div className="relative h-48 rounded-xl overflow-hidden shadow-md mb-16">
          <img
            src={user.coverImage}
            alt="Cover"
            className="h-full w-full object-cover"
          />
          {/* Profile Image */}
          <div className="absolute -bottom-16 left-4">
            <img
              src={user.profileImage}
              alt="Profile"
              className="h-32 w-32 object-cover rounded-full border-4 border-white"
            />
          </div>
        </div>
      
        {/* User Info */}
        <div className="mt-10 mb-6">
          <h1 className="text-3xl font-bold">{user.username}</h1>
          <p className="text-gray-600">{user.bio}</p>
          
          <div className="flex items-center gap-4 text-gray-600 text-sm mt-2">
            <span><strong>{user.follower.length}</strong> Followers</span>
          </div>
        </div>
      
        {/* Posts */}
        <div className="space-y-4">
          {user.post?.map((post, index) => (
            <div key={index} className="bg-white p-5 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600 mt-2">{post.text}</p>
              <div className="flex justify-between text-xs text-gray-400 mt-4">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span>{post.like} Likes</span>
                <span>{post.comment.length} Comments</span>
              </div>
            </div>
          ))}
        </div>
      
        {/* Load More */}
        <div className="flex justify-center mt-8">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-full">
            Load More Posts
          </button>
        </div>
      
      </div>
        
    )
}
export default UserProfile;