"use client";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Sidebar({
  activeSection,
  setActiveSection,
}: SidebarProps) {
  const sections = [
    {
      title: "DATABASE",
      subsections: [
        { key: "logs", label: "Logs" },
        { key: "appointments", label: "Appointments" },
        { key: "calllogs", label: "Call Logs" },
      ],
    },
    {
      title: "BOTS",
      subsections: [{ key: "manage-bots", label: "Manage Bots" }],
    },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col font-manrope">
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6 mt-4">
        {sections.map((section) => (
          <div key={section.title}>
            {/* Section Title */}
            <h2 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider mb-3">
              {section.title}
            </h2>

            {/* Subsections */}
            <div className="space-y-1">
              {section.subsections.map((subsection) => (
                <button
                  key={subsection.key}
                  onClick={() => setActiveSection(subsection.key)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    activeSection === subsection.key
                      ? "bg-rose-100 text-rose-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {subsection.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
            <span className="text-rose-600 font-medium text-sm">A</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Admin</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}
