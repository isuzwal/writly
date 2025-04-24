import { useContext } from "react";
import { UserContext } from "../UserAuth/User";
import ProfiledImage from "../assets/discord.jpeg"
import { IoIosClose } from "react-icons/io";
const Post=()=>{
    const localDate=new Date().toLocaleDateString();
    const context=useContext(UserContext)
    if(!context){
        throw new Error
      }
      const {user,uppercaseletter,ISPoped}=context
      
    return (
<div className="w-full rounded-lg px-2 py-1 ">
   <div className="flex items-center gap-1 px-1 py-1">
      <div className="flex items-center gap-2 px-1 py-1 rounded-sm w-full">
         <img src={ProfiledImage} className="w-10 h-10 rounded-full object-cover" />
         <div className="flex flex-col items-start">
         <p className="text-sm font-semibold">{uppercaseletter(user?.username)}</p>
         <p className="text-xs text-gray-500">{localDate}</p>
         </div>
      </div> 
      <div className="items-center flex ">
       <button className="hover:bg-slate-200 hover:bg-opacity-60    rounded-lg p-1 " 
        onClick={ISPoped}><IoIosClose size={28}  color="black"/></button>
      </div>
    </div>
    <button  className="mt-2 bg-black text-white font-semibold px-3 py-1 rounded-md">
     Post
  </button>
</div>
    )
}
export default Post;