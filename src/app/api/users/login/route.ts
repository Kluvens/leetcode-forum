// app/api/login/route.ts
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

// Login a user
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Check if the user exists
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  // Check if the password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  // Store user session info (in a real app, you would use JWT or session management)
  return NextResponse.json(
    { message: "Login successful", user },
    { status: 200 }
  );
}
