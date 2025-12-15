import { useContext, useEffect, useState } from "react";
import { BiLoaderAlt } from 'react-icons/bi';
import { Link } from "react-router";
import { UserContext } from "../UserAuth/User"

import { Eye ,EyeClosed,CircleAlert,CheckCircle, PenTool} from 'lucide-react';

function Register(){
    const [username,setUserName]=useState<string>("")
    const [email,setEmail]=useState<string>("")
    const [password,setPassword]=useState<string>("")
    const [loading,setLoading]=useState<boolean>(false)
    const [error,setError]=useState<string |null>(null)
    const [Isshow,setIsShow]=useState<boolean>(false)
    const [success, setSuccess]=useState<string|null>(null);
    // checking the context is define or not .
    const context=useContext(UserContext)
    if(!context){
      throw new Error
    }
    useEffect(()=>{
   if(success || error){
    const Remove=setTimeout(()=>{
     setError(null)
     setSuccess(null)
    },3000)
    return ()=>clearTimeout(Remove)
   }
    },[success,error])

  
    const {setUser}=context
// for register 
    const register=async(event:React.FormEvent)=>{
       event.preventDefault()
        try{
            setLoading(true)
            setUser(username)
            // Save the useDetalis for Temp
            const response=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register`,{
              method:'POST',
              headers:{
                'Content-Type':'application/json',
              },
              body:JSON.stringify({
                   username:username,
                   email:email,
                   password:password
              }),
             
            })
       
            //->checking the response is !ok
             if(!response.ok){
              const data=await response.json()
              throw new Error ( data.message  ||"Register failed! Please check your credentain")
             }
             const data=await response.json()
             setSuccess(data.message);
        }catch(error){
            setError((error as Error).message || "Something went wrong. Please try again.");
        }finally{
            setLoading(false)
        }
   }
   // for the eyes 
   const showEyes=()=>{
    setIsShow((prevstate)=>!prevstate)
   }
   
    return (
      <section className="flex items-center justify-center min-h-screen px-4 py-8 bg-gray-50">
      <form onSubmit={register} className="w-full max-w-md bg-white shadow-md rounded-xl p-6 sm:p-10 flex flex-col gap-4">
        <h1 className="text-4xl sm:text-5xl  justify-center md:justify-start font-semibold font-serif text-writly text-center sm:text-left flex items-center gap-2">
          <PenTool size={40} />
          Writly
        </h1>
    
        <div className="flex flex-col text-start">
          <label className="font-mono font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your username"
            className="border px-3 py-2 rounded-md w-full placeholder:text-sm" />
        </div>
    
        <div className="flex flex-col">
          <label className="font-mono font-medium">Email</label>
          <input type="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            className="border px-3 py-2 rounded-md w-full placeholder:text-sm" />
        </div>
    
        <div className="flex flex-col gap-2">
          <label className="font-mono font-medium">Password</label>
          <div className="relative">
            <input
              type={Isshow ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border px-3 py-2 rounded-md w-full placeholder:text-sm"
            />
            <div onClick={showEyes} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
              {Isshow ? <Eye /> : <EyeClosed />}
            </div>
          </div>
        </div>
    
       
        <button type="submit" className="bg-black text-white font-serif py-2 rounded-md text-center w-full">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              Creating Account
              <BiLoaderAlt className="animate-spin" />
            </span>
          ) : (
            "Register"
          )}
        </button>
        <div className="text-center text-sm mt-2">
          Already have an account?
          <Link to="/login" className="ml-1 underline font-semibold hover:text-blue-600">
            Login
          </Link>
        </div>
      </form>
      {success && (
        <div className="fixed bottom-4 right-4 bg-green-100 border border-green-500 text-green-700 px-4 py-2 rounded-xl shadow-md">
          <span className="flex items-center gap-2">
            <CheckCircle />
            <p>{success}</p>
          </span>
        </div>
      )}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white border px-4 py-2 rounded-xl shadow-md">
          <span className="flex items-center gap-2">
            <CircleAlert />
            <p>{error}</p>
          </span>
        </div>
      )}
    </section>
    
    )
}
export default Register;
