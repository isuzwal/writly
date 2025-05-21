import { useEffect,useState } from "react";
import { userlist } from "../../type/userlistType";
import { Link } from "react-router";

const Userlist=()=>{
const [userlist,setUserlist]=useState<userlist[] >([])
    useEffect(()=>{
        const userFetch=async()=>{
            try{
           const response=await  fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user`,{
            credentials:"include"
           })
           const data=await response.json()
             console.log(data.user[0].username)
           setUserlist(data.user)
            }catch(e){
                console.log("Something wrog  user lsit",e)
            }
        }
        userFetch()
    },[])
    return(
        <div className="bg-navabar  bg-opacity-40  ml-4  w-full text-white rounded-xl  shadow-sm">
        <div className="py-3 mt-2">
          <span className="font-bold text-xl">Who to follow</span>
        </div>
        {userlist.map((user, index) => (
          <Link key={index} to={`/home/${user?.username}`} className="flex items-center gap-3 p-3 hover:bg-neutral-700 rounded-lg transition" >
            <img src={user?.profileImage} alt="profile"  className="object-cover rounded-full h-12 w-12"/>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{user?.username}</span>
              <span className="text-xs ">Followers {user.follower?.length}</span>
            </div>
            <button
              type="button"
              className="ml-auto px-4 py-1 text-sm font-medium bg-black rounded-full hover:bg-gray-800 transition">
              Follow
            </button>
          </Link>
        ))}
      </div>
      
    )
}
export default Userlist;