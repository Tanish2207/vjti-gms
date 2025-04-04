import { NextRequest, NextResponse } from "next/server";
import { db } from "@/configs/db";
import { visitors, humanVisits } from "@/drizzle/schema";
import { eq, ilike, or } from "drizzle-orm";
import moment from "moment";

interface VisitorRequestBody {
  name: string;
  mobile: string;
}

interface Visitor {
  prevVisId: number;
  prevVisName: string;
}

interface HumanVisit {
  visitorId: number;
  entryTime: string | null;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: VisitorRequestBody = await req.json();
    const { name: reqName, mobile: reqMobile } = body;

    const prevVisitor: Visitor[] = await db
      .select({
        prevVisId: visitors.visitorId,
        prevVisName: visitors.name,
      })
      .from(visitors)
      .where(eq(visitors.mobile, reqMobile));

    let globalVisitorId: number;
    if (prevVisitor.length > 0) {
      console.log("previous visitor found", prevVisitor);
      globalVisitorId = prevVisitor[0].prevVisId;
    } else {
      const vst = await db
        .insert(visitors)
        .values({
          name: reqName,
          mobile: reqMobile,
        })
        .returning({
          id: visitors.visitorId,
        });

      console.log(vst);
      globalVisitorId = vst[0].id;
    }

    const humanVisit: HumanVisit[] = await db
      .insert(humanVisits)
      .values({
        visitorId: globalVisitorId,
        entryTime: moment().toISOString(),
      })
      .returning();

    console.log(humanVisit);

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const term = url.searchParams.get("term") || "";

    const res = await db
      .select({
        get_name: visitors.name,
        get_mobile: visitors.mobile,
        get_entry: humanVisits.entryTime,
        get_exit: humanVisits.exitTime,
        get_id: humanVisits.visitId,
      })
      .from(visitors)
      .innerJoin(humanVisits, eq(visitors.visitorId, humanVisits.visitorId))
      .where(or(ilike(visitors.name, `%${term}%`), ilike(visitors.mobile, `%${term}%`)));

    return NextResponse.json(res, { status: 200 });
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
