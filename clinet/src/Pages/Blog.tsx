import { useContext } from "react";
import ProfiledImage from "../assets/discord.jpeg"
import { UserContext } from "../UserAuth/User";
import { SlLike } from "react-icons/sl";
import { AiOutlineDislike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { CiBookmarkPlus } from "react-icons/ci";
const Blog=()=>{
  
  const context=useContext(UserContext)
  if(!context){
    throw new Error
  }
  const {user}=context

  const uppercaseletter=(text:string|null)=>{
    if (!text) return "";
    if(text?.charAt(0)===text?.charAt(0).toUpperCase()){
      return text
    }else{
   const upperletter=user?.charAt(0).toUpperCase()+text.slice(1)
     return upperletter
    }
  }
  // const todaydate=new Date()
  // const isoString=new Date().toISOString()
  const localDate=new Date().toLocaleDateString();
    return (
        <section className="min-h-screen ">
        <div className="grid grid-cols-1  sm:grid-cols-3  px-5 py-2  ">
          <div className="  px-5    md:px-7  lg:px-10 py-6 ">
          <div className="hidden md:block   border-2  w-96 items-center bg-slate-200  rounded-md">
            <div className="flex   items-center p-2  justify-between w-36 gap-2 ">
              <img src={ProfiledImage} className="object-cover w-20 h-20 rounded-md" />
               <p className="font-dm font-semibold mt-12">{uppercaseletter(user)}</p>
            </div>
            <div className="flex  flex-col gap-2 px-4  py-3 ">
              <h2 className="flex justify-between bg-slate-100 px-3  font-bold rounded-md py-1 ">Post
                <span className="font-semibold">12</span>
              </h2>
              <h3  className="flex justify-between bg-slate-100 px-3  font-bold rounded-md py-1">Followers
                <span className="font-semibold">2k</span>
              </h3>
              <h3  className="flex justify-between bg-slate-100 px-3  font-bold rounded-md py-1">Folowing
                <span className="font-semibold">1,024</span></h3>
            </div>
          </div>
          </div>
          {/*Post Section*/}
          <div className="px-6 py-2 flex-col border-2 justify-center overflow-y-auto h-[calc(100vh-1rem)] scroll-hidden">
            <div className="flex flex-row gap-3 py-3  ">
              <h1 className="bg-black px-4  flex rounded-md text-white text-[14px] items-center">Latest</h1>
              <h1 className="bg-slate-100 px-4  flex rounded-md  text-[14px] items-center">Popular</h1>
              <h1 className="bg-slate-100 px-4  flex rounded-md  text-[14px] items-center">Follwing</h1>
            </div>
            <div className="flex flex-col gap-2 ">
              <div className="flex flex-row p-1 items-center gap-2">
                <img src={ProfiledImage} className="object-cover rounded-full w-9 h-9" />
                <div className="flex flex-col text-gray-800 font-dm font-semibold">
                  <span className="text-[10px]">{uppercaseletter(user)}</span>
                  <p className="text-[10px]">{localDate}</p>
                </div>
              </div>
              {/**Image section */}
              <div className="flex border-2  rounded-md px-2 w-full">
                <img src={ProfiledImage} className="object-cover rounded-md w-96 h-44 " />
              </div>
              <div className="flex flex-row px-2 rounded-sm  items-center  justify-between">
                <div className="flex flex-row    gap-5 justify-center items-center  text-center">
                <SlLike  size={18}/>
                <AiOutlineDislike size={20} />
                <FaRegComment  size={19}/>
                </div>
                <CiBookmarkPlus  size={20}/>
              </div>
            </div>
            {/**Will be Remove it  */}
            <div className="flex flex-col gap-2 ">
              <div className="flex flex-row p-1 items-center gap-2">
                <img src={ProfiledImage} className="object-cover rounded-full w-9 h-9" />
                <div className="flex flex-col text-gray-800 font-dm font-semibold">
                  <span className="text-[10px]">{uppercaseletter(user)}</span>
                  <p className="text-[10px]">{localDate}</p>
                </div>
              </div>
              {/**Image section */}
              <div className="flex border-2  rounded-md px-2 w-full">
                <img src={ProfiledImage} className="object-cover rounded-md w-96 h-44 " />
              </div>
              <div className="flex flex-row px-2 rounded-sm  items-center  justify-between">
                <div className="flex flex-row    gap-5 justify-center items-center  text-center">
                <SlLike  size={18}/>
                <AiOutlineDislike size={20} />
                <FaRegComment  size={19}/>
                </div>
                <CiBookmarkPlus  size={20}/>
              </div>
            </div>
             {/**Will be Remove it  */}
             <div className="flex flex-col gap-2 ">
              <div className="flex flex-row p-1 items-center gap-2">
                <img src={ProfiledImage} className="object-cover rounded-full w-9 h-9" />
                <div className="flex flex-col text-gray-800 font-dm font-semibold">
                  <span className="text-[10px]">{uppercaseletter(user)}</span>
                  <p className="text-[10px]">{localDate}</p>
                </div>
              </div>
              {/**Image section */}
              <div className="flex border-2  rounded-md px-2 w-full">
                <img src={ProfiledImage} className="object-cover rounded-md w-96 h-44 " />
              </div>
              <div className="flex flex-row px-2 rounded-sm  items-center  justify-between">
                <div className="flex flex-row    gap-5 justify-center items-center  text-center">
                <SlLike  size={18}/>
                <AiOutlineDislike size={20} />
                <FaRegComment  size={19}/>
                </div>
                <CiBookmarkPlus  size={20}/>
              </div>
            </div>
          </div>
          <div className="bg-blue-500 ">Third</div>
        </div>

      </section>
    )
}
export default Blog;