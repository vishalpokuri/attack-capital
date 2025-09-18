interface DeleteBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  botName: string;
}

export function DeleteBotModal({
  isOpen,
  onClose,
  onConfirm,
  botName,
}: DeleteBotModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Delete Bot</h2>
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
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Are you sure you want to delete this bot?
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Bot: <span className="font-medium">{botName}</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                This action cannot be undone. All bot data and settings will be
                permanently removed.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200 space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors"
          >
            Delete Bot
          </button>
        </div>
      </div>
    </div>
  );
}
