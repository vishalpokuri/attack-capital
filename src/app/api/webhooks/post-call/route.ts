import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/config";
import CallLog from "@/db/models/CallLog";
import { logInvocation } from "@/app/api/utility";

export async function POST(request: NextRequest) {
  // console.log("POST-CALL webhook received");

  try {
    await connectDB();
    const body = await request.json();
    // console.log("Body:", body);

    // Process dates if they exist
    if (body.createdAt) {
      body.createdAt = new Date(body.createdAt);
    }
    if (body.endedAt) {
      body.endedAt = new Date(body.endedAt);
    }

    // Create call log entry directly from body
    const callLog = new CallLog(body);

    await callLog.save();

    // console.log("Call log saved:", {
    //   sessionId: body.sessionId,
    //   isSuccessful: body.isSuccessful,
    //   timestamp: new Date().toISOString(),
    // });

    const responseData = {
      success: true,
      message: "Call log saved successfully",
      data: {
        log_id: callLog._id,
        session_id: body.sessionId,
        is_successful: body.isSuccessful,
        logged_at: new Date().toISOString(),
      },
    };

    // Log successful invocation
    await logInvocation({
      endpoint: "/api/webhooks/post-call",
      method: "POST",
      requestBody: body,
      statusCode: 200,
      responseBody: responseData,
      category: "post-call",
    });

    return NextResponse.json(responseData);
  } catch (error: any) {
    // console.error("Post-call webhook error:", error);
    const errorResponse = { success: false, error: "Failed to save call log" };

    // Log failed invocation
    await logInvocation({
      endpoint: "/api/webhooks/post-call",
      method: "POST",
      requestBody: {},
      statusCode: 500,
      responseBody: errorResponse,
      errorMessage: error.message,
      category: "post-call",
    });

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
