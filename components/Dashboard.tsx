"use client";
import { EventsType } from "@/types/eventType";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { PiNumberSevenThin } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatDate } from "@/constants/formatDate";
import { Github, Linkedin, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Dashboard = () => {
  const [events, setEvents] = useState<EventsType[]>([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const { data: session, status } = useSession();

  const getEvents = async () => {
    setIsLoading(true);

    try {
      const result = await axios.get("/api/event");
      if (result.data.success) {
        setEvents(result.data.events || []);
        return;
      }
      setError(result.data.error || "Unexpected Error occured");
    } catch (error) {
      console.log("Error in getting events", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <main className="bg-black text-white p-10">
      <section>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <PiNumberSevenThin className="text-red-600" size={50} />
            <h1 className="text-3xl font-thin">Evento</h1>
          </div>
          <div className="flex items-center gap-8">
            <h4 className="hover:text-neutral-400 cursor-pointer">Home</h4>
            <h4 className="hover:text-neutral-400 cursor-pointer">Dashboard</h4>
            <h4 className="hover:text-neutral-400 cursor-pointer">Bookings</h4>
            <h4 className="hover:text-neutral-400 cursor-pointer">Contact</h4>
          </div>
        </div>
        <div className="relative overflow-hidden flex p-12">
          <img
            className="relative top-0 inset-[650px] h-[800px]"
            src="/bg-image.png"
            alt="Background image"
          />
          <h1 className="absolute mt-40 max-w-[900px] text-[7rem] leading-[120px] tracking-tighter">
            Where Memories Begin: Your Event, Your Way!
          </h1>
        </div>
      </section>

      {/* hero item  */}
      <div className="p-48">
        <Carousel
          className="w-full max-w-sm"
          plugins={[Autoplay({ delay: 2000 })]}
        >
          <CarouselContent className="-ml-1">
            {events.map((event, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1 min-w-72 max-w-72">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <div className="mt-48 mr-20">
                        <p>{event.location}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(event.date)}
                        </p>
                      </div>
                    </CardContent>
                    <CardHeader>
                      <CardTitle>{event.title}</CardTitle>
                    </CardHeader>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
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
