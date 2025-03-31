import { Link } from "react-router";
import { TiThMenu } from "react-icons/ti";
import { useState } from "react";

function Nava(){
    const [IsOpen,setIsOpen]=useState<boolean>(false)

    //->Menubar function
    const ToogleMunebar=()=>{
        setIsOpen(prev=>!prev)
    }
    return(
       <section className=" border-2">
        <div className="px-6 py-1" >
            <div className=" px-1 flex relative  justify-between ">
                <Link to ="/" className="text-xl font-serif ">Post-Pen</Link>
                 <div className="round hidden md:flex px-4">
                   <div className="flex justify-center gap-5 ">
                    <Link to="/login" className="text-[16px] font-semibold">Login</Link>
                    <Link to="/register" className="text-[16px] font-semibold">Register</Link>
                   </div>
                 </div>
                 <div className="items-center md:hidden" >
                   <button onClick={ToogleMunebar}><TiThMenu size={20}/></button>
                 </div>
                 {IsOpen && (
                      <div className="md:hidden absolute bg-white shadow-lg right-0 top-12 w-40 rounded-lg py-3 transition-all duration-300 ease-in-out">
                         <div className="flex flex-col h-full items-center  mt-3  gap-3 px-3 ">
                            <Link to="/login" className="w-full text-center text-[16px] font-semibold bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition-all duration-200">Login</Link>
                            <Link to="/register"  className="w-full text-center text-[16px] font-semibold bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all duration-200">Register</Link>
                         </div>
                    </div>
                 )}
                 </div>
            </div>
       </section>
    )
}
export default Nava;