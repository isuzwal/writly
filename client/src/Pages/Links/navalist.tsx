  //-> at navabara link list
  import {SettingsIcon,  MessageSquareDot, CircleHelp ,User2Icon} from "lucide-react";
  import { JSX } from "react";
  export interface ListItems{
      label:string,
      icon:JSX.Element,
      link:string |((username:string)=>string),
    }
    const listItems:ListItems[]=[
        {label:"Profile",icon:<User2Icon /> , link: (username)=>`/home/profile/${username}` },
        { label: "Setting", icon: <SettingsIcon />, link: "/home/setting" },
        { label: "Help & Supports", icon: <CircleHelp />, link: "/home/help" },
        { label: "Give Feedback", icon: <MessageSquareDot />, link: "/home/feedback"},

    ]
    export default listItems;