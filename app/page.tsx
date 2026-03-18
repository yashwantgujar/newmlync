"use client";

import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const API = "http://localhost:5000/api/v1/auth";

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Email not valid"),
  password: z.string().min(6, "Password should be 6 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function AuthPage() {

  const [login, setLogin] = useState(true);
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState:{ errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const submitForm = async (data:FormData) => {

    try{

      if(login){

        const response = await axios.post(API + "/login",{
          email:data.email,
          password:data.password
        });

        localStorage.setItem("token",response.data.token);
        alert(response.data.message);

      }else{

        const response = await axios.post(API + "/register",{
          name:data.name,
          email:data.email,
          password:data.password
        });

        alert(response.data.message);
        setLogin(true);
        reset();
      }

    }catch(err:any){
      alert(err?.response?.data?.message || "Error");
    }

  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4">

<div
  className="absolute inset-0"
  style={{
    background: "linear-gradient(180deg, #f8ebeb 0%, #dff3ff 40%, #bbe4f8 100%)",
    zIndex: 0,
  }}
/>


<div
  className="absolute inset-0"
  style={{
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
    zIndex: 1,
    maskImage: "linear-gradient(to bottom, transparent 0%, black 40%, black 100%)",
  }}
/>

      <div className="relative z-10 w-full max-w-[400px] flex flex-col items-center">

    
        <div className="mb-5">
          <div className="w-66 h-28">
            <img
              src="/logo.jpeg"
              alt="logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

   
        <div className="w-full bg-white border border-slate-200 rounded-full p-1.5 flex mb-5">

          <button
            type="button"
            onClick={()=>setLogin(true)}
            className={`flex-1 py-2 rounded-full text-sm font-semibold ${
              login ? "bg-sky-400 text-white":"text-slate-400"
            }`}
          >
            Sign in
          </button>

          <button
            type="button"
            onClick={()=>setLogin(false)}
            className={`flex-1 py-2 rounded-full text-sm font-semibold ${
              !login ? "bg-sky-400 text-white":"text-slate-400"
            }`}
          >
            Sign up
          </button>

        </div>

         <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {login ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-slate-500 mt-1 mb-2 text-sm">
            {login ? "Enter your details to access your account" : "Join us and start your journey today"}
          </p>

        <form
          onSubmit={handleSubmit(submitForm)}
          className="w-full space-y-5"
        >

          {!login && (
            <input
              {...register("name")}
              placeholder="Name"
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white"
            />
          )}

          <div>
            <input
              {...register("email")}
              placeholder="Email"
              className="w-full px-5 py-4 rounded-2xl border border-slate-200  bg-white"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">

            <input
              {...register("password")}
              type={show ? "text":"password"}
              placeholder="Password"
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white"
            />


            {login && (
  <div className="flex justify-end mt-3">
    <button
      type="button"
      className="text-xs font-bold text-black hover:text-gray-600 transition-colors"
    >
      Forgot Password?
    </button>
  </div>
)}
            <button
              type="button"
              onClick={()=>setShow(!show)}
              className="absolute right-4 top-4 text-gray-500"
            >
              {show ? <EyeOff size={20}/> : <Eye size={20}/>}
            </button>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}

          </div>

          <button
            type="submit"
            className="w-full bg-sky-400 text-white py-4 rounded-2xl font-bold"
          >
            {login ? "Sign in":"Sign up"}
          </button>

        
          <div className="flex items-center gap-3">
            <div className="flex-1 h-[1px] bg-slate-200"></div>
            <p className="text-xs text-slate-400">OR CONTINUE WITH</p>
            <div className="flex-1 h-[1px] bg-slate-200"></div>
          </div>

      
<div className="flex gap-4">

 
  <button
    type="button"
    className="flex-1 flex items-center justify-center gap-2 border border-slate-200 py-3 rounded-xl bg-white"
  >
    <img
      src="https://www.svgrepo.com/show/475656/google-color.svg"
      className="w-5 h-5"
    />
    <span className="text-sm text-black">Google</span>
  </button>


  <button
    type="button"
    className="flex-1 flex items-center justify-center gap-2 border border-slate-200 py-3 rounded-xl bg-black"
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
      className="w-5 h-5 invert" 
    />
    <span className="text-sm text-white">Apple</span>
  </button>

</div>
        </form>

      </div>
    </div>
  );
}