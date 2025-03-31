import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { staff } from "@/drizzle/schema";

export async function GET() {
  try {
    const res = await db
      .select({
        // get_staff_id: staff.staffId,
        get_name: staff.name,
        get_mobile: staff.mobile,
      })
      .from(staff);

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}

export async function POST(req) {
  try {
    console.log(req)
    const body = await req.json();
    const { name: reqName, mobile: reqMobile } = body;
    const res = await db
      .insert(staff)
      .values({
        name: reqName,
        mobile: reqMobile,
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
          message: "Mobile number already exists",
        },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: error });
  }
}
