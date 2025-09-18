import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/config";
import Patient from "@/db/models/Patient";
import MedicalRecord from "@/db/models/MedicalRecord";
import { logInvocation } from "@/app/api/utility";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const { medical_id } = body;
    // console.log("🆔 Medical ID received:", medical_id);

    if (!medical_id) {
      // console.log("❌ No medical ID provided");
      const errorResponse = {
        error: "Medical ID is required",
        found: false,
      };

      // Log failed invocation
      await logInvocation({
        endpoint: "/api/functions/patient-lookup",
        method: "POST",
        requestBody: body,
        statusCode: 400,
        responseBody: errorResponse,
        errorMessage: "Medical ID is required",
        category: "patient-lookup",
      });

      return NextResponse.json(errorResponse);
    }

    const patient = await Patient.findOne({
      medicalId: medical_id.toUpperCase(),
    });

    if (!patient) {
      // console.log("❌ Patient not found for Medical ID:", medical_id);
      const errorResponse = {
        error: "Patient not found with this Medical ID",
        found: false,
      };

      // Log failed invocation
      await logInvocation({
        endpoint: "/api/functions/patient-lookup",
        method: "POST",
        requestBody: body,
        statusCode: 404,
        responseBody: errorResponse,
        errorMessage: "Patient not found",
        category: "patient-lookup",
      });

      return NextResponse.json(errorResponse);
    }

    // console.log("✅ Patient found:", patient.name);
    // console.log("👤 Patient details:", {
    //   id: patient._id,
    //   name: patient.name,
    //   age: patient.age,
    //   medicalId: patient.medicalId,
    // });

    // console.log("📋 Fetching latest medical record...");
    const latestRecord = await MedicalRecord.findOne({
      patient: patient._id,
    }).sort({ visitDate: -1 });

    // if (latestRecord) {
    //   console.log("📄 Latest record found:", {
    //     visitDate: latestRecord.visitDate,
    //     notes: latestRecord.notes?.substring(0, 50) + "...",
    //   });
    // } else {
    //   console.log("📄 No previous medical records found");
    // }

    const responseData = {
      patient_name: patient.name,
      medical_id: patient.medicalId,
      age: patient.age,
      last_visit:
        latestRecord?.visitDate?.toDateString() || "No previous visits",
      notes: latestRecord?.notes || "No known allergies",
      found: true,
    };

    // console.log("📤 Sending response data:", responseData);

    // Log successful invocation
    await logInvocation({
      endpoint: "/api/functions/patient-lookup",
      method: "POST",
      requestBody: body,
      statusCode: 200,
      responseBody: responseData,
      category: "patient-lookup",
    });

    return NextResponse.json(responseData);
  } catch (error: any) {
    const errorResponse = { error: "Failed to lookup patient" };

    await logInvocation({
      endpoint: "/api/functions/patient-lookup",
      method: "POST",
      statusCode: 500,
      responseBody: errorResponse,
      errorMessage: error.message,
      category: "patient-lookup",
    });

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
