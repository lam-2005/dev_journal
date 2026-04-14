"use client";
import Image from "next/image";
import { IoIosArrowRoundForward } from "react-icons/io";
import Heading from "./Heading";
import Link from "next/link";
import useBlogStore from "@/store/useBlogStore";
import { useEffect } from "react";
import NoThumbnail from "./NoThumbnail";
import { convertDate } from "@/lib/utils";

const TrendingSection = () => {
  const { topPost, getTopPost } = useBlogStore();

  useEffect(() => {
    getTopPost();
  }, [getTopPost]);

  if (!topPost) return null;

  return (
    <section className="mt-40 relative">
      {/* Heading nằm bên phải để đối trọng với About Me */}
      <div className="flex justify-end mb-10">
        <Heading>
          Most <span className="font-extrabold ">Viewed</span>
        </Heading>
      </div>

      <div className="flex flex-col lg:flex-row items-center relative h-fit lg:h-140">
        {/* Phần ảnh: Chiếm bên trái và tràn ra ngoài một chút */}
        {topPost.image ? (
          <div className="w-full lg:w-[60%] h-80 lg:h-full relative z-10 overflow-hidden shadow-2xl">
            <Image
              src={topPost.image}
              alt={topPost.title}
              fill
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
            />
          </div>
        ) : (
          <NoThumbnail />
        )}

        {/* Phần nội dung: Đè lên ảnh một phần (Negative Margin) */}
        <div className="w-[90%] lg:w-[45%] bg-foreground text-background p-10 lg:p-15 lg:-ml-20 z-20 relative shadow-2xl border-t-4 border-primary">
          <p className="font-mono text-sm opacity-70 mb-4">
            {convertDate(topPost.create_at ?? "")} — {topPost.view} views
          </p>

          <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-8">
            {topPost.title}
          </h1>

          <p className="font-mono text-sm leading-7 opacity-80 line-clamp-4">
            {topPost.excerpt || "No summary available for this post..."}
          </p>

          <Link
            href={`/blog/${topPost.slug}`}
            className="border border-background/30 px-8 py-3 mt-10 flex gap-2 items-center justify-center font-mono w-fit hover:bg-background hover:text-foreground transition-all group"
          >
            Read more{" "}
            <IoIosArrowRoundForward className="text-2xl group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
