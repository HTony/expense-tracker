"use client";
import LoginWithGithub from "@/components/LoginWithGithub";
import { login, signup } from "@/app/auth/actions";
import { useState } from "react";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  return (
    <main className="h-screen flex justify-center items-center">
      <div className="min-w-96 flex flex-col gap-6 rounded-lg shadow-xl px-8 py-4 bg-slate-50">
        <h3 className="w-full text-center text-3xl">Expense Tracker</h3>
        <LoginWithGithub />
        <hr
          data-content="or"
          className="
          relative leading-4 text-black text-center h-6 opacity-50 border-none
          before:content-[''] before:absolute before:w-full before:h-[1px] before:top-2/4 before:left-0 before:bg-gray-400
          after:content-[attr(data-content)] after:relative after:inline-block after:text-black after:px-2 after:leading-6 after:bg-slate-50
          "
        />
        <form className="flex flex-col justify-center gap-6">
          <div className="flex gap-1 justify-between items-center">
            <label htmlFor="email" className="w-3/12">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="py-1 px-2 w-9/12 rounded-md border border-gray-400 border-solid"
            />
          </div>
          <div className="flex gap-1 justify-between items-center">
            <label htmlFor="password" className="w-3/12">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="py-1 px-2 w-9/12 rounded-md border border-gray-400 border-solid"
            />
          </div>
          {isLogin ? (
            <>
              <button
                formAction={login}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-800"
              >
                Login
              </button>
              <p className="text-center">
                New to Expense Tracker?{" "}
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => setIsLogin(false)}
                >
                  Sign up
                </span>
              </p>
            </>
          ) : (
            <>
              <button
                formAction={signup}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-800"
              >
                Sign Up
              </button>
              <p className="text-center">
                Already on Expense Tracker?{" "}
                <span
                  className="text-blue-600 cursor-pointer underline"
                  onClick={() => setIsLogin(true)}
                >
                  Log in
                </span>
              </p>
            </>
          )}
        </form>
      </div>
    </main>
  );
};

export default AuthForm;
