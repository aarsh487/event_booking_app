import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import prisma from "@/lib/prismadb";

// booking event
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const eventId = (await params).id;

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
        })
    }

    const bookEvent = await prisma.booking.create({
        data: {
            userId: session.user.id,
            eventId
        }
    })

    return NextResponse.json({
        success: true,
        message: "Event Booked Successfully"
    })
  } catch (error) {
    console.log("Error Booking Event", error)
    return NextResponse.json({
        success: false,
        message: "Internal Server Error"
    })
  }
};

// cancel booking 
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    try {
      const session = await getServerSession(authOptions);
      const bookingId = (await params).id;
  
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
          })
      }
  
      const cancelEvent = await prisma.booking.delete({
          where: {
            id: bookingId,
            userId: session.user.id
          }
      })
  
      return NextResponse.json({
          success: true,
          message: "Event Booked Successfully"
      })
    } catch (error) {
      console.log("Error Booking Event", error)
      return NextResponse.json({
          success: false,
          message: "Internal Server Error"
      })
    }
  };


  
  