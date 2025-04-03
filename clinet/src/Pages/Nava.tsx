import { Link } from "react-router";
import { useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { UserContext } from "../UserAuth/User";
import { FaUserCircle } from "react-icons/fa";
import { useEffect } from "react";
import CoverImage from "../assets/download.jpeg"
import ProfiledImage from "../assets/discord.jpeg"
import { IoIosSettings } from "react-icons/io";
import { ThemeContex } from "../Theme/Theme";
import { themeoptions } from "../Theme/Theme";
import { Theme } from "../Theme/Theme";
import { MdOutlineSecurity } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
function Nava(){
    const [IsOpen,setIsOpen]=useState<boolean>(false)
    const [searching,setSearching]=useState<string>("")
    const [darksection,setDarksection]=useState<boolean>(false)
   
    // checking that User did't return undefine so.

    const { theme, changeTheme } = useContext(ThemeContex);
 
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
    // Convert the First Letter to Uppercase
    function Uppercase(text:string){
      if(text?.charAt(0)===text.charAt(0).toUpperCase()){
        return text;
      }else{
        const upperletter=user?.charAt(0).toUpperCase()+text.slice(1)
        return upperletter;
      }
    }
    //for the theme section
    const themesection=()=>{
      setDarksection(pervstate=>!pervstate)
    }
    // for theme
    const themeStyles = {
      dark: "bg-black text-white  ",
      light: "bg-white text-black   ",
      system: "bg-gray-800 text-white ", 
    };
    
   
    return(
       <section className={` ${themeStyles[theme as keyof typeof themeStyles]}`}>
        <div className=" border-b border-b-gray-600 py-2" >
            <div className=" px-1 flex relative items-center justify-between ">
                <Link to ="/" className="md:text-2xl  text-[16px] font-semibold font-dm  whitespace-nowrap flex-shrink-0 ">Post</Link>
                 <div className="flex items-center relative px-2 md:w-96 ">
                 <input type="search"  value={searching} onChange={(e)=>setSearching(e.target.value)} placeholder="Search.."    
                 className=" rounded-lg px-3 focus:outline-none font-serif bg-profile py-1.5  placeholder:text-[15px] w-full "/>
                 {searching.length === 0  && (
                  <CiSearch  size={22} color="white" className="absolute right-3  "/>
                  )}    
              </div>
                 <div className={`rounded-lg px-6  hidden md:flex shadow-md   ${themeStyles[theme as keyof typeof themeStyles]}`}>
                   <div className="flex w-full    rounded-md">
                  {user? (
                      <div
                      className="flex gap-2 justify-between ">
                        <div  onClick={ToogleMunebar}
                        className={` flex gap-2 justify-between    px-4 py-1.5 cursor-pointer rounded-lg   ${themeStyles[theme as keyof typeof themeStyles]}`}>
                      <img src={ProfiledImage} className="object-cover w-7 h-7   rounded-lg"  />    
                      <span className="font-mono  font-medium text-[18px]">{user}</span>
                        </div>
                      {IsOpen && (
                       <div className={`absolute  w-72 top-[49px]  h-[320px] right-0  shadow-lg rounded-b-lg z-50  ${themeStyles[theme as keyof typeof themeStyles]}`}>
                              <div className="flex flex-col gap-4 p-3">
                              <div className="flex  w-full  items-center border  font-dm font-semibold text-xl  hover:bg-gray-700 gap-2 px-2 py-1.5 rounded-lg">
                               <span className="font-dm text-[19px]">{Uppercase(user)}</span>
                              </div>
                              <Link to="/account/profile" className="flex  items-center border   font-dm font-semibold text-xl  hover:bg-gray-700 gap-2 px-2 py-1.5 rounded-lg ">
                             <FaUserCircle  size={28} color="gray"/>Profile</Link>
                             <div className="flex flex-row justify-between  items-center border  border-slat-800 font-dm font-semibold text-xl  hover:bg-gray-700 gap-2 px-2 py-1.5 rounded-lg">
                              <button onClick={themesection}>
                                <h2 className="flex items-center text-[18px] gap-1"><IoIosSettings  size={20}/>Custom</h2>
                                </button>
                              {darksection && (
                                <div className="flex flex-col rounded-md px-2  transition-all duration-200">
                                   <select className=" px-2 text-[16px] bg-transparent  rounded-md cursor-pointer  border"
                                    value={theme}  onChange={(e) => {
                                    changeTheme(e.target.value as Theme)
                                  }} >
                                  {themeoptions.map((option) => (
                                <option key={option} value={option} className="bg-transparent">
                                  {option.charAt(0).toUpperCase() + option.slice(1)} 
                              </option>
                               ))}
                            </select>
                                </div>
                              )}
                              </div>
                              <Link to="account/security" className="flex  items-center border   font-dm font-semibold text-xl  hover:bg-gray-700 gap-2 px-2 py-1.5 rounded-lg ">
                              <MdOutlineSecurity  size={28} color="gray"/>Security</Link>
                              <Link to="/account/logout" className="flex  items-center border   font-dm font-semibold text-xl  hover:bg-gray-700 gap-2 px-2 py-1.5 rounded-lg ">
                              <IoIosLogOut  size={28} color="red"/>Logout</Link>
                              </div>
                       </div>
                      )}
                      </div>
                  ):(
                    <div className="flex flex-row   items-center    gap-3 px-3 ">
                   <Link to="/login" className=" text-center text-[16px] font-semibold bg-gray-700 px-6
                    text-white py-1 rounded-md hover:bg-gray-900 transition-all duration-200">Login</Link>
                   <Link to="/register"  className=" text-center text-[16px] font-semibold bg-blue-600 px-6 
                    text-white py-1 rounded-md hover:bg-blue-700 transition-all duration-200">Register</Link>
                  </div>
                  )}
                   </div>
                 </div>
                 <div className="items-center md:hidden  p-1 rounded-full " >
                   <button onClick={ToogleMunebar} className="flex items-center">
                     <div className="flex items-center  gap-2 ">
                      <img src={ProfiledImage} className="object-cover w-8 h-8  rounded-lg"  />    
                     
                      </div>
                    </button>
                 </div>
                 {IsOpen && (
                      <div className={`  ${themeStyles[theme as keyof typeof themeStyles]} md:hidden absolute  shadow-lg right-0  top-[49px] w-64  rounded-b-lg py-3 transition-all duration-300 ease-in-out`}>
                        {user?(
                          <div className=" flex  flex-col rounded-md h-[390px]  gap-2  px-2 cursor-pointer relative  py-1.5">
                            <div className="flex  relative flex-col items-center  gap-2   px-2  py-3 rounded-md">
                             <div className=" w-full h-20  rounded">
                             <img src={CoverImage} className="object-cover w-full h-full  rounded "  />    
                              </div>
                              <div className=" absolute  z-30 rounded-r-2xl left-2 ">
                              <img src={ProfiledImage} className="  rounded-r-2xl object-cover w-20 h-full  "  />  
                              </div>
                            </div>
                              {/*Account Part */}
                              <div className="flex flex-col gap-2 ">
                              <div className="flex  w-full  items-center border font-dm font-semibold text-xl  hover:bg-gray-700 gap-2 px-2 py-1.5 rounded-lg">
                               <span className="font-dm text-[19px]">{Uppercase(user)}</span>
                              </div>
                             <Link to="/account/profile" className="flex  items-center border   font-dm font-semibold text-xl  hover:bg-gray-700 gap-2 px-2 py-1.5 rounded-lg ">
                             <FaUserCircle  size={28} color="gray"/>Profile</Link>
                             <div className="flex flex-col  md:flex-row justify-between  border  font-dm font-semibold text-xl  hover:bg-gray-700 gap-2 px-2 py-1.5 rounded-lg">
                              <button onClick={themesection}>
                                <h2 className="flex items-center text-[18px] gap-1"><IoIosSettings  size={20}/>Custom</h2>
                                </button>
                              {darksection && (
                                // <div className="flex  bg-pink-400 flex-col rounded-md px-2   transition-all duration-200">
                                   <select className=" px-2 text-[16px]  w-24 rounded-md cursor-pointer bg-transparent border"
                                    value={theme}  onChange={(e) => {
                                    changeTheme(e.target.value as Theme)
                                  }} >
                                  {themeoptions.map((option) => (
                                <option key={option} value={option}>
                                  {option.charAt(0).toUpperCase() + option.slice(1)} 
                              </option>
                               ))}
                            </select>
                                // {/* </div> */}
                              )}
                              </div>
                              <Link to="/account/security" className="flex  items-center border   font-dm font-semibold text-xl  hover:bg-gray-700 gap-2 px-2 py-1.5 rounded-lg ">
                              <MdOutlineSecurity  size={28} color="gray"/>Security</Link>
                              <Link to="/account/logout" className="flex  items-center border   font-dm font-semibold text-xl  hover:bg-gray-700 gap-2 px-2 py-1.5 rounded-lg ">
                              <IoIosLogOut  size={28} color="red"/>Logout</Link>
                            </div>
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