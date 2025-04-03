import { reasons } from "@/drizzle/schema";
import { NextResponse } from "next/server";
import { db } from "@/configs/db";

interface Reason {
  get_id: number;
  get_reason: string;
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
  } catch (error: unknown) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
