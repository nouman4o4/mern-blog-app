export interface IPost {
  title: string;
  content: string | TrustedHTML;
  category: string;
  featuredImage?: string;
  author: string;
  attachments?: string[];
  likes: string[];
  comments: {
    user: string;
    text: string;
    likes: string[];
    createdAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}
