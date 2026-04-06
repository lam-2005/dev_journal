import { PostType } from "@/interfaces/post.interface";
import { convertDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SlOptionsVertical } from "react-icons/sl";

const MyPost = ({ post }: { post: PostType }) => {
  return (
    <div className=" w-full border border-foreground/10">
      {post.image && (
        <div className="w-full h-102.75">
          <Image
            src={post.image}
            alt={post.slug || post.title}
            width={940}
            height={411}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <Link
        href={`/blog/${post.slug}`}
        className="block min-h-43.75 p-8 hover:[&_h2]:text-primary"
      >
        <div className="font-mono text-xs flex items-center justify-between">
          <p>{convertDate(post.create_at ?? "")}</p>
          <SlOptionsVertical className="text-sm" />
        </div>
        <h2 className="font-medium text-3xl mt-7 line-clamp-2">{post.title}</h2>
      </Link>
    </div>
  );
};

export default MyPost;
