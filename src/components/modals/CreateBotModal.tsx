import { useState } from "react";
import { Combobox } from "@/components/ui/combobox";

interface CreateBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (botData: any) => void;
}

const voiceProviderOptions = [
  { value: "Cartesia", label: "Cartesia" },
  { value: "OpenAI", label: "OpenAI" },
  { value: "ElevenLabs", label: "ElevenLabs" },
];

const llmModelOptions = [
  { value: "gpt-4.1", label: "GPT-4.1" },
  { value: "gpt-4", label: "GPT-4" },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
];

const personalityOptions = [
  { value: "friendly", label: "Friendly" },
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
];

const responseLengthOptions = [
  { value: "concise", label: "Concise" },
  { value: "medium", label: "Medium" },
  { value: "detailed", label: "Detailed" },
];

export function CreateBotModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateBotModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    prompt: "",
    first_message: "",
    knowledge_base_id: "",
    voice_provider: "Cartesia",
    voice: "",
    voice_speed: 1,
    llm_model_name: "gpt-4.1",
    llm_model_temperature: 0.7,
    call_settings: {
      max_call_duration: 15,
      silence_timeout: 6,
      silence_timeout_max_retries: 2,
      call_recording_enabled: true,
      voicemail_detection_enabled: false,
      hipaa_compliance_enabled: false,
      pci_compliance_enabled: false,
    },
    advanced_settings: {
      agent_personality: "friendly",
      humanize_conversation: true,
      background_noise_reduction: true,
      allow_interruptions: true,
      min_interruption_duration: 1,
      background_sound: "None",
      agent_response_length: "concise",
      short_pause: 1,
      long_pause: 4,
    },
    post_call_settings: {
      summary_prompt:
        "You are an expert note-taker. You will be given a transcript of a call. Summarize the call in 2-3 sentences, if applicable.",
      success_evaluation_prompt:
        "You are an expert evaluator. You will be given a transcript of a call. Evaluate the call based on the rubric provided. Respond with only the chosen option.",
      success_evaluation_rubric_type: "PASS_FAIL",
    },
  });

  const handleInputChange = (field: string, value: any) => {
    if (field.includes(".")) {
      const [section, subField] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof typeof prev] as Record<string, unknown>),
          [subField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] m-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Create New Bot
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
        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]"
        >
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">
                Basic Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bot Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder="Enter bot name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Knowledge Base ID
                  </label>
                  <input
                    type="number"
                    value={formData.knowledge_base_id}
                    onChange={(e) =>
                      handleInputChange(
                        "knowledge_base_id",
                        parseInt(e.target.value) || ""
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder="Enter knowledge base ID"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  System Prompt *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.prompt}
                  onChange={(e) => handleInputChange("prompt", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  placeholder="Enter the system prompt for your bot"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Message
                </label>
                <input
                  type="text"
                  value={formData.first_message}
                  onChange={(e) =>
                    handleInputChange("first_message", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  placeholder="Hello! How can I help you today?"
                />
              </div>
            </div>

            {/* Voice & LLM Settings */}
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">
                Voice & LLM Settings
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Voice Provider
                  </label>
                  <Combobox
                    options={voiceProviderOptions}
                    value={formData.voice_provider}
                    onValueChange={(value) =>
                      handleInputChange("voice_provider", value)
                    }
                    placeholder="Select voice provider..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Voice ID
                  </label>
                  <input
                    type="text"
                    value={formData.voice}
                    onChange={(e) => handleInputChange("voice", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder="Voice ID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Voice Speed
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="2"
                    value={formData.voice_speed}
                    onChange={(e) =>
                      handleInputChange(
                        "voice_speed",
                        parseFloat(e.target.value)
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LLM Model
                  </label>
                  <Combobox
                    options={llmModelOptions}
                    value={formData.llm_model_name}
                    onValueChange={(value) =>
                      handleInputChange("llm_model_name", value)
                    }
                    placeholder="Select LLM model..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Temperature
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    value={formData.llm_model_temperature}
                    onChange={(e) =>
                      handleInputChange(
                        "llm_model_temperature",
                        parseFloat(e.target.value)
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>
            </div>

            {/* Call Settings */}
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">
                Call Settings
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Call Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.call_settings.max_call_duration}
                    onChange={(e) =>
                      handleInputChange(
                        "call_settings.max_call_duration",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Silence Timeout (seconds)
                  </label>
                  <input
                    type="number"
                    value={formData.call_settings.silence_timeout}
                    onChange={(e) =>
                      handleInputChange(
                        "call_settings.silence_timeout",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Silence Retries
                  </label>
                  <input
                    type="number"
                    value={formData.call_settings.silence_timeout_max_retries}
                    onChange={(e) =>
                      handleInputChange(
                        "call_settings.silence_timeout_max_retries",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.call_settings.call_recording_enabled}
                      onChange={(e) =>
                        handleInputChange(
                          "call_settings.call_recording_enabled",
                          e.target.checked
                        )
                      }
                      className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Enable Call Recording
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={
                        formData.call_settings.voicemail_detection_enabled
                      }
                      onChange={(e) =>
                        handleInputChange(
                          "call_settings.voicemail_detection_enabled",
                          e.target.checked
                        )
                      }
                      className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Enable Voicemail Detection
                    </span>
                  </label>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.call_settings.hipaa_compliance_enabled}
                      onChange={(e) =>
                        handleInputChange(
                          "call_settings.hipaa_compliance_enabled",
                          e.target.checked
                        )
                      }
                      className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      HIPAA Compliance
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.call_settings.pci_compliance_enabled}
                      onChange={(e) =>
                        handleInputChange(
                          "call_settings.pci_compliance_enabled",
                          e.target.checked
                        )
                      }
                      className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      PCI Compliance
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Advanced Settings */}
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">
                Advanced Settings
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Agent Personality
                  </label>
                  <Combobox
                    options={personalityOptions}
                    value={formData.advanced_settings.agent_personality}
                    onValueChange={(value) =>
                      handleInputChange(
                        "advanced_settings.agent_personality",
                        value
                      )
                    }
                    placeholder="Select personality..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Response Length
                  </label>
                  <Combobox
                    options={responseLengthOptions}
                    value={formData.advanced_settings.agent_response_length}
                    onValueChange={(value) =>
                      handleInputChange(
                        "advanced_settings.agent_response_length",
                        value
                      )
                    }
                    placeholder="Select response length..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Interruption (ms)
                  </label>
                  <input
                    type="number"
                    value={formData.advanced_settings.min_interruption_duration}
                    onChange={(e) =>
                      handleInputChange(
                        "advanced_settings.min_interruption_duration",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.advanced_settings.humanize_conversation}
                      onChange={(e) =>
                        handleInputChange(
                          "advanced_settings.humanize_conversation",
                          e.target.checked
                        )
                      }
                      className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Humanize Conversation
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={
                        formData.advanced_settings.background_noise_reduction
                      }
                      onChange={(e) =>
                        handleInputChange(
                          "advanced_settings.background_noise_reduction",
                          e.target.checked
                        )
                      }
                      className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Background Noise Reduction
                    </span>
                  </label>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.advanced_settings.allow_interruptions}
                      onChange={(e) =>
                        handleInputChange(
                          "advanced_settings.allow_interruptions",
                          e.target.checked
                        )
                      }
                      className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Allow Interruptions
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>

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
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-md text-sm font-medium transition-colors"
          >
            Create Bot
          </button>
        </div>
      </div>
    </div>
  );
}
