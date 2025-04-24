export type PostType = {
    _id: string;
    title: string;
    text: string;
    image?: string;
    user?: {
      username?: string;
      _id?: string;
    };
   
  };
   