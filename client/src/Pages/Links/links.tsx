import { HomeIcon, InfoIcon,BellIcon,BookMarkedIcon, 
UserIcon,
Video} from "lucide-react";

import { JSX } from "react";
export interface LinkItems{
    label:string,
    icon:JSX.Element,
    link:string |((username:string)=>string),
  
}
const linklist: LinkItems[] = [
    { label: "Home", icon: <HomeIcon />, link: "/home" },
    { label: "Notifications", icon: <BellIcon />, link: "/home/notification" },
    { label: "Bookmarks", icon: <BookMarkedIcon />, link: "/home/bookmark" },
    { label: "Video", icon: <Video />, link: "/home/video" },
    { label: "Story", icon: <InfoIcon />, link: "/home/story" },
    { label: "Account", icon: <UserIcon />, link: (username)=>`/home/profile/${username}` },

  ];
  

export  default  linklist ;