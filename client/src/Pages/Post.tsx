import { useContext, useState ,useEffect, useRef } from "react";
import { UserContext } from "../UserAuth/User";
import { LuImageUp ,} from "react-icons/lu";
import { LoaderCircle,CircleAlert ,CheckCircle ,X , SmilePlus} from 'lucide-react';
import  Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
const Post=()=>{
    const  [text,settext]=useState<string>("");
    const  [loading ,setLoading]=useState<boolean>(false)
    const  [error ,setError]=useState<string|null>(null)
    const  [success,setSuccess]=useState<string|null>(null);
    const  [image ,setImage]=useState<File | null>(null)
    const  [IsshowEmoji ,setShowEmoji]=useState<boolean>(false)
    const textref=useRef<HTMLTextAreaElement>(null)
    const context=useContext(UserContext)
    if(!context){
        throw new Error
      }
      const {user ,ISPoped}=context
      // for the comment section height change on the base of text
      useEffect(()=>{
        if(textref.current){
          textref.current.style.height='auto';
          textref.current.style.height = `${textref.current.scrollHeight}px`;
        }
      },[text])
        /// make that setSucess or SetError remove after 3000 second
      useEffect(()=>{
            if(success || error){
              const timerNotification=setTimeout(()=>{
                setSuccess(null);
                setError(null)
              },3000)
              return ()=>clearTimeout(timerNotification)
            }
          },[success,error])
          
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
                return data.link
              }else{
                throw new Error ("Uplaoding Fail Please Try again")
              }
            }catch(error){
              setError((error as Error ).message|| "Image Upload Process Fail Try again !")
            }
       }
       // for the post the posted
       const posted=async(event:React.FormEvent)=>{
        setLoading(true)
        setSuccess(null);
        event.preventDefault()
        let imageurl=null;
           if (image) {
         imageurl = await uploadimage(image);
       }
         // for both vaidation 
        if (!text && !imageurl) {
        setError("You must provide text or an image.");
        setLoading(false);
        return;
          }
           try{
           const response=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/create`,{
            method:"POST",
            headers:{
           'Content-Type':'application/json',
          },
           credentials:"include",
           body:JSON.stringify({
             text:text,
             image:imageurl
             }),
           })
           console.log("text",text)
           const data=await response.json()
           if(!response.ok){
          setError(data.error || 'Failed to create post.');
           }else{
            settext("");
            setImage(null);
            setSuccess('Post Created!');
            return data
           }
          }catch(error){
           setError((error as Error ).message|| "Something Went Wrong ")
           }finally{
            setLoading(false)
          }
          }
         
          return (
<div className="w-full  relative  rounded-lg px-2 py-1 ">
   <div className="flex items-center flex-col  gap-1 px-1 py-1">
      <div className="flex   flex-row  justify-between  gap-2 px-1 py-1 rounded-sm w-full">
         <div className="flex flex-row items-center gap-1">
          <img src={user?.profileImage} className="w-10 h-10 rounded-full object-cover" />
           <div className="flex text-white  flex-col">
            <p className="text-sm font-semibold">{user?.username}</p>
             <p className="text-sm text-gray-700">{new Date().toLocaleDateString()}</p>
            </div>
             <button
          className="absolute top-2 right-2 text-white hover:text-white text-2xl"
          onClick={ISPoped}>
          &times;
        </button> 
          </div>
        </div>
      </div> 
        {/* Post From Section */}
         <form  onSubmit={posted} className="w-full  px-2  gap-3  py-1 rounded-md">
           <textarea 
           ref={textref}
           value={text} cols={10} onChange={(e)=>settext(e.target.value)}
           placeholder="Write about it " 
           className="w-full resize-none h-8  bg-navabar  text-white bg-transparent  overflow-hidden  p-3 text-base focus:outline-none   placeholder-gray-500" >
           </textarea>
           <div>
            {image && (
              <div className="relative  ">
              <button onClick={()=>setImage(null)} className=" absolute  right-1  hover:bg-neutral-300/80   rounded-full  p-2  bg-opacity-20"><X /></button>
              <img src={URL.createObjectURL(image)} alt="uploaded" className="w-full h-80 object-cover rounded-md " />
              </div>
            )}
          </div>
          <div className="flex gap-2 p-1  mb-2   items-center">
           <label className="  mt-1 w-8 h-8 cursor-pointer   flex justify-center items-center  gap-2 bg-transparent rounded-xl px-1 py-2  text-slate-950 "> 
             <input type="file"  
              onChange={(e)=>{
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                  setImage(file)
                }}}
                className="hidden"  />
            <LuImageUp size={26} color="white" />
            </label> 
               <button onClick={(e)=>{
                e.preventDefault()
                setShowEmoji(!IsshowEmoji)}}
                className="hover:bg-neutral-600 p-1 rounded-full  hover:bg-opacity-45">
                  <SmilePlus className=" text-white" />
               </button>
                </div>
                {IsshowEmoji && <Picker data={data}  onEmojiSelect={(emoji:any)=>settext((prev)=>prev+emoji.native)} /> }
         <div className=" flex items-center p-1">
          <button  type="submit"  disabled={loading} className=" bg-white font-semibold px-3 py-1 rounded-md">
          {loading ? <span className="flex items-center gap-1 ">Posting
            <LoaderCircle className="animate-spin" />
            </span>
            :"Post"}
          </button>
          </div>
      </form> 
      {success && (
         <div className="absolute bottom-4 right-3 text-white bg-green-500/70 px-4 rounded-3xl py-1 shadow-md">
              <span className="flex items-center gap-2">
                 <CheckCircle /> 
            <p className="font-semibold ">{success}</p>
          </span>
        </div>
      )}
      {error && (
          <div className="absolute bottom-4 right-3  text-white  text-[12px] items-center flex    bg-red-600/70    px-4  rounded-3xl py-1">
            <span className="flex  items-center gap-2 "><CircleAlert size={18} />
              { <p className=" gap-3  font-semibold flex items-center justify-between">{error}</p> }
              </span>
            </div> 
          )}
    </div>

    )
}
export default Post;