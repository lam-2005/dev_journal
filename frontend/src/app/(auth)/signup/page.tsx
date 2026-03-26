"use client";

import useAuthStore from "@/store/useAuthStore";
import { ChangeEvent, FormEvent, useState } from "react";

export type FormdataType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpPage = () => {
  const { signup, authUser } = useAuthStore();

  const [formdata, setFormdata] = useState<FormdataType>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name as keyof FormdataType]: value });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await signup(formdata);
  };

  return (
    <div>
      <h1 className="font-extrabold text-3xl text-center mb-4">Sign Up</h1>
      <p className="font-mono text-sm text-center mb-8">
        Sign up to explore posts, share your ideas.
      </p>
      <div className="w-full min-w-100 ">
        <form action="" className="space-y-6" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2 items-start">
            <label htmlFor="username" className="font-bold">
              Username *
            </label>
            <input
              type="text"
              name="name"
              onChange={onChange}
              id="username"
              value={formdata.name}
              className="hover:bg-secondary-background focus:bg-secondary-background bg-[#E0E0E0] border-0 outline-none px-4 py-2 w-full"
            />
          </div>
          <div className="flex flex-col gap-2 items-start">
            <label htmlFor="email" className="font-bold">
              Email *
            </label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={onChange}
              value={formdata.email}
              className="hover:bg-secondary-background focus:bg-secondary-background bg-[#E0E0E0] border-0 outline-none px-4 py-2 w-full"
            />
          </div>
          <div className="flex flex-col gap-2 items-start">
            <label htmlFor="password" className="font-bold">
              Password *
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={onChange}
              value={formdata.password}
              className="hover:bg-secondary-background focus:bg-secondary-background bg-[#E0E0E0] border-0 outline-none px-4 py-2 w-full"
            />
          </div>
          <div className="flex flex-col gap-2 items-start">
            <label htmlFor="confirmPassword" className="font-bold">
              Confirm password *
            </label>
            <input
              type="text"
              name="confirmPassword"
              id="confirmPassword"
              value={formdata.confirmPassword}
              onChange={onChange}
              className="hover:bg-secondary-background focus:bg-secondary-background bg-[#E0E0E0] border-0 outline-none px-4 py-2 w-full"
            />
          </div>
          <button className="font-mono bg-primary w-full p-3 font-bold mt-4">
            Create an account
          </button>
        </form>
      </div>
      <div className="font-mono text-sm text-center mt-8">
        Already have an account?{" "}
        <span className="underline font-bold">Sign In</span>
      </div>
    </div>
  );
};

export default SignUpPage;
