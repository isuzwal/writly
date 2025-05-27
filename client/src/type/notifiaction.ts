export type NotificationType = 'follow' | 'comment' | 'like';
 // export type Commentmessage = 'like  on your post ' | 'follow You ' | 'comment on your post '
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
