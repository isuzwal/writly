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