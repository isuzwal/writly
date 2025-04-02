import { Link } from "react-router";
// import { TiThMenu } from "react-icons/ti";
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
function Nava(){
    const [IsOpen,setIsOpen]=useState<boolean>(false)
    const [searching,setSearching]=useState<string>("")
    const [darksection,setDarksection]=useState<boolean>(false)
    //  const [selectedOptions,setOptions]=useState<string>("")
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
   
   
    return(
       <section className="py-2 ">
        <div className=" border-b border-b-gray-600 py-1 text-white" >
            <div className=" px-1 flex relative items-center justify-between ">
                <Link to ="/" className="md:text-2xl  text-[16px] font-semibold font-dm  whitespace-nowrap flex-shrink-0 ">Post</Link>
                 <div className="flex items-center relative px-2 md:w-96 ">
                 <input type="search"  value={searching} onChange={(e)=>setSearching(e.target.value)} placeholder="Search.."    
                 className=" rounded-lg px-3 focus:outline-none font-serif bg-profile py-1.5  placeholder:text-[15px] w-full "/>
                 {searching.length === 0  && (
                  <CiSearch  size={22} color="white" className="absolute right-3  "/>
                  )}
                  
              </div>
                 <div className="rounded-sm  hidden md:flex px-1">
                   <div className="bg-profile text-white flex w-full  rounded-md  px-5 py-1.5 gap-2 items-center  cursor-pointer  ">
                  {user? (
                    <div className="flex items-center  gap-2 ">
                      <img src={ProfiledImage} className="object-cover w-8 h-8   rounded-lg"  />    
                      <span className="font-mono  font-medium text-[18px]">{user}</span>
                      </div>
                  ):(
                  <>
                  <Link to="/login" className="text-[16px] font-semibold">Login</Link>
                  <Link to="/register" className="text-[16px] font-semibold">Register</Link>
                  </>
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
                      <div className="md:hidden absolute  shadow-lg right-2  top-9 w-1/2   rounded-lg py-3 transition-all duration-300 ease-in-out">
                        {user?(
                          <div className="bg-profile flex  flex-col rounded-md h-[400px]  gap-2  px-2 cursor-pointer relative  py-1.5">
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
                              <div className="flex text-white w-full  items-center border border-gray-800 font-dm font-semibold text-xl  hover:bg-gray-700 gap-2 px-2 py-1.5 rounded-lg">
                               <span className="font-dm text-[19px]">{Uppercase(user)}</span>
                              </div>
                             <Link to="/profile" className="flex text-white items-center border  border-gray-800 font-dm font-semibold text-xl  hover:bg-gray-700 gap-2 px-2 py-1.5 rounded-lg ">
                             <FaUserCircle  size={28} color="gray"/>Profile</Link>
                             <div className="flex text-white items-center border  border-gray-800 font-dm font-semibold text-xl  hover:bg-gray-700 gap-2 px-2 py-1.5 rounded-lg">
                              <button onClick={themesection}>
                                <h2 className="flex items-center text-[18px] gap-1"><IoIosSettings  size={20}/>Custom</h2>
                                </button>
                              {darksection && (
                                <div className="flex flex-col rounded-md px-2  text-black  transition-all duration-200">
                                   <select className=" px-2 text-white text-[16px] rounded-md cursor-pointer bg-profile border"
                                  value={theme}  onChange={(e) => {
                                     const newTheme=changeTheme(e.target.value as Theme)
                                     console.log("Theme changed to:", newTheme);   }} >
                                    
                                    
                                  {themeoptions.map((option) => (
                                <option key={option} value={option}>
                                  {option.charAt(0).toUpperCase() + option.slice(1)} 
                              </option>
                               ))}
                            </select>
                                </div>
                              )}
                              </div>
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