import { ReactNode } from "react";

interface ContextProps{
    children:ReactNode
}
const Section=({children}:ContextProps)=>{
    return (
        <div>{children}</div>
    )
}
export default Section;