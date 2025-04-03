
import { Routes, Route } from "react-router";
import Layout from "./Screen/Layout";
import Login from "./Authpages/Login";
import  Register  from "./Authpages/Register";
import Profile from "./Pages/Profile";
import Blog from "./Pages/Blog";
import Security from "./Pages/Security";
function App() {
  return (
    <Routes>
    <Route path="/" element={<Layout />}>
    <Route index element={<Blog />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path ="/account/profile" element={<Profile />} />
    <Route path ="/account/security" element={<Security />} />
    {/* <Route path ="/account/profile" element={<Profile />} /> */}
    </Route>
    </Routes>
  )
}


export default App
