import Image from "next/image";
import React from "react";

const Post = () => {
  return (
    <div className="w-235 bg-secondary-background">
      <div className="w-full h-102.75">
        <Image
          src={"/trending-post.png"}
          alt="post"
          width={940}
          height={411}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="pt-7 pb-6.25 px-12 font-mono h-77.5 flex flex-col">
        <div className="text-xs mb-6">
          <span>Mar 22, 2023</span> • <span>1 min read</span>
        </div>
        <div className="space-y-3 flex-1 mb-3">
          <h2 className="text-3xl font-bold font-sans line-clamp-2">
            Technology Is Quietly Reshaping How We Live, Work, and Think
          </h2>
          <p className="leading-6 text-sm line-clamp-2">
            Over the past few decades, technology has evolved from a specialized
            field into the underlying infrastructure of modern life. Today,
            almost every industry—from education and healthcare to finance and
            entertainment—relies on digital systems to operate and scale. What
            makes this transformation remarkable is not only the speed at which
            it is happening, but also how deeply technology is becoming embedded
            in everyday decisions. Many people interact with advanced systems
            dozens or even hundreds of times a day without noticing it.
          </p>
        </div>
        <div>
          <div className="h-px w-full bg-foreground" />
          <div className="flex gap-4 text-xs mt-4">
            <div>0 views</div>
            <div>0 comments</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
