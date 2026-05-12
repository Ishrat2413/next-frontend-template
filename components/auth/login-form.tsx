"use client";

import { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { DEMO_USERS } from "@/constants/demo-users";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = DEMO_USERS.find((u) => u.email === email);
    if (user) {
      login(email);
      router.push("/dashboard");
    } else {
      setError("Invalid demo credentials. Use one of the accounts below.");
    }
  };

  return (
    <section className='flex min-h-screen w-full'>
      {/* Left: Image */}
      <div className='hidden lg:flex w-1/2 bg-slate-900 relative'>
        <div className='absolute inset-0 bg-linear-to-tr from-blue-600/50 to-purple-600/50' />
        <div className='relative z-10 flex flex-col justify-center px-12 text-white'>
          <h2 className='text-4xl font-bold mb-6'>Welcome Back</h2>
          <p className='text-lg text-slate-200'>
            Log in to continue your journey and manage your dashboard.
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
            <h1 className='text-3xl font-bold'>Sign In</h1>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            {error && (
              <div className='text-red-500 text-sm bg-red-50 p-3 rounded'>
                {error}
              </div>
            )}

            <input
              type='email'
              placeholder='Email'
              className='w-full p-4 border rounded-xl'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <button
              type='submit'
              className='w-full p-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all font-semibold'>
              Sign In
            </button>
          </form>

          <div>
            Didn&apos;t have an account?{" "}
            <Link
              href='/signup'
              className='text-blue-600 font-semibold hover:underline'>
              Sign up
            </Link>
          </div>

          <div className='border-t pt-8'>
            <p className='text-sm text-slate-500 mb-4'>
              Demo Accounts (Click to autofill):
            </p>
            <div className='grid gap-2'>
              {DEMO_USERS.map((user) => (
                <button
                  key={user.email}
                  onClick={() => {
                    setEmail(user.email);
                    setPassword("password123");
                  }}
                  className='w-full p-3 border rounded-lg text-left text-sm hover:bg-slate-50'>
                  <span className='font-medium'>{user.email}</span> -{" "}
                  <span className='text-slate-400'>{user.role}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
