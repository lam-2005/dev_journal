import React from "react";

const LoginPage = () => {
  return (
    <div>
      <h1 className="font-extrabold text-3xl text-center mb-4">Sign In</h1>
      <p className="font-mono text-sm text-center mb-8">
        Enter your credentials to continue
      </p>
      <div className="w-full min-w-100 ">
        <form action="" className="space-y-6">
          <div className="flex flex-col gap-2 items-start">
            <label htmlFor="email" className="font-bold">
              Email *
            </label>
            <input
              type="text"
              name=""
              id="email"
              className="hover:bg-secondary-background focus:bg-secondary-background bg-[#E0E0E0] border-0 outline-none px-4 py-2 w-full"
            />
          </div>
          <div className="flex flex-col gap-2 items-start">
            <label htmlFor="password" className="font-bold">
              Password *
            </label>
            <input
              type="password"
              name=""
              id="password"
              className="hover:bg-secondary-background focus:bg-secondary-background bg-[#E0E0E0] border-0 outline-none px-4 py-2 w-full"
            />
          </div>
          <div className="font-mono text-sm underline text-end font-bold">
            Forgot Password?
          </div>
          <button className="font-mono bg-primary w-full p-3 font-bold mt-4">
            Sign In
          </button>
        </form>
      </div>
      <div className="font-mono text-sm text-center mt-8">
        Don&apos;t have an account?{" "}
        <span className="underline font-bold">Create an account</span>
      </div>
    </div>
  );
};

export default LoginPage;
