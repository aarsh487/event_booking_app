import { z } from 'zod';

export const eventSchema = z.object({
    title: z.string().min(1, "Title must not be empty"),
    description: z.string().min(10, "Description must have at least 10 characters"),
    date: z.string().date(),
    location: z.string().min(1, "Location must not be empty"),
});

export const updateEventSchema = z.object({
    title: z.string().min(1, "Title must not be empty"),
    description: z.string().min(10, "Description must have at least 10 characters"),
    date: z.string().date(),
    location: z.string().min(1, "Location must not be empty"),
}).partial();