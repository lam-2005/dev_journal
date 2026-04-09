"use client";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import useBlogStore from "@/store/useBlogStore";
import CommentList from "./CommentList";
// import CommentListUI from "./CommentListUI"; // Chúng ta sẽ tạo ở dưới

const CommentContainer = ({ postId }: { postId: string }) => {
  const [comment, setComment] = useState("");
  const [activeButton, setActiveButton] = useState(false);
  const { addComment, isCommenting, getComments } = useBlogStore();
  useEffect(() => {
    if (postId) {
      getComments(postId);
    }
  }, [postId, getComments]);
  const handleSend = async () => {
    if (!comment.trim()) return;

    await addComment({ post_id: postId, comment });
    setComment(""); // Reset input
    setActiveButton(false);
  };

  return (
    <div className="container space-y-6 mt-10">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-mono">Comments</h3>
        <FaUserCircle className="text-3xl" />
      </div>

      <hr className="text-foreground/20" />
      <div>
        <textarea
          onFocus={() => setActiveButton(true)}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write comment..."
          className={`border border-foreground/20 resize-none px-2.5 py-2 h-15 transition-all w-full outline-none text-base placeholder:text-foreground placeholder:font-mono focus:border-foreground ${
            activeButton || comment ? "h-25" : ""
          } `}
        ></textarea>
        {(activeButton || comment) && (
          <div className="flex gap-5 mt-5 justify-end">
            <button
              className="font-mono px-4 py-2 text-sm cursor-pointer hover:underline"
              onClick={() => {
                setActiveButton(false);
                setComment("");
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={isCommenting || !comment.trim()}
              className="bg-foreground text-background px-6 py-2 text-sm font-bold hover:underline hover:brightness-200 font-mono border border-foreground cursor-pointer disabled:cursor-not-allowed disabled:brightness-75 "
            >
              {isCommenting ? "Sending..." : "Send"}
            </button>
          </div>
        )}
      </div>

      {/* Hiển thị danh sách comment (Giao diện mẫu) */}
      <CommentList />
    </div>
  );
};

export default CommentContainer;
