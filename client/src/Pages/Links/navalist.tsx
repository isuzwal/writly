  //-> at navabara link list
  import { LogOut,SettingsIcon,  MessageSquareDot, CircleHelp} from "lucide-react";
  import { JSX } from "react";
  export interface ListItems{
      label:string,
      icon:JSX.Element,
      link:string
    }
    const listItems:ListItems[]=[
        { label: "Setting", icon: <SettingsIcon />, link: "/home/setting" },
        { label: "Help & Supports", icon: <CircleHelp />, link: "/home/help" },
        { label: "Give Feedback", icon: <MessageSquareDot />, link: "/home/feedback"},
        {label:"Logout",icon:<LogOut />,link:"/home/logout"}
    ]
    export default listItems;