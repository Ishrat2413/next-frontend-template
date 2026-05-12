"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  return (
    <div className='flex min-h-screen w-full'>
      {/* Left: Image */}
      <div className='hidden lg:flex w-1/2 bg-slate-900 relative'>
        <div className='absolute inset-0 bg-linear-to-tr from-green-600/50 to-emerald-600/50' />
        <div className='relative z-10 flex flex-col justify-center px-12 text-white'>
          <h2 className='text-4xl font-bold mb-6'>Create Account</h2>
          <p className='text-lg text-slate-200'>
            Join our platform to get started with your dashboard experience.
          </p>
        </div>
      </div>

      {/* Right: Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-8 bg-white'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center'>
            <Link
              href='/'
              className='text-4xl font-bold text-center block mb-8'>
              Logo
            </Link>
            <h1 className='text-3xl font-bold'>Sign Up</h1>
            <p className='text-slate-500 mt-2'>
              Start your demo journey today.
            </p>
          </div>

          <div className='space-y-4'>
            <input
              type='email'
              placeholder='Email'
              className='w-full p-4 border rounded-xl'
              required
            />
            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                placeholder='Password'
                className='w-full p-4 pr-12 border rounded-xl'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700'>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button className='w-full p-4 bg-black text-white rounded-xl hover:bg-slate-800 transition-all font-semibold'>
              Create Account
            </button>
          </div>

          <p className='text-center text-sm text-slate-600'>
            Already have an account?{" "}
            <Link
              href='/login'
              className='text-blue-600 font-semibold hover:underline'>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
