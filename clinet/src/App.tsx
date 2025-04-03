
import { Routes, Route } from "react-router";
import Layout from "./Screen/Layout";
import Login from "./Authpages/Login";
import  Register  from "./Authpages/Register";
import Profile from "./Pages/Profile";
import Blog from "./Pages/Blog";
function App() {
  return (
    <Routes>
    <Route path="/" element={<Layout />}>
    <Route index element={<Blog />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path ="/profile" element={<Profile />} />
    </Route>
    </Routes>
  )
}


export default App
