import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { keys } from "@/drizzle/schema";

export async function POST(req) {
  try {
    const body = await req.json();
    const { keyId: reqKeyId, room: reqRoom } = body;
    const res = await db
      .insert(keys)
      .values({
        keyId: reqKeyId,
        room: reqRoom,
      })
      .returning();

    console.log(res);

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    if (error.code === "23505") {
      console.log("Unique constraint violation: ", error.detail);
      return NextResponse.json(
        {
          message: "Key ID already exists",
        },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: error });
  }
}

export async function GET() {
  try {
    const res = await db
      .select({
        // get_staff_id: staff.staffId,
        get_key_id: keys.keyId,
        get_room: keys.room,
      })
      .from(keys);

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}
