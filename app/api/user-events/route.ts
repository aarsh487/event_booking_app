import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import prisma from "@/lib/prismadb";

// Get user specific events
export async function GET( req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Not logged in" },
        { status: 401 }
      );
    }

    const userExists = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!userExists) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const events = await prisma.event.findMany({
      where: {
        userId: session.user.id,
      },
    });

    if (!events) {
      return NextResponse.json({
        success: false,
        message: "Events not found",
        events,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Events found successfully",
      events,
    });
  } catch (error) {
    console.log("Error fetching event", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
