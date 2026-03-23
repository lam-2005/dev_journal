import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { FiEye } from "react-icons/fi";
import { TiMessage } from "react-icons/ti";

const PostRecomented = () => {
  return (
    <div className="size-73 relative cursor-default">
      <Image
        src={"/trending-post.png"}
        alt="..."
        width={292}
        height={292}
        objectFit="cover"
        className="w-full h-full brightness-60"
      />
      <div className="w-full h-full px-5 py-8  absolute top-0 left-0 text-background font-mono flex flex-col">
        <div className="text-xs">
          <span>Mar 22, 2023</span> • <span>1 min read</span>
        </div>

        <div className="flex-1 hover:text-primary cursor-pointer flex items-end">
          <h3 className="line-clamp-3 font-extrabold font-sans text-2xl mb-5  ">
            Technology Is Quietly Reshaping How We Live, Work, and Think
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
                <TiMessage className="text-xl" /> 0
              </div>
            </div>
            <div className="text-red-500 text-2xl">
              <CiHeart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostRecomented;
