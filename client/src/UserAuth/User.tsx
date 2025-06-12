import  {createContext ,ReactNode,useState} from "react"
import {PostType} from "../type/PostType"

// for he user COotext API
interface UserType {
  _id: string;
  username: string;
  email: string;
  profileImage?: string; 
  coverImage?: string;  
  bio?: string;         
  follower: string[];    
  following: string[];   
  post: PostType[];      
}
interface User{
    user:UserType | null;
    isPoped:boolean;
    setUser:(user:any)=>void
    uppercaseletter:(text:string |null)=>string
    ISPoped:()=>void
}
// for the Children Component
interface ContextProps{
    children:ReactNode
}
const UserContext=createContext<User |undefined >(undefined)
export const UserProvider=({children}:ContextProps)=>{
    const [user,setUser]=useState<UserType | null >(null)
    const [isPoped,setPoped]=useState<boolean>(false)
    const ISPoped=()=>{
        setPoped((prevstated)=>!prevstated)
    }
    const uppercaseletter=(text:string|null)=>{
        if (!text) return "";
        if(text.charAt(0)===text.charAt(0).toUpperCase()){
          return text
        }else{
          return text.charAt(0).toUpperCase() + text.slice(1);
        }
      }
    const value:User={
        user,setUser,uppercaseletter,isPoped,ISPoped
    }
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>

    )
}
export {UserContext}