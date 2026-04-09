import { PostType } from "@/interfaces/post.interface";
import { convertDate, estimateReadingTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { CiHeart } from "react-icons/ci";
import { FiEye } from "react-icons/fi";
import { TiMessage } from "react-icons/ti";

const PostRecomented = ({ post }: { post: PostType }) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="size-73 relative cursor-default border border-foreground/10 bg-secondary-background block"
    >
      {post.image ? (
        <>
          <Image
            src={post.image}
            alt={post.slug || post.title}
            width={292}
            height={292}
            objectFit="cover"
            className="w-full h-full brightness-60"
          />
          <div className="w-full h-full px-5 py-8  absolute top-0 left-0 text-background font-mono flex flex-col">
            <div className="text-xs">
              <span>{convertDate(post.create_at ?? "")}</span> •{" "}
              <span>{estimateReadingTime(post.content)} min read</span>
            </div>

            <div className="flex-1 hover:text-primary cursor-pointer flex items-end text-background">
              <h3 className="line-clamp-3 font-extrabold font-sans text-2xl mb-5  ">
                {post.title}
              </h3>
            </div>
            <div className="space-y-5">
              <div className="h-px w-full bg-background" />
              <div className="flex justify-between">
                <div className="flex gap-5 text-xs">
                  <div className="flex gap-2 items-center">
                    <FiEye className="text-lg" /> 0
                  </div>

                  <div className="flex gap-2 items-center">
                    <TiMessage className="text-xl" /> {post.comment_count}
                  </div>
                </div>
                <div className="text-red-500 text-2xl">
                  <CiHeart />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full px-5 py-8  absolute top-0 left-0 font-mono flex flex-col text-foreground">
          <div className="text-xs">
            <span>{convertDate(post.create_at ?? "")}</span> •{" "}
            <span>{estimateReadingTime(post.content)} min read</span>
          </div>

          <div className="flex-1 hover:text-primary cursor-pointer flex text-foreground mt-5">
            <h3 className="line-clamp-3 font-extrabold font-sans text-2xl mb-5  ">
              {post.title}
            </h3>
          </div>
          <div className="space-y-5">
            <div className="h-px w-full bg-foreground/20" />
            <div className="flex justify-between">
              <div className="flex gap-5 text-xs">
                <div className="flex gap-2 items-center">
                  <FiEye className="text-lg" /> 0
                </div>
                <div className="flex gap-2 items-center">
                  <TiMessage className="text-xl" />
                  {post.comment_count}
                </div>
              </div>
              <div className="text-red-500 text-2xl">
                <CiHeart />
              </div>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
};

export default PostRecomented;
