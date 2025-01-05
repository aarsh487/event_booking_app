"use client";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useState } from "react";

export function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async() => {
    const result = await signIn("credentials", {
        redirect: false,
        email,
        password
    })
    router.push('/')
  }

  return (
    <div>
     <div className="text-end p-10">
  <Link 
    className="text-xs font-bold border-transparent hover:border-black relative transition-all duration-500 ease-in-out group"
    href="/signup"
  >
    CREATE ACCOUNT
    <span 
      className="absolute left-0 bottom-[-4px] h-[1.5px] w-full bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-in-out"
    ></span>
  </Link>
</div>
      <div className="flex justify-center flex-col">
        <div className="flex justify-center">
          <div className="block max-w-sm p-6 ">
            <div className="flex flex-col gap-4">
              <div className="px-10">
                <div className="text-2xl font-bold">Log into evento</div>
              </div>
              <div className="pt-2 flex flex-col gap-8">
                <LabelledInput
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  label="EMAIL ADDRESS"
                  placeholder="name@example.com"
                />
                <LabelledInput
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  label="PASSWORD"
                  type={"password"}
                  placeholder="Password"
                />
                <button
                  onClick={ () => handleLogin()}
                  type="button"
                  className="w-full text-white bg-gray-800 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 me-2 mb-2"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LabelledInput({
  label,
  placeholder,
  type,
  onChange,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-[0.6rem] text-neutral-600 tracking-widest pt-2">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-[#ffffff] border-b border-gray-300 text-gray-900 text-sm outline-none focus:border-black focus:scale-x-100 transition-all duration-500 w-full px-0.5 py-3"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
