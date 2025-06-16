import {create} from  "zustand"
 
interface BookmarkItem{
  _id:string
  image:string,
  text:string,
  likes:string[],
  comments:string[],
  user:{
    username:string,
    profileImage:string,
  }
}
interface UserBookmarks{
    bookmarks:BookmarkItem[]
    isLoading:boolean,
    error:  string |null
    setbookmark:(postId:string,userId:string)=>Promise<void>
    getBookmarks: (username: string) => Promise<void>;
}
const bookmarkState=create<UserBookmarks>((set)=>({
    bookmarks:[],
    error:null,
    isLoading:false,
    setbookmark:async(postId:string,userId:string)=>{
     set({isLoading:true,error:null});
     try{
       const res=await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/user/my-bookmark`,{
         method:"POST",
         headers:{
         'Content-Type':'application/json',
        },
        body:JSON.stringify({
        postId:postId,
        userId:userId
       }),
       credentials:"include"
       })

       if (!res.ok) {
        throw new Error("Failed to save bookmark");
      }
       const data= await res.json()
       set({bookmarks:data.bookmarks,isLoading:false})
     }catch(error){
        set({ error:"Something Wrong", });
     }
    },
    // fetching the user bookmarks
    getBookmarks: async (username: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/get-bookmarks/${username}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch bookmarks");
      }

      const data = await res.json();
      set({ bookmarks: data.bookmarks, isLoading: false });
    } catch (error) {
      set({ error: "Failed to load bookmarks", isLoading: false });
    }
  },
}))
export default bookmarkState;