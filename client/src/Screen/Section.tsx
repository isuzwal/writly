import { ReactNode, useContext, useEffect } from "react";
import { ThemeContex } from "../Theme/Theme";

interface ContextProps{
    children:ReactNode
}
const Section=({children}:ContextProps)=>{
    const {theme} =useContext(ThemeContex)
    // get the root class-List
    useEffect(()=>{
  const root=window.document.documentElement;
  root.classList.remove('light','daek')
  // check the  theme  
  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' 
        : 'light';
    root.classList.add(systemTheme);
} else {
    root.classList.add(theme);
}
    },[theme])
    return (
        <div className="flex flex-col min-h-screen ">
        {children}
        </div>
    )
}
export default Section;