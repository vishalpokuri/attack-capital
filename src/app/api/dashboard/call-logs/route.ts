import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/config";
import CallLog from "@/db/models/CallLog";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const callLogs = await CallLog.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      callLogs,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch call logs" },
      { status: 500 }
    );
  }
}
