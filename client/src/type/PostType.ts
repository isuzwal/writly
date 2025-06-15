export interface PostType{
    _id: string;
    title: string;
    text: string;
    image?: string;
    createdAt:string;
    likes:string[];
    comments:[];
    user?: {
      username?: string;
      _id?: string;
      image:string;
      profileImage: string; 
    };
   
  };

  