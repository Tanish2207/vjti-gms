import { NextRequest, NextResponse } from "next/server";
import { db } from "@/configs/db";
import { humanVisits } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

interface RequestBody {
  visit_id: number;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: RequestBody = await req.json();

    const del = await db
      .delete(humanVisits)
      .where(eq(humanVisits.visitId, body.visit_id))
      .returning();

    if (del.length === 0) {
      return NextResponse.json(
        { message: "Visit ID not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Visit deleted successfully", data: del },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
