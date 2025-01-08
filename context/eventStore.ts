import axios from "axios";
import { create } from "zustand";

interface EventType {
  id: string; // or number, depending on your data structure
  location: string;
  description: string;
  title: string;
  date: string;
}

interface ContentStore {
  events: EventType[];
  userEvents: EventType[];
  bookedEvents: EventType[];
  isLoading: boolean;
  error: null;

  getEvents: () => Promise<void>;
  getUserEvents: () => Promise<void>;
  getBookings: () => Promise<void>;
}

export const useEventStore = create<ContentStore>((set) => ({
  isLoading: false,
  events: [],
  userEvents: [],
  bookedEvents: [],
  error: null,

  getEvents: async () => {
    set({ isLoading: true });

    try {
      const result = await axios.get("/api/event");
      if (result.data.success) {
        set({ events: result.data.events || [] });
        return;
      }
      set({ error: result.data.error || "Unexpected Error occured" });
    } catch (error) {
      console.log("Error in getting events", error);
    } finally {
      set({ isLoading: false });
    }
  },

  getUserEvents: async () => {
    set({ isLoading: true });

    try {
      const result = await axios.get("/api/user-events");
      if (result.data.success) {
        set({ userEvents: result.data.events || [] });
        return;
      }
      set({ error: result.data.error || "Unexpected Error occured" });
    } catch (error) {
      console.log("Error in getting events", error);
    } finally {
      set({ isLoading: false });
    }
  },

  getBookings: async () => {
    set({ isLoading: true });

    try {
      const result = await axios.get("/api/booking");
      if (result.data.success) {
        set({ bookedEvents: result.data.bookedEvents.events || [] });
        return;
      }
      set({ error: result.data.error || "Unexpected Error occured" });
    } catch (error) {
      console.log("Error in getting events", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
