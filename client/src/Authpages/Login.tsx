import {  useState } from "react";
import { BiLoaderAlt } from 'react-icons/bi';
import { Link } from "react-router";
import { useNavigate } from "react-router";
function Login(){
   const [username,setUserName]=useState<string>("")
   const [password,setPassword]=useState<string>("")
   const [loading,setLoading]=useState<boolean>(false)
   const [error,setError]=useState<string|null>(null)

   const navgation=useNavigate()
   const login=async(event:React.FormEvent)=>{
    event.preventDefault()
        try{
            setLoading(true)
            // alert("Working on it ")
           const response=await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`,{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
            },
            body:JSON.stringify({
              username:username,
              password:password
            }),
            credentials:"include",
            //->checking the response is !ok
          })
           
        
          if(!response.ok){
            throw new Error ("Register failed! Please check your credentain")
           }
           const data=await response.json()
           console.log("User Data is ",data)
           setUserName(username);
           navgation("/blog")
            setPassword("")
            setUserName("")
        }catch(error){
          console.log("Error",error)
          setError((error as Error).message || "Something went wrong. Please try again.");
        }finally{
            setLoading(false)
        }
   }
    return (
        <section className='relative  flex items-center justify-center h-screen   p-4'>
            <form  onSubmit={login}
            className="flex flex-col gap-2  border  rounded-md  px-3 py-12">
                 <h1 className="text-xl font-semibold text-center font-mono">Login</h1>
                <div className="flex flex-row gap-2">
              <label className="font-mono font-medium m-2">UserName
                <input type="text" value={username} onChange={(e)=>setUserName(e.target.value)}
               className="ml-1 border px-3 py-1 rounded-md w-64 placeholder:text-sm" />
              </label>
             </div>
             <div className="flex flex-row gap-2">
              <label className="font-mono font-medium m-2">Password
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} 
                className="ml-1 border px-3 py-1 rounded-md   w-64  placeholder:text-sm "/>
              </label>
             </div>
              <button  type="submit"
               className="bg-black rounded-md font-serif text-white py-1">
                {loading ? (  
              <p className=" flex items-center  justify-center gap-2"> 
                Login
                <BiLoaderAlt className="animate-spin" /></p> 
             ):(
             <p className="flex items-center justify-center"> Login </p>
             )
             }</button>
             <div className='text-center mt-4 text-black'>
              Don't have an account? 
             <Link to='/register' className='font-semibold hover:text-blue-600 underline ml-1'>Register</Link>
              </div>
            <div>
                {error && <p>{error}</p>}
              </div>
            </form>
        </section>
        
    )
}
export default Login;