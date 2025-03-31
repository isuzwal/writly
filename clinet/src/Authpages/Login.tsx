import { useState } from "react";
import { BiLoaderAlt } from 'react-icons/bi';
import { Link } from "react-router";
function Login(){
   const [userName,setUserName]=useState<string>("")
   const [password,setPassword]=useState<string>("")
   const [loading,setLoading]=useState<boolean>(false)
   const [error,setError]=useState<boolean>(false)
    return (
        <section className='relative min-h-screen flex items-center justify-center p-4'>
            <form className="flex flex-col gap-2  border shadow-md  rounded-md  px-3 py-12">
                 <h1 className="text-xl font-semibold text-center font-mono">Login</h1>
                <div className="flex flex-row gap-2">
              <label className="font-mono font-medium m-2">UserName
                <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)}
               className="ml-1 border px-3 py-1 rounded-md w-64 placeholder:text-sm" />
              </label>
             </div>
             <div className="flex flex-row gap-2">
              <label className="font-mono font-medium m-2">Password
                <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} 
                className="ml-1 border px-3 py-1 rounded-md   w-64  placeholder:text-sm "/>
              </label>
             </div>
              <button className="bg-black rounded-md font-serif text-white py-1">
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
            </form>
        </section>
        
    )
}
export default Login;