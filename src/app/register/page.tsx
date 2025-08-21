"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { register } from "@/action/user";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import Image from "next/image";

// Define your schema with Zod
const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  Confirmpassword: z.string()
}).refine((data) => data.password === data.Confirmpassword, {
  message: "Passwords don't match",
  path: ["Confirmpassword"],
});

type FormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { data: session } = useSession();
  if (session?.user) {
    redirect("/login");
  }

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });
console.log(errors);

const onSubmit = async (data: FormData) => {
  try {
    const formData = new FormData();
    formData.set("email", data.email);
    formData.set("username", data.username);
    formData.set("password", data.password);
    formData.set("Confirmpassword", data.Confirmpassword);
    
    await register(formData);
  } catch (error) {
    console.error("Registration failed:", error);
  }
};
  return (
    <div className=" ">
        <div className="relative h-screen w-full text-white flex items-center justify-center p-4 py-28">
        <Image 
        src="/bg.jpg" 
        alt="Backgrund"
        fill
        style={{objectFit: "cover"}}
        />
            <div className="absolute inset-0 bg-black/60"></div>

      <div className="w-full max-w-md space-y-8 relative">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md">
          <div className="space-y-4">
               <div className="text-center p-2">
          <h2 className="text-3xl font-bold text-black">Create An Account</h2>
        </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="email"
                className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm text-black"
                {...formRegister("email")}
              />
              {errors.email ? (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              ) : (
                  <p className="h-3 text-xs text-red-600"></p>
              )
              }
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="username"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm text-black"
                {...formRegister("username")}
              />
              {errors.username ? (
                <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
              ):(
                <p className="h-3 text-xs text-red-600"></p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  id="password"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base pr-10 text-black"
                  {...formRegister("password")}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-black cursor-pointer"
                  type="button"
                >
                  {showPassword ? <IoMdEye size={20} /> : <IoIosEyeOff size={20} />}
                </button>
              </div>
              {errors.password ? (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              ) : (
                       <p className="h-3 text-xs text-red-600"></p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirmpassword"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base pr-10 text-black"
                  {...formRegister("Confirmpassword")}
                />
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-black cursor-pointer"
                  type="button"
                >
                  {showConfirmPassword ? <IoMdEye size={20} /> : <IoIosEyeOff size={20} />}
                </button>
              </div>
              {errors.Confirmpassword ? (
                <p className="mt-1 text-sm text-red-600">{errors.Confirmpassword.message}</p>
              ):(
                <p className="h-3 text-xs text-red-600"></p>
              )}
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <span className="text-gray-500">Already have an account? </span>
            <Link href="/login" className="text-teal-500 hover:underline">
              Login
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default RegisterPage;