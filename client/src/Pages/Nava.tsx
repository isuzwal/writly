import { Link } from "react-router";
import { useContext, useState } from "react";
import { UserContext } from "../UserAuth/User";

import { ThemeContex } from "../Theme/Theme";

import { CgMenu } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";
function Nava(){
    const [IsOpen,setIsOpen]=useState<boolean>(false)
  
   
    // checking that User did't return undefine so.

    const { theme, } = useContext(ThemeContex);
 
    const context=useContext(UserContext)
    if(!context){
      throw new Error
    }
    // this for temp will change from backend
    const {user}=context
  
    //->Menubar function
    const ToogleMunebar=()=>{
        setIsOpen(prev=>!prev)
    }
 
    //for the theme section
   
    // for theme
    const themeStyles = {
      // dark: "bg-black text-white  ",
      light: "rgb(254,255,254) text-black   ",
      // system: "bg-gray-800 text-white ", 
    };
    
   
    return(
<section className={` w-full  ${themeStyles[theme as keyof typeof themeStyles]}`}>
            <div className=" px-1 flex relative items-center justify-between ">
                <Link to ="/" className="md:text-xl  text-[16px] font-semibold font-dm  whitespace-nowrap flex-shrink-0 ">Writly</Link>
                 <div className="flex items-center relative px-2 md:w-96 ">
              </div>
                 <div className={`rounded-lg px-6  hidden md:flex   ${themeStyles[theme as keyof typeof themeStyles]}`}>
                   <div className="flex w-full   rounded-md">
                  {user? (
                      <div
                      className="flex gap-2 justify-between ">
                        <div  onClick={ToogleMunebar}
                        className={` flex gap-2 justify-between    px-4 py-1.5 cursor-pointer rounded-lg   ${themeStyles[theme as keyof typeof themeStyles]}`}>
                      <img src={user.profileImage} className="object-cover w-7 h-7   rounded-lg"  />    
                      <span className="font-mono  font-medium text-[18px]">{(user?.username)}</span>
                      </div>
                      </div>
                  ):(
                    <div className="flex items-center   gap-3 px-3 ">
                   <Link to="/login" className=" text-center text-[16px] font-semibold  px-6
                     py-1 rounded-md  hover:bg-slate-100 transition-all duration-200">Login</Link>
                   <Link to="/register"  className=" text-center text-[16px] font-semibold hover:bg-slate-800  bg-black px-6 
                    text-white py-1 rounded-md  transition-all duration-200">Register</Link>
                  </div>
                  )}
                   </div>
                 </div>
                 <div className="items-center md:hidden   p-1 rounded-full " >
                   <button onClick={ToogleMunebar} className="flex items-center">
                     {IsOpen ?(
                       <IoIosClose  className=" transition-transform duration-300  hover:rotate-180 hover:scale-110"  size={24}/>
                      ):(
                      <CgMenu className=" transition-transform duration-300  hover:rotate-180 hover:scale-110" size={23} />
                      )}
             
                    </button>
                 </div>
                 {IsOpen && (
                      <div className={` 
                       ${themeStyles[theme as keyof typeof themeStyles]} md:hidden  absolute  bg-white z-10  top-[30px] w-full right-[1px]  transition-all duration-300 ease-in-out`}>
                        {user?(
                          <div className=" flex  flex-col rounded-md   gap-2  px-2 cursor-pointer relative  py-1.5">
                            <div className="flex  relative flex-col items-center  gap-2   px-2  py-3 rounded-md">
                             <div className=" w-full h-20  rounded">
                             <img src={user.CoverImage} className="object-cover w-full h-full  rounded "  />    
                              </div>
                              <div className=" absolute  z-30 rounded-r-2xl left-2 ">
                              <img src={user.profileImage} className="  rounded-r-2xl object-cover w-20 h-full  "  />  
                              </div>
                            </div>
                            
                         </div>  
                        ):(
                          <div className="flex flex-col  gap-4 px-4 py-2 ">
                            <Link to="/login" className="w-48 text-center text-[16px] font-semibold    hover:bg-slate-200 py-2 rounded-md  transition-all duration-200">Login</Link>
                            <Link to="/register"  className="w-48 text-center text-[16px] font-semibold hover:bg-black hover:text-white py-2 rounded-md  transition-all duration-200">Register</Link>
                         </div>

                        )}
                    </div>
                 )}
                 </div>
           
       </section>
    )
}
export default Nava;