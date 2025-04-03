import { useState } from "react";
import DiscordImg from "../assets/discord.jpeg"
import coverImage from "../assets/download.jpeg"

const Profile=()=>{
    const [ProfileImage,setProfileImage]=useState<string>("")
    const [CoverImage,setCoverImage]=useState<string>("")
    const [Newusername,setUserName]=useState<string>("")
    const [Bio,setBio]=useState<string>("")
    // const [githubLink,setGitHubLink]=useState<string>("")
    // const [twitterLink,settwitterLink]=useState<string>("")
    // const [websiteLink,setwebsiteLink]=useState<string>("")
    console.log(()=>{
        setProfileImage(ProfileImage)
        setCoverImage(CoverImage)
    }
    )
    return (
        <section className="py-8 text-center border-2 ">
         <div className="items-center flex  justify-center ">
            <div className="  w-[710px]  md:w-[900px]  ">
                <h1 className="text-3xl  p-1  text-start px-8 font-semibold font-dm">Profile</h1>
                 <div className="border-b-2  border-gray-950"></div>
                 <div className="p-2  ">
                    <h2 className="text-start font-bold text-md">Profile Picture</h2>
                    <p  className="text-start">Upload a picture to make your profile stand out 
                        and let people recognize your comments and contributions easily!</p>
                 </div>
                 <div className="relative rounded-xl px-2  h-32 ">
                 <div className="relative w-full h-28 sm:h-36 md:h-44 lg:h-52 ">
                     <input type="file"  id="coverImageInput" className="hidden" accept="image/*" />
                     <img src={CoverImage || coverImage}  className="object-cover w-full h-20 sm:h-32  md:h-32 rounded-r-2xl"/>
                     <label htmlFor="coverImageInput" 
                       className="absolute inset-0  bg-opacity-50 opacity-0 group-hover/cover:opacity-100 flex items-center justify-center text-black cursor-pointer bg-gray-700 transition-opacity duration-300">
                       <span>Change Cover</span>
                      </label>
                    </div>
                    <div className="absolute left-0 md:left-0 -top-[25.7px] sm:-top-[42.5px] transform translate-y-1/3">
                    <div className="relative w-20 h-20 sm:w-32 sm:h-32  md:w-32 md:h-32 lg:w-32 lg:h-32 rounded-r-xl   overflow-hidden group/profile">
                   <input type="file"  id="profileImageInput"    className="hidden"   accept="image/*" />
                   <img   src={ProfileImage || DiscordImg}  className="object-cover w-full h-full"   alt="Profile" />
                   <label  htmlFor="profileImageInput" 
                    className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover/profile:opacity-100 flex items-center justify-center text-white text-xs cursor-pointer transition-opacity duration-300">
                   <span>Edit</span>
                  </label>
                 </div>
                </div>
            </div>
            <div className="border mt-4  p-2 ">
            <div className=" border px-3 flex flex-col gap-3  text-start  ">
             <h2 className="  font-dm text-xl font-bold">Account Infromation</h2>
               <input type="text" value={Newusername || "Guest"}  onChange={(e)=>setUserName(e.target.value)}
               placeholder="Username"  className="md:w-1/2  sm:w-96  rounded-lg  outline-none font-dm  hover:bg-gray-500  w-full  bg-gray-200 font-medium px-2 py-1"/>
               <h3 className="font-dm font-bold">Bio</h3>
               <textarea rows={3} value={Bio || "Guest"}  onChange={(e)=>setBio(e.target.value)}
               placeholder="Username"  className="md:w-1/2  sm:w-96 w-full  rounded-lg  outline-none font-dm  hover:bg-gray-500  bg-gray-200 font-medium px-2 py-1"/>
               <div className="border-2">
               <h1 className="text-xl  p-1  text-start px-3 font-semibold font-dm">Profile Social Links</h1>
               <p  className="text-start px-3 font-dm font-semibold text-gray-700 text-[16px] ">Add your social media profiles so others 
                can connect with you and you can grow your network!</p>
               </div>
               <div className="boder-2 flex flex-col w-1/2 gap-2">
               
             
                  
                
               
               
              </div>
               </div>
            </div>    
            </div>
        </div>
        
        </section>
    )
}
export default Profile;