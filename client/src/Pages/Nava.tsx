import { Link } from "react-router";
import { useContext, useState } from "react";
import { UserContext } from "../UserAuth/User";
import { PenTool } from "lucide-react";
import { ThemeContex } from "../Theme/Theme";

import { CgMenu } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";

function Nava() {
  const [IsOpen, setIsOpen] = useState<boolean>(false);
  const { theme } = useContext(ThemeContex);
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error("User context is undefined");
  }

  const { user } = context;

  // Toggle function
  const ToggleMenuBar = () => setIsOpen((prev) => !prev);

  // Theme styles
  const themeStyles = {
    light: "bg-white text-black",
    // Add dark/system themes as needed
  };

  return (
    <section className={` bg-navabar sticky top-0 z-30  w-full ${themeStyles[theme as keyof typeof themeStyles]}`}>
      <div className=" py-1 px-2 flex relative items-center justify-between">
        <Link  to="/"
          className="  text-white hover:bg-gradient-to-t from-slate-100 via-slate-200 to-slate-300 md:text-xl hover:shadow-md   rounded-md py-1 hover:text-writly flex gap-1 text-[16px] font-semibold font-dm px-4 whitespace-nowrap">
          <PenTool size={20} /> Writly
        </Link>

      
        <div className="hidden md:flex  items-center gap-4">
          {user ? (
            <div onClick={ToggleMenuBar}
              className={`cursor-pointer flex items-center gap-2 px-4 py-1.5 rounded-lg ${themeStyles[theme as keyof typeof themeStyles]}`}>
              <img src={user.profileImage} className="object-cover w-7 h-7 rounded-lg" />
            </div>
          ) : (
            <div className="flex items-center gap-3 px-3">
              <Link to="/login" className="text-[16px]  text-white  hover:bg-zinc-600  hover:bg-opacity-30 font-semibold px-6 py-1 rounded-md hover:bg- transition">
                Login
              </Link>
              <Link to="/register" className="text-[16px] font-semibold text-white px-6 py-1 rounded-md hover:bg-zinc-600  hover:bg-opacity-30 transition">
                Register
              </Link>
            </div>
          )}
        </div>
        <div className="md:hidden p-1 rounded-full">
          <button onClick={ToggleMenuBar} className="flex items-center">
            {IsOpen ? (
              <IoIosClose className=" text-white transition-transform duration-300 hover:rotate-180 hover:scale-110" size={24} />
            ) : (
              <CgMenu className=" text-white transition-transform duration-300 hover:rotate-180 hover:scale-110" size={23} />
            )}
          </button>
        </div>

        {IsOpen && (
          <div className={`absolute bg-navabar  text-white top-[40px] right-[1px] h-full p-2 rounded-b-lg transition-all duration-300 ease-in-out ${themeStyles[theme as keyof typeof themeStyles]}`}>
            {user ? (
              <div className="flex flex-col items-center gap-2 px-2 py-3">
                <div className="w-full h-20 rounded">
                  <img src={user.CoverImage} className="object-cover w-full h-full rounded" />
                </div>
                <img src={user.profileImage} className="absolute left-2 w-20 rounded-lg object-cover h-full" />
                <span className="font-mono font-medium text-lg">{user.username}</span>
              </div>
            ) : (
              <div className="flex flex-col gap-4 px-4 py-2">
                <Link to="/login" className="text-[16px] rounded-md  text-white  hover:bg-zinc-600  hover:bg-opacity-30 font-semibold  px-2 py-2">Login</Link>
                <Link to="/register" className=" text-[16px]  rounded-md  text-white  hover:bg-zinc-600  hover:bg-opacity-30 font-semibold  px-2 py-2">Register</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Nava;
