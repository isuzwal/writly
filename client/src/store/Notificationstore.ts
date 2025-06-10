import { create } from 'zustand';
import { JSX } from 'react';

export type NotificationType = 'follow' | 'comment' | 'like'

 export interface Notification {
  _id: string;
  sender: {
    _id: string;
    username: string;
    profileImage?: string;
  };
  receiver: string;
  post?: string;
  comment?: {
    _id: string;
    text: string;
  };
  notificationtype: NotificationType;
  notificationtime: string;
}

 /// for UI fo the Notifaction 
 export interface UI_Notification extends Notification {
    icons:JSX.Element,
    messsage:string
}
 /// arrray of the Notification 
interface NotificationSate{
    notifications:UI_Notification[]
    loading?:boolean
    error:string | null
    fetchNotificationdata:(userId:string)=>Promise<void>
    removeNotifaction:(removeId:string)=>Promise<void>
}
// main Part 
    const useNotification=create<NotificationSate>((set)=>({
    notifications:[],
    loading:false,
    error:null,
 // Fetch  the data from the DB
   fetchNotificationdata:async (userId:string)=>{
    set({loading:true,error:null});
    try{
      const response= await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/notification/${userId}`, {
            credentials: "include",
          });
          if(!response.ok){
            throw new Error ("Fail to Fetch data")
          }
          const json=await response.json()
         const res = json.notification;
          set({notifications:res,loading:false})
    }catch(error){
      set({ error:"Something Wrong", loading: false });
    }
   },
   // remove nofication from the Array of the Notification 
   removeNotifaction:async(removeId:string)=>{
    try{
     const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/removenotification/${removeId}`,{
          method:"DELETE",
          credentials:"include"
        })
         if(!res.ok){
         throw new Error('Failed to Delete notification');
         }
          set((dateState)=>({
            notifications:dateState.notifications.filter((currenntnotification)=>currenntnotification._id !==removeId)
          }))
     }catch(error){
      set({error:"Something Wrong",loading:false})
     }
   }

})) 

export default useNotification;