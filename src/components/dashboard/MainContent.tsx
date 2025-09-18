"use client";

import LogsSection from "./sections/LogsSection";
import AppointmentsSection from "./sections/AppointmentsSection";
import CallLogsSection from "./sections/CallLogsSection";
import ManageBotsSection from "./sections/ManageBotsSection";

export default function MainContent({
  activeSection,
}: {
  activeSection: string;
}) {
  return (
    <div className="flex-1 flex flex-col">
      {/* Main Content Area */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="bg-white rounded-lg border border-gray-200 h-full">
          {/* Content based on active section */}
          <div className="p-6">
            {activeSection === "logs" && <LogsSection />}
            {activeSection === "appointments" && <AppointmentsSection />}
            {activeSection === "calllogs" && <CallLogsSection />}
            {activeSection === "manage-bots" && <ManageBotsSection />}
          </div>
        </div>
      </main>
    </div>
  );
}
