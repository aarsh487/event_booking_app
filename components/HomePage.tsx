"use client";
import React, { useEffect, useState } from "react";
import { PiNumberSevenThin } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
import { Github, Linkedin, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { WavyBackground } from "./ui/wavy-background";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { useRouter } from "next/navigation";
import { useEventStore } from "@/context/eventStore";

export const HomePage = () => {
  const router = useRouter();

   const { events, getEvents } = useEventStore();
  
    useEffect(() => {
      getEvents();
    }, []);

  return (
    <main className="bg-black text-white p-10">
      <section>
        <WavyBackground
          colors={["#E53935", "#ffffff"]}
          className="max-w-full mx-auto bottom-28 flex flex-col gap-12"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <PiNumberSevenThin className="text-red-600" size={50} />
              <h1 className="text-3xl font-thin">Evento</h1>
            </div>
            <div className="flex items-center gap-8">
              <h4 className="hover:text-neutral-400 cursor-pointer">Home</h4>
              <h4 className="hover:text-neutral-400 cursor-pointer" onClick={() => router.push('/events')}>Events</h4>
              <h4 className="hover:text-neutral-400 cursor-pointer" onClick={() => router.push('/dashboard')}>
                Dashboard
              </h4>
              <h4 className="hover:text-neutral-400 cursor-pointer">Contact</h4>
            </div>
          </div>
          <h1 className="text-[5rem] sm:text-[6rem] leading-tight tracking-tighter p-20">
            Where{" "}
            <span style={{ color: "#E53935", fontWeight: "50" }}>Memories</span>{" "}
            Begin: <br className="hidden sm:block" /> Your Event, Your Way!
          </h1>
        </WavyBackground>
      </section>

      {/* hero item  */}
      <div className="p-48">
        <InfiniteMovingCards items={events} direction="right" speed="fast" />
      </div>

      <Separator className="" />

      {/* about us  */}
      <div className="flex flex-col items-center gap-4 p-20">
        <h4 className="text-lg">About Evento</h4>
        <h1 className="text-4xl text-center max-w-[950px]">
          "Unlock the magic of unforgettable events with just a click! Discover
          how easy it is to bring your vision to life
        </h1>
        <button className="rounded-full hover:bg-red-600 p-4 bg-black ring-2 ring-red-600">
          Learn More
        </button>
      </div>

      <Separator className="" />

      {/* metrics  */}
      <div className="p-20">
        <div className="flex justify-between gap-20">
          <h1 className="text-6xl font-bold">
            Plan. Book. Celebrate – It's That Simple!.
          </h1>
          <h4 className="text-md">
            We operate on a simple yet effective model: connect, book,
            celebrate.Allowing our clients to focus on what truly
            matters—enjoying their special moments with friends, family, or
            colleagues.
          </h4>
        </div>
        <div className="flex justify-between gap-16 pt-32">
          <div>
            <h1 className="text-red-600 font-semibold text-2xl">1300+</h1>
            <h4 className="text-red-600 font-semibold text-xl">
              Events per year
            </h4>
            <p>
              Experince a vibrant array of performances and events with Evento,
              Showcasing the best in artistic talent
            </p>
          </div>
          <div>
            <h1 className="text-red-600 font-semibold text-2xl">85%</h1>
            <h4 className="text-red-600 font-semibold text-xl">
              User Satisfaction
            </h4>
            <p>
              Experince a vibrant array of performances and events with Evento,
              Showcasing the best in artistic talent
            </p>
          </div>
          <div>
            <h1 className="text-red-600 font-semibold text-2xl">80k+</h1>
            <h4 className="text-red-600 font-semibold text-xl">Bookings</h4>
            <p>
              Experince a vibrant array of performances and events with Evento,
              Showcasing the best in artistic talent
            </p>
          </div>
          <div>
            <h1 className="text-red-600 font-semibold text-2xl">1300+</h1>
            <h4 className="text-red-600 font-semibold text-xl">
              Events per year
            </h4>
            <p>
              Experince a vibrant array of performances and events with Evento,
              Showcasing the best in artistic talent
            </p>
          </div>
        </div>
      </div>

      <Separator className="" />

      {/* footer  */}
      <footer className="flex justify-between p-32">
        <div>
          <div className="flex items-center">
            <PiNumberSevenThin className="text-red-600" size={50} />
            <h1 className="text-3xl font-thin">Evento</h1>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <Linkedin />
          <Mail />
          <FaXTwitter />
          <Github />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-bold">Navigate</h1>
          <p className="hover:text-neutral-400 cursor-pointer">Home</p>
          <p className="hover:text-neutral-400 cursor-pointer">Events</p>
          <p className="hover:text-neutral-400 cursor-pointer">About us</p>
          <p className="hover:text-neutral-400 cursor-pointer">Dashboard</p>
        </div>
      </footer>
    </main>
  );
};
