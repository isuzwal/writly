import { Send } from "lucide-react";
import { useState } from "react";


type Sender= "me" |"server"

interface message{
    text:string,
    sender:Sender
}
const Message=()=>{
    const [text ,setText]=useState("")
    const [allmessage,setAllmessage]=useState<message []>(
        [{ text: "hello", sender: "server" },
        { text: "hi", sender: "me" }, 
        {text:" i am current learning the webscoket so it may take some time to build  chat section",sender:"me"},    
    ]);
    // 
    function sendMessagehandler(){
       setAllmessage((prevmessage)=> [...prevmessage ,{text,sender:"me"}])   
       setText("");  
    }
    return (
 <section className="h-screen sm:p-2  z-0 p-0">
   <div className="relative h-full p-0">
     <div className="h-[calc(100%-30px)]  overflow-auto scroll-hidden p-4  relative rounded-l-lg rounded-r-lg bg-navabar">
       {allmessage.map((msg,idx)=>(
        <div key={idx} className={`flex   w-full mb-2 ${msg.sender === "me" ? "justify-end" : "justify-start" }`} >
         <span className={`text-white px-3 py-1 rounded-md max-w-[75%] break-words ${msg.sender === "me" ? "bg-blue-600" : "bg-zinc-700"}`}>
                {msg.text}
              </span>
            </div>
       ))}
     </div>
     <div className=" absolute bottom-0 flex items-center   p-0  w-full">
        <input type="text"  value={text}  onChange={(e)=>setText(e.target.value)} placeholder="hi" className="w-full p-2   focus:outline-none   " />
     <button   onClick={sendMessagehandler}
     className="  px-4 py-2  items-center bg-slate-100 hover:bg-slate-400 transition-all ease-out duration-300 "><Send  color="black"/></button>
     </div>
   </div>
</section>
    )
}
export default Message;