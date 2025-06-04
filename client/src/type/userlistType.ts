import { PostType } from "./PostType";
export interface userlist {
    username?: string;
    _id?: string;
    profileImage:string;
    coverImage?:string;
    bio?:string;
    follower:[];
    following:[];
    post:PostType[];
}