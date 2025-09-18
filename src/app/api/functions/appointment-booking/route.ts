import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/config";
import Patient from "@/db/models/Patient";
import Appointment from "@/db/models/Appointment";
import Doctor from "@/db/models/Doctor";
import { logInvocation } from "@/app/api/utility";

export async function POST(request: NextRequest) {
  // console.log("📅 APPOINTMENT-BOOKING function called");

  try {
    await connectDB();
    const body = await request.json();

    const { patient_id, doctor_id, start_date, reason } = body;

    // Basic validation
    if (!patient_id || !start_date) {
      const errorResponse = {
        error: "Patient ID and appointment date are required",
        booking_success: false,
      };

      // Log failed invocation
      await logInvocation({
        endpoint: "/api/functions/appointment-booking",
        method: "POST",
        requestBody: body,
        statusCode: 400,
        responseBody: errorResponse,
        errorMessage: "Missing required fields",
        category: "appointment-booking",
      });

      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Find patient
    const patient = await Patient.findOne({ medicalId: patient_id });
    if (!patient) {
      const errorResponse = {
        error: "Patient not found",
        booking_success: false,
      };

      // Log failed invocation
      await logInvocation({
        endpoint: "/api/functions/appointment-booking",
        method: "POST",
        requestBody: body,
        statusCode: 404,
        responseBody: errorResponse,
        errorMessage: "Patient not found",
        category: "appointment-booking",
      });

      return NextResponse.json(errorResponse, { status: 404 });
    }

    // Find or default doctor
    let doctor;
    if (doctor_id) {
      doctor = await Doctor.findById(doctor_id);
    } else {
      doctor = await Doctor.findOne({ name: "Dr. Sarah Johnson" });
    }

    if (!doctor) {
      const errorResponse = {
        error: "Doctor not found",
        booking_success: false,
      };

      // Log failed invocation
      await logInvocation({
        endpoint: "/api/functions/appointment-booking",
        method: "POST",
        requestBody: body,
        statusCode: 404,
        responseBody: errorResponse,
        errorMessage: "Doctor not found",
        category: "appointment-booking",
      });

      return NextResponse.json(errorResponse, { status: 404 });
    }

    // Create appointment
    const appointment = new Appointment({
      patient: patient._id,
      doctor: doctor._id,
      startTime: new Date(start_date),
      reason: reason || "General consultation",
    });

    await appointment.save();

    const responseData = {
      booking_success: true,
      appointment_id: appointment._id.toString(),
      appointment_date: start_date,
      patient_name: patient.name,
      doctor_name: doctor.name,
      appointment_reason: reason || "General consultation",
      confirmation_message: `Appointment scheduled for ${patient.name} with ${doctor.name}`,
    };

    // Log successful invocation
    await logInvocation({
      endpoint: "/api/functions/appointment-booking",
      method: "POST",
      requestBody: body,
      statusCode: 200,
      responseBody: responseData,
      category: "appointment-booking",
    });

    return NextResponse.json(responseData);
  } catch (error: any) {
    const errorResponse = {
      error: "Failed to create appointment",
      booking_success: false,
    };

    await logInvocation({
      endpoint: "/api/functions/appointment-booking",
      method: "POST",
      statusCode: 500,
      responseBody: errorResponse,
      errorMessage: error.message,
      category: "appointment-booking",
    });

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
