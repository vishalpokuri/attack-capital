import mongoose from "mongoose";

const CallLogSchema = new mongoose.Schema({
  // From openmic response object
  sessionId: { type: String, required: true, unique: true },
  toPhoneNumber: String,
  fromPhoneNumber: String,
  callType: String,
  disconnectionReason: String,
  direction: String,
  createdAt: { type: Date, required: true },
  endedAt: Date,

  transcript: [[String]], // Array of arrays
  summary: String,
  isSuccessful: { type: Boolean, default: false },

  dynamicVariables: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
});

const CallLog =
  mongoose.models.CallLog || mongoose.model("CallLog", CallLogSchema);

export default CallLog;
