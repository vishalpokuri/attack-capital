"use client";

import Loader from "@/components/ui/Loader";
import { useState, useEffect } from "react";
import { formatDateTime } from "../utils/dateUtils";
import { ErrorState, EmptyState } from "../utils/stateComponents";

interface Appointment {
  _id: string;
  patient: {
    _id: string;
    name: string;
    medicalId: string;
    age?: number;
  };
  doctor: {
    _id: string;
    name: string;
    specialty?: string;
  };
  startTime: string;
  endTime: string;
  reason?: string;
}

// Accordion Component for Appointments
function AppointmentAccordion({
  appointments,
}: {
  appointments: Appointment[];
}) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-3">
      {appointments.map((appointment) => {
        const isOpen = openItems.includes(appointment._id);
        const {
          date: startDate,
          time: startTime,
        } = formatDateTime(appointment.startTime);
        const { time: endTime } = formatDateTime(appointment.endTime);

        return (
          <div
            key={appointment._id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => toggleItem(appointment._id)}
              className="w-full px-4 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                  <span className="text-rose-600 font-medium text-sm">
                    {appointment.patient.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {appointment.patient.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {startDate} at {startTime}
                  </p>
                </div>
              </div>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Content */}
            <div
              className={`transition-all duration-200 ease-in-out ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <div className="p-4 bg-white border-t border-gray-100 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Patient Details
                    </p>
                    <p className="text-sm text-gray-900">
                      {appointment.patient.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Medical ID: {appointment.patient.medicalId}
                    </p>
                    {appointment.patient.age && (
                      <p className="text-xs text-gray-500">
                        Age: {appointment.patient.age}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Doctor</p>
                    <p className="text-sm text-gray-900">
                      {appointment.doctor.name}
                    </p>
                    {appointment.doctor.specialty && (
                      <p className="text-xs text-gray-500">
                        {appointment.doctor.specialty}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Appointment Time
                  </p>
                  <p className="text-sm text-gray-900">
                    {startDate} • {startTime} - {endTime}
                  </p>
                </div>

                {appointment.reason && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Reason</p>
                    <p className="text-sm text-gray-900">
                      {appointment.reason}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function AppointmentsSection() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/dashboard/appointments");
      const data = await response.json();

      if (data.success) {
        setAppointments(data.appointments);
      } else {
        setError("Failed to load appointments");
      }
    } catch (err) {
      setError("Error fetching appointments");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorState
        title="Error Loading Appointments"
        message={error}
        onRetry={fetchAppointments}
      />
    );
  }

  if (appointments.length === 0) {
    return (
      <EmptyState
        title="No Appointments Found"
        message="There are no appointments scheduled at the moment."
        icon={
          <svg
            className="w-8 h-8 text-rose-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        }
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            All Appointments
          </h3>
          <p className="text-sm text-gray-500">
            {appointments.length} appointment(s) found
          </p>
        </div>
        <button
          onClick={fetchAppointments}
          className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Refresh
        </button>
      </div>

      <AppointmentAccordion appointments={appointments} />
    </div>
  );
}
