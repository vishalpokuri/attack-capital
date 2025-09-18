"use client";

import Loader from "@/components/ui/Loader";
import { useState, useEffect } from "react";
import { formatDateTime } from "../utils/dateUtils";
import { ErrorState, EmptyState } from "../utils/stateComponents";
import { CreateBotModal } from "../../modals/CreateBotModal";
import { UpdateBotModal } from "../../modals/UpdateBotModal";
import { DeleteBotModal } from "../../modals/DeleteBotModal";

interface Bots {
  uid?: string;
  name?: string;
  prompt?: string;
  first_message?: string;
  knowledge_base_id?: number;
  voice_provider?: string;
  voice?: string;
  voice_model?: string;
  voice_speed?: number;
  llm_model_name?: string;
  llm_model_temperature?: number;
  stt_provider?: string;
  stt_model?: string;
  call_settings?: {
    max_call_duration?: number;
    silence_timeout?: number;
    silence_timeout_max_retries?: number;
    silence_timeout_message?: string;
    call_recording_enabled?: boolean;
    voicemail_detection_enabled?: boolean;
    hipaa_compliance_enabled?: boolean;
    pci_compliance_enabled?: boolean;
  };
  advanced_settings?: {
    agent_personality?: string;
    humanize_conversation?: boolean;
    background_noise_reduction?: boolean;
    allow_interruptions?: boolean;
    min_interruption_duration?: number;
    background_sound?: string;
    agent_response_length?: string;
    short_pause?: number;
    long_pause?: number;
    filter_phrases?: string;
  };
  post_call_settings?: {
    summary_prompt?: string;
    success_evaluation_prompt?: string;
    success_evaluation_rubric_type?: string;
    structured_extraction_prompt?: string;
    structured_extraction_json_schema?: Record<string, unknown>;
  };
  created_at?: string;
  updated_at?: string;
}

function BotAccordion({
  bots,
  onEditBot,
  onDeleteBot,
}: {
  bots: Bots[];
  onEditBot: (bot: Bots) => void;
  onDeleteBot: (bot: Bots) => void;
}) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (uid: string) => {
    setOpenItems((prev) =>
      prev.includes(uid) ? prev.filter((item) => item !== uid) : [...prev, uid]
    );
  };

  return (
    <div className="space-y-3">
      {bots.map((bot) => {
        const isOpen = openItems.includes(bot.uid || "");
        const { date: createdDate, time: createdTime } = bot.created_at
          ? formatDateTime(bot.created_at)
          : { date: "N/A", time: "N/A" };
        const { date: updatedDate, time: updatedTime } = bot.updated_at
          ? formatDateTime(bot.updated_at)
          : { date: "N/A", time: "N/A" };

        return (
          <div
            key={bot.uid}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => toggleItem(bot.uid || "")}
              className="w-full px-4 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                  <span className="text-rose-600 font-medium text-sm">
                    {bot.name?.charAt(0) || "?"}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {bot.name || "Unnamed Bot"}
                  </h4>
                  <p className="text-sm text-gray-500">
                    UID: {bot.uid || "N/A"} • Updated: {updatedDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                  {bot.llm_model_name || "N/A"}
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
                isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <div className="p-4 bg-white border-t border-gray-100 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Basic Info
                    </p>
                    <p className="text-sm text-gray-900">
                      Name: {bot.name || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">
                      UID: {bot.uid || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Voice: {bot.voice || "N/A"} ({bot.voice_provider || "N/A"}
                      )
                    </p>
                    <p className="text-xs text-gray-500">
                      LLM: {bot.llm_model_name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Settings
                    </p>
                    <p className="text-xs text-gray-500">
                      Temperature: {bot.llm_model_temperature || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Voice Speed: {bot.voice_speed || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Max Call: {bot.call_settings?.max_call_duration || "N/A"}s
                    </p>
                    <p className="text-xs text-gray-500">
                      HIPAA:
                      {bot.call_settings?.hipaa_compliance_enabled !== undefined
                        ? bot.call_settings.hipaa_compliance_enabled
                          ? "Yes"
                          : "No"
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">Prompt</p>
                  <div className="text-xs text-gray-900 bg-gray-50 p-2 rounded-md max-h-20 overflow-y-auto">
                    {bot.prompt || "No prompt available"}
                  </div>
                </div>

                {bot.first_message && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      First Message
                    </p>
                    <div className="text-xs text-gray-900 bg-gray-50 p-2 rounded-md">
                      {bot.first_message}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Timestamps
                  </p>
                  <p className="text-xs text-gray-500">
                    Created: {createdDate} {createdTime}
                  </p>
                  <p className="text-xs text-gray-500">
                    Updated: {updatedDate} {updatedTime}
                  </p>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    onClick={() => onEditBot(bot)}
                    className="px-3 py-1 bg-rose-100 text-rose-700 text-xs rounded-md hover:bg-rose-200 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteBot(bot)}
                    className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-md hover:bg-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ManageBotsSection() {
  const [bots, setBots] = useState<Bots[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBot, setSelectedBot] = useState<Bots | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [botToDelete, setBotToDelete] = useState<Bots | null>(null);

  useEffect(() => {
    fetchBots();
  }, []);

  const fetchBots = async () => {
    try {
      setLoading(true);

      const apiKey = process.env.NEXT_PUBLIC_OPENMIC_API_KEY;
      if (!apiKey) {
        setError(
          "OpenMic API key not configured. Please add NEXT_PUBLIC_OPENMIC_API_KEY to your environment variables."
        );
        return;
      }

      const response = await fetch("https://api.openmic.ai/v1/bots", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.bots && Array.isArray(data.bots)) {
        setError(null);
        setBots(data.bots);
      } else {
        setError("Invalid response format from OpenMic API");
      }
    } catch (err: any) {
      setError(`Error fetching bots: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBot = async (botData: any) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENMIC_API_KEY;
      if (!apiKey) {
        setError("OpenMic API key not configured");
        return;
      }

      const response = await fetch("https://api.openmic.ai/v1/bots", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(botData),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Refresh the bots list
      await fetchBots();
      setIsCreateModalOpen(false);
    } catch (err: any) {
      setError(`Error creating bot: ${err.message}`);
    }
  };

  const handleEditBot = (bot: Bots) => {
    setSelectedBot(bot);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateBot = async (botData: any) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENMIC_API_KEY;
      if (!apiKey) {
        setError("OpenMic API key not configured");
        return;
      }

      const response = await fetch(
        `https://api.openmic.ai/v1/bots/${botData.uid}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(botData),
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      // Refresh the bots list
      await fetchBots();
      setIsUpdateModalOpen(false);
      setSelectedBot(null);
    } catch (err: any) {
      setError(`Error updating bot: ${err.message}`);
    }
  };

  const handleDeleteBot = (bot: Bots) => {
    setBotToDelete(bot);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteBot = async () => {
    if (!botToDelete) return;

    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENMIC_API_KEY;
      if (!apiKey) {
        setError("OpenMic API key not configured");
        return;
      }

      const response = await fetch(`https://api.openmic.ai/v1/bots/${botToDelete.uid}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      // Refresh the bots list
      await fetchBots();
      setIsDeleteModalOpen(false);
      setBotToDelete(null);
    } catch (err: any) {
      setError(`Error deleting bot: ${err.message}`);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorState
        title="Error Loading Bots"
        message={error}
        onRetry={fetchBots}
      />
    );
  }

  if (bots.length === 0) {
    return (
      <EmptyState
        title="No Bots Found"
        message="Create your first OpenMic AI bot to get started."
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
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
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
          <h3 className="text-lg font-medium text-gray-900">Bot Management</h3>
          <p className="text-sm text-gray-500">{bots.length} bot(s) found</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={fetchBots}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Refresh
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Create Bot
          </button>
        </div>
      </div>

      <BotAccordion bots={bots} onEditBot={handleEditBot} onDeleteBot={handleDeleteBot} />

      <CreateBotModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateBot}
      />

      <UpdateBotModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedBot(null);
        }}
        onSubmit={handleUpdateBot}
        bot={selectedBot}
      />

      <DeleteBotModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setBotToDelete(null);
        }}
        onConfirm={confirmDeleteBot}
        botName={botToDelete?.name || "Unknown Bot"}
      />
    </div>
  );
}
