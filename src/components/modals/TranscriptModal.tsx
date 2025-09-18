interface TranscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  transcript: string[][];
  sessionId: string;
}

export function TranscriptModal({
  isOpen,
  onClose,
  transcript,
  sessionId,
}: TranscriptModalProps) {
  if (!isOpen) return null;

  const formatTranscript = (transcript: string[][]) => {
    if (!transcript || !Array.isArray(transcript) || transcript.length === 0) {
      return [];
    }

    return transcript.map((entry, index) => {
      if (Array.isArray(entry) && entry.length >= 2) {
        return {
          speaker: entry[0],
          message: entry[1],
          id: index,
        };
      }
      return {
        speaker: "Unknown",
        message: JSON.stringify(entry),
        id: index,
      };
    });
  };

  const formattedTranscript = formatTranscript(transcript);

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Call Transcript - {sessionId}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {formattedTranscript.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No transcript available for this call.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {formattedTranscript.map((entry) => (
                <div key={entry.id} className="flex space-x-3">
                  <div
                    className={`flex-shrink-0 w-20 text-xs font-medium ${
                      entry.speaker.toLowerCase() === "user" ||
                      entry.speaker.toLowerCase() === "caller"
                        ? "text-blue-600"
                        : "text-rose-600"
                    }`}
                  >
                    {entry.speaker}:
                  </div>
                  <div className="flex-1 text-sm text-gray-900 leading-relaxed">
                    {entry.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
