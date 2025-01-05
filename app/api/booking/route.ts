import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
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
              id: session.user.id
          }
      })
  
      if(!userExists){
          return NextResponse.json({
              success: false,
              message: "User not found"
          }, { status: 404 })
      }
  
      const bookedEvents = await prisma.booking.findMany({
          where: {
              userId: session.user.id,
          },
          include: { Event: true }
      })
  
      return NextResponse.json({
          success: true,
          message: "Event Booked Successfully",
          bookedEvents
      }, { status: 200 })
    } catch (error) {
      console.log("Error Booking Event", error)
      return NextResponse.json({
          success: false,
          message: "Internal Server Error"
      }, {status: 500 })
    }
  };