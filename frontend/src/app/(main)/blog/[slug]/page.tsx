// app/blog/[slug]/page.tsx (Server Component)
import { Metadata } from "next";
import BlogPostPage from "./BlogPostPage";
import env from "@/config/environment";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const res = await fetch(`${env.API_URL}/api/blog/post/${slug}`);
  const post = await res.json();
  if (!post) {
    return {
      title: "Post Not Found | DevJournal",
    };
  }

  return {
    title: post.data.title,
    description: post.data.excerpt,
  };
}

export default function Page({ params }: Props) {
  return <BlogPostPage params={params} />;
}
