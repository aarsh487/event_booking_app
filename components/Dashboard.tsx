"use client";
import React, { useEffect, useState } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useEventStore } from "@/context/eventStore";


export function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Bookings",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Create Event",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div></div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  const { userEvents, getUserEvents, getBookings } = useEventStore();

  useEffect(() => {
    getUserEvents();
    getBookings();
  },[])

  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-black flex flex-col gap-2 flex-1 w-full h-full text-white">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="h-20 w-full rounded-lg bg-black border-red-600 border text-center">
              <h1>Your Events</h1>
            </div>
            <div className="h-20 w-full rounded-lg bg-black border-red-600 border text-center">
              <h1>Your Bookings</h1>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="h-full w-full grid-cols-1 rounded-lg  bg-gray-100 dark:bg-neutral-800">
              {userEvents.map((userEvent, index) => (
                <Card key={index}>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <CardTitle>
                      {userEvent.title}
                    </CardTitle>

                  </CardContent>
              </Card>
              ))}
            
            </div>
            <div className="h-full w-full grid-cols-1 rounded-lg  bg-gray-100 dark:bg-neutral-800">
              {userEvents.map((userEvent, index) => (
                  <Card key={index}>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <CardTitle>
                        {userEvent.title}
                      </CardTitle>
                    </CardContent>
                </Card>
                ))}
            </div>
          </div>
         </div>
      </div>
    </div>
  );
};
