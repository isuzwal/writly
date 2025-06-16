import { useContext,useEffect} from "react";
import bookmarkState from "../../store/Bookmarks";
import { UserContext } from "../../UserAuth/User"
import { Link } from "react-router";
import { Heart ,MessageSquareMore,CircleAlert} from "lucide-react";




const Bookmark = () => {
  const { bookmarks, getBookmarks, isLoading, error } = bookmarkState();
  const context=useContext(UserContext)
   if(!context){
    throw new Error
  }

  const {user}=context;
  useEffect(() => {
    if (user?.username) {
      getBookmarks(user.username);
    }
  }, [user?.username]);

if(isLoading){
  return <div className="justify-center items-center text-white">
    <p>Geetting your post..</p>
    </div>
   }
   if(error){
    return<div className="justify-center bg-red-500 text-white items-start ">
      <p className='flex gap-1 items-center'>
      <CircleAlert />
    </p>
      </div>
   }
  return (
    <section className="min-h-screen text-white flex flex-col  p-2">
      <div className=" p-1">
        {bookmarks.map((bookmarkItem) => (
          <div key={bookmarkItem._id} className="w-full  p-2  bg-navabar rounded-md mb-1">
                <div className=" flex gap-2 items-center">
                  <img src={bookmarkItem.user?.profileImage}  className="object-cover rounded-full w-8 h-8"/>
                  <Link to={`/home/${bookmarkItem.user?.username}`}>{bookmarkItem.user?.username}</Link>
                </div>
                  <p className="text-[16px] p-1 ">{bookmarkItem?.text}</p>
                  {bookmarkItem.image && (
                 <div className="w-full   h-aspect-square  overflow-hidden rounded-md">
                 <img  src={bookmarkItem?.image}  className="w-full h-full object-cover" 
                 alt="Post image" />
              </div>
                )}
                <div className="flex gap-4 mt-1  items-center p-2">
                  <span className="flex gap-1 items-center">
                    <Heart  size={28} className={`
                      ${bookmarkItem.likes.includes(user?._id || " ") ?"fill-rose-500 text-rose-500 hover:bg-rose-500 rounded-full p-1 hover:text-white transition-all duration-300 ease-out cursor-pointer":
                        "fill-none cursor-pointer   hover:bg-rose-500 rounded-full p-1"}
                      `}/>
                    {bookmarkItem.likes?.length}</span>
                   <span className="flex gap-1 items-center">
                    <MessageSquareMore size={28} className="cursor-pointer  hover:bg-blue-700 transition-colors duration-200   p-1 rounded-full" />
                    {bookmarkItem.comments?.length}</span>
               </div>
          </div>
        ))}
      </div>
    
    </section>
  );
};

export default Bookmark;
