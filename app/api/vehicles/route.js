import { NextRequest, NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/node-postgres";
import { db } from "@/configs/db";
import { visitors } from "@/drizzle/schema";

export async function POST(req) {
  try {
    const { req_name, req_mobile } = await req.json();
    // const allUsers = await db.select().from(visitors);
    const updatedVisitor = await db
      .insert(visitors)
      .values({ name: req_name, mobile: req_mobile }).returning();
    return NextResponse.json({ message: "User created successfully", visitor: updatedVisitor}, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
