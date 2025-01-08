"use client"
import { HomePage } from "@/components/HomePage";
import { useSession } from "next-auth/react";

export default function Home() {
  return <HomePage/>
}
