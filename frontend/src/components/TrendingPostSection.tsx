import Image from "next/image";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import Heading from "./Heading";

const TrendingPostSection = () => {
  return (
    <section className="mt-20">
      <Heading>
        <span className="font-extrabold">Trending</span> Post
      </Heading>

      <div className="absolute z-9 max-w-[40%] h-125 right-0 -translate-y-20 ">
        <Image
          src={"/trending-post.png"}
          alt="trending-post"
          width={1000}
          height={500}
          className="object-cover h-full object-center"
        />
      </div>
      <div className="max-w-200 py-20 bg-secondary-background px-15 mt-40 relative left-1/2 -translate-x-3/5 z-10 ">
        <div className="h-[95%] w-20 bg-primary z-11 absolute right-0 translate-x-1/2"></div>
        <h1 className="text-4xl w-[75%] font-bold line-clamp-3">
          Technology Is Quietly Reshaping How We Live, Work, and Think
        </h1>
        <p className="leading-6 font-mono mt-15 text-sm">
          Over the past few decades, technology has evolved from a specialized
          field into the underlying infrastructure of modern life. Today, almost
          every industry—from education and healthcare to finance and
          entertainment—relies on digital systems to operate and scale. What
          makes this transformation remarkable is not only the speed at which it
          is happening, but also how deeply technology is becoming embedded in
          everyday decisions. Many people interact with advanced systems dozens
          or even hundreds of times a day without noticing it.
        </p>
        <button className="border border-foreground px-8 py-2 mt-15 flex gap-2 items-center justify-center font-mono">
          Read more <IoIosArrowRoundForward className="text-2xl" />
        </button>
      </div>
    </section>
  );
};

export default TrendingPostSection;
