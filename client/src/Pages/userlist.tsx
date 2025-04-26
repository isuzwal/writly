import { useEffect,useState } from "react";
import { userlist } from "./userlistType";
import { Link } from "react-router";

const Userlist=()=>{
const [userlist,setUserlist]=useState<userlist[] >([])
    useEffect(()=>{
        const userFetch=async()=>{
            try{
           const response=await  fetch(`${import.meta.env.VITE_BACKEND_URL}/user`,{
            credentials:"include"
           })
           const data=await response.json()
           setUserlist(data.user)
            }catch(e){
                console.log("Something wrog  user lsit",e)
            }
        }
        userFetch()
    },[])
    return(
        <div className="px-4 w-full border rounded-xl bg-white shadow-sm">
        <div className="py-3 mt-2">
          <span className="font-bold text-xl">Who to follow</span>
        </div>
        {userlist.map((user, index) => (
          <Link key={index} to={`/blog/user/${user._id}`} className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition" >
            <img src={user.profileImage} alt="profile"  className="object-cover rounded-full h-12 w-12"/>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{user.username}</span>
              <span className="text-xs text-gray-500">Followers {user.follower.length}</span>
            </div>
            <button
              type="button"
              className="ml-auto px-4 py-1 text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 transition">
              Follow
            </button>
          </Link>
        ))}
      </div>
      
    )
}
export default Userlist;