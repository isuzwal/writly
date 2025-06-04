import {  useEffect, useState } from "react";
import { BiLoaderAlt } from 'react-icons/bi';
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { Eye ,EyeClosed,CircleAlert,CheckCircle,PenTool} from 'lucide-react';
function Login(){
   const [username,setUserName]=useState<string>("")
   const [password,setPassword]=useState<string>("")
   const [loading,setLoading]=useState<boolean>(false)
   const [error,setError]=useState<string|null>(null)
   const [Isshow,setIsShow]=useState<boolean>(false)
   const [success, setSuccess]=useState<string|null>(null);
   const navgation=useNavigate()


  useEffect(()=>{
    if(success || error){
       const Remove=setTimeout(()=>{
        setError(null)
        setSuccess(null)
      },3000)
      return ()=> clearTimeout(Remove)
    }
  },[success,error])

   const login=async(event:React.FormEvent)=>{
    event.preventDefault()
        try{
            setLoading(true)
           const response=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`,{
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
           setUserName(data.user);
           setSuccess(data.message);
           setTimeout(()=>{
             navgation("/home")
           },2000)
            setPassword("")
            setUserName("")
        }catch(error){
          setError((error as Error).message || "Something went wrong. Please try again.");
        }finally{
          setLoading(false)
        }
   }
   const showEyes=()=>{
    setIsShow((prevstate)=>!prevstate)
   }
    return (
        <section className='relative min-h-screen flex items-center justify-center    p-4'>
            <form  onSubmit={login}
            className="flex flex-col gap-2 max-w-sm border w-full rounded-md  px-3 py-12">
              <h1 className="  justify-center md:justify-start  text-3xl  sm:text-4xl font-semibold font-serif text-writly flex items-center gap-2">
                 <PenTool size={40} />
                 Writly
               </h1>
                <div className="flex  flex-row  gap-2">
               <label className="font-mono   w-full font-medium  ml-1 mb-1 ">Username
                <input type="text" value={username} onChange={(e)=>setUserName(e.target.value)}
                 className="ml-1 border px-3 py-1 rounded-md  w-full   placeholder:text-sm" />
              </label>
             </div>
             <div className="flex flex-row  gap-2">
              <label className="font-mono w-full   font-medium ml-1 mb-1">Password
             <div className="relative">
                <input type={Isshow ? "text":"password"} value={password} onChange={(e)=>setPassword(e.target.value)} 
                className="ml-1 border px-3 py-1 rounded-md   w-full  placeholder:text-sm "/>
               <div  onClick={showEyes} className="absolute   px-2 right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                {Isshow ? (<Eye />):(<EyeClosed />)}
              </div>
              </div>
              </label>
             </div>
              <button  type="submit"
               className={`bg-black rounded-md font-serif text-white py-1 ${loading ? "disabled:" :""}`}>
                {loading ? (  
              <p className=" flex  hitems-center  justify-center gap-2"> 
                 Loging<BiLoaderAlt  size={23} className="animate-spin" /></p> 
             ):(
             <p className="flex items-center justify-center"> Login </p>
             )
             }</button>
             <div className='text-center mt-4 text-black'>
              Don't have an account? 
             <Link to='/register' className='font-semibold hover:text-blue-600 underline ml-1'>Register</Link>
              </div>
            <div>
              </div>
            </form>
            {success && (
              <div className="absolute bottom-4 right-3 border-2 border-green-500 bg-green-100 text-green-700 px-4 rounded-3xl py-1 shadow-md">
              <span className="flex items-center gap-2">
                <CheckCircle /> 
              <p className="font-semibold">{success}</p>
             </span>
             </div>
             )}
                 {error && (
                   <div className=" absolute bottom-4 right-3   bg-red-600 text-white   border-2 px-4  rounded-3xl py-1">
                   <span className="flex gap-2 "><CircleAlert />
                   {
                     <p className="font-semibold ">{error}
                     </p>
                    }
                    </span>
                  </div>
               
                 )}
        </section>
        
    )
}
export default Login;