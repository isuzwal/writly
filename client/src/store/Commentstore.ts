import {create} from "zustand"

// 
interface  CommentState{
    sender:{
    username:string;
    profileImage:string;
    _id: string;    
    };
    text:string;
    error:string|null;
    postcomment:(postId:string,userId:string,text:string)=>Promise<void>,
}

// Main Part
const  CommentStore=create<CommentState >((set)=>({
  sender:{
    username:"",
    profileImage:"",
    _id:""
  },
  text:"",
  error:null,
 // Api call
 postcomment:async(postId:string,userId:string,text:string)=>{
try{
    const res=await  fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/comment`,{
          method:"POST",
          headers:{
              'Content-Type':'application/json',
          },
        body:JSON.stringify({
            postId,
            text,
            userId
        }),
        credentials:"include"
        })
        if(!res.ok) {
            throw new Error ("Fail to post Comment")
        }
        const data=await res.json();
        set({ error:null,})
        return data
}catch(error){
    set({error:"Failed To Post Comment"})
}
}}
))
//
export default CommentStore;