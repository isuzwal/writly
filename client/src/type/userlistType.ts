import { PostType } from "./PostType";
export type userlist ={
    username?: string;
    _id?: string;
    profileImage:string;
    coverImage?:string;
    bio?:string;
    follower:[];
    post:PostType[];
}