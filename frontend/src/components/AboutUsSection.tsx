import Image from "next/image";
import { IoIosArrowRoundForward } from "react-icons/io";
import Heading from "./Heading";
import Link from "next/link";

const AboutUsSection = () => {
  return (
    <section className="mt-20">
      <Heading dataAos="fade-right">
        <span className="font-extrabold">About</span> Me
      </Heading>

      <div
        className="absolute z-9 max-w-[40%] h-125 right-0 -translate-y-20 "
        data-aos="fade-left"
      >
        <Image
          src={"/trending-post.png"}
          alt="trending-post"
          width={1000}
          height={500}
          className="object-cover h-full object-center"
        />
      </div>
      <div
        className="max-w-200 py-20 bg-secondary-background px-15 mt-40 relative left-1/2 -translate-x-3/5 z-10 "
        data-aos="fade-up"
      >
        <div
          className="h-[95%] w-20 bg-primary z-11 absolute right-0 translate-x-1/2"
          data-aos="fade-up"
          data-aos-delay="200"
        ></div>
        <h1 className="text-4xl w-[75%] font-bold line-clamp-3">
          The journey from Zero to Fullstack
        </h1>

        <p className="leading-6 font-mono mt-15 text-sm">
          Hi there, I&apos;m <strong>Lam</strong>! It&apos;s great that you
          visited this little corner.
        </p>
        <p className="mt-4 leading-6 font-mono text-sm">
          Thank you for taking the time to stop by my blog. This isn&apos;t just
          a place to store my code; it&apos;s also a diary documenting my
          journey conquering the ever-changing yet incredibly exciting world of
          Information Technology.
        </p>
        <p className="mt-4 leading-6 font-mono text-sm">
          From my early days in programming, I understand the feeling of being
          &quot;lost&quot; amidst the countless new technologies that emerge
          every day. I used to spend hours fixing a small bug or struggling to
          optimize a user interface.
        </p>
        <p className="mt-4 leading-6 font-mono text-sm">
          That&apos;s why this blog was created: to simplify complex things. I
          want to share what I&apos;ve learned, from managing application state
          (State Management) to building real-time chat systems and designing
          standard UI/UX interfaces.
        </p>
        <Link
          href={"/about-us"}
          className="border border-foreground px-8 py-2 mt-15 flex gap-2 items-center justify-center font-mono w-fit"
        >
          Read more <IoIosArrowRoundForward className="text-2xl" />
        </Link>
      </div>
    </section>
  );
};

export default AboutUsSection;
