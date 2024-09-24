// types.ts
export interface Post {
  id: string;
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt: string;
  author: User;
  comments: Comment[];
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Comment {
  id: string;
  content: string;
  upvotes: number;
  downvotes: number;
  postId: string;
  author: User;
  replies: Comment[];
  parentCommentId?: string;
}
