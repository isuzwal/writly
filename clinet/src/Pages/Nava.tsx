import { Link } from "react-router";
import { TiThMenu } from "react-icons/ti";
import { useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { UserContext } from "../UserAuth/User";
import { FaUserCircle } from "react-icons/fa";
import { useEffect } from "react";
function Nava(){
    const [IsOpen,setIsOpen]=useState<boolean>(false)
    const [searching,setSearching]=useState<string>("")

    // checking that User did't return undefine so.
    const context=useContext(UserContext)
    if(!context){
      throw new Error
    }
    // this for temp will change from backend
    const {user,setUser}=context
    useEffect(()=>{
      const  Storeuser=localStorage.getItem("username")
      if(Storeuser){
         setUser(Storeuser)
      }
    },[setUser])
    //->Menubar function
    const ToogleMunebar=()=>{
        setIsOpen(prev=>!prev)
    }
    return(
       <section className=" border-2">
        <div className="px-3" >
            <div className=" px-1 flex relative items-center justify-between ">
              <div className="flex items-center  px-3 py-1 gap-4 ">
                <Link to ="/" className="md:text-2xl  text-[16px] font-semibold font-serif  whitespace-nowrap flex-shrink-0 ">Post-Pen</Link>
                 <div className="flex items-center relative px-2 md:w-64 ">
                 <input type="search"  value={searching} onChange={(e)=>setSearching(e.target.value)} placeholder="Search.."   
                 className="border rounded-lg px-3 py-1 focus:outline-none font-serif bg-gray-200 placeholder:text-[15px] w-full "/>
                 {searching.length === 0  && (
                  <CiSearch  size={22} color="black" className="absolute right-3  "/>
                  )}
                  </div>
              </div>
                 <div className="round hidden md:flex px-3">
                   <div className="flex  items-center justify-center gap-5 ">
                  {user? (
                     <div className="border-2 flex rounded-md  gap-2 items-center px-4 cursor-pointer  py-1.5">
                       <FaUserCircle size={20}/>
                       <span className="font-mono text-sm">{user}</span>
                     </div>
                  ):(
                  <>
                  <Link to="/login" className="text-[16px] font-semibold">Login</Link>
                  <Link to="/register" className="text-[16px] font-semibold">Register</Link>
                  </>
                  )}
                   </div>
                 </div>
                 <div className="items-center md:hidden" >
                   <button onClick={ToogleMunebar}><TiThMenu size={20}/></button>
                 </div>
                 {IsOpen && (
                      <div className="md:hidden absolute bg-white shadow-lg right-0 top-12 w-40 rounded-lg py-3 transition-all duration-300 ease-in-out">
                        {user?(
                           <div className="border-2 flex rounded-md  gap-2 items-center px-4 cursor-pointer  py-1.5">
                           <FaUserCircle size={20}/>
                           <span className="font-mono text-sm">{user}</span>
                         </div>  
                        ):(
                         <div className="flex flex-col h-full items-center  mt-3  gap-3 px-3 ">
                            <Link to="/login" className="w-full text-center text-[16px] font-semibold bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition-all duration-200">Login</Link>
                            <Link to="/register"  className="w-full text-center text-[16px] font-semibold bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all duration-200">Register</Link>
                         </div>

                        )}
                    </div>
                 )}
                 </div>
            </div>
       </section>
    )
}
export default Nava;