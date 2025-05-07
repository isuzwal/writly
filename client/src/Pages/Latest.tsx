import { useContext } from "react";
import { SlLike } from "react-icons/sl";
import { AiOutlineDislike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { CiBookmarkPlus } from "react-icons/ci";
import { UserContext } from "../UserAuth/User";
const Latest=()=>{
      
  const context=useContext(UserContext)
  if(!context){
    throw new Error
  }
  const {user}=context
    const uppercaseletter=(text:string|null)=>{
        if (!text) return "";
        if(text.charAt(0)===text.charAt(0).toUpperCase()){
          return text
        }else{
          return text.charAt(0).toUpperCase() + text.slice(1);
       
        }
      }
      const localDate=new Date().toLocaleDateString();
    
    return(

        <section className=" items-center text-white bg-maincolor">
            <div className="flex flex-col   px-2  bg-navabar  m-3 gap-2 shadow-sm rounded-md ">
              <div className="flex flex-row justify-between p-1 items-center gap-2">
                <div className="flex flex-row items-center font-dm font-semibold">
                 <img src={user?.profileImage} className="object-cover rounded-full w-9 h-9" />
                   <div className="mt-4  flex-col flex  ">
                   <span className="text-[12px] ml-1 font-extrabold">{uppercaseletter(user?.username)}</span>
                   <p className="text-[9px] font-bold">{localDate}</p>
                   </div>
                </div>
                <div className="p-2">
                    <button className="bg-black md:px-4 md:py-1.5 px-3 py-1 flex font-dm font-semibold rounded-md text-white text-[14px] items-center">Follow</button>
                </div>
              </div>
              <div className="px-2 ">
                <p className="text-[15px] text-start font-dm ">
                  Just publicshed my lastest article on React hooks and State management</p>
               </div>
              {/**Image section */}
              <div className=" w-full h-56 rounded-md overflow-hidden">
                <img src={user?.profileImage} className="object-cover rounded-md w-full h-full " />
              </div>
              <div className="flex flex-row px-2 rounded-sm    items-center gap-2   justify-between">
                <div className="flex flex-row  py-1  gap-3 justify-center items-center  text-center">
                <span className="flex gap-1 text-sm items-center cursor-pointer">
                <SlLike  size={18}/>
                  <h3 className="font-semibold mt-1 ">5k</h3>
                </span>
                <span className="flex gap-1 text-sm items-center cursor-pointer">
                <AiOutlineDislike size={19} className="mt-1"  />
                <h3 className="font-semibold mt-1 ">80</h3>
                </span>
                <span className="flex items-center text-sm gap-1 cursor-pointer">
                <FaRegComment  size={19}/>
                 <h3 className="font-semibold ">150</h3>
                </span>
                </div>
                <span className="flex text-sm cursor-pointer ">
                <CiBookmarkPlus  size={20}/>
                </span>
              </div>
            </div>
            
            
        </section>
    )
}
export default Latest;