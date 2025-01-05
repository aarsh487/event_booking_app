import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import prisma from "@/lib/prismadb";
import { updateEventSchema } from "@/schemas/eventschema";

// Delete user specific event
export async function DELETE(
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
          return NextResponse.json(
              { success: false, message: "User not found" },
              { status: 404 }
            );
      }
  
      const events = await prisma.event.delete({
          where: {
            id: eventId,
            userId: session.user.id
          }
      });
  
      return NextResponse.json({
          success: true,
          message: "Events deleted successfully",
          events
      })
    } catch (error) {
      console.log("Error deleting event", error);
      return NextResponse.json(
        { success: false, message: "Internal Server Error" },
        { status: 500 }
      );
    }
};
  
// Update user specific event
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    try {
      const session = await getServerSession(authOptions);
      const eventId = (await params).id;

      const body = await req.json();
      const { data, error } = updateEventSchema.safeParse(body);

      if(error){
        return NextResponse.json(
            { success: false, message: error.issues.map((err) => err.message) },
            { status: 400 }
          );
      }
  
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
          return NextResponse.json(
              { success: false, message: "User not found" },
              { status: 404 }
            );
      }
  
      const events = await prisma.event.update({
          where: {
            id: eventId,
            userId: session.user.id
          },
          data: {
            ...(data.title && {title: data.title}),
            ...(data.description && {description: data.description}),
            ...(data.date && {date: data.date}),
            ...(data.location && {location: data.location}),
          }
      });
  
      return NextResponse.json({
          success: true,
          message: "Event updated successfully",
          events
      })
    } catch (error) {
      console.log("Error updating event", error);
      return NextResponse.json(
        { success: false, message: "Internal Server Error" },
        { status: 500 }
      );
    }
};
  