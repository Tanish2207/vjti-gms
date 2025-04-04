import { NextRequest, NextResponse } from "next/server";
import { db } from "@/configs/db";
import { visitors, vehicleCat, vehicleVisits } from "@/drizzle/schema";
import moment from "moment";
import { eq } from "drizzle-orm";

// Define the structure of the request body
interface VehicleRequestBody {
  name: string;
  mobile: string;
  vehicleNo: string;
  category: string
}

// Define the structure of the database responses
interface Visitor {
  prevVisId: number;
  prevVisName: string;
}

interface Vehicle {
  prevVehNo: string;
  prevVehCat: string | null;
}

interface InsertedVisitor {
  id: number;
}

interface InsertedVehicle {
  veh_no: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: VehicleRequestBody = await req.json();
    const {
      name: req_name,
      mobile: req_mobile,
      vehicleNo: req_vehicleNo,
      category: req_category,
    } = body;

    console.log(req_name, req_mobile, req_vehicleNo, req_category);

    // Check if the vehicleNo exists in the vehicle_cat table
    const existingVehicle: Vehicle[] = await db
      .select({
        prevVehNo: vehicleCat.vehicleNo,
        prevVehCat: vehicleCat.category,
      })
      .from(vehicleCat)
      .where(eq(vehicleCat.vehicleNo, req_vehicleNo));

    // Check if the mobile exists in the visitors table
    const existingVisitor: Visitor[] = await db
      .select({
        prevVisId: visitors.visitorId,
        prevVisName: visitors.name,
      })
      .from(visitors)
      .where(eq(visitors.mobile, req_mobile));

    let globalVisitorId: number;
    let globalVehicleNo: string;

    // If the mobile does not exist, insert it into the visitors table
    if (existingVisitor.length === 0) {
      const vst: InsertedVisitor[] = await db
        .insert(visitors)
        .values({ name: req_name, mobile: req_mobile })
        .returning({
          id: visitors.visitorId,
        });

      globalVisitorId = vst[0].id;
    } else {
      globalVisitorId = existingVisitor[0].prevVisId;
    }

    // If the vehicleNo does not exist, insert it into the vehicle_cat table
    if (existingVehicle.length === 0) {
      const vh_visit: InsertedVehicle[] = await db
        .insert(vehicleCat)
        .values({ vehicleNo: req_vehicleNo, category: req_category })
        .returning({
          veh_no: vehicleCat.vehicleNo,
        });

      globalVehicleNo = vh_visit[0].veh_no;
    } else {
      globalVehicleNo = existingVehicle[0].prevVehNo;
    }

    // Insert into vehicleVisits table
    const updatedVisitor = await db
      .insert(vehicleVisits)
      .values({
        visitorId: globalVisitorId,
        vehicleNo: globalVehicleNo,
        entryTime: moment().toISOString(), // Ensure ISO format for entryTime
      })
      .returning();

    return NextResponse.json({ updatedVisitor }, { status: 201 });
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const res = await db
      .select({
        get_id: vehicleVisits.id,
        get_name: visitors.name,
        get_mobile: visitors.mobile,
        get_vehicle_no: vehicleCat.vehicleNo,
        get_category: vehicleCat.category,
        get_entry: vehicleVisits.entryTime,
        get_exit: vehicleVisits.exitTime,
      })
      .from(vehicleVisits)
      .innerJoin(visitors, eq(visitors.visitorId, vehicleVisits.visitorId))
      .innerJoin(vehicleCat, eq(vehicleVisits.vehicleNo, vehicleCat.vehicleNo));

    return NextResponse.json(res, { status: 200 });
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
