export type PostType = {
    _id: string;
    title: string;
    text: string;
    image?: string;
    createdAt:string;
    like:number;
    comment:[];
    user?: {
      username?: string;
      _id?: string;
      image:string;
    };
   
  };

  