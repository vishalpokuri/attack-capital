import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/config";
import InvocationLog from "@/db/models/InvocationLog";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const logs = await InvocationLog.find({}).sort({ timestamp: -1 }).lean();

    return NextResponse.json({
      success: true,
      logs,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch logs" },
      { status: 500 }
    );
  }
}
