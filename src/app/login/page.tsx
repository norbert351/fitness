"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";

import { z } from "zod";
import Image from "next/image";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleToggle =() => {
      setShowPassword((prev) => !prev);
  }; 

  const {data: session} = useSession();
  if(session?.user) {
    redirect("/hero");
  }


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const credentialsAction = (data: LoginData) => {
    signIn("credentials", {
      email: data.email,
      password: data.password
    });
  };

  return (
    <div >
      <div className="relative text-white flex items-center justify-center p-4 py-28">
        <Image 
        src="/lo.jpg" 
        alt="background"
        fill
        style={{objectFit: "cover"}} 
        />
            <div className="absolute inset-0 bg-black/60"></div>
      <div className="w-full max-w-md space-y-8 relative">
        <form onSubmit={handleSubmit(credentialsAction)} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md">
          <div className="space-y-4">
                  <div className="text-center p-2">
          <h2 className="text-3xl font-bold text-black">Login to Your Account</h2>
        </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="email@example.com"
                className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm text-black border border-gray-300"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base pr-10 text-black"
                  {...register("password")}
                />
                     {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
                <button
                  onClick={handleToggle}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-black cursor-pointer"
                  type="button"
                >
                  {showPassword ? <IoMdEye size={20} /> : <IoIosEyeOff size={20} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-teal-500 hover:text-teal-400">
                Forgot password?
              </Link>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <span className="text-gray-500">Don&apos;t have an account? </span>
            <Link href="/register" className="text-teal-500 hover:underline">
              Register
            </Link>
          </div>

        <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-teal-500 hover:bg-teal-600"
          >
         Login
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default LoginPage;