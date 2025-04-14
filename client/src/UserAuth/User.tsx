import  {createContext ,ReactNode,useState} from "react"

// for he user COotext API
interface User{
    user:any;
    setUser:(user:any)=>void
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
    // useEffect(()=>{
    //     const fetchData=async()=>{
    //         try{
    //             const response=await fetch(`${import.meta.env.VITE_BACKEND_URL}/profile`,{
    //                 method:'GET',
    //                 headers:{
    //                     "Content-Type":"application/json"
    //                 },
    //                 credentials: "include", 
    //             });

    //             if (response.ok) {
    //                 const data = await response.json();
    //                 console.log("User data received:", data.user);
    //                 setUser(data);
    //             } else {
    //                 console.log("Failed to fetch user:", response.statusText);
    //                 setUser(null);
    //             }
    //         }catch(error){
    //             console.error("Fetch error:", error);
    //             setUser(null);
    //         }
    //     }
    //      fetchData()
    // },[])
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>

    )
}
export {UserContext}