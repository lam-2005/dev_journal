"use client";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import useBlogStore from "@/store/useBlogStore"; // Import store của bạn
import { convertDate } from "@/lib/utils"; // Dùng hàm convertDate bạn đã có
import Image from "next/image";

const CommentList = () => {
  // 1. Lấy dữ liệu và trạng thái từ Zustand Store
  const { comments, isGettingComments } = useBlogStore();
  const [visibleCount, setVisibleCount] = useState(5);

  const showMore = () => setVisibleCount((prev) => prev + 5);
  const hide = () => setVisibleCount(5);

  // 2. Xử lý trạng thái đang tải dữ liệu
  if (isGettingComments) {
    return (
      <div className="mt-10 space-y-4 font-mono text-sm animate-pulse">
        <p>Loading comments...</p>
      </div>
    );
  }

  if (!comments || comments.length === 0) {
    return (
      <div className="mt-10 font-mono text-sm text-foreground/50">
        No comments yet. Be the first to share your thoughts!
      </div>
    );
  }

  return (
    <div className="space-y-8 mt-10">
      {/* 4. Map qua dữ liệu thật từ API */}
      {comments.slice(0, visibleCount).map((item: any) => (
        <div key={item.id} className="flex gap-4">
          <div className="shrink-0">
            {/* Hiển thị avatar nếu có, nếu không hiện icon mặc định */}
            {item.user_avatar ? (
              <Image
                src={item.user_avatar}
                alt={item.user_name}
                width={32}
                height={32}
                className="rounded-full object-cover w-8 h-8"
              />
            ) : (
              <FaUserCircle className="text-3xl text-foreground/50" />
            )}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm">{item.user_name}</span>
              <span className="text-xs text-foreground/50 font-mono">
                {/* Sử dụng hàm convertDate của bạn hoặc toLocaleDateString */}
                {item.create_at ? convertDate(item.create_at) : "Just now"}
              </span>
            </div>
            <p className="text-sm font-mono leading-relaxed">{item.comment}</p>
          </div>
        </div>
      ))}

      {/* 5. Logic hiển thị nút View more / Hide */}
      {comments.length > 5 && (
        <>
          {visibleCount < comments.length ? (
            <button
              onClick={showMore}
              className="w-full py-3 border border-dashed border-foreground/20 font-mono text-sm hover:bg-foreground/5 transition-all cursor-pointer"
            >
              View more comments (+5)
            </button>
          ) : (
            <button
              onClick={hide}
              className="w-full py-3 border border-dashed border-foreground/20 font-mono text-sm hover:bg-foreground/5 transition-all cursor-pointer"
            >
              Hide comments
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default CommentList;
