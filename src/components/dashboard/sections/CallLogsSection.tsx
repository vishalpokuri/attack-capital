"use client";

import Loader from "@/components/ui/Loader";
import { useState, useEffect } from "react";
import { formatDateTime, calculateDuration } from "../utils/dateUtils";
import { ErrorState, EmptyState } from "../utils/stateComponents";
import { TranscriptModal } from "../../modals/TranscriptModal";

interface CallLog {
  _id: string;
  sessionId: string;
  toPhoneNumber?: string;
  fromPhoneNumber?: string;
  callType?: string;
  disconnectionReason?: string;
  direction?: string;
  createdAt: string;
  endedAt?: string;
  transcript?: string[][];
  summary?: string;
  isSuccessful: boolean;
  dynamicVariables?: Record<string, any>;
}

function CallLogAccordion({ callLogs }: { callLogs: CallLog[] }) {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [transcriptModal, setTranscriptModal] = useState<{
    isOpen: boolean;
    transcript: string[][];
    sessionId: string;
  }>({
    isOpen: false,
    transcript: [],
    sessionId: "",
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const openTranscriptModal = (transcript: string[][], sessionId: string) => {
    setTranscriptModal({
      isOpen: true,
      transcript,
      sessionId,
    });
  };

  const closeTranscriptModal = () => {
    setTranscriptModal({
      isOpen: false,
      transcript: [],
      sessionId: "",
    });
  };

  return (
    <div className="space-y-3">
      {callLogs.map((callLog) => {
        const isOpen = openItems.includes(callLog._id);
        const { date: createdDate, time: createdTime } = formatDateTime(
          callLog.createdAt
        );
        const endedFormatted = callLog.endedAt
          ? formatDateTime(callLog.endedAt)
          : null;
        const duration = calculateDuration(callLog.createdAt, callLog.endedAt);

        return (
          <div
            key={callLog._id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => toggleItem(callLog._id)}
              className="w-full px-4 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    callLog.isSuccessful ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <span
                    className={`font-medium text-sm ${
                      callLog.isSuccessful ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {callLog.isSuccessful ? "✅" : "❌"}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {callLog.sessionId}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {createdDate} at {createdTime}
                    {duration && ` • ${duration}s`}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    callLog.isSuccessful
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {callLog.isSuccessful ? "Success" : "Failed"}
                </span>
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
              </div>
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
                      Call Details
                    </p>
                    <p className="text-sm text-gray-900">
                      Session: {callLog.sessionId}
                    </p>
                    {callLog.callType && (
                      <p className="text-xs text-gray-500">
                        Type: {callLog.callType}
                      </p>
                    )}
                    {callLog.direction && (
                      <p className="text-xs text-gray-500">
                        Direction: {callLog.direction}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Phone Numbers
                    </p>
                    {callLog.toPhoneNumber && (
                      <p className="text-xs text-gray-500">
                        To: {callLog.toPhoneNumber}
                      </p>
                    )}
                    {callLog.fromPhoneNumber && (
                      <p className="text-xs text-gray-500">
                        From: {callLog.fromPhoneNumber}
                      </p>
                    )}
                    {callLog.disconnectionReason && (
                      <p className="text-xs text-gray-500">
                        End Reason: {callLog.disconnectionReason}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">Timing</p>
                  <p className="text-sm text-gray-900">
                    Started: {createdDate} • {createdTime}
                  </p>
                  {endedFormatted && (
                    <p className="text-xs text-gray-500">
                      Ended: {endedFormatted.time} • Duration: {duration}s
                    </p>
                  )}
                </div>

                {callLog.summary && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Summary</p>
                    <p className="text-sm text-gray-900">{callLog.summary}</p>
                  </div>
                )}

                {callLog.dynamicVariables &&
                  Object.keys(callLog.dynamicVariables).length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Dynamic Variables
                      </p>
                      <div className="text-xs text-gray-900 bg-gray-50 p-2 rounded-md">
                        {JSON.stringify(callLog.dynamicVariables, null, 2)}
                      </div>
                    </div>
                  )}

                <div className="flex space-x-2 pt-2">
                  <button
                    onClick={() =>
                      openTranscriptModal(
                        callLog.transcript || [],
                        callLog.sessionId
                      )
                    }
                    className="px-3 py-1 bg-rose-100 text-rose-700 text-xs rounded-md hover:bg-rose-200 transition-colors"
                  >
                    View Transcript
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <TranscriptModal
        isOpen={transcriptModal.isOpen}
        onClose={closeTranscriptModal}
        transcript={transcriptModal.transcript}
        sessionId={transcriptModal.sessionId}
      />
    </div>
  );
}

export default function CallLogsSection() {
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCallLogs();
  }, []);

  const fetchCallLogs = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/dashboard/call-logs");
      const data = await response.json();

      if (data.success) {
        setCallLogs(data.callLogs);
      } else {
        setError("Failed to load call logs");
      }
    } catch (err) {
      setError("Error fetching call logs");
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
        title="Error Loading Call Logs"
        message={error}
        onRetry={fetchCallLogs}
      />
    );
  }

  if (callLogs.length === 0) {
    return (
      <EmptyState
        title="No Call Logs Found"
        message="There are no call logs recorded at the moment."
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
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
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
          <h3 className="text-lg font-medium text-gray-900">All Call Logs</h3>
          <p className="text-sm text-gray-500">
            {callLogs.length} call(s) found
          </p>
        </div>
        <button
          onClick={fetchCallLogs}
          className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Refresh
        </button>
      </div>

      <CallLogAccordion callLogs={callLogs} />
    </div>
  );
}
