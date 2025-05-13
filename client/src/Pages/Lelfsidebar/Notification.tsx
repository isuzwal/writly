import { FaComment, FaHeart, FaUserPlus } from 'react-icons/fa'; // Importing icons for like, comment, and follow

type NotificationType = 'follow' | 'comment' | 'like'; // Defining the possible types

interface NotificationData {
  id: string;
  postId: string;
  userId: string;
  username: string;
  profileImage: string;
  text: string;
  createdAt: string;
  type: NotificationType; // Add type here
}

const Notification = () => {
  const dumylistdata: NotificationData[] = [
    {
      id: 'c1',
      postId: 'p1',
      userId: 'u1',
      username: 'Alice',
      profileImage: 'https://example.com/profiles/alice.jpg',
      text: 'This is an amazing post!',
      createdAt: '2025-05-13T10:00:00Z',
      type: 'comment', // Comment notification type
    },
    {
      id: 'c2',
      postId: 'p1',
      userId: 'u2',
      username: 'Bob',
      profileImage: 'https://example.com/profiles/bob.jpg',
      text: 'I totally agree with this.',
      createdAt: '2025-05-13T10:05:00Z',
      type: 'like', // Like notification type
    },
    {
      id: 'c3',
      postId: 'p2',
      userId: 'u3',
      username: 'Charlie',
      profileImage: 'https://example.com/profiles/charlie.jpg',
      text: 'Thanks for sharing!',
      createdAt: '2025-05-13T11:20:00Z',
      type: 'follow', // Follow notification type
    },
  ];

  // Function to render the appropriate icon based on notification type
  const renderNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'comment':
        return <FaComment className="text-blue-500" />;
      case 'like':
        return <FaHeart className="text-red-500" />;
      case 'follow':
        return <FaUserPlus className="text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <section className="bg-maincolor px-5 py-2  min-h-screen">
      <div className=" mx-auto px-2  flex flex-col   justify-center  rounded-md">
        {dumylistdata.map((data) => (
          <div key={data.id} className="w-full hover:bg-gray-900 rounded-md cursor-pointer transition-all ease-in-out p-4 ">
              <div className="ml-3">{renderNotificationIcon(data.type)}</div>
            <div className="flex items-start gap-3">
              <img
                src={data.profileImage}
                alt={data.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="bg-[#2a2a2a] text-white px-4 py-2 rounded-full text-sm">
                  <p className="font-semibold">{data.username}</p>
                  <p>{data.text}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Notification;
