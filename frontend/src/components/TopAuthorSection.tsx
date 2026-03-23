import React from "react";
import { FaUser } from "react-icons/fa";
import Heading from "./Heading";

const TopAuthorSection = () => {
  return (
    <section className="mt-30">
      <Heading className="left-full -translate-x-200">
        Top <span className="font-extrabold">Authors</span>
      </Heading>
      <div className=" bg-foreground relative -top-20 text-white px-15 py-20 container w-[85%]">
        <h2 className="text-center font-bold text-xl mb-10 font-mono">
          Discover the most loved writers on our platform
        </h2>
        <div className="flex gap-30 items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="text-2xl font-bold">2</div>
            <div className="size-35 bg-amber-500 rounded-full flex items-center justify-center">
              <FaUser className="text-7xl" />
            </div>
            <div className="text-2xl font-bold">Author 1</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-2xl font-bold">1</div>
            <div className="size-50 bg-amber-500 rounded-full flex items-center justify-center">
              <FaUser className="text-9xl" />
            </div>
            <div className="text-2xl font-bold">Author 1</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-2xl font-bold">3</div>
            <div className="size-35 bg-amber-500 rounded-full flex items-center justify-center">
              <FaUser className="text-7xl" />
            </div>
            <div className="text-2xl font-bold">Author 1</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopAuthorSection;
