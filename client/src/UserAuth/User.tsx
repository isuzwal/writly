import  {createContext ,ReactNode,useState} from "react"

// for he user COotext API
interface User{
    user:string|null;
    setUser:(user:string |null)=>void
}
// for the Children Component
interface ContextProps{
    children:ReactNode
}
const UserContext=createContext<User |undefined >(undefined)
export const UserProvider=({children}:ContextProps)=>{
    const [user,setUser]=useState<string|null>(null)
    const value:User={
        user,setUser
    }
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>

    )
}
export {UserContext}