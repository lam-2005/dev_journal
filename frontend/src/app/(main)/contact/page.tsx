"use client";
import Heading from "@/components/Heading";
import useEmailStore, { EmailContactType } from "@/store/useEmailStore";
import { ChangeEvent, useState } from "react";

const ContactPage = () => {
  const { sendEmailContact, isSenđingEmailContact } = useEmailStore();
  const [data, setData] = useState<EmailContactType>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setData({ ...data, [name as keyof EmailContactType]: value });
  };

  const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendEmailContact(data);
    setData({ name: "", email: "", message: "" });
  };
  return (
    <div className="mt-20 ">
      <Heading>
        <span className="font-extrabold text-7xl">Contact</span>
      </Heading>
      <div className="container mt-20 max-w-200 space-y-15 font-mono ">
        <h1 className="font-light text-5xl font-sans">
          Get <span className="font-extrabold">in Touch</span>
        </h1>
        <p className="leading-7">
          Got feedback, ideas, or something you&apos;d like to share with us?
          Reach out anytime — we&apos;re here to listen and continuously improve
          the experience for our community.
        </p>
        <div className="space-y-2">
          <p>Call: 0352014626</p> <p>Email: phanlam6373@gmail.com</p>
        </div>
        <div className="space-y-7">
          <p>Or message me here:</p>
          <form action="" className="space-y-6" onSubmit={handleSendEmail}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Your name *</label>
              <input
                type="text"
                name="name"
                id="name"
                value={data.name}
                onChange={handleChange}
                className="hover:bg-secondary-background focus:bg-secondary-background bg-[#E0E0E0] border-0 outline-none px-4 py-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email *</label>
              <input
                type="text"
                name="email"
                id="email"
                value={data.email}
                onChange={handleChange}
                className="hover:bg-secondary-background focus:bg-secondary-background bg-[#E0E0E0] border-0 outline-none px-4 py-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message">Message *</label>
              <textarea
                name="message"
                id="message"
                value={data.message}
                onChange={handleChange}
                className="hover:bg-secondary-background focus:bg-secondary-background bg-[#E0E0E0] border-0 outline-none px-4 py-2 resize-none h-25"
              />
            </div>
            <button
              className="bg-primary w-full py-3 font-bold hover:brightness-50 cursor-pointer disabled:cursor-not-allowed"
              disabled={isSenđingEmailContact}
            >
              {isSenđingEmailContact ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
