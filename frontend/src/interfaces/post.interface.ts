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
}
