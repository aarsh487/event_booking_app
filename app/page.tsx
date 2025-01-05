"use client"
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status} = useSession();

  return (
    <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center">
            <div className="border p-8 rounded">
                <div>
                    Name:{session?.user.username}
                </div>
            </div>
        </div>
    </div>
  );
}
