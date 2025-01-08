"use client";

import { EventsType } from "@/types/eventType";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FocusCards } from "./ui/focus-cards";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { useEventStore } from "@/context/eventStore";

export const Events = () => {

  const { events, getEvents } = useEventStore();

  useEffect(() => {
    getEvents();
  }, []);
  return (
    <div>
      <BentoGrid className="max-w-4xl mx-auto">
        {events.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.location}
            description={item.description}
            header={item.title}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </div>
  );
};
