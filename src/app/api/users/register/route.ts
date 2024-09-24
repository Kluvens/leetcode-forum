// app/api/register/route.ts
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

// Register a new user
export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the new user in the database
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: name || "Guest User", // Default name if not provided
    },
  });

  return NextResponse.json(
    { message: "User registered successfully", user },
    { status: 201 }
  );
}
