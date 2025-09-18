import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/config";
import Appointment from "@/db/models/Appointment";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const appointments = await Appointment.find()
      .populate("patient", "-_id name medicalId")
      .populate("doctor", "-_id")
      .sort({ startTime: -1 });

    const responseData = {
      success: true,
      count: appointments.length,
      appointments: appointments,
    };

    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error("Error fetching appointments:", error);
    const errorResponse = {
      success: false,
      error: "Failed to fetch appointments",
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
