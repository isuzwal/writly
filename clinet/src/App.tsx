
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
function App() {
  return (
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route path="/" element={<Layout />}>
    <Route index element={<Blog />} />
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
