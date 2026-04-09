export interface PostType {
  id?: string;
  title: string;
  content: string;
  excerpt?: string;
  slug?: string;
  image?: string | null;
  create_at?: string;
  update_at?: string;
  view?: number;
  user_id?: string;
  comment_count: string | number;
}

export interface CommentType {
  id: string;
  comment: string;
  user_id: string;
  post_id: string;
  create_at: string;
  user_name: string;
  user_avatar: string | null;
}
