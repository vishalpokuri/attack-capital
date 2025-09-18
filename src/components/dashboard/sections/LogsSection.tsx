"use client";

import Loader from "@/components/ui/Loader";
import { useState, useEffect } from "react";
import { formatDateTime } from "../utils/dateUtils";
import { ErrorState, EmptyState } from "../utils/stateComponents";

interface InvocationLog {
  _id: string;
  endpoint: string;
  method: string;
  requestBody: Record<string, any>;
  statusCode: number;
  responseBody: Record<string, any>;
  timestamp: string;
  errorMessage?: string;
  category?: string;
}

function CodeBlock({ title, data }: { title: string; data: any }) {
  const jsonString = JSON.stringify(data, null, 2);

  return (
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-700 mb-2">{title}</p>
      <div className="bg-gray-900 text-gray-100 p-3 rounded-md text-xs font-mono overflow-x-auto max-h-64 overflow-y-auto">
        <pre className="whitespace-pre-wrap">{jsonString}</pre>
      </div>
    </div>
  );
}

function LogAccordion({ logs }: { logs: InvocationLog[] }) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-3">
      {logs.map((log) => {
        const isOpen = openItems.includes(log._id);
        const { date, time } = formatDateTime(log.timestamp);
        const isError = log.statusCode >= 400;

        return (
          <div
            key={log._id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => toggleItem(log._id)}
              className="w-full px-4 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isError ? 'bg-red-100' : 'bg-green-100'
                }`}>
                  <span className={`font-medium text-xs ${
                    isError ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {log.method}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {log.endpoint}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {date} at {time} • Status: {log.statusCode}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  isError
                    ? 'bg-red-100 text-red-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {log.statusCode}
                </span>
                {log.category && (
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                    {log.category}
                  </span>
                )}
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
                isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <div className="p-4 bg-white border-t border-gray-100 space-y-4">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Method</p>
                    <p className="text-gray-900">{log.method}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Status Code</p>
                    <p className={`font-medium ${
                      isError ? 'text-red-600' : 'text-green-600'
                    }`}>{log.statusCode}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Timestamp</p>
                    <p className="text-gray-900">{date} {time}</p>
                  </div>
                </div>

                {log.errorMessage && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Error Message</p>
                    <div className="bg-red-50 border border-red-200 rounded-md p-3">
                      <p className="text-sm text-red-800">{log.errorMessage}</p>
                    </div>
                  </div>
                )}

                {/* Request and Response Bodies */}
                <div className="flex space-x-4">
                  <CodeBlock title="Request Body" data={log.requestBody} />
                  <CodeBlock title="Response Body" data={log.responseBody} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function LogsSection() {
  const [logs, setLogs] = useState<InvocationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/dashboard/logs");
      const data = await response.json();

      if (data.success) {
        setLogs(data.logs);
      } else {
        setError("Failed to load logs");
      }
    } catch (err) {
      setError("Error fetching logs");
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
        title="Error Loading Logs"
        message={error}
        onRetry={fetchLogs}
      />
    );
  }

  if (logs.length === 0) {
    return (
      <EmptyState
        title="No Logs Found"
        message="There are no API invocation logs recorded at the moment."
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
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
          <h3 className="text-lg font-medium text-gray-900">API Invocation Logs</h3>
          <p className="text-sm text-gray-500">
            {logs.length} log(s) found
          </p>
        </div>
        <button
          onClick={fetchLogs}
          className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Refresh
        </button>
      </div>

      <LogAccordion logs={logs} />
    </div>
  );
}