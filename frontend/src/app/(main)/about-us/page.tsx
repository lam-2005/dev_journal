import Heading from "@/components/Heading";
import React from "react";

const AboutUs = () => {
  return (
    <div className="mt-20">
      <Heading>
        <span className="font-extrabold text-7xl">About Me</span>
      </Heading>
      <div className="font-mono mt-20 max-w-200 mx-auto space-y-10">
        <h1 className="text-3xl font-sans font-bold">
          The journey from Zero to Fullstack
        </h1>
        <hr />
        <div>
          <p>
            Hi there, I&apos;m <strong>Lam</strong>! It&apos;s great that you
            visited this little corner.
          </p>
          <p className="mt-4">
            Thank you for taking the time to stop by my blog. This isn&apos;t
            just a place to store my code; it&apos;s also a diary documenting my
            journey conquering the ever-changing yet incredibly exciting world
            of Information Technology.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">My story</h2>
          <hr />
          <p>
            From my early days in programming, I understand the feeling of being
            &quot;lost&quot; amidst the countless new technologies that emerge
            every day. I used to spend hours fixing a small bug or struggling to
            optimize a user interface.
          </p>
          <p>
            That&apos;s why this blog was created: to simplify complex things. I
            want to share what I&apos;ve learned, from managing application
            state (State Management) to building real-time chat systems and
            designing standard UI/UX interfaces.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">What will you find here?</h2>
          <hr />
          <p>
            On this blog, I focus on sharing:
            <ul className="list-disc list-inside mt-4">
              <li>
                <strong>Tutorials:</strong> Detailed step-by-step guides to
                building real-world applications (based on the React, Next.js,
                Node.js ecosystems, etc.).{" "}
              </li>
              <li>
                <strong>Tips & Tricks:</strong> Small tips to help you write
                cleaner, more efficient code and increase your productivity.
              </li>
              <li>
                <strong>Technological Perspective:</strong> Real-world
                experiences in project development and the path to becoming a
                Fullstack Developer.
              </li>
            </ul>
          </p>
        </div>
        <p>
          I believe that every line of code we write has the potential to solve
          some problem in life. Hopefully, the insights shared here will provide
          some motivation or be helpful in your career path.
        </p>
        <p>
          <strong>Connect with me via:</strong> [GitHub] | [LinkedIn] | [Email]
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
