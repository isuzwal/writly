import { create } from "zustand";

interface LikeState{
    liked:Record<string,boolean>
    error:string |null
    likedPost:(postId:string,userId:string)=>Promise<void>
}
// main Part
const LikedStore=create<LikeState>((set)=>({
    liked:{},
    error:null,
   //   api call
     likedPost:async(postId:string,userId:string)=>{
     try{
     const res=await  fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/likes`,{
    method:'POST',
    headers:{
        'Content-Type':'application/json',
    },
    body:JSON.stringify({
      userId:userId,
      postId:postId,
    }),
    credentials: "include",
   })    
   const data=await res.json();
   set((state)=>({
    liked:{...state.liked,[postId]:!state.liked[postId],},
    error:null
}))
 return data;
    }catch(error){
        const message=(error as Error).message||'Someting Went Wrong'
         set({error:message})
        }
     }
}))

// 
export default LikedStore;