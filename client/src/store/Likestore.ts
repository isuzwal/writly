import { create } from "zustand";

interface LikeState{
    liked: Record<string, boolean>;
    likeCounts: Record<string, number>;
    error:string |null,
    setInitialLikedStatus: (postId: string, isLiked: boolean,likeCount:number) => void; // for the initalstate of liked 
    likedPost:(postId:string,userId:string)=>Promise<any>
}
// main Part
const LikedStore=create<LikeState>((set,get)=>({
    liked:{},
    likeCounts:{},
    error:null,
    setInitialLikedStatus:(postId:string,isLiked:boolean,likeCount:number)=>{
        set((state)=>({
            liked:{...state.liked,[postId]: isLiked },
            likeCount:{...state.likeCounts,[postId]:likeCount }
        }))
    },
   //   api call
     likedPost:async(postId:string,userId:string)=>{
        const currentState=get().liked[postId];
        const newState=!currentState;
        set((state)=>({
            liked:{
                ...state.liked,[postId]:newState
            },
            error:null,
        }))
     try{
     const res=await  fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/likes`,{
     method:'POST',
     headers:{
        'Content-Type':'application/json',
    },
    body:JSON.stringify({
      postId:postId,
      userId:userId
    }),
    credentials: "include",
   })    
   // server-side errors
   if(!res.ok){
    const errorData=await res.json();
    throw new Error(errorData.message || "Failed to update like state")
   }
   const data=await res.json();
 return data;
    }catch(error){
        const message=(error as Error).message||'Someting Went Wrong'
         set({error:message})
        }
     }
}))

// 
export default LikedStore;