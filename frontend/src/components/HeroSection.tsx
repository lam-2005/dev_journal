import Image from "next/image";
import Link from "next/link";
import { MdEdit } from "react-icons/md";

const HeroSection = () => {
  return (
    <div className="w-screen h-[calc(100vh-4rem)] relative">
      <div className="w-full h-full ">
        <Image
          src={"/background.jpg"}
          alt="background"
          width={1920}
          height={1080}
          className="w-full h-full object-cover overflow-x-hidden brightness-70"
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 font-medium -translate-y-3/4">
        <h1 className="text-[2.75rem] text-background text-center w-[70vw] ">
          Share <span className="italic font-light">your</span>{" "}
          <span className="font-extrabold">ideas</span>. Discover{" "}
          <span className="font-extrabold bg-primary text-foreground">
            knowledge
          </span>
          . Connect <span className="italic font-light">with</span>{" "}
          <span className="font-bold">people</span>.
        </h1>
        <div className="flex gap-5 mt-6 justify-center">
          <Link
            href={"/create-post"}
            className="text-foreground bg-primary px-8 py-2 flex items-center justify-center gap-3 text-lg font-bold font-mono "
          >
            <MdEdit className="text-xl" /> Start Writing
          </Link>
          <Link
            href={"/blog"}
            className="border border-background text-background text-lg font-bold px-8 py-2  font-mono "
          >
            Explore Posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
