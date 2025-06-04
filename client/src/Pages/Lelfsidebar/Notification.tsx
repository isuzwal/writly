
import { useEffect,} from 'react';
import { Heart,User,MessageCircleDashedIcon ,CircleAlert ,X} from 'lucide-react';
import type {NotificationType } from '../../type/notification';
import { useParams,Link } from 'react-router';
import  useNotification from  '../../store/store'

const Notification = () => {
  // lsit of the Notification inarray 
  const {userId}=useParams()
  const {notifications,loading,error,fetchNotificationdata,removeNotifaction}=useNotification()
 // getting the nofiaction from backend
  useEffect(()=>{
    if(userId) {
      fetchNotificationdata(userId)
    }
  },[userId])
  // check the notification type  && set it according it to icons
       const getIcons=(type:NotificationType)=>{
        switch(type){
          case 'follow':
             return  {
              icons:<User  className='text-blue-500 fill-blue-500'/>,
              message:"follow  you "
               };
          case 'comment':
            return { icons:<MessageCircleDashedIcon  className="text-blue-500 fill-blue-500"/>, 
              message:"comment on your post" };
          case 'like':
            return {
               icons:<Heart className="text-red-500 fill-red-500" />,
               message:"like your post"
            }
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
      { notifications.length > 0 ?( notifications.map((item, index) => (
     <div key={index} className='p-3   m-2 flex justify-between items-center gap-2  bg-navabar bg-opacity-50 cursor-pointer  rounded-md hover:bg-opacity-95 '>
     <div className='flex  '>
     <div className=' rounded-full w-8 '>
     <img
      src={item?.sender?.profileImage}
      alt='User Profile Image'
        className='w-8 h-8 rounded-full'
        />
        </div>
      <div className='px-1 gap-2 flex-col flex py-1 items-start'>
        <div className='font-dm flex items-start gap-1 text-[16px]'>
         <Link to={`/home/${item.sender?.username}`} className='text-gray-500  -mt-1'>{item.sender?.username}</Link>
         <p className='flex  gap-2 items-center text-[14px] '>{getIcons(item.notificationtype)?.message}<span className=''>{getIcons(item.notificationtype)?.icons}</span> </p>
       </div>
         {item.comment?.text && <p className="text-md text-gray-300 flex ">{item.comment.text}
       </p>}
    </div>
    </div>
       <div  onClick={()=>removeNotifaction(item._id)}className='border-transparent hover:rounded-full hover:bg-neutral-600 p-2  flex items-center '>
      <button  className=''><X /></button>
      </div>
    </div>
  )) ) :(
    <p className=' p-2 '>Not yet notifiaction yet !</p>
  )}
<div className='absolute  top-0 right-0 w-full'>
  { error && <p className=' flex  justify-between p-2  text-white bg-red-600  bg-opacity-50 rounded-md text-basess' role='alert'>
   <p className='flex gap-1 items-center'>
    <CircleAlert />
    {error}
    </p> 
   
    </p>}
</div>

</div>
);
};

export default Notification; 