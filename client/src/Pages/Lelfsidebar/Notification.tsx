import { UserPlus, Heart, MessageSquarePlus,X } from 'lucide-react';

// Notification type definition
type NotificationType = 'follow' | 'comment' | 'like';

// Interface for notification data
interface NotificationData {
  id: string;
  postId: string;
  userId: string;
  username: string;
  profileImage: string;
  text: string;
  createdAt: string;
  type: NotificationType;
}

const Notification = () => {
  // Sample notification data
  const notificationData: NotificationData[] = [
    {
      id: 'n1',
      postId: 'p1',
      userId: 'u1',
      username: 'Alice Johnson',
      profileImage: '/api/placeholder/40/40',
      text: 'liked your post about design trends',
      createdAt: '2025-05-13T10:00:00Z',
      type: 'like',
    },
    {
      id: 'n2',
      postId: 'p2',
      userId: 'u2',
      username: 'Bob Smith',
      profileImage: '/api/placeholder/40/40',
      text: 'commented on your photo: "Great shot!"',
      createdAt: '2025-05-14T15:30:00Z',
      type: 'comment',
    },
    {
      id: 'n3',
      postId: 'p3',
      userId: 'u3',
      username: 'Charlie Davis',
      profileImage: '/api/placeholder/40/40',
      text: 'started following you',
      createdAt: '2025-05-15T08:45:00Z',
      type: 'follow',
    },
    {
      id: 'n4',
      postId: 'p4',
      userId: 'u4',
      username: 'Tech Insights',
      profileImage: '/api/placeholder/40/40',
      text: 'liked your post about AI',
      createdAt: '2025-05-15T19:20:00Z',
      type: 'like',
    },
    {
      id: 'n5',
      postId: 'p5',
      userId: 'u5',
      username: 'Design Trends',
      profileImage: '/api/placeholder/40/40',
      text: 'commented: "Would love to collaborate!"',
      createdAt: '2025-05-16T09:15:00Z',
      type: 'comment',
    },
  ];

  // Function to render notification icon based on type
  const renderNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'comment':
        return <MessageSquarePlus className="text-blue-500" size={16} />;
      case 'like':
        return <Heart className="text-red-500" size={16} />;
      case 'follow':
        return <UserPlus className="text-green-500" size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className=" min-h-screen">
      <div className="p-2  w-full  mx-auto">
        {notificationData.map((notification) => (
          <div key={notification.id}  className="bg-navabar  cursor-pointer p-4 mb-2 shadow rounded-lg flex  items-center ">
            <div className="mr-2 mt-1">
              {renderNotificationIcon(notification.type)}
            </div>
            <div className="mr-3">
              <img 
                src={notification.profileImage} 
                alt={notification.username} 
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div className="flex-1  mt-3 ">
              <div className="flex  justify-between items-start">
                <div className='flex gap-2'>
                  <span className="font-semiboldn text-white hidden  sm:block md:block text-sm">{notification.username}</span>
                  <span className="text-gray-600 ml-1 text-sm">{notification.text}</span>
                </div>
                <span className="text-gray-500 text-xs">
                </span>
              </div>
            </div>
          <div className=' mt-1'>
            <button>
            <X  className='text-white hover:rounded-md hover:bg-neutral-600'/>
            </button>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;