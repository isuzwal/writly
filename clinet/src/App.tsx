
import { Routes, Route } from "react-router";
import Layout from "./Screen/Layout";
import Login from "./Authpages/Login";
import  Register  from "./Authpages/Register";
import Nava from "./Pages/Nava";

function App() {
  return (
    <Routes>
    <Route path="/" element={<Layout />}>
    <Route index element={<Nava />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    </Route>
    </Routes>
  )
}


export default App
