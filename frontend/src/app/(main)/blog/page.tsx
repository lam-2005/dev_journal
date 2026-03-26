import Heading from "@/components/Heading";
import Post from "@/components/Post";
import React from "react";

const BlogPage = () => {
  return (
    <div className="mt-20">
      <Heading>
        <span className="font-extrabold text-7xl">Blog</span>
      </Heading>
      <div className="mt-20 flex flex-col items-center">
        <Post />
      </div>
    </div>
  );
};

export default BlogPage;
