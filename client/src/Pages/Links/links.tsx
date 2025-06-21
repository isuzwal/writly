import { HomeIcon, InfoIcon,BellIcon,BookMarkedIcon, 
UserIcon,  } from "lucide-react";

import { JSX } from "react";
export interface LinkItems{
    label:string,
    icon:JSX.Element,
    link: string | ((param: string | number) => string | number);
  
}
const linklist: LinkItems[] = [
    { label: "Home", icon: <HomeIcon />, link: "/home" },
    { label: "Notifications", icon: <BellIcon />, link:(userId)=> `/home/notification/${userId}` },
    { label: "Bookmarks", icon: <BookMarkedIcon />, link: (username)=>`/home/bookmark/${username}` },
    { label: "Story", icon: <InfoIcon />, link: "/home/story" },
    { label: "Account", icon: <UserIcon />, link: (username)=>`/home/profile/${username}` },

  ];
  

export  default  linklist ;