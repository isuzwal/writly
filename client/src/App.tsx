import {  PenTool } from 'lucide-react';
import { Routes, Route } from "react-router";
import Layout from "./Screen/Layout";
import Login from "./Authpages/Login";
import Register  from "./Authpages/Register";
import Setting from './Pages/Usercare/Seeting';
import Logout from './Pages/Usercare/Logout';
import Help from './Pages/Usercare/Help';
import Feedback from './Pages/Usercare/Feedback';
import Blog from "./Pages/Blog";
import Latest from "./Pages/Latest";
import Following from "./Pages/Following";
import Popular from "./Pages/Popluar";
import Home from './Pages/Home';
import Post from "./Pages/Post";
import UserPost from './Pages/UserPost';
import Notification from './Pages/Notification';
import Singelpost from "./Pages/SinglePost";
import UserProfile from "./Pages/Userprofile";
import Story from './Pages/Story';
import Bookmark from './Pages/Bookmark';
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

}catch(error){
 console.log("Error",error)
 console.log("From the user APP,tsx",error)
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
    <Route index element={user?.username ?<Navigate to ="/home" />:<Home />} />
    <Route path="home" element={<Blog />}>
      <Route path="latest" element={<Latest />} />
      <Route path="popular" element={<Popular />} />
      <Route path="following" element={<Following />} />
      <Route path=":id" element={<Singelpost/>} />
      <Route path="notification" element={<Notification />} />
      <Route path="story" element={<Story />} />
      <Route path="post" element={<UserPost />} />
      <Route path="bookmark" element={<Bookmark />} />
      <Route path=":username" element={<UserProfile/>} />
      <Route path="setting" element={<Setting />} />
      <Route path="help" element={<Help />} />
      <Route path="feedback" element={<Feedback />} />
      <Route path="logout" element={<Logout />} />
    </Route>
    <Route path="post" element={<Post />} />
    </Route>
    </Routes>
  )
}


export default App
