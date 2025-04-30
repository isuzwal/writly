import {  PenTool } from 'lucide-react';
import { Routes, Route } from "react-router";
import Layout from "./Screen/Layout";
import Login from "./Authpages/Login";
import Register  from "./Authpages/Register";
import Profile from "./Pages/Profile";
import Blog from "./Pages/Blog";
import Security from "./Pages/Security";
import Latest from "./Pages/Latest";
import Following from "./Pages/Following";
import Popular from "./Pages/Popluar";
import Home from './Pages/Home';
import Post from "./Pages/Post";
import Singelpost from "./Pages/SinglePost";
import UserProfile from "./Pages/Userprofile";
import { UserContext } from "./UserAuth/User";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router";
import { useState } from "react";
function App() {
  const context=useContext(UserContext)
  if(!context){
    throw new Error("User context not found")
  }
  const {setUser,user}=context
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    const checkinguser=async()=>{
try{
  setLoading(true)
  const response=await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/profile`,{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
    },
     credentials:"include"
  })
  if (!response.ok) {
      context.setUser(null);
      return ;
    } 
  const data = await response.json();
  context.setUser(data.userInfo); 
  console.log("APP.tsx",data)
}catch(error){
 console.log("Error",error)
 setUser(null);
}finally{
  setLoading(false);
}
    }
    checkinguser()
  },[])
  if (loading) return <section className="min-h-screen bg-maincolor flex justify-center items-center px-4 py-8">
  <div className="flex items-center justify-center gap-3  px-4 py-3 rounded-2xl w-full max-w-4xl">
    <PenTool color="blue" size={56} className="cursor-pointer sm:size-50" />
    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-semibold text-writly">Writly</h1>
  </div>
</section>; 
  return (
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/" element={<Layout />}>
    <Route index element={user ? <Navigate to ="/home" />:<Home />} />
    <Route path="home" element={<Blog />}>
      <Route path="latest" element={<Latest />} />
      <Route path="popular" element={<Popular />} />
      <Route path="following" element={<Following />} />
      <Route path=":id" element={<Singelpost/>} />
      <Route path="user/:username" element={<UserProfile/>} />
    </Route>
    <Route path="post" element={<Post />} />
    <Route path ="/account/profile" element={<Profile />} />
    <Route path ="/account/security" element={<Security />} />
    </Route>
    </Routes>
  )
}


export default App
