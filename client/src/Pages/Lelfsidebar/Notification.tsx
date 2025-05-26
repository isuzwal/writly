// import { UserPlus, Heart, MessageSquarePlus,X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Heart,User,MessageCircleDashedIcon ,CircleAlert ,X} from 'lucide-react';
import  type   {NotificationType ,Notification } from '../../type/notifiaction';
import { useParams,Link } from 'react-router';
const Notification = () => {
  // lsit of the Notification inarray 
  const {userId}=useParams()
  const [notifiaction,setNotification]=useState<Notification[] >([]);
  const [error,setError]=useState<string | null>(null)
  const [loading, setLoading] = useState(false);
 // getting the nofiaction from backend
useEffect(()=>{
  const fetchPosts = async () => {
        try {
          setLoading(true)
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/notification/${userId}`, {
            credentials: "include",
          });
          const data = await res.json();
          setNotification(data.notification); 
        } catch (error:any) {
          // set the better error handling here 
          const msg=
          error.response?.data?.message || "Something Went Wrong ! Try Again"
          setError(msg)
        }finally{
          setLoading(false)
        }
      };
      fetchPosts()
    },[])
  // check the notification type  && set it according it to icons
       const getIcons=(type:NotificationType)=>{
        switch(type){
          case 'follow':
            return <User />;
          case 'comment':
            return <MessageCircleDashedIcon  className="text-blue-500 fill-blue-500"/>;
          case 'like':
            return <Heart className="text-red-500 fill-red-500" />
            default :
            return null; 
        }
       }
  if(loading){
    return <div className='text-white font-dm '>
      <p>It can take Some time ! </p>
    </div>
  }
  // Function to render notification icon based on type
    return (
    <div className="relative min-h-screen text-white">
      {notifiaction.map((item, index) => (
     <div key={index} className=' p-1 cursor-pointer hover:bg-navabar rounded-md hover:bg-opacity-95 '>
     <div className=' rounded-full w-8'>
     <img
     src={item?.sender?.profileImage}
     alt='User Profile Image'
        className='w-8 h-8 rounded-full'
        />
        </div>
        <div className='px-1 py-1'>
        <div className='font-dm flex items-center gap-1 text-[16px]'>
      <Link to={`/home/${item.sender.username}`} className='text-gray-500 -mt-1'>{item.sender.username}</Link>
      <p className='flex gap-5 items-center text-[14px]  '>{item.notificationtype} on your post  <span>{getIcons(item.notificationtype)}</span> </p>
      </div>
      {item.comment?.text && <p className="text-md text-gray-300 flex ">{item.comment.text}
      </p>}
    </div>
    <div className='h-[1px]  bg-slate-100'></div>
    </div>
  ))}
<div className='absolute  top-0 right-0 w-full'>
  { error && <p className=' flex  justify-between p-2  text-white bg-red-600  bg-opacity-50 rounded-md text-basess' role='alert'>
   <p className='flex gap-1 items-center'>
    <CircleAlert />
    {error}
    </p> 
    <button  onClick={()=>setError(null)}
      className='cursor-pointer hover:bg-slate-200 rounded-full   hover:bg-opacity-40'
      >
    <X/>  
    </button> 
    </p>}
</div>

</div>
);
};

export default Notification; 