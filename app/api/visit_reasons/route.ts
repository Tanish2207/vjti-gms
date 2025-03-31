import { reasons } from "@/drizzle/schema";
import { NextResponse } from "next/server";
import { db } from "@/configs/db";

interface Reason {
  reasonId: number;
  reasonName: string;
}
export async function GET(): Promise<NextResponse> {
  try {
    const res: Reason[] = await db
      .select({
        get_id: reasons.id,
        get_reason: reasons.reasonName,
      })
      .from(reasons);

    return NextResponse.json(res);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
