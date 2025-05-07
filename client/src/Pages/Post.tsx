import { useContext, useState ,useEffect, useRef } from "react";
import { UserContext } from "../UserAuth/User";
import { LuImageUp } from "react-icons/lu";
const Post=()=>{
    const  [text,settext]=useState<string>("");
    const  [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null); 
    const textref=useRef<HTMLTextAreaElement>(null)
    const context=useContext(UserContext)

    if(!context){
        throw new Error
      }
      const {user}=context

      useEffect(()=>{
        if(textref.current){
          textref.current.style.height='auto';
          textref.current.style.height = `${textref.current.scrollHeight}px`;
        }
      },[text])
    
      // uploaded image function
       const uploadimage=async(file:File)=>{
        const formData =new FormData()
        formData.append("image",file)
            try{
              const response=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/upload`,{
                method:"POST",
                credentials:"include",
                body:formData
              })
              const data=await  response.json()
              if(response.ok){
              setUploadedImageUrl(data.link);
              }else{
            console.log("Erorr")
              }
            }catch(e){
            console.log("Error at uploading",e)
            }
       }
       // for the post the posted
       const posted=async(event:React.FormEvent)=>{
        event.preventDefault()
           try{
           const response=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/create`,{
            method:"POST",
          headers:{
           'Content-Type':'application/json',
          },
           credentials:"include",
           body:JSON.stringify({
             text:text,
             image:uploadedImageUrl,
           
             }),
           })
           const data=await response.json()
           if(!response.ok){
            console.log("Error at Post")
           }else{
            console.log("Data",data)
           }
          }catch(e){
            console.log("Got Error",e)

           }
       }
    return (
<div className="w-full   rounded-lg px-2 py-1 ">
   <div className="flex items-center flex-col  gap-1 px-1 py-1">
      <div className="flex   flex-row  justify-between  gap-2 px-1 py-1 rounded-sm w-full">
         <div className="flex flex-row items-center gap-1">
          <img src={user?.profileImage} className="w-10 h-10 rounded-full object-cover" />
           <div className="flex text-white  flex-col">
            <p className="text-sm font-semibold">{user?.username}</p>
             <p className="text-sm text-gray-700">{new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div> 
         <form  onSubmit={posted} className="w-full  px-2  gap-3  py-1 rounded-md">
           <textarea 
           ref={textref}
           value={text} cols={10} onChange={(e)=>settext(e.target.value)}
           placeholder="Write about it " 
           className="w-full resize-none h-8  bg-navabar  text-white bg-transparent  overflow-hidden  p-3 text-base focus:outline-none   placeholder-gray-500" >
           </textarea>
           <div>
            {uploadedImageUrl && (
              <div>
                <img src={uploadedImageUrl} alt="uploaded" className="w-full h-44 object-cover rounded-md " />
              </div>
            )}
          </div>
           <label className=" mt-1 w-8 h-8 cursor-pointer   flex justify-center items-center  gap-2 bg-transparent rounded-xl px-1 py-2  text-slate-950 "> 
             <input type="file"  
              onChange={(e)=>{
              const file = (e.target as HTMLInputElement).files?.[0];
              console.log("Image File",file)
              if (file) {
                uploadimage(file); //-- function passing parm
                console.log("Calling upload with file:", file.name);
              }}}
              className="hidden"  />
            <LuImageUp size={26} color="white" />
            </label> 
        <button type="submit"  className="mt-2 bg-white font-semibold px-3 py-1 rounded-md">
         Post
        </button>
      </form> 
    </div>

    )
}
export default Post;