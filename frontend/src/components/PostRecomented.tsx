"use client";
import { PostType } from "@/interfaces/post.interface";
import { convertDate, estimateReadingTime } from "@/lib/utils";
import useBlogStore from "@/store/useBlogStore";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa"; // Thêm tim đầy để hiển thị khi đã like
import { FiEye } from "react-icons/fi";
import { TiMessage } from "react-icons/ti";

const PostRecomented = ({ post }: { post: PostType }) => {
  // 1. Lấy hàm likePost từ Store
  const { likePost } = useBlogStore();
  const router = useRouter();
  // 2. Hàm xử lý khi nhấn vào tim
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault(); // Ngăn Link chuyển hướng trang
    e.stopPropagation(); // Ngăn sự kiện nổi bọt
    if (post.id) likePost(post.id);
  };
  const goToPost = () => {
    router.push(`/blog/${post.slug}`);
  };
  return (
    <div
      onClick={goToPost}
      className="size-73 relative cursor-default border border-foreground/10 bg-secondary-background block transition-all hover:border-foreground/30"
    >
      {post.image ? (
        <>
          <Image
            src={post.image}
            alt={post.slug || post.title}
            width={292}
            height={292}
            className="w-full h-full brightness-60 object-cover"
          />
          <div className="w-full h-full px-5 py-8 absolute top-0 left-0 text-background font-mono flex flex-col">
            <div className="text-xs">
              <span>{convertDate(post.create_at ?? "")}</span> •{" "}
              <span>{estimateReadingTime(post.content)} min read</span>
            </div>

            <div className="flex-1 hover:text-primary cursor-pointer flex items-end text-background">
              <h3 className="line-clamp-3 font-extrabold font-sans text-2xl mb-5">
                {post.title}
              </h3>
            </div>
            <div className="space-y-5">
              <div className="h-px w-full bg-background" />
              <div className="flex justify-between items-center">
                <div className="flex gap-5 text-xs">
                  <div className="flex gap-2 items-center">
                    <FiEye className="text-lg" /> {post.view || 0}
                  </div>
                  <div className="flex gap-2 items-center">
                    <TiMessage className="text-xl" /> {post.comment_count || 0}
                  </div>
                </div>

                {/* NÚT TIM - PHẦN CÓ ẢNH */}
                <button
                  onClick={handleLike}
                  className="flex items-center gap-1 cursor-pointer group"
                >
                  <span className="text-xs">{post.like_count || ""}</span>
                  <div className="text-2xl transition-transform group-hover:scale-110 active:scale-90">
                    {!!post.is_liked ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <CiHeart className="text-white" />
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full px-5 py-8 absolute top-0 left-0 font-mono flex flex-col text-foreground">
          <div className="text-xs">
            <span>{convertDate(post.create_at ?? "")}</span> •{" "}
            <span>{estimateReadingTime(post.content)} min read</span>
          </div>

          <div className="flex-1 hover:text-primary cursor-pointer flex text-foreground mt-5">
            <h3 className="line-clamp-3 font-extrabold font-sans text-2xl mb-5">
              {post.title}
            </h3>
          </div>
          <div className="space-y-5">
            <div className="h-px w-full bg-foreground/20" />
            <div className="flex justify-between items-center">
              <div className="flex gap-5 text-xs">
                <div className="flex gap-2 items-center">
                  <FiEye className="text-lg" /> {post.view || 0}
                </div>
                <div className="flex gap-2 items-center">
                  <TiMessage className="text-xl" /> {post.comment_count || 0}
                </div>
              </div>

              <button
                onClick={handleLike}
                className="flex items-center gap-1 cursor-pointer group"
              >
                <span className="text-xs text-foreground">
                  {post.like_count || ""}
                </span>
                <div className="text-2xl transition-transform group-hover:scale-110 active:scale-90">
                  {!!post.is_liked ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <CiHeart className="text-foreground" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostRecomented;
