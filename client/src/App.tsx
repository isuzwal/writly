
import { Routes, Route } from "react-router";
import Layout from "./Screen/Layout";
import Login from "./Authpages/Login";
import  Register  from "./Authpages/Register";
import Profile from "./Pages/Profile";
import Blog from "./Pages/Blog";
import Security from "./Pages/Security";
import Latest from "./Pages/Latest";
import Following from "./Pages/Following";
import Popular from "./Pages/Popluar";
import Home from "./Pages/Home";
import { UserContext } from "./UserAuth/User";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router";
import { useState } from "react";
function App() {
  const context=useContext(UserContext)
  if(!context){
    throw new Error
  }
  const {setUser,user}=context
  const [loading, setLoading] = useState(true);
  console.log("User first place",user)
  useEffect(()=>{
    const checkinguser=async()=>{
try{
  const response=await fetch (`${import.meta.env.VITE_BACKEND_URL}/profile`,{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
    },
     credentials:"include"
  })
  if (response.ok) {
    const data = await response.json();
    context.setUser(data.user); // 
  } else {
    context.setUser(null);
  }
}catch(error){
 console.log("Error",error)
 setUser(null);
}finally{
  setLoading(false);
}
    }
    checkinguser()
  },[])
  if (loading) return <div className="text-center p-10">Loading...</div>; 
  return (
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route path="/" element={<Layout />}>
    <Route index element={user ? <Navigate to ="/blog" />:<Home />} />
    <Route path="blog" element={<Blog />}>
      <Route path="latest" element={<Latest />} />
      <Route path="popular" element={<Popular />} />
      <Route path="following" element={<Following />} />
    </Route>
    <Route path ="/account/profile" element={<Profile />} />
    <Route path ="/account/security" element={<Security />} />
    </Route>
    </Routes>
  )
}


export default App
