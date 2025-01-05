import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { signUpSchema } from "@/schemas/signUpSchema";
import bcrypt from "bcrypt";

export async function GET() {
  const user = await prisma.user.findFirst({});

  if(!user){
    return NextResponse.json(
      { sucess: false, message: "User Not Found" },
      { status: 404 }
    );
  }
  return Response.json({ name: user?.username, email: user?.email });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // should add zod validation here

    const { data, error } = signUpSchema.safeParse(body);
    if (data) {
      const user = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (user) {
        return NextResponse.json(
          { sucess: true, message: "User already exists" },
          { status: 403 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = await prisma.user.create({
          data: {
            username: data.username,
            password: hashedPassword,
            email: data.email,
          },
        });
      }
    } else {
      return NextResponse.json(
        { sucess: false, message: error.issues.map((err) => err.message) },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { sucess: true, message: "Signed up" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in sign up:", error);
    return NextResponse.json(
      { sucess: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
