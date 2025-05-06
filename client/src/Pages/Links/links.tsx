import { HomeIcon, InfoIcon,BellIcon, BookMarkedIcon, FileTextIcon, 
UserIcon} from "lucide-react";

import { JSX } from "react";
export interface LinkItems{
    label:string,
    icon:JSX.Element,
    link:string |((username:string)=>string),
    // isAction:boolean,
}
const linklist: LinkItems[] = [
    { label: "Home", icon: <HomeIcon />, link: "/home" },
    { label: "Notifications", icon: <BellIcon />, link: "/home/notification" },
    { label: "Bookmarks", icon: <BookMarkedIcon />, link: "/home/bookmark" },
    { label: "Posts", icon: <FileTextIcon />, link: "/home/posts" },
    { label: "Story", icon: <InfoIcon />, link: "/home/story" },
    { label: "Account", icon: <UserIcon />, link: (username)=>`/home/${username}` },

  ];
  

export  default  linklist ;