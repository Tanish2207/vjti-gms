import { NextRequest, NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/node-postgres";
import { db } from "@/configs/db";
import { visitors, humanVisits } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import moment from "moment";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name: reqName, mobile: reqMobile } = body;
    const prevVisitor = await db
      .select({
        prevVisId: visitors.visitorId,
        prevVisName: visitors.name,
      })
      .from(visitors)
      .where(eq(visitors.mobile, reqMobile));

    let globalVisitorId;
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
    // console.log("global vis id = ", globalVisitorId);

    console.log(
      await db
        .insert(humanVisits)
        .values({
          visitorId: globalVisitorId,
          entryTime: moment(),
        })
        .returning()
    );

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const res = await db
      .select({
        get_name: visitors.name,
        get_mobile: visitors.mobile,
        get_entry: humanVisits.entryTime,
        get_exit: humanVisits.exitTime,
        get_id: humanVisits.visitorId,
      })
      .from(visitors)
      .innerJoin(humanVisits, eq(visitors.visitorId, humanVisits.visitorId));

    // console.log(res);
    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
