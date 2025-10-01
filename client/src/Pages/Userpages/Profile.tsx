import {  useContext, useEffect, useState } from "react";
import { UserContext  } from "../../UserAuth/User";

import { PostType } from "../../type/PostType";
import { Heart, MessageSquareMore ,AlertCircle , Pen,Check} from "lucide-react";
import { MdDelete } from "react-icons/md";

const Profile=()=>{
  const [error,setError]=useState<string | null >(null);
  const [IsOpen, setOpen]=useState<boolean>(false);
  const [coverImage ,setCoverImage]=useState<string | null>(null);
  const [profileImage,setProfileImage]=useState<string  | null >(null);
  // for the edit user Info
  const [editedName,setEditedName]=useState<string | null>(null);
  const [editedbio ,setEditedBio]=useState<string | null >(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [profileslected,setProfileSlected]=useState<File | null>(null);

  const context=useContext(UserContext)
  if(!context){
    throw new Error
  }
  const {user,setUser}=context



  
  useEffect(() => {
    if (user) {
      setEditedName(user.username ?? null);
      setEditedBio(user.bio ?? null );
    }
  }, [user]);
    //delete post route
  
    const deletePost=async(postId:string)=>{
      setError(null);
       try{
       const res=await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/post/deletepost/${postId}`,{
         method:"DELETE",
         credentials:"include"
        })
        if(!res.ok){
         const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong, please try again.");
      }
        const UpdatedPost =user?.post?.filter((post)=>post._id !==postId || [])
         const UpdateUser={
          ...user ,post:UpdatedPost
         }
         setUser(UpdateUser)
       }catch(error){
            setError((error as Error).message || 'Something Went Wrong ')
       }
    }
    // hnadleing the Editable moode
    const HandleSaveUserPrfolie=async(e:React.FormEvent)=>{
      e.preventDefault();
      setError(null);
      const formData=new FormData(); // Object
      if(editedName !== user?.username || " "){
        formData.append("username",editedName || " ")
      }
      if(editedbio !== user?.bio || " "){
        formData.append("bio",editedbio || " ")
      } 
     
       if(formData.entries().next().done){
        setIsEditing(false);
        return;
       }
       //api call 
       try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/update-profile/${user?._id}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update profile.");
      }
      const updatedUserData = await res.json();
      setUser(updatedUserData); 
      setIsEditing(false); 
      setOpen(false);
    }catch (err) {
      setError((err as Error).message);
      
    }
  }
  // for coverimage
   const updatecoverImage=async(file:File)=>{
       const formData =new FormData()
        formData.append("coverImage",file)
        // e.preventDefault();
      setError(null);
      try{
       const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cover_image/${user?._id}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
       const data=await res.json()
        if(res.ok){
          return data.link
          }else{
            throw new Error ("Uplaoding Fail Please Try again")
          }
      }catch(err:any){
       setError(err.message || "An unexpected error occurred during upload.");
      }
   }
const handleSaveClick = async (e:React.FormEvent) => {
   e.preventDefault();
    if (selectedFile && user?._id) {
      try {
         const updateImage= await updatecoverImage(selectedFile);
         setUser(updateImage)
      } catch (err:any) {
         setError(err.message || "An unexpected error occurred during upload.");
      }
    } else if (!selectedFile) {
      setError("Please select a file to upload.");
    } else if (!user?._id) {
        setError("User ID is missing. Cannot upload cover image.");
    }
  };

  // for profile Image
 const IsupadatedprofileImage=async(file:File)=>{
    const formData =new FormData() ;
    formData.append("profileImage",file);
    setError(null);
     try{
       const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile_image/${user?._id}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
       const data=await res.json()
        if(res.ok){
          return data.link
          }else{
            throw new Error ("Uplaoding Fail Please Try again")
          }
      }catch(err:any){
       setError(err.message || "An unexpected error occurred during upload.");
      }
 }

 const prfolieImageClick = async (e:React.FormEvent) => {
   e.preventDefault();
    if (profileslected && user?._id) {
      try {
        const prifleImgae= await IsupadatedprofileImage(profileslected);
        setUser(prifleImgae)
      } catch (err:any) {
         setError(err.message || "An unexpected error occurred during upload.");
      }
    } else if (!profileslected) {
      setError("Please select a file to upload.");
    } else if (!user?._id) {
        setError("User ID is missing. Cannot upload cover image.");
    }
  };

  if (error) {
    return (
      <div className="flex bg-maincolor justify-center min-h-screen items-center">
        <h1 className="text-white gap-2 underline flex items-center text-xl sm:text-3xl font-dm">
          <AlertCircle size={28} />
          {error}
        </h1>
      </div>
    );
  }
    return (
      <div className="  bg-navabar rounded-lg shadow-md overflow-y-auto scroll-hidden   text-white">
      <form onSubmit={HandleSaveUserPrfolie} >
      <div className="relative ">
        <div className="relative">
          <button onClick={(e)=>{
            e.preventDefault()
            setOpen(!IsOpen)}} className="absolute right-1 top-1 ">
            <Pen  size={32} className="rounded-full p-2 hover:bg-neutral-500/80  cursor-pointer" />
          </button>
          {IsOpen && (
            <div className=" absolute right-1 top-10 w-44 rounded-md p-2 bg-neutral-300/60">
          <label>
          <input type="file" 
            onChange={(e)=>{
              const file=(e.target as HTMLInputElement).files?.[0];
              if(file){
                setSelectedFile(file);
                setCoverImage(URL.createObjectURL(file)) // for preview
              }
            }}
            className="hidden" />
            <div className="flex flex-col gap-2 ">
            <p className="px-4 py-1 text-center rounded-lg  cursor-pointer text-black border-blue-600 text-[14px] font-medium border-2 ">Change image </p>
            <button onClick={handleSaveClick} className="px-4 py-1 text-center rounded-lg cursor-pointer text-white  bg-green-500 text-[14px] font-medium">Save</button>
            </div>
          </label>
          </div>
          )} 
        <img 
          src={coverImage ||user?.coverImage} 
          alt="Cover" 
          className="w-full h-48 object-cover" 
          />
          </div>
        <div className="absolute  -bottom-16  left-6 flex flex-col items-end  ">
        <div className="relative   flex  ">
        <img 
          src={ profileImage || user?.profileImage  } 
          alt="Profile" 
          className="w-28 h-28 rounded-full border-4 border-white  object-cover" 
          />
        <label>
          <input type="file" className="hidden" 
          onChange={(e)=>{
            const file=(e.target as HTMLInputElement).files?.[0]
            if(file){
              setProfileSlected(file);
              setProfileImage(URL.createObjectURL(file)) // for preview
            }
          }}
          />
          <Pen  size={24}   className=" fill-black cursor-pointer absolute -bottom-1 right-5 " />
        </label>
        </div>
         <button 
         onClick={prfolieImageClick}
         
         className="absolute bottom-1 -right-3 bg-neutral-500 hover:bg-green-400 rounded-full  "><Check size={20} /></button>
        </div>
      </div>
      <div className="pt-16 px-6  pb-4">
        <div className="flex   lg:flex-row  sm:flex-row flex-col items-start  p-1  gap-1 justify-between lg:items-center">
          <div className="flex flex-col">
           {isEditing ? (
            <input type="text" value={editedName || " "} onChange={(e)=>setEditedName(e.target.value)} className="text-xl font-medium p-1 bg-transparent border-[1px] rounded-lg " />
           ):(
            <h2 className="text-xl font-medium">{editedName}</h2>
           )}
           {isEditing ? (
                <textarea
                  value={editedbio || ""}
                  onChange={(e) => setEditedBio(e.target.value)}
                  className="text-gray-300 mt-1 bg-gray-700 p-1 rounded"
                  rows={3}
                />
              ) : (
                <p className="text-gray-300 mt-1">{editedbio}</p>
              )}
          </div>
          <div className="flex  gap-2 items-center">
         {!isEditing ? (
                <button
                  type="button" // 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEditing(true)}}
                  className="px-3 py-1 rounded-[16px] bg-slate-700 hover:bg-slate-500  transition-all  duration-200 ease-in-out">
                  Edit Profile
                </button>
              ) : (
                <>
                  <button type="submit" 
                    className="px-3 rounded-[16px] bg-blue-600 hover:bg-blue-700 transition-all  duration-200 ease-in-out">
                    Save
                  </button>
                  <button type="button" 
                    onClick={(e) => {
                      e.preventDefault();
                      setIsEditing(false);
                      setEditedName(user?.username || null);
                      setEditedBio(user?.bio || null);
                    }}
                    className="px-3 rounded-[16px] bg-red-500 hover:bg-red-700 transition-all duration-200 ease-in-out">
                    Cancel
                  </button>
                </>
              )}
          </div>
        </div>
        <div className="flex gap-4 mt-2 text-gray-300 text-sm">
          <span><strong>{user?.follower?.length}</strong> Followers</span>
          <span><strong>{user?.following.length}</strong> Following</span>
          <span><strong>{user?.post?.length || 0}</strong> Posts</span>
        </div>
      </div>
    </form>  
      {/* Posts */}
      <div>
        <div className="border-t border-gray-700">
         {user?.post && user.post.length > 0 ? (
            user.post.map((post: PostType) => (
            <div key={post._id}    className="  cursor-pointer border-b-[2px] border-b-maincolor  hover:bg-navabar hover:bg-opacity-40   bg-navabar text-white px-2 ">
             <div className="flex  gap-2 justify-between  flex-row items-center font-dm font-semibold">
             <div className="flex gap-2  items-center">
             <img src={user.profileImage}
              className="object-cover rounded-full w-9 h-9" alt="Profile" />
            <div className="mt-2 flex-col flex">
            <h1>
              <span className="font-bold hover:underline">{user?.username}</span>
            </h1>
            <p className="text-[9px] font-bold">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
            </div>
          </div>
          <button 
           onClick={()=>deletePost(post._id)}          
          className="rounded-full p-1 "><MdDelete  className="hover:fill-red-500"/></button>
        </div>
        <div className="p-2">
          <p className="text-gray-300 text-sm mt-1">{post?.text}</p>
          {post?.image && (
            <img
            src={post.image}
            alt="Post"
            className="w-full mt-2 rounded-md max-h-60 object-cover"
            />
          )}
          <div className="flex gap-6 mt-3 text-gray-400 text-sm">
            <span className="flex items-center gap-1">
              <Heart /> {post.likes?.length || 0}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquareMore /> {post.comments?.length}
            </span>
          </div>
        </div>
      </div>
      ))
     ) : (
     <p className="p-4 text-gray-400">Not yet Post</p>
    )}
</div>
   
</div>
</div>
    )
}
export default Profile;