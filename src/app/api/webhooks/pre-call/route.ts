import { NextRequest, NextResponse } from "next/server";
import { logInvocation } from "@/app/api/utility";

export async function POST(request: NextRequest) {
  // console.log("📞 PRE-CALL webhook received");

  try {
    const body = await request.json();
    // console.log("Body:", body);

    // console.log("⁉️ Precall webhook invoked");
    const responseData = {
      call: {
        dynamic_variables: {
          patient_name: "Vishal Pokuri",
          age: "21",
        },
      },
    };
    // console.log("Sent data: ", responseData);

    // Log successful invocation
    await logInvocation({
      endpoint: "/api/webhooks/pre-call",
      method: "POST",
      requestBody: body,
      statusCode: 200,
      responseBody: responseData,
      category: "pre-call"
    });

    return NextResponse.json(responseData);

  } catch (error: any) {
    // console.error("Webhook error:", error);
    const errorResponse = { success: false, error: "Failed to process request" };

    // Log failed invocation
    await logInvocation({
      endpoint: "/api/webhooks/pre-call",
      method: "POST",
      requestBody: {},
      statusCode: 500,
      responseBody: errorResponse,
      errorMessage: error.message,
      category: "pre-call"
    });

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
