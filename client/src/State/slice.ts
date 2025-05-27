// import { createSlice, PayloadAction ,createAsyncThunk} from '@reduxjs/toolkit'
// import type { RootState } from './Store'

// // type of nofitication  
// export type NotificationType = 'follow' | 'comment' | 'like';

//  // what sender  contain 
// export interface Senderuser{
//      _id?:string
//      username?:string
//      profileImage?:string
//      text?:string
// }

// export interface Notifiaction{
//     id: string      
//     sender:Senderuser
//     notification:NotificationType
//     message?:string
//     isRead?:boolean
// }
//  /* inital state of the notifaction while be emppty array 
//     bcz  at the first it will be empty after action happend
//     then add it to 
//  */
// export interface NotifiactionState{
//     nofitications:Notifiaction[],//->awalys empty at first
//     loading:boolean,
//     error:string | null  
// }
// // initalstate
// const initialState:NotifiactionState={
//     nofitications:[],
//     loading:false,
//     error:null

// }
// // api call from the backend 
// export const fetchNotifications = createAsyncThunk(
//   'notification/fetchNotifications',
//   async () => {
//     const res = await fetch('/api/notifications') // ← Your API endpoint
//     if (!res.ok) {
//       throw new Error('Failed to fetch notifications')
//     }
//     const data = await res.json()
//     return data as Notifiaction[]
//   }
// )
// // Create Slice for Notification
// const notifactionSlice= createSlice({
//     name:'notification',
//     initialState,
//     reducers:{
//         // this add the new came notification from the backend 
//         // and alsoe check type of the user notification 
//     addnotifiaction(state,action:PayloadAction<Notifiaction>){
//         // adding the state of notification in array list []
//         // use the unShift() -> bcz it add new array items at the top so .
//         state.nofitications.unshift(action.payload) 
//     },
//     // remove the nofiaction clear the notification
//     removenotification(state,action:PayloadAction<string>){
//     state.nofitications=state.nofitications.filter((message)=>message.id!== action.payload)
//     },
//     //  clear the all Notifiaction
//      clearAllNotifiaction(state){
//         state.nofitications=[]
//      }
//     },
//     // thuck 
//     extraReducers:(builder)=>{
       
//   }
// })