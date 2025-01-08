'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { PiNumberSevenThin } from "react-icons/pi";

export const Navbar = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
  return (
    <nav className="bg-black text-white py-10 px-60">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <PiNumberSevenThin className="text-red-600" size={50} />
          <h1 className="text-3xl font-thin">Evento</h1>
        </div>
        <div className="flex items-center gap-8">
          <h4 className="hover:text-neutral-400 cursor-pointer" onClick={() => router.push("/")}>Home</h4>
          <h4 className="hover:text-neutral-400 cursor-pointer">Events</h4>
          <h4
            className="hover:text-neutral-400 cursor-pointer"
            onClick={() => router.push("/dashboard")}
          >
            Dashboard
          </h4>
          <h4 className="hover:text-neutral-400 cursor-pointer">Contact</h4>
        </div>
      </div>
    </nav>
  );
};
