import { PenTool } from "lucide-react";
const Notification=()=>{
    return (
        <section className="  flex justify-center    px-2  py-1  ">
          <div className="flex items-center justify-center gap-3  px-4 py-3 rounded-2xl w-full max-w-4xl">
          <PenTool color="blue" size={56} className="cursor-pointer sm:size-50" />
         <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-semibold text-writly">Writly</h1>
           </div>
        </section>
    )
}
export default Notification;