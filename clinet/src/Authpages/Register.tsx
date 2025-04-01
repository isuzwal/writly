import { useContext, useState } from "react";
import { BiLoaderAlt } from 'react-icons/bi';
import { Link } from "react-router";
import { UserContext } from "../UserAuth/User"
import { useNavigate } from "react-router";
function Register(){
    const [userName,setUserName]=useState<string>("")
    const [email,setEmail]=useState<string>()
    const [password,setPassword]=useState<string>("")
    const [loading,setLoading]=useState<boolean>(false)
    const [error,setError]=useState<boolean>(false)
    // checking the context is define or not .
    const context=useContext(UserContext)
    if(!context){
      throw new Error
    }
    // nagavation
    const navgation=useNavigate()
    const {setUser}=context
    const register=(event:React.FormEvent)=>{
       event.preventDefault()
        try{
            setLoading(true)
            setUser(userName)
            // Sav the useDetalis for Temp
              localStorage.setItem("username",userName)
              localStorage.setItem("useremail",email||"")
              localStorage.setItem("paswword",password)
            console.log("Password before clearing:", password);
            console.log("UserName before clearing:", userName);
            console.log("Email before clearing:", email);
            navgation("/")
            setEmail("")
            setPassword("")
            setUserName("")
            
            alert("Registration successful!");
        }catch(error){
            console.log("Error",error)
            setError(true)
        }finally{
            setLoading(false)
        }
   }
    return (
        <section className='relative min-h-screen flex items-center justify-center p-4'>
        <form onSubmit={register}
        className="flex flex-col gap-2  border shadow-md  rounded-md  px-3 py-12">
             <h1 className="text-xl font-semibold text-center font-mono">Register</h1>
            <div className="flex flex-row gap-2">
          <label className="font-mono font-medium m-2">UserName
            <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)}
           className="ml-1 border px-3 py-1 rounded-md w-64 placeholder:text-sm" />
          </label>
         </div>
         <div className="flex flex-row gap-5">
          <label className="font-mono font-medium m-2">Email
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
           className="ml-5  border px-3 py-1 rounded-md w-64 placeholder:text-sm" />
          </label>
          </div>
         <div className="flex flex-row gap-2">
          <label className="font-mono font-medium m-2">Password
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} 
            className="ml-1 border px-3 py-1 rounded-md   w-64  placeholder:text-sm "/>
          </label>
         </div>
          <button  type="submit" className="bg-black rounded-md font-serif text-white py-1">
            {loading ? (  
          <p className=" flex items-center  justify-center gap-2"> 
           Creating Account 
            <BiLoaderAlt className="animate-spin" /></p> 
         ):(
         <p className="flex items-center justify-center"> Register </p>
         )
         }</button>
         <div className='text-center mt-4 text-black'>
          Already have an account? 
         <Link to='/login' className='font-semibold hover:text-blue-600 underline ml-1'>Login</Link>
          </div>
        </form>
        <div>
                {error && <p>{error}</p>}
              </div>
    </section>
    )
}
export default Register;
