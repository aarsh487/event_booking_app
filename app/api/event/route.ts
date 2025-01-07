import { eventSchema } from "@/schemas/eventschema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import prisma from "@/lib/prismadb";

// create an event
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Not logged in" },
        { status: 401 }
      );
    }
    const user = session.user;

    const body = await req.json();
    const { data, error } = eventSchema.safeParse(body);

    if (error) {
      return NextResponse.json(
        { success: false, message: error.issues.map((err) => err.message) },
        { status: 400 }
      );
    }

    const newEvent = await prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        location: data.location,
        userId: user.id,
      },
    });

    return NextResponse.json(
      { success: true, message: "Event created successfully", newEvent },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error creating event", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};


// Get all events
export async function GET(req: NextRequest) {
    try {
        const events = await prisma.event.findMany();
        return NextResponse.json(
            { success: true, message: "Event fetched successfully", events },
            { status: 201 }
          );
    } catch (error) {
        console.log("Error fetching events", error);
        return NextResponse.json(
        { success: false, message: "Internal Server Error" },
        { status: 500 }
        );
    }
};
